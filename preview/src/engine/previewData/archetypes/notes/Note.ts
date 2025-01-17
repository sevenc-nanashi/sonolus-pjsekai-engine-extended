import { EngineArchetypeDataName } from "@sonolus/core";
import { options } from "../../../configuration/options.js";
import { chart } from "../../chart.js";

export abstract class Note extends Archetype {
  data = this.defineImport({
    beat: { name: EngineArchetypeDataName.Beat, type: Number },
    lane: { name: "lane", type: Number },
    size: { name: "size", type: Number },
  });

  preprocess() {
    chart.beats = Math.max(chart.beats, this.data.beat);
    chart.duration = Math.max(
      chart.duration,
      bpmChanges.at(this.data.beat).time,
    );

    if (options.mirror) this.data.lane *= -1;
  }
}
