import { archetypes } from "../../index.js";
import { ease } from "../../slideConnectors/EaseType.js";
import { timeToScaledTime } from "../../utils.js";

export const getAttached = (ref: number, targetTime: number) => {
  const attachData = archetypes.NormalSlideConnector.data.get(ref);

  const data = {
    head: archetypes.NormalSlideStartNote.data.get(attachData.headRef),
    tail: archetypes.NormalSlideStartNote.data.get(attachData.tailRef),
  };

  const t = {
    min: bpmChanges.at(data.head.beat).time,
    max: bpmChanges.at(data.tail.beat).time,
  };

  const st = {
    min: timeToScaledTime(t.min, data.head.timeScaleGroup),
    max: timeToScaledTime(t.max, data.tail.timeScaleGroup),
    tick: timeToScaledTime(targetTime, data.head.timeScaleGroup),
  };

  const s = ease(attachData.ease, Math.unlerpClamped(st.min, st.max, st.tick));

  return {
    lane: Math.lerp(data.head.lane, data.tail.lane, s),
    size: Math.lerp(data.head.size, data.tail.size, s),
  };
};
