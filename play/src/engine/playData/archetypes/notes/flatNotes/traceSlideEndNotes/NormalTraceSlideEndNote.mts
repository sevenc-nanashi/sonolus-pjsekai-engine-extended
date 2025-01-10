import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "~/engine/playData/skin.mjs";
import { TraceSlideEndNote } from "./TraceSlideEndNote.mjs";

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
