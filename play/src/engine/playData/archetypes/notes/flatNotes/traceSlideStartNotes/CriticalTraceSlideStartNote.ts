import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "~/engine/playData/skin.js";
import { archetypes } from "../../../index.js";
import { TraceSlideStartNote } from "./TraceSlideStartNote.js";

export class CriticalTraceSlideStartNote extends TraceSlideStartNote {
  sprites = {
    left: skin.sprites.criticalTraceNoteLeft,
    middle: skin.sprites.criticalTraceNoteMiddle,
    right: skin.sprites.criticalTraceNoteRight,
    fallback: skin.sprites.criticalNoteFallback,
  };

  tickSprites = {
    tick: skin.sprites.criticalSlideTickNote,
    fallback: skin.sprites.criticalSlideTickNoteFallback,
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
