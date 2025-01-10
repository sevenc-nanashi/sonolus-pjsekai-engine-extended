import { effect } from "../../../../effect.js";
import { particle } from "../../../../particle.js";
import { skin } from "../../../../skin.js";
import { archetypes } from "../../../index.js";
import { FlickNote } from "./FlickNote.js";

export class CriticalSlideEndFlickNote extends FlickNote {
  sprites = {
    left: skin.sprites.criticalNoteLeft,
    middle: skin.sprites.criticalNoteMiddle,
    right: skin.sprites.criticalNoteRight,
    fallback: skin.sprites.criticalNoteEndFallback,
  };

  clips = {
    perfect: effect.clips.criticalFlick,
    fallback: effect.clips.flickPerfect,
  };

  effects = {
    circular: particle.effects.criticalNoteCircular,
    linear: particle.effects.criticalNoteLinear,
  };

  arrowSprites = {
    up: [
      skin.sprites.criticalArrowUp1,
      skin.sprites.criticalArrowUp2,
      skin.sprites.criticalArrowUp3,
      skin.sprites.criticalArrowUp4,
      skin.sprites.criticalArrowUp5,
      skin.sprites.criticalArrowUp6,
    ],
    left: [
      skin.sprites.criticalArrowLeft1,
      skin.sprites.criticalArrowLeft2,
      skin.sprites.criticalArrowLeft3,
      skin.sprites.criticalArrowLeft4,
      skin.sprites.criticalArrowLeft5,
      skin.sprites.criticalArrowLeft6,
    ],
    fallback: skin.sprites.criticalArrowFallback,
  };

  directionalEffect = particle.effects.criticalNoteDirectional;

  get slotEffect() {
    return archetypes.CriticalSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.CriticalSlotGlowEffect;
  }
}