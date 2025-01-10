type Archetypes = {
  TimeScaleGroup: {
    data: {
      get: (index: number) => {
        firstRef: any;
        length: any;
      };
    };
    sharedMemory: {
      get: (index: number) => {
        currentTime: any;
        currentScaledTime: any;
      };
    };
  };
  TimeScaleChange: {
    data: {
      get: (index: number) => {
        beat: number;
        timeScale: number;
        nextRef: number;
      };
    };
  };
};
type BpmChanges = {
  at: (beat: number) => { time: number };
};

export const baseTimeToScaledTime = (
  archetypes: Archetypes,
  bpmChanges: BpmChanges,
  baseTime: number,
  tsGroup: number,
  noCache?: boolean,
): number => {
  const tsGroupSharedMemory =
    archetypes.TimeScaleGroup.sharedMemory.get(tsGroup);
  if (!noCache && baseTime === tsGroupSharedMemory.currentTime) {
    return tsGroupSharedMemory.currentScaledTime;
  }

  const tsGroupEntity = archetypes.TimeScaleGroup.data.get(tsGroup);
  let ret = 0;
  let nextRef = tsGroupEntity.firstRef;
  for (let i = 0; i < tsGroupEntity.length; i++) {
    const tsChangeStart = archetypes.TimeScaleChange.data.get(nextRef);
    const tsChangeStartTime = bpmChanges.at(tsChangeStart.beat).time;
    if (i === 0) {
      if (baseTime < tsChangeStartTime) {
        return baseTime;
      }
      ret = tsChangeStartTime;
    }
    if (i === tsGroupEntity.length - 1) {
      return ret + (baseTime - tsChangeStartTime) * tsChangeStart.timeScale;
    }
    nextRef = tsChangeStart.nextRef;
    const tsChangeEnd = archetypes.TimeScaleChange.data.get(nextRef);
    const tsChangeEndTime = bpmChanges.at(tsChangeEnd.beat).time;

    if (baseTime < tsChangeEndTime) {
      return ret + (baseTime - tsChangeStartTime) * tsChangeStart.timeScale;
    }
    const timeDiff = tsChangeEndTime - tsChangeStartTime;
    ret += timeDiff * tsChangeStart.timeScale;
  }
  return baseTime;
};

export const baseScaledTimeToEarliestTime = (
  archetypes: Archetypes,
  bpmChanges: BpmChanges,
  time: number,
  tsGroup: number,
): number => {
  // if (tsGroup === 0) {
  //     return time
  // }
  const tsGroupEntity = archetypes.TimeScaleGroup.data.get(tsGroup);
  let nextRef = tsGroupEntity.firstRef;
  let currentTime = 0;
  for (let i = 0; i < tsGroupEntity.length; i++) {
    const tsChangeStart = archetypes.TimeScaleChange.data.get(nextRef);
    const tsChangeStartTime = bpmChanges.at(tsChangeStart.beat).time;
    if (i === 0) {
      if (time < tsChangeStartTime) {
        return time;
      }
      currentTime = tsChangeStartTime;
    }
    if (i === tsGroupEntity.length - 1) {
      return tsChangeStartTime + (time - currentTime) / tsChangeStart.timeScale;
    }
    nextRef = tsChangeStart.nextRef;
    const tsChangeEnd = archetypes.TimeScaleChange.data.get(nextRef);
    const tsChangeEndTime = bpmChanges.at(tsChangeEnd.beat).time;

    const timeDiff = tsChangeEndTime - tsChangeStartTime;
    if (time <= currentTime + timeDiff * tsChangeStart.timeScale) {
      return tsChangeStartTime + (time - currentTime) / tsChangeStart.timeScale;
    }
    currentTime += timeDiff * tsChangeStart.timeScale;
  }
  return time;
};
