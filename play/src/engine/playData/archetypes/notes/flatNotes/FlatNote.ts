import { options } from "../../../../configuration/options.js";
import { particle } from "../../../particle.js";
import { lane, minSFXDistance, note } from "../../constants.js";
import { layer } from "../../layer.js";
import type { SlotEffect } from "../../slotEffects/SlotEffect.js";
import type { SlotGlowEffect } from "../../slotGlowEffects/SlotGlowEffect.js";
import {
  circularEffectLayout,
  getHitbox,
  getScheduleSFXTime,
  getZ,
  linearEffectLayout,
  perspectiveLayout,
  scaledTimeToEarliestTime,
  timeToScaledTime,
} from "../../utils.js";
import { Note } from "../Note.js";

export abstract class FlatNote extends Note {
  abstract sprites: {
    left: SkinSprite;
    middle: SkinSprite;
    right: SkinSprite;
    fallback: SkinSprite;
  };

  abstract clips: {
    perfect: EffectClip;
    great?: EffectClip;
    good?: EffectClip;
    fallback?: EffectClip;
  };

  abstract effects: {
    circular: ParticleEffect;
    linear: ParticleEffect;
  };

  get slotEffect(): SlotEffect | undefined {
    return undefined;
  }

  get slotGlowEffect(): SlotGlowEffect | undefined {
    return undefined;
  }

  abstract windows: JudgmentWindows;

  abstract bucket: Bucket;

  scheduleSFXTime = this.entityMemory(Number);

  visualTime = this.entityMemory({
    min: Number,
    max: Number,
    hidden: Number,
  });

  hasSFXScheduled = this.entityMemory(Boolean);

  inputTime = this.entityMemory({
    min: Number,
    max: Number,
  });

  spriteLayouts = this.entityMemory({
    left: Quad,
    middle: Quad,
    right: Quad,
  });
  z = this.entityMemory(Number);

  y = this.entityMemory(Number);

  globalPreprocess() {
    const toMs = ({ min, max }: RangeLike) => ({
      min: Math.round(min * 1000),
      max: Math.round(max * 1000),
    });

    this.bucket.set({
      perfect: toMs(this.windows.perfect),
      great: toMs(this.windows.great),
      good: toMs(this.windows.good),
    });

    this.life.miss = -80;
  }

  preprocess() {
    super.preprocess();

    this.scheduleSFXTime = getScheduleSFXTime(this.targetTime);

    this.visualTime.max = timeToScaledTime(
      this.targetTime,
      this.data.timeScaleGroup,
    );
    this.visualTime.min = this.visualTime.max - Note.duration;

    this.spawnTime = scaledTimeToEarliestTime(
      Math.min(
        this.visualTime.min,
        this.visualTime.max,
        timeToScaledTime(this.scheduleSFXTime, this.data.timeScaleGroup),
      ),
      this.data.timeScaleGroup,
    );
  }

  initialize() {
    if (options.hidden > 0)
      this.visualTime.hidden =
        this.visualTime.max - Note.duration * options.hidden;

    this.inputTime.min = this.targetTime + this.windows.good.min + input.offset;
    this.inputTime.max = this.targetTime + this.windows.good.max + input.offset;

    const l = this.data.lane - this.data.size + 0.1;
    const r = this.data.lane + this.data.size - 0.1;

    getHitbox({ l, r, leniency: 0 }).copyTo(this.hitbox);
    getHitbox({ l, r, leniency: this.leniency }).copyTo(this.fullHitbox);

    this.setLayout({ l, r });

    this.z = getZ(layer.note.body, this.targetTime, this.data.lane);

    this.result.accuracy = this.windows.good.max;
  }

  setLayout({ l, r }: { l: number; r: number }) {
    const b = 1 + note.h;
    const t = 1 - note.h;

    if (this.useFallbackSprites) {
      perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayouts.middle);
    } else {
      const ml = l + 0.25;
      const mr = r - 0.25;

      perspectiveLayout({ l, r: ml, b, t }).copyTo(this.spriteLayouts.left);
      perspectiveLayout({ l: ml, r: mr, b, t }).copyTo(
        this.spriteLayouts.middle,
      );
      perspectiveLayout({ l: mr, r, b, t }).copyTo(this.spriteLayouts.right);
    }
  }

  updateParallel() {
    if (time.now > this.inputTime.max) this.despawn = true;
    if (this.despawn) return;

    if (
      this.shouldScheduleSFX &&
      !this.hasSFXScheduled &&
      time.now >= this.scheduleSFXTime
    )
      this.scheduleSFX();

    const scaledTime = timeToScaledTime(time.now, this.data.timeScaleGroup);
    if (scaledTime < this.visualTime.min) return;
    if (options.hidden > 0 && scaledTime > this.visualTime.hidden) return;

    this.render();
  }

  get shouldScheduleSFX() {
    return options.sfxEnabled && options.autoSFX;
  }

  get shouldPlaySFX() {
    return options.sfxEnabled && !options.autoSFX;
  }

  get useFallbackSprites() {
    return (
      !this.sprites.left.exists ||
      !this.sprites.middle.exists ||
      !this.sprites.right.exists
    );
  }

  get useFallbackClip() {
    return (
      !this.clips.perfect.exists ||
      ("great" in this.clips && !this.clips.great.exists) ||
      ("good" in this.clips && !this.clips.good.exists)
    );
  }

  scheduleSFX() {
    if ("fallback" in this.clips && this.useFallbackClip) {
      this.clips.fallback.schedule(this.targetTime, minSFXDistance);
    } else {
      this.clips.perfect.schedule(this.targetTime, minSFXDistance);
    }

    this.hasSFXScheduled = true;
  }

  render() {
    if (!options.showNotes) return;
    if (this.data.size < 0.25) return;
    this.y = Note.approach(
      this.visualTime.min,
      this.visualTime.max,
      timeToScaledTime(time.now, this.data.timeScaleGroup),
    );

    if (this.useFallbackSprites) {
      this.sprites.fallback.draw(
        this.spriteLayouts.middle.mul(this.y),
        this.z,
        1,
      );
    } else {
      this.sprites.left.draw(this.spriteLayouts.left.mul(this.y), this.z, 1);
      this.sprites.middle.draw(
        this.spriteLayouts.middle.mul(this.y),
        this.z,
        1,
      );
      this.sprites.right.draw(this.spriteLayouts.right.mul(this.y), this.z, 1);
    }
  }
  playHitEffects(hitTime: number) {
    if (this.shouldPlaySFX) this.playSFX();
    if (options.noteEffectEnabled) this.playNoteEffects();
    if (options.slotEffectEnabled) this.playSlotEffects(hitTime);
    if (options.laneEffectEnabled) this.playLaneEffects();
  }

  playSFX() {
    if ("fallback" in this.clips && this.useFallbackClip) {
      this.clips.fallback.play(minSFXDistance);
    } else if ("great" in this.clips && "good" in this.clips) {
      if (this.result.judgment === Judgment.Perfect) {
        this.clips.perfect.play(minSFXDistance);
      } else if (this.result.judgment === Judgment.Great) {
        this.clips.great.play(minSFXDistance);
      } else if (this.result.judgment === Judgment.Good) {
        this.clips.good.play(minSFXDistance);
      }
    } else {
      this.clips.perfect.play(minSFXDistance);
    }
  }

  playNoteEffects() {
    this.playLinearNoteEffect();
    this.playCircularNoteEffect();
  }

  playLinearNoteEffect() {
    this.effects.linear.spawn(
      linearEffectLayout({
        lane: this.data.lane,
        shear: 0,
      }),
      0.5,
      false,
    );
  }

  playCircularNoteEffect() {
    this.effects.circular.spawn(
      circularEffectLayout({
        lane: this.data.lane,
        w: 1.75,
        h: 1.05,
      }),
      0.6,
      false,
    );
  }

  playSlotEffects(startTime: number) {
    const start = Math.floor(this.data.lane - this.data.size);
    const end = Math.ceil(this.data.lane + this.data.size);

    if (this.slotEffect) {
      for (let i = start; i < end; i++) {
        this.slotEffect.spawn({
          startTime,
          lane: i + 0.5,
        });
      }
    }

    if (this.slotGlowEffect) {
      this.slotGlowEffect.spawn({
        startTime,
        lane: this.data.lane,
        size: this.data.size,
      });
    }
  }

  playLaneEffects() {
    particle.effects.lane.spawn(
      perspectiveLayout({
        l: this.data.lane - this.data.size,
        r: this.data.lane + this.data.size,
        b: lane.b,
        t: lane.t,
      }),
      0.3,
      false,
    );
  }

  static approach(fromTime: number, toTime: number, now: number) {
    return 1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now));
  }

  static get duration() {
    return Math.lerp(
      0.35,
      4,
      Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31,
    );
  }
}
