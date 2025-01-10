import { buckets } from "~/engine/playData/buckets.js";
import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "../../../../skin.js";
import { windows } from "../../../windows.js";
import { DirectionalTraceFlickNote } from "./DirectionalTraceFlickNote.js";

export class CriticalTraceFlickNote extends DirectionalTraceFlickNote {
  sprites = {
    left: skin.sprites.criticalTraceNoteLeft,
    middle: skin.sprites.criticalTraceNoteMiddle,
    right: skin.sprites.criticalTraceNoteRight,
    fallback: skin.sprites.criticalNoteFallback,
  };

  clips = {
    perfect: effect.clips.criticalFlick,
  };

  tickSprites = {
    tick: skin.sprites.criticalSlideTickNote,
    fallback: skin.sprites.criticalSlideTickNoteFallback,
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

  windows = windows.flickNote.critical;

  bucket = buckets.criticalFlickNote;
}
