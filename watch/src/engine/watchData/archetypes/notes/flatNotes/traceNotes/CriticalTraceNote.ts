import { buckets } from "../../../../buckets.js";
import { effect } from "../../../../effect.js";
import { particle } from "../../../../particle.js";
import { skin } from "../../../../skin.js";
import { windows } from "../../../windows.js";
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

  clips = {
    perfect: effect.clips.criticalTrace,
    fallback: effect.clips.normalPerfect,
  };

  effects = {
    circular: particle.effects.criticalTraceNoteCircular,
    circularFallback: particle.effects.criticalSlideTickNote,
    linear: particle.effects.criticalTraceNoteLinear,
    linearFallback: particle.effects.criticalNoteLinear,
  };

  windows = windows.tapNote.critical;

  bucket = buckets.criticalTapNote;
}
