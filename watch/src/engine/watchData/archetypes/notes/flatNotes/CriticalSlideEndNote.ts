import { effect } from "../../../effect.js";
import { particle } from "../../../particle.js";
import { skin } from "../../../skin.js";
import { archetypes } from "../../index.js";
import { FlatNote } from "./FlatNote.js";

export class CriticalSlideEndNote extends FlatNote {
  sprites = {
    left: skin.sprites.criticalNoteLeft,
    middle: skin.sprites.criticalNoteMiddle,
    right: skin.sprites.criticalNoteRight,
    fallback: skin.sprites.criticalNoteEndFallback,
  };

  clips = {
    perfect: effect.clips.normalPerfect,
    great: effect.clips.normalGreat,
    good: effect.clips.normalGood,
  };

  effects = {
    circular: particle.effects.criticalNoteCircular,
    linear: particle.effects.criticalNoteLinear,
  };

  get slotEffect() {
    return archetypes.CriticalSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.CriticalSlotGlowEffect;
  }
}
