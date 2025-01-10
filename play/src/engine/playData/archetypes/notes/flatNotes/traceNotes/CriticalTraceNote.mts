import { buckets } from "../../../../buckets.mjs";
import { effect } from "../../../../effect.mjs";
import { particle } from "../../../../particle.mjs";
import { skin } from "../../../../skin.mjs";
import { windows } from "../../../windows.mjs";
import { TraceNote } from "./TraceNote.mjs";

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
    circular: particle.effects.criticalNoteCircular,
    linear: particle.effects.criticalNoteLinear,
  };

  windows = windows.tapNote.critical;

  bucket = buckets.criticalTapNote;
}
