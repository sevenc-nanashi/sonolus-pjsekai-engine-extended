import { note } from "../../../../note.mjs";
import { panel } from "../../../../panel.mjs";
import { scaledScreen } from "../../../../scaledScreen.mjs";
import { getZ, layer } from "../../../../skin.mjs";
import { SlimNote } from "../SlimNote.mjs";

export abstract class TraceNote extends SlimNote {
  abstract tickSprites: {
    tick: SkinSprite;
    fallback: SkinSprite;
  };

  render() {
    super.render();
    const time = bpmChanges.at(this.data.beat).time;
    const pos = panel.getPos(time);

    const z = getZ(layer.note.body, time, this.data.lane) + 1;

    const b = -note.h;
    const t = note.h;

    if (this.useFallbackTickSprite) {
      const l = this.data.lane - this.data.size;
      const r = this.data.lane + this.data.size;

      this.tickSprites.fallback.draw(new Rect({ l, r, b, t }).add(pos), z, 1);
    } else {
      const w = note.h / scaledScreen.wToH;

      const l = this.data.lane - w;
      const r = this.data.lane + w;

      this.tickSprites.tick.draw(new Rect({ l, r, b, t }).add(pos), z, 1);
    }

    return { time, pos };
  }

  get useFallbackTickSprite() {
    return !this.tickSprites.tick.exists;
  }
}
