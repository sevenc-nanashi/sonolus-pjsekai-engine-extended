import { bool, EntityMemory, GreaterOr, Script, Time } from 'sonolus.js'
import {
    applyLevelSpeed,
    getSpawnTime,
    NoteData,
    noteSpawnTime,
    SpeedChangeData,
} from './common/note'
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
        futureSpeed.set(SpeedChangeData.speed),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const updateSequential = [
        NoteData.headSharedMemory.noteSpeed.set(futureSpeed),
        ConnectorData.headSharedMemory.noteSpeed.set(futureSpeed),
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
        updateSequential: {
            code: updateSequential,
        },
    }
}
