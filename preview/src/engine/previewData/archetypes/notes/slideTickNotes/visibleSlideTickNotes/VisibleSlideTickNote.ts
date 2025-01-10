import { note } from "../../../../note.js";
import { panel } from "../../../../panel.js";
import { scaledScreen } from "../../../../scaledScreen.js";
import { getZ, layer } from "../../../../skin.js";
import { SlideTickNote } from "../SlideTickNote.js";

export abstract class VisibleSlideTickNote extends SlideTickNote {
  abstract sprites: {
    tick: SkinSprite;
    fallback: SkinSprite;
  };

  render() {
    const time = bpmChanges.at(this.data.beat).time;
    const pos = panel.getPos(time);

    const z = getZ(layer.note.body, time, this.data.lane);

    const b = -note.h;
    const t = note.h;

    if (this.useFallbackSprite) {
      const l = this.data.lane - this.data.size;
      const r = this.data.lane + this.data.size;

      this.sprites.fallback.draw(new Rect({ l, r, b, t }).add(pos), z, 1);
    } else {
      const w = note.h / scaledScreen.wToH;

      const l = this.data.lane - w;
      const r = this.data.lane + w;

      this.sprites.tick.draw(new Rect({ l, r, b, t }).add(pos), z, 1);
    }
  }

  get useFallbackSprite() {
    return !this.sprites.tick.exists;
  }
}
