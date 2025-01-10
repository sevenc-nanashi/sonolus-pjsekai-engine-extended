import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "~/engine/playData/skin.mjs";
import { archetypes } from "../../../index.mjs";
import { TraceSlideStartNote } from "./TraceSlideStartNote.mjs";

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
