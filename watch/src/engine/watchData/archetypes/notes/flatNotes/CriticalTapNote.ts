import { effect } from "../../../effect.js";
import { particle } from "../../../particle.js";
import { skin } from "../../../skin.js";
import { archetypes } from "../../index.js";
import { FlatNote } from "./FlatNote.js";

export class CriticalTapNote extends FlatNote {
  sprites = {
    left: skin.sprites.criticalNoteLeft,
    middle: skin.sprites.criticalNoteMiddle,
    right: skin.sprites.criticalNoteRight,
    fallback: skin.sprites.criticalNoteFallback,
  };

  clips = {
    perfect: effect.clips.criticalTap,
    fallback: effect.clips.normalPerfect,
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
