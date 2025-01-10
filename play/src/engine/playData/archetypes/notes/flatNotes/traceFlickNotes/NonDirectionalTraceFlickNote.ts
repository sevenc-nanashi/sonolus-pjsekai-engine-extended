import { buckets } from "~/engine/playData/buckets.js";
import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "../../../../skin.js";
import { archetypes } from "../../../index.js";
import { windows } from "../../../windows.js";
import { TraceFlickNote } from "./TraceFlickNote.js";

export class NonDirectionalTraceFlickNote extends TraceFlickNote {
  sprites = {
    left: skin.sprites.traceFlickNoteLeft,
    middle: skin.sprites.traceFlickNoteMiddle,
    right: skin.sprites.traceFlickNoteRight,
    fallback: skin.sprites.flickNoteFallback,
  };

  clips = {
    perfect: effect.clips.flickPerfect,
  };

  effects = {
    circular: particle.effects.flickNoteCircular,
    linear: particle.effects.flickNoteLinear,
  };

  windows = windows.flickNote.normal;

  bucket = buckets.normalFlickNote;

  get slotEffect() {
    return archetypes.FlickSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.FlickSlotGlowEffect;
  }
}
