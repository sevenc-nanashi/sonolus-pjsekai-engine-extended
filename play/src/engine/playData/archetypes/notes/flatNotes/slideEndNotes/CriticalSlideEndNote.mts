import { buckets } from "../../../../buckets.mjs";
import { effect } from "../../../../effect.mjs";
import { particle } from "../../../../particle.mjs";
import { skin } from "../../../../skin.mjs";
import { archetypes } from "../../../index.mjs";
import { windows } from "../../../windows.mjs";
import { SlideEndNote } from "./SlideEndNote.mjs";

export class CriticalSlideEndNote extends SlideEndNote {
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

  windows = windows.slideEndNote.critical;

  bucket = buckets.criticalSlideEndNote;

  get slotEffect() {
    return archetypes.CriticalSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.CriticalSlotGlowEffect;
  }
}
