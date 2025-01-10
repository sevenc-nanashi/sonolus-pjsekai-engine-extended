import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "~/engine/playData/skin.mjs";
import { TraceSlideEndNote } from "./TraceSlideEndNote.mjs";

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
    circular: particle.effects.criticalNoteCircular,
    linear: particle.effects.criticalNoteLinear,
  };
}
