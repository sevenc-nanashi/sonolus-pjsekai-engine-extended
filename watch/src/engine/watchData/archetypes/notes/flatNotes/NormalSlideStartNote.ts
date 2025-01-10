import { effect } from "../../../effect.js";
import { particle } from "../../../particle.js";
import { skin } from "../../../skin.js";
import { archetypes } from "../../index.js";
import { FlatNote } from "./FlatNote.js";

export class NormalSlideStartNote extends FlatNote {
  sprites = {
    left: skin.sprites.slideNoteLeft,
    middle: skin.sprites.slideNoteMiddle,
    right: skin.sprites.slideNoteRight,
    fallback: skin.sprites.slideNoteFallback,
  };

  clips = {
    perfect: effect.clips.normalPerfect,
    great: effect.clips.normalGreat,
    good: effect.clips.normalGood,
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
