import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    data = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
        timeScaleGroup: { name: 'timeScaleGroup', type: Number },
        judgment: { name: EngineArchetypeDataName.Judgment, type: DataType<Judgment> },
        accuracy: { name: EngineArchetypeDataName.Accuracy, type: Number },
    })

    targetTime = this.entityMemory(Number)

    preprocess() {
        if (options.mirror) this.data.lane *= -1

        this.targetTime = bpmChanges.at(this.data.beat).time

        if (this.hasInput) this.result.time = this.targetTime
    }
}