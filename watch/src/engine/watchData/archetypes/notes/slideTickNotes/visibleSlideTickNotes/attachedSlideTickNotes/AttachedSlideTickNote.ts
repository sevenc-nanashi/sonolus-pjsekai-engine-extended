import { getAttached } from "../../utils.js";
import { VisibleSlideTickNote } from "../VisibleSlideTickNote.js";

export abstract class AttachedSlideTickNote extends VisibleSlideTickNote {
  attachedSlideTickData = this.defineImport({
    attachRef: { name: "attach", type: Number },
  });

  preprocessOrder = 1;
  preprocess() {
    super.preprocess();
    ({ lane: this.data.lane, size: this.data.size } = getAttached(
      this.attachedSlideTickData.attachRef,
      this.targetTime,
    ));
  }
}
