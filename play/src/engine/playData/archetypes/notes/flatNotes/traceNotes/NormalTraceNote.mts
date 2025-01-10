import { windows } from "~/engine/playData/archetypes/windows.mjs";
import { buckets } from "~/engine/playData/buckets.mjs";
import { effect } from "~/engine/playData/effect.mjs";
import { particle } from "~/engine/playData/particle.mjs";
import { skin } from "~/engine/playData/skin.mjs";
import { TraceNote } from "./TraceNote.mjs";

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
