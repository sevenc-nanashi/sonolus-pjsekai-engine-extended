import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "~/engine/playData/skin.js";
import { TraceSlideEndNote } from "./TraceSlideEndNote.js";

export class CriticalTraceSlideEndNote extends TraceSlideEndNote {
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
    linear: particle.effects.criticalTraceNoteLinear,
  };
}
