import { archetypes } from "~/engine/watchData/archetypes/index.js";
import { effect } from "~/engine/watchData/effect.js";
import { particle } from "~/engine/watchData/particle.js";
import { skin } from "../../../../../skin.js";
import { FlatNote } from "../../FlatNote.js";

export class NonDirectionalTraceFlickNote extends FlatNote {
  sprites = {
    left: skin.sprites.traceFlickNoteLeft,
    middle: skin.sprites.traceFlickNoteMiddle,
    right: skin.sprites.traceFlickNoteRight,
    fallback: skin.sprites.traceFlickNoteFallback,
  };

  clips = {
    perfect: effect.clips.flickPerfect,
  };

  effects = {
    circular: particle.effects.flickNoteCircular,
    linear: particle.effects.flickNoteLinear,
  };

  get useFallbackSprites() {
    return (
      !this.sprites.left.exists ||
      !this.sprites.middle.exists ||
      !this.sprites.right.exists
    );
  }

  get slotEffect() {
    return archetypes.FlickSlotEffect;
  }

  get slotGlowEffect() {
    return archetypes.FlickSlotGlowEffect;
  }

  preprocess() {
    super.preprocess();
  }

  render() {
    super.render();
  }
}
