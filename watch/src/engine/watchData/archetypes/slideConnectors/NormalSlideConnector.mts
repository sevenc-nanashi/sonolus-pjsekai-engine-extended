import { effect } from "../../effect.mjs";
import { particle } from "../../particle.mjs";
import { skin } from "../../skin.mjs";
import { archetypes } from "../index.mjs";
import { SlideConnector } from "./SlideConnector.mjs";

export class NormalSlideConnector extends SlideConnector {
  sprites = {
    normal: skin.sprites.normalActiveSlideConnectorNormal,
    active: skin.sprites.normalActiveSlideConnectorActive,
    fallback: skin.sprites.normalActiveSlideConnectorFallback,

    slide: {
      left: skin.sprites.slideNoteLeft,
      middle: skin.sprites.slideNoteMiddle,
      right: skin.sprites.slideNoteRight,
      fallback: skin.sprites.slideNoteFallback,
    },
    traceSlide: {
      left: skin.sprites.normalTraceNoteLeft,
      middle: skin.sprites.normalTraceNoteMiddle,
      right: skin.sprites.normalTraceNoteRight,
      fallback: skin.sprites.slideNoteFallback,
    },
    traceSlideTick: {
      tick: skin.sprites.normalSlideTickNote,
      fallback: skin.sprites.normalSlideTickNoteFallback,
    },
  };

  clips = {
    hold: effect.clips.normalHold,
    fallback: effect.clips.normalHold,
  };

  effects = {
    circular: particle.effects.normalSlideConnectorCircular,
    linear: particle.effects.normalSlideConnectorLinear,
  };

  zOrder = 1;

  get slideStartNote() {
    return archetypes.NormalSlideStartNote;
  }
}
