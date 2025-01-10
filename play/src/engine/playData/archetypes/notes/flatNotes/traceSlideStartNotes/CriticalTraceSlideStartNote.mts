import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "~/engine/playData/skin.mjs";
import { archetypes } from "../../../index.mjs";
import { TraceSlideStartNote } from "./TraceSlideStartNote.mjs";

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
    circular: particle.effects.criticalNoteCircular,
    linear: particle.effects.criticalNoteLinear,
  };

  get slotEffect() {
    return archetypes.CriticalSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.CriticalSlotGlowEffect;
  }
}
