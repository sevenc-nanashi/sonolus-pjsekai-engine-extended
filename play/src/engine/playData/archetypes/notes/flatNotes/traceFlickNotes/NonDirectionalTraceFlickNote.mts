import { buckets } from "~/engine/playData/buckets.mjs";
import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "../../../../skin.mjs";
import { archetypes } from "../../../index.mjs";
import { windows } from "../../../windows.mjs";
import { TraceFlickNote } from "./TraceFlickNote.mjs";

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
