import { buckets } from "~/engine/playData/buckets.mjs";
import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "../../../../skin.mjs";
import { windows } from "../../../windows.mjs";
import { DirectionalTraceFlickNote } from "./DirectionalTraceFlickNote.mjs";

export class NormalTraceFlickNote extends DirectionalTraceFlickNote {
  sprites = {
    left: skin.sprites.traceFlickNoteLeft,
    middle: skin.sprites.traceFlickNoteMiddle,
    right: skin.sprites.traceFlickNoteRight,
    fallback: skin.sprites.flickNoteFallback,
  };

  tickSprites = {
    tick: skin.sprites.traceFlickTickNote,
    fallback: skin.sprites.traceFlickTickNoteFallback,
  };

  clips = {
    perfect: effect.clips.flickPerfect,
  };

  effects = {
    circular: particle.effects.flickNoteCircular,
    linear: particle.effects.flickNoteLinear,
  };
  arrowSprites = {
    up: [
      skin.sprites.flickArrowUp1,
      skin.sprites.flickArrowUp2,
      skin.sprites.flickArrowUp3,
      skin.sprites.flickArrowUp4,
      skin.sprites.flickArrowUp5,
      skin.sprites.flickArrowUp6,
    ],
    left: [
      skin.sprites.flickArrowLeft1,
      skin.sprites.flickArrowLeft2,
      skin.sprites.flickArrowLeft3,
      skin.sprites.flickArrowLeft4,
      skin.sprites.flickArrowLeft5,
      skin.sprites.flickArrowLeft6,
    ],
    fallback: skin.sprites.flickArrowFallback,
  };

  directionalEffect = particle.effects.flickNoteDirectional;

  windows = windows.flickNote.normal;

  bucket = buckets.normalFlickNote;
}
