import { buckets } from "~/engine/playData/buckets.mjs";
import {
  canTraceStart,
  disallowEmpty,
  disallowTraceStart,
} from "../../../InputManager.mjs";
import { note } from "../../../constants.mjs";
import { scaledScreen } from "../../../shared.mjs";
import { perspectiveLayout } from "../../../utils.mjs";
import { windows } from "../../../windows.mjs";
import { SlimNote } from "../SlimNote.mjs";

export abstract class TraceSlideStartNote extends SlimNote {
  leniency = 0.75;

  abstract tickSprites: {
    tick: SkinSprite;
    fallback: SkinSprite;
  };

  abstract clips: {
    perfect: EffectClip;
    fallback: EffectClip;
  };

  abstract effects: {
    circular: ParticleEffect;
    linear: ParticleEffect;
  };

  windows = windows.tapNote.normal;

  bucket = buckets.normalTraceNote;

  tickSpriteLayout = this.entityMemory(Quad);

  sharedMemory = this.defineSharedMemory({
    lastActiveTime: Number,
  });

  preprocess() {
    super.preprocess();

    this.sharedMemory.lastActiveTime = -1000;
  }

  setLayout({ l, r }: { l: number; r: number }): void {
    super.setLayout({ l, r });

    const b = 1 + note.h;
    const t = 1 - note.h;

    if (this.useFallbackTickSprite) {
      const l = this.data.lane - this.data.size;
      const r = this.data.lane + this.data.size;

      perspectiveLayout({ l, r, b, t }).copyTo(this.tickSpriteLayout);
    } else {
      const w = note.h / scaledScreen.wToH;

      new Rect({
        l: this.data.lane - w,
        r: this.data.lane + w,
        b,
        t,
      })
        .toQuad()
        .copyTo(this.tickSpriteLayout);
    }
  }

  get useFallbackTickSprite() {
    return !this.tickSprites.tick.exists;
  }
  globalPreprocess() {
    super.globalPreprocess();
    this.life.miss = -40;
  }

  touch() {
    for (const touch of touches) {
      if (touch.started && time.now < this.inputTime.min) continue;
      if (!touch.started && time.now < this.targetTime) continue;
      if (touch.started && !canTraceStart(touch)) continue;
      if (!this.fullHitbox.contains(touch.position)) continue;

      this.complete(touch);
      return;
    }
  }

  render(): void {
    if (time.now >= this.targetTime) return;
    super.render();

    if (this.useFallbackTickSprite) {
      this.tickSprites.fallback.draw(
        this.tickSpriteLayout.mul(this.y),
        this.z + 1,
        1,
      );
    } else {
      this.tickSprites.tick.draw(
        this.tickSpriteLayout.mul(this.y),
        this.z + 1,
        1,
      );
    }
  }

  complete(touch: Touch) {
    disallowEmpty(touch);
    disallowTraceStart(touch);

    this.result.judgment = Judgment.Perfect;
    this.result.accuracy = 0;

    this.result.bucket.index = this.bucket.index;
    this.result.bucket.value = this.result.accuracy * 1000;

    this.playHitEffects(touch.startTime);

    this.despawn = true;
  }
}
