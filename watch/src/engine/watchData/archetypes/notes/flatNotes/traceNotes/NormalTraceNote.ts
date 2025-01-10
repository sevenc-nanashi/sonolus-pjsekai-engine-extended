import { effect } from "../../../../effect.js";
import { particle } from "../../../../particle.js";
import { skin } from "../../../../skin.js";
import { archetypes } from "../../../index.js";
import { TraceNote } from "./TraceNote.js";

export class NormalTraceNote extends TraceNote {
  sprites = {
    left: skin.sprites.normalTraceNoteLeft,
    middle: skin.sprites.normalTraceNoteMiddle,
    right: skin.sprites.normalTraceNoteRight,
    diamond: skin.sprites.normalSlideTickNote,
    fallback: skin.sprites.normalTraceNoteFallback,
  };

  clips = {
    perfect: effect.clips.normalTrace,
    fallback: effect.clips.normalPerfect,
  };

  effects = {
    circular: particle.effects.slideNoteCircular,
    linear: particle.effects.slideNoteLinear,
  };

  get slotEffect() {
    return archetypes.SlideSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.SlideSlotGlowEffect;
  }
}
