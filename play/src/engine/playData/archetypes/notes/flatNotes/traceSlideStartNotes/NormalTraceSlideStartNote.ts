import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "~/engine/playData/skin.js";
import { archetypes } from "../../../index.js";
import { TraceSlideStartNote } from "./TraceSlideStartNote.js";

export class NormalTraceSlideStartNote extends TraceSlideStartNote {
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

  get slotEffect() {
    return archetypes.SlideSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.SlideSlotGlowEffect;
  }
}
