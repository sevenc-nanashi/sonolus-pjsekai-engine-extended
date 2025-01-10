import { skin } from "../../../../skin.js";
import { TraceNote } from "./TraceNote.js";

export class CriticalTraceNote extends TraceNote {
  sprites = {
    left: skin.sprites.criticalTraceNoteLeft,
    middle: skin.sprites.criticalTraceNoteMiddle,
    right: skin.sprites.criticalTraceNoteRight,
    fallback: skin.sprites.criticalNoteFallback,
  };

  tickSprites = {
    tick: skin.sprites.criticalSlideTickNote,
    fallback: skin.sprites.criticalSlideTickNoteFallback,
  };
}
