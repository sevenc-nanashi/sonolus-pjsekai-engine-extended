import { skin } from "../../../../skin.js";
import { SlimNote } from "../SlimNote.js";

export class NonDirectionalTraceFlickNote extends SlimNote {
  sprites = {
    left: skin.sprites.traceFlickNoteLeft,
    middle: skin.sprites.traceFlickNoteMiddle,
    right: skin.sprites.traceFlickNoteRight,
    fallback: skin.sprites.flickNoteFallback,
  };
}
