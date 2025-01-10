import { disallowEmpty } from "../../InputManager.mjs";
import {
  getHitbox,
  scaledTimeToEarliestTime,
  timeToScaledTime,
} from "../../utils.mjs";
import { Note } from "../Note.mjs";

export abstract class SlideTickNote extends Note {
  leniency = 1;

  inputTime = this.entityMemory(Number);

  preprocess() {
    super.preprocess();

    this.inputTime = this.targetTime + input.offset;

    this.spawnTime = scaledTimeToEarliestTime(
      timeToScaledTime(this.inputTime, this.data.timeScaleGroup),
      this.data.timeScaleGroup,
    );
  }

  initialize() {
    getHitbox({
      l: this.data.lane - this.data.size,
      r: this.data.lane + this.data.size,
      leniency: this.leniency,
    }).copyTo(this.fullHitbox);

    this.result.accuracy = 0.125;
  }

  touch() {
    if (time.now < this.inputTime) return;

    for (const touch of touches) {
      if (!this.fullHitbox.contains(touch.position)) continue;

      this.complete(touch);
      return;
    }
  }

  updateParallel() {
    if (time.now > this.inputTime) this.despawn = true;
  }

  complete(touch: Touch) {
    disallowEmpty(touch);

    this.result.judgment = Judgment.Perfect;
    this.result.accuracy = 0;

    this.playHitEffects();

    this.despawn = true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  playHitEffects() {}
}
