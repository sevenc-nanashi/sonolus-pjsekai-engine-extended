import { effect } from "../../../../effect.js";
import { particle } from "../../../../particle.js";
import { skin } from "../../../../skin.js";
import { archetypes } from "../../../index.js";
import { TraceNote } from "./TraceNote.js";

export class CriticalTraceSlideEndNote extends TraceNote {
  sprites = {
    left: skin.sprites.criticalTraceNoteLeft,
    middle: skin.sprites.criticalTraceNoteMiddle,
    right: skin.sprites.criticalTraceNoteRight,
    diamond: skin.sprites.criticalSlideTickNote,
    fallback: skin.sprites.criticalTraceNoteFallback,
  };

  clips = {
    perfect: effect.clips.criticalTrace,
    fallback: effect.clips.normalPerfect,
  };

  effects = {
    circular: particle.effects.criticalTraceNoteCircular,
    circularFallback: particle.effects.criticalSlideTickNote,
    linear: particle.effects.criticalTraceNoteLinear,
    linearFallback: particle.effects.criticalNoteLinear,
  };

  get slotEffect() {
    return archetypes.CriticalSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.CriticalSlotGlowEffect;
  }
}
