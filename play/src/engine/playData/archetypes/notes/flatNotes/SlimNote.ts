import { note } from "~/engine/playData/archetypes/constants.js";
import { perspectiveLayout } from "~/engine/playData/archetypes/utils.js";
import { FlatNote } from "./FlatNote.js";

export abstract class SlimNote extends FlatNote {
  setLayout({ l, r }: { l: number; r: number }) {
    const fb = 1 + note.h / 2;
    const ft = 1 - note.h / 2;
    const b = 1 + note.h;
    const t = 1 - note.h;

    if (this.useFallbackSprites) {
      perspectiveLayout({ l, r, b: fb, t: ft }).copyTo(
        this.spriteLayouts.middle,
      );
    } else {
      const ml = l + 0.125;
      const mr = r - 0.125;

      perspectiveLayout({ l, r: ml, b, t }).copyTo(this.spriteLayouts.left);
      perspectiveLayout({ l: ml, r: mr, b, t }).copyTo(
        this.spriteLayouts.middle,
      );
      perspectiveLayout({ l: mr, r, b, t }).copyTo(this.spriteLayouts.right);
    }
  }
}
