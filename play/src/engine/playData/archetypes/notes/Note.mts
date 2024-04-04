import { EngineArchetypeDataName } from '@sonolus/core'
import { options } from '../../../configuration/options.mjs'

export abstract class Note extends Archetype {
    hasInput = true

    abstract leniency: number

    data = this.defineImport({
        beat: { name: EngineArchetypeDataName.Beat, type: Number },
        lane: { name: 'lane', type: Number },
        size: { name: 'size', type: Number },
        timeScaleGroup: { name: 'timeScaleGroup', type: Number },
    })

    targetTime = this.entityMemory(Number)

    spawnTime = this.entityMemory(Number)

    hitbox = this.entityMemory(Rect)
    fullHitbox = this.entityMemory(Rect)

    preprocess() {
        this.targetTime = bpmChanges.at(this.data.beat).time

        if (options.mirror) this.data.lane *= -1
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    updateSequentialOrder = 2

    static approach(fromTime: number, toTime: number, now: number) {
        return 1.06 ** (45 * Math.remap(fromTime, toTime, -1, 0, now))
    }

    static get duration() {
        return Math.lerp(0.35, 4, Math.unlerpClamped(12, 1, options.noteSpeed) ** 1.31)
    }
}