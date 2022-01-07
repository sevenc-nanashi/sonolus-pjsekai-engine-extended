import {
    bool,
    EntityMemory,
    GreaterOr,
    Multiply,
    Or,
    Script,
    Time,
} from 'sonolus.js'
import {
    applyLevelSpeed,
    getSpawnTime,
    noteSpawnTime,
    SpeedChangeData,
} from './common/note'
import { options } from '../../configuration/options'

export function speedChange(): Script {
    const futureSpeed = EntityMemory.to<number>(0)

    const preprocess = [
        applyLevelSpeed(SpeedChangeData.time),
        noteSpawnTime.set(getSpawnTime(SpeedChangeData.time)),
        futureSpeed.set(Multiply(options.noteSpeed, SpeedChangeData.speed)),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const updateParallel = Or(
        bool(SpeedChangeData.headSharedMemory.noteSpeed.set(futureSpeed)),
        bool(1)
    )

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        updateParallel: {
            code: updateParallel,
        },
    }
}
