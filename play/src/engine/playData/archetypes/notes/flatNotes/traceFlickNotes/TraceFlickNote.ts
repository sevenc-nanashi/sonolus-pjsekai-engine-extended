import { minFlickVR } from "../../../constants.js";
import { SlimNote } from "../SlimNote.js";

export abstract class TraceFlickNote extends SlimNote {
  leniency = 1;

  // not 0: earlyInputTime, 0: done
  earlyInputTimeOrDone = this.entityMemory(Number);

  preprocess() {
    super.preprocess();
  }

  initialize() {
    super.initialize();

    this.earlyInputTimeOrDone = this.targetTime + input.offset;
  }

  complete(time: number) {
    this.result.judgment = Judgment.Perfect;
    this.result.accuracy = time - this.targetTime;

    this.result.bucket.index = this.bucket.index;
    this.result.bucket.value = this.result.accuracy * 1000;

    this.playHitEffects(time);

    this.despawn = true;
  }

  updateParallel() {
    super.updateParallel();

    if (this.earlyInputTimeOrDone === 0 && time.now >= this.targetTime) {
      this.complete(this.targetTime);
    }
  }

  playNoteEffects() {
    super.playNoteEffects();
  }

  touch() {
    if (this.earlyInputTimeOrDone === 0) return;
    if (time.now < this.inputTime.min) return;

    if (time.now < this.earlyInputTimeOrDone) {
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

      this.earlyInputTimeOrDone = 0;
      return;
    }
  }

  lateTouch() {
    for (const touch of touches) {
      if (touch.vr < minFlickVR) continue;
      if (!this.hitbox.contains(touch.lastPosition)) continue;

      this.complete(touch.time);
      return;
    }
  }
}
