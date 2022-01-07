import {
    bool,
    EntityMemory,
    GreaterOr,
    Multiply,
    Script,
    Time,
} from 'sonolus.js'
import {
    applyLevelSpeed,
    getSpawnTime,
    NoteData,
    noteSpawnTime,
    SpeedChangeData,
} from './common/note'
import { options } from '../../configuration/options'
import { ConnectorData } from './slide-connector'

export function speedChange(): Script {
    const futureSpeed = EntityMemory.to<number>(0)

    const preprocess = [
        applyLevelSpeed(SpeedChangeData.time),
        noteSpawnTime.set(
            getSpawnTime(
                SpeedChangeData.time,
                NoteData.headSharedMemory.noteSpeed
            )
        ),
        futureSpeed.set(Multiply(options.noteSpeed, SpeedChangeData.speed)),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const updateParallel = [
        bool(NoteData.headSharedMemory.noteSpeed.set(futureSpeed)),
        bool(ConnectorData.headSharedMemory.noteSpeed.set(futureSpeed)),
        bool(1),
    ]

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
