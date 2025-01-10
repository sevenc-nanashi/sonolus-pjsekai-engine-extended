import { minFlickVR } from "../../../constants.js";
import { SlimNote } from "../SlimNote.js";

export abstract class TraceFlickNote extends SlimNote {
  leniency = 1;

  earlyInputTime = this.entityMemory(Number);

  preprocess() {
    super.preprocess();
  }

  initialize() {
    super.initialize();

    this.earlyInputTime = this.targetTime + input.offset;
  }

  complete(touch: Touch) {
    this.result.judgment = Judgment.Perfect;
    this.result.accuracy = touch.time - this.targetTime;

    this.result.bucket.index = this.bucket.index;
    this.result.bucket.value = this.result.accuracy * 1000;

    this.playHitEffects(touch.time);

    this.despawn = true;
  }

  playNoteEffects() {
    super.playNoteEffects();
  }

  touch() {
    if (time.now < this.inputTime.min) return;

    if (time.now < this.earlyInputTime) {
      this.earlyTouch();
    } else {
      this.lateTouch();
    }
  }

  earlyTouch() {
    for (const touch of touches) {
      if (touch.vr < minFlickVR) continue;
      if (!this.hitbox.contains(touch.lastPosition)) continue;
      if (!touch.ended && this.hitbox.contains(touch.position)) continue;

      this.complete(touch);
      return;
    }
  }

  lateTouch() {
    for (const touch of touches) {
      if (touch.vr < minFlickVR) continue;
      if (!this.hitbox.contains(touch.lastPosition)) continue;

      this.complete(touch);
      return;
    }
  }
}
