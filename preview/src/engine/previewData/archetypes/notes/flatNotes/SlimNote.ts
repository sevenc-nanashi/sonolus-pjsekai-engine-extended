import { note } from "../../../note.js";
import { panel } from "../../../panel.js";
import { getZ, layer } from "../../../skin.js";
import { Note } from "../Note.js";

export abstract class SlimNote extends Note {
  abstract sprites: {
    left: SkinSprite;
    middle: SkinSprite;
    right: SkinSprite;
    fallback: SkinSprite;
  };

layer = layer.note.body;

  render() {
    const time = bpmChanges.at(this.data.beat).time;
    const pos = panel.getPos(time);

    const z = getZ(this.layer, time, this.data.lane);

    const l = this.data.lane - this.data.size;
    const r = this.data.lane + this.data.size;
    const fb = -note.h / 2;
    const ft = note.h / 2;
    const b = -note.h;
    const t = note.h;

    if (this.useFallbackSprites) {
      this.sprites.fallback.draw(
        new Rect({ l, r, b: fb, t: ft }).add(pos),
        z,
        1,
      );
    } else {
      const ml = l + 0.125;
      const mr = r - 0.125;

      this.sprites.left.draw(new Rect({ l, r: ml, b, t }).add(pos), z, 1);
      this.sprites.middle.draw(new Rect({ l: ml, r: mr, b, t }).add(pos), z, 1);
      this.sprites.right.draw(new Rect({ l: mr, r, b, t }).add(pos), z, 1);
    }

    return { time, pos };
  }

  get useFallbackSprites() {
    return (
      !this.sprites.left.exists ||
      !this.sprites.middle.exists ||
      !this.sprites.right.exists
    );
  }
}
