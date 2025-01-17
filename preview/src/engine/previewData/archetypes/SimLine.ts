import { options } from "../../configuration/options.js";
import { note } from "../note.js";
import { panel } from "../panel.js";
import { getZ, layer, skin } from "../skin.js";
import { archetypes } from "./index.js";

export class SimLine extends Archetype {
  data = this.defineImport({
    aRef: { name: "a", type: Number },
    bRef: { name: "b", type: Number },
  });

  render() {
    if (!options.simLineEnabled) return;

    let l = this.aData.lane;
    let r = this.bData.lane;
    if (l > r) [l, r] = [r, l];

    const time = bpmChanges.at(this.aData.beat).time;
    const pos = panel.getPos(time);

    const z = getZ(layer.simLine, time, l);

    const b = -note.h;
    const t = note.h;

    skin.sprites.simLine.draw(new Rect({ l, r, b, t }).add(pos), z, 1);
  }

  get aData() {
    return archetypes.NormalTapNote.data.get(this.data.aRef);
  }

  get bData() {
    return archetypes.NormalTapNote.data.get(this.data.bRef);
  }
}
