import { note } from "../../../../note.js";
import { scaledScreen } from "../../../../scaledScreen.js";
import { getZ, layer } from "../../../../skin.js";
import { FlatNote } from "../FlatNote.js";

export abstract class TraceNote extends FlatNote {
  abstract sprites: {
    left: SkinSprite;
    middle: SkinSprite;
    right: SkinSprite;
    diamond: SkinSprite;
    fallback: SkinSprite;
  };

  layer = layer.note.trace;

  diamondLayout = this.entityMemory(Rect);

  diamondZ = this.entityMemory(Number);

  get useFallbackSprites() {
    return (
      !this.sprites.left.exists ||
      !this.sprites.middle.exists ||
      !this.sprites.right.exists ||
      !this.sprites.diamond.exists
    );
  }

  globalInitialize() {
    super.globalInitialize();

    if (!this.useFallbackSprites) {
      const w = note.h / scaledScreen.wToH;

      new Rect({
        l: this.data.lane - w,
        r: this.data.lane + w,
        b: 1 + note.h,
        t: 1 - note.h,
      }).copyTo(this.diamondLayout);

      this.diamondZ = getZ(layer.note.tick, this.targetTime, this.data.lane);
    }
  }

  render() {
    super.render();

    if (!this.useFallbackSprites) {
      this.sprites.diamond.draw(
        this.diamondLayout.mul(this.y),
        this.diamondZ,
        1,
      );
    }
  }

  spawnSlotEffects() {
    /* noop */
  }
}
