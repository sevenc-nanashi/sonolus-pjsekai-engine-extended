import { skin } from "../../../../skin.mjs";
import { SlimNote } from "../SlimNote.mjs";

export class NonDirectionalTraceFlickNote extends SlimNote {
  sprites = {
    left: skin.sprites.traceFlickNoteLeft,
    middle: skin.sprites.traceFlickNoteMiddle,
    right: skin.sprites.traceFlickNoteRight,
    fallback: skin.sprites.flickNoteFallback,
  };
}
