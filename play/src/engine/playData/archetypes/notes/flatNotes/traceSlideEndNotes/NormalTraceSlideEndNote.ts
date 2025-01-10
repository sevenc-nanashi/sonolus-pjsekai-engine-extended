import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "~/engine/playData/skin.js";
import { TraceSlideEndNote } from "./TraceSlideEndNote.js";

export class NormalTraceSlideEndNote extends TraceSlideEndNote {
  sprites = {
    left: skin.sprites.normalTraceNoteLeft,
    middle: skin.sprites.normalTraceNoteMiddle,
    right: skin.sprites.normalTraceNoteRight,
    fallback: skin.sprites.slideNoteFallback,
  };

  tickSprites = {
    tick: skin.sprites.normalSlideTickNote,
    fallback: skin.sprites.normalSlideTickNoteFallback,
  };

  clips = {
    perfect: effect.clips.normalTrace,
    fallback: effect.clips.normalPerfect,
  };

  effects = {
    circular: particle.effects.slideNoteCircular,
    linear: particle.effects.slideNoteLinear,
  };
}
