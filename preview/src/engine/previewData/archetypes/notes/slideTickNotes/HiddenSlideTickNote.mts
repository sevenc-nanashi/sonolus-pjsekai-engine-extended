import { options } from "../../../../configuration/options.mjs";
import { Note } from "../Note.mjs";

export class HiddenSlideTickNote extends Note {
  preprocess() {
    if (options.mirror) this.data.lane *= -1;
  }
}
