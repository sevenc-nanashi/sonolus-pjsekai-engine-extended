import { windows } from "~/engine/playData/archetypes/windows.js";
import { buckets } from "~/engine/playData/buckets.js";
import { effect } from "~/engine/playData/effect.js";
import { particle } from "~/engine/playData/particle.js";
import { skin } from "~/engine/playData/skin.js";
import { TraceNote } from "./TraceNote.js";

export class NormalTraceNote extends TraceNote {
  sprites = {
    left: skin.sprites.normalTraceNoteLeft,
    middle: skin.sprites.normalTraceNoteMiddle,
    right: skin.sprites.normalTraceNoteRight,
    fallback: skin.sprites.slideNoteFallback,
  };

  tickSprites = {
    tick: skin.sprites.normalSlideTickNote,
    fallback: skin.sprites.normalSlideTickNoteFallback,
  };

  clips = {
    perfect: effect.clips.normalTrace,
    fallback: effect.clips.normalPerfect,
  };

  effects = {
    circular: particle.effects.slideNoteCircular,
    linear: particle.effects.slideNoteLinear,
  };

  windows = windows.tapNote.normal;

  bucket = buckets.normalTraceNote;
}
