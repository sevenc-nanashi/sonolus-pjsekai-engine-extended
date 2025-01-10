import { approach } from "../../../../../../../../shared/src/engine/data/note.js";
import { perspectiveLayout } from "../../../../../../../../shared/src/engine/data/utils.js";
import { options } from "../../../../../configuration/options.js";
import { sfxDistance } from "../../../../effect.js";
import { note } from "../../../../note.js";
import { scaledScreen } from "../../../../scaledScreen.js";
import { getZ, layer } from "../../../../skin.js";
import {
  scaledTimeToEarliestTime,
  timeToScaledTime,
} from "../../../timeScale.js";
import { SlideTickNote } from "../SlideTickNote.js";

export abstract class VisibleSlideTickNote extends SlideTickNote {
  abstract sprites: {
    tick: SkinSprite;
    fallback: SkinSprite;
  };

  abstract clips: {
    tick: EffectClip;
    fallback: EffectClip;
  };

  abstract effect: ParticleEffect;

  visualTime = this.entityMemory({
    min: Number,
    max: Number,
    hidden: Number,
  });

  initialized = this.entityMemory(Boolean);

  spriteLayout = this.entityMemory(Quad);
  z = this.entityMemory(Number);

  preprocess() {
    super.preprocess();

    this.visualTime.max = timeToScaledTime(
      this.targetTime,
      this.data.timeScaleGroup,
    );
    this.visualTime.min = this.visualTime.max - note.duration;

    if (options.sfxEnabled) {
      if ("fallback" in this.clips && this.useFallbackClip) {
        this.clips.fallback.schedule(this.targetTime, sfxDistance);
      } else {
        this.clips.tick.schedule(this.targetTime, sfxDistance);
      }
    }
  }

  spawnTime() {
    return scaledTimeToEarliestTime(
      Math.min(
        this.visualTime.min,
        this.visualTime.max,
        timeToScaledTime(this.targetTime, this.data.timeScaleGroup),
      ),
      this.data.timeScaleGroup,
    );
  }

  despawnTime() {
    return this.targetTime;
  }

  initialize() {
    if (this.initialized) return;
    this.initialized = true;

    this.globalInitialize();
  }

  updateParallel() {
    const scaledTime = timeToScaledTime(time.now, this.data.timeScaleGroup);
    if (options.hidden > 0 && scaledTime > this.visualTime.hidden) return;
    if (scaledTime < this.visualTime.min) return;

    this.render();
  }

  terminate() {
    if (time.skip) return;

    this.despawnTerminate();
  }

  get useFallbackSprite() {
    return !this.sprites.tick.exists;
  }

  get useFallbackClip() {
    return !this.clips.tick.exists;
  }

  globalInitialize() {
    if (options.hidden > 0)
      this.visualTime.hidden =
        this.visualTime.max - note.duration * options.hidden;

    const b = 1 + note.h;
    const t = 1 - note.h;

    if (this.useFallbackSprite) {
      const l = this.data.lane - this.data.size;
      const r = this.data.lane + this.data.size;

      perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout);
    } else {
      const w = note.h / scaledScreen.wToH;

      new Rect({
        l: this.data.lane - w,
        r: this.data.lane + w,
        b,
        t,
      })
        .toQuad()
        .copyTo(this.spriteLayout);
    }

    this.z = getZ(layer.note.tick, this.targetTime, this.data.lane);
  }

  render() {
    const scaledTime = timeToScaledTime(time.now, this.data.timeScaleGroup);
    const y = approach(this.visualTime.min, this.visualTime.max, scaledTime);

    if (this.useFallbackSprite) {
      this.sprites.fallback.draw(this.spriteLayout.mul(y), this.z, 1);
    } else {
      this.sprites.tick.draw(this.spriteLayout.mul(y), this.z, 1);
    }
  }

  despawnTerminate() {
    if (options.noteEffectEnabled) this.playNoteEffect();
  }

  playNoteEffect() {
    const w = 4;
    const h = w * scaledScreen.wToH;

    this.effect.spawn(
      new Rect({
        l: this.data.lane - w,
        r: this.data.lane + w,
        b: 1 + h,
        t: 1 - h,
      }),
      0.6,
      false,
    );
  }
}
