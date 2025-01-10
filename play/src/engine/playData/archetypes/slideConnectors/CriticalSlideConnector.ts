import { effect } from "../../effect.js";
import { particle } from "../../particle.js";
import { skin } from "../../skin.js";
import { archetypes } from "../index.js";
import { SlideConnector } from "./SlideConnector.js";

export class CriticalSlideConnector extends SlideConnector {
  sprites = {
    connector: {
      normal: skin.sprites.criticalSlideConnectorNormal,
      active: skin.sprites.criticalSlideConnectorActive,
      fallback: skin.sprites.criticalSlideConnectorFallback,
    },

    slide: {
      left: skin.sprites.criticalNoteLeft,
      middle: skin.sprites.criticalNoteMiddle,
      right: skin.sprites.criticalNoteRight,
      fallback: skin.sprites.criticalNoteFallback,
    },

    traceSlide: {
      left: skin.sprites.criticalTraceNoteLeft,
      middle: skin.sprites.criticalTraceNoteMiddle,
      right: skin.sprites.criticalTraceNoteRight,
      fallback: skin.sprites.criticalTraceNoteFallback,
    },
    traceSlideTick: {
      tick: skin.sprites.criticalSlideTickNote,
      fallback: skin.sprites.criticalSlideTickNoteFallback,
    },
  };

  zOrder = 5;

  clips = {
    hold: effect.clips.criticalHold,
    fallback: effect.clips.normalHold,
  };

  effects = {
    circular: particle.effects.criticalSlideConnectorCircular,
    linear: particle.effects.criticalSlideConnectorLinear,
  };

  get slideStartNote() {
    return archetypes.CriticalSlideStartNote;
  }
}
