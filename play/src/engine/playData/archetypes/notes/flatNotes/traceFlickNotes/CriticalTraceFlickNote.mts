import { buckets } from "~/engine/playData/buckets.mjs";
import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "../../../../skin.mjs";
import { windows } from "../../../windows.mjs";
import { DirectionalTraceFlickNote } from "./DirectionalTraceFlickNote.mjs";

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
