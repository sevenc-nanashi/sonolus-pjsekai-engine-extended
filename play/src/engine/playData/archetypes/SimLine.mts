import { options } from '../../configuration/options.mjs'
import { skin } from '../skin.mjs'
import { note } from './constants.mjs'
import { archetypes } from './index.mjs'
import { layer } from './layer.mjs'
import { Note } from './notes/Note.mjs'
import { getZ, perspectiveLayout, scaledTimeToEarliestTime, timeToScaledTime } from './utils.mjs'

export class SimLine extends Archetype {
    data = this.defineImport({
        aRef: { name: 'a', type: Number },
        bRef: { name: 'b', type: Number },
    })

    leftTargetTime = this.entityMemory(Number)
    leftTimeScaleGroup = this.entityMemory(Number)

    leftVisualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    rightTargetTime = this.entityMemory(Number)
    rightTimeScaleGroup = this.entityMemory(Number)

    rightVisualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    spawnTime = this.entityMemory(Number)

    spriteLayout = this.entityMemory(Quad)

    z = this.entityMemory(Number)

    preprocess() {
        if (!options.simLineEnabled) return

        const l = this.aData
        const r = this.bData
        if (l.lane > r.lane) {
            this.leftTargetTime = bpmChanges.at(r.beat).time
            this.rightTargetTime = bpmChanges.at(l.beat).time
            this.leftTimeScaleGroup = r.timeScaleGroup
            this.rightTimeScaleGroup = l.timeScaleGroup
        } else {
            this.leftTargetTime = bpmChanges.at(l.beat).time
            this.rightTargetTime = bpmChanges.at(r.beat).time
            this.leftTimeScaleGroup = l.timeScaleGroup
            this.rightTimeScaleGroup = r.timeScaleGroup
        }

        this.leftVisualTime.max = timeToScaledTime(this.leftTargetTime, this.leftTimeScaleGroup)
        this.leftVisualTime.min = this.leftVisualTime.max - Note.duration

        this.rightVisualTime.max = timeToScaledTime(this.rightTargetTime, this.rightTimeScaleGroup)
        this.rightVisualTime.min = this.rightVisualTime.max - Note.duration

        this.spawnTime = Math.max(
            scaledTimeToEarliestTime(this.leftVisualTime.min, this.leftTimeScaleGroup),
            scaledTimeToEarliestTime(this.rightVisualTime.min, this.rightTimeScaleGroup)
        )
    }

    spawnOrder() {
        if (!options.simLineEnabled) return 0

        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        if (!options.simLineEnabled) return true

        return time.now >= this.spawnTime
    }

    initialize() {
        if (!options.simLineEnabled) {
            this.despawn = true
            return
        }
        if (options.hidden > 0)
            this.leftVisualTime.hidden = this.leftVisualTime.max - Note.duration * options.hidden

        let l = this.aData.lane
        let r = this.bData.lane
        if (l > r) [l, r] = [r, l]

        const b = 1 + note.h
        const t = 1 - note.h

        perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayout)

        this.z = getZ(layer.simLine, this.leftTargetTime, l)
    }

    updateParallel() {
        if (
            this.aInfo.state === EntityState.Despawned ||
            this.bInfo.state === EntityState.Despawned
        )
            this.despawn = true
        if (this.despawn) return

        if (options.hidden > 0 && time.now > this.leftVisualTime.hidden) return

        this.render()
    }

    get aData() {
        return archetypes.NormalTapNote.data.get(this.data.aRef)
    }

    get aInfo() {
        return entityInfos.get(this.data.aRef)
    }

    get bData() {
        return archetypes.NormalTapNote.data.get(this.data.bRef)
    }

    get bInfo() {
        return entityInfos.get(this.data.bRef)
    }

    render() {
        if (!options.showNotes) return
        if (
            this.leftVisualTime.min > timeToScaledTime(time.now, this.leftTimeScaleGroup) ||
            this.rightVisualTime.min > timeToScaledTime(time.now, this.rightTimeScaleGroup)
        ) {
            return
        }
        const leftY = Note.approach(
            this.leftVisualTime.min,
            this.leftVisualTime.max,
            timeToScaledTime(time.now, this.leftTimeScaleGroup)
        )
        const rightY = Note.approach(
            this.rightVisualTime.min,
            this.rightVisualTime.max,
            timeToScaledTime(time.now, this.rightTimeScaleGroup)
        )
        if (leftY > 1 || rightY > 1 || leftY < 0 || rightY < 0) return
        const leftLayout = this.spriteLayout.mul(leftY)
        const rightLayout = this.spriteLayout.mul(rightY)

        skin.sprites.simLine.draw(
            {
                x1: leftLayout.x1,
                y1: leftLayout.y1,
                x2: leftLayout.x2,
                y2: leftLayout.y2,
                x3: rightLayout.x3,
                y3: rightLayout.y3,
                x4: rightLayout.x4,
                y4: rightLayout.y4,
            },
            this.z,
            1
        )
    }
}
