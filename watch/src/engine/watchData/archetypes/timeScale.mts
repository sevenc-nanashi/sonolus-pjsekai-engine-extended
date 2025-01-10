import {
  baseScaledTimeToEarliestTime,
  baseTimeToScaledTime,
} from "~shared/engine/data/timeScale.mjs";
import { archetypes } from "./index.mjs";

export const scaledTimeToEarliestTime = (
  baseTime: number,
  tsGroup: number,
): number =>
  baseScaledTimeToEarliestTime(archetypes, bpmChanges, baseTime, tsGroup);
export const timeToScaledTime = (
  baseTime: number,
  tsGroup: number,
  noCache?: boolean,
): number =>
  baseTimeToScaledTime(archetypes, bpmChanges, baseTime, tsGroup, noCache);
