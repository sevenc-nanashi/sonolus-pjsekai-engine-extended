import { effect } from "../../effect.mjs";
import { particle } from "../../particle.mjs";
import { skin } from "../../skin.mjs";
import { archetypes } from "../index.mjs";
import { SlideConnector } from "./SlideConnector.mjs";

export class NormalSlideConnector extends SlideConnector {
  sprites = {
    connector: {
      normal: skin.sprites.normalSlideConnectorNormal,
      active: skin.sprites.normalSlideConnectorActive,
      fallback: skin.sprites.normalSlideConnectorFallback,
    },

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

  zOrder = 0;

  clips = {
    hold: effect.clips.normalHold,
    fallback: effect.clips.normalHold,
  };

  effects = {
    circular: particle.effects.normalSlideConnectorCircular,
    linear: particle.effects.normalSlideConnectorLinear,
  };

  get slideStartNote() {
    return archetypes.NormalSlideStartNote;
  }
}
