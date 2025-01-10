import { options } from "../../../../configuration/options.js";
import { Note } from "../Note.js";

export class HiddenSlideTickNote extends Note {
  preprocess() {
    if (options.mirror) this.data.lane *= -1;
  }
}
