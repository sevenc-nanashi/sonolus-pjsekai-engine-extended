import { approach } from '../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { getZ, layer, skin } from '../skin.mjs'
import { archetypes } from './index.mjs'
import { scaledTimeToEarliestTime, timeToScaledTime } from './timeScale.mjs'

export class SimLine extends Archetype {
    data = this.defineImport({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    timeScaleGroup = this.entityMemory({
        a: Number,
        b: Number,
    })

    targetTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        aMin: Number,
        aMax: Number,
        bMin: Number,
        bMax: Number,
        hidden: Number,
    })

    initialized = this.entityMemory(Boolean)

    spriteLayout = this.entityMemory(Quad)

    z = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        this.targetTime = bpmChanges.at(this.aData.beat).time
        this.timeScaleGroup.a = this.aData.timeScaleGroup
        this.timeScaleGroup.b = this.bData.timeScaleGroup

        this.visualTime.aMax = timeToScaledTime(this.targetTime, this.timeScaleGroup.a)
        this.visualTime.aMin = this.visualTime.aMax - note.duration

        this.visualTime.bMax = timeToScaledTime(this.targetTime, this.timeScaleGroup.b)
        this.visualTime.bMin = this.visualTime.bMax - note.duration
    }

    spawnTime() {
        return Math.max(
            scaledTimeToEarliestTime(this.visualTime.aMin, this.timeScaleGroup.a),
            scaledTimeToEarliestTime(this.visualTime.bMin, this.timeScaleGroup.b)
        )
    }

    despawnTime() {
        return this.targetTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return

        this.render()
    }

    get aData() {
        return archetypes.NormalTapNote.data.get(this.data.aRef)
    }

    get bData() {
        return archetypes.NormalTapNote.data.get(this.data.bRef)
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden =
                Math.min(this.visualTime.aMax, this.visualTime.bMax) -
                note.duration * options.hidden

        let l = this.aData.lane
        let r = this.bData.lane
        if (l > r) [l, r] = [r, l]

        const b = 1 + note.h
        const t = 1 - note.h

        perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)

        this.z = getZ(layer.simLine, this.spawnTime(), (l + r) / 2)
    }

    render() {
        const aY = approach(
            this.visualTime.aMin,
            this.visualTime.aMax,
            timeToScaledTime(time.now, this.timeScaleGroup.a)
        )
        const bY = approach(
            this.visualTime.bMin,
            this.visualTime.bMax,
            timeToScaledTime(time.now, this.timeScaleGroup.b)
        )

        if (aY < 0 || bY > 1 || aY > 1 || bY < 0) return

        const aLayout = this.spriteLayout.mul(aY)
        const bLayout = this.spriteLayout.mul(bY)

        if (this.aData.lane < this.bData.lane) {
            skin.sprites.simLine.draw(
                {
                    x1: aLayout.x1,
                    y1: aLayout.y1,
                    x2: aLayout.x2,
                    y2: aLayout.y2,
                    x3: bLayout.x3,
                    y3: bLayout.y3,
                    x4: bLayout.x4,
                    y4: bLayout.y4,
                },
                this.z,
                1
            )
        } else {
            skin.sprites.simLine.draw(
                {
                    x1: bLayout.x1,
                    y1: bLayout.y1,
                    x2: bLayout.x2,
                    y2: bLayout.y2,
                    x3: aLayout.x3,
                    y3: aLayout.y3,
                    x4: aLayout.x4,
                    y4: aLayout.y4,
                },
                this.z,
                1
            )
        }
    }
}
