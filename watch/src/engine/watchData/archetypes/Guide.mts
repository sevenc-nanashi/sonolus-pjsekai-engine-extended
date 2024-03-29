import { Color } from '../../../../../shared/src/engine/data/Color.mjs'
import { EaseType, ease } from '../../../../../shared/src/engine/data/EaseType.mjs'
import { FadeType } from '../../../../../shared/src/engine/data/FadeType.mjs'
import { approach } from '../../../../../shared/src/engine/data/note.mjs'
import { options } from '../../configuration/options.mjs'
import { note } from '../note.mjs'
import { getZwithLayer, layer, skin } from '../skin.mjs'
import { scaledTimeToEarliestTime, timeToScaledTime } from './timeScale.mjs'

export class Guide extends Archetype {
    data = this.defineImport({
        startLane: { name: 'startLane', type: Number },
        startSize: { name: 'startSize', type: Number },
        startBeat: { name: 'startBeat', type: Number },
        startTimeScaleGroup: { name: 'startTimeScaleGroup', type: Number },

        headLane: { name: 'headLane', type: Number },
        headSize: { name: 'headSize', type: Number },
        headBeat: { name: 'headBeat', type: Number },
        headTimeScaleGroup: { name: 'headTimeScaleGroup', type: Number },

        tailLane: { name: 'tailLane', type: Number },
        tailSize: { name: 'tailSize', type: Number },
        tailBeat: { name: 'tailBeat', type: Number },
        tailTimeScaleGroup: { name: 'tailTimeScaleGroup', type: Number },

        endLane: { name: 'endLane', type: Number },
        endSize: { name: 'endSize', type: Number },
        endBeat: { name: 'endBeat', type: Number },
        endTimeScaleGroup: { name: 'endTimeScaleGroup', type: Number },

        ease: { name: 'ease', type: DataType<EaseType> },
        fade: { name: 'fade', type: DataType<FadeType> },
        color: { name: 'color', type: DataType<Color> },
    })

    initialized = this.entityMemory(Boolean)

    start = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })
    head = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })
    tail = this.entityMemory({
        time: Number,
        lane: Number,
        scaledTime: Number,

        l: Number,
        r: Number,
    })
    end = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })

    visualTime = this.entityMemory({
        min: Number,
        hidden: Number,
    })

    z = this.entityMemory(Number)

    spawnTime() {
        const spawnTime = Math.min(this.visualTime.min, this.head.scaledTime)

        return Math.min(
            scaledTimeToEarliestTime(spawnTime, this.data.headTimeScaleGroup),
            scaledTimeToEarliestTime(spawnTime, this.data.tailTimeScaleGroup)
        )
    }

    despawnTime() {
        return this.tail.time
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        this.renderConnector()
    }

    get useFallbackSprite() {
        return !skin.sprites.exists(this.normalSprite)
    }

    preprocess() {
        this.start.time = bpmChanges.at(this.data.startBeat).time
        this.start.scaledTime = timeToScaledTime(this.start.time, this.data.startTimeScaleGroup)

        this.head.time = bpmChanges.at(this.data.headBeat).time
        this.head.scaledTime = timeToScaledTime(this.head.time, this.data.headTimeScaleGroup)

        this.tail.time = bpmChanges.at(this.data.tailBeat).time
        this.tail.scaledTime = timeToScaledTime(this.tail.time, this.data.tailTimeScaleGroup)

        this.end.time = bpmChanges.at(this.data.endBeat).time
        this.end.scaledTime = timeToScaledTime(this.end.time, this.data.endTimeScaleGroup)

        this.visualTime.min = this.head.scaledTime - note.duration
    }

    globalInitialize() {
        this.head.lane = this.data.headLane
        this.head.l = this.head.lane - this.data.headSize
        this.head.r = this.head.lane + this.data.headSize

        this.tail.lane = this.data.tailLane
        this.tail.l = this.tail.lane - this.data.tailSize
        this.tail.r = this.tail.lane + this.data.tailSize

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - note.duration * options.hidden

        this.z = getZwithLayer(
            layer.note.guide,
            this.start.time,
            this.data.startLane,
            this.data.color
        )
    }

    renderConnector() {
        if (options.hidden > 0 && time.scaled > this.visualTime.hidden) return
        const currentTime = timeToScaledTime(time.now, this.data.headTimeScaleGroup)

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const visibleTime = {
            min: Math.max(
                this.head.scaledTime,
                time.now > this.head.time
                    ? currentTime + hiddenDuration
                    : currentTime - note.duration * 1.5
            ),
            max: Math.min(this.tail.scaledTime, currentTime + note.duration),
        }
        if (visibleTime.min > visibleTime.max) return

        for (let i = 0; i < options.guideQuality; i++) {
            const scaledTime = {
                min: Math.lerp(visibleTime.min, visibleTime.max, i / options.guideQuality),
                max: Math.lerp(visibleTime.min, visibleTime.max, (i + 1) / options.guideQuality),
            }

            const s = {
                min: this.getScale(scaledTime.min),
                max: this.getScale(scaledTime.max),
            }

            const y = {
                min: approach(scaledTime.min - note.duration, scaledTime.min, currentTime),
                max: approach(scaledTime.max - note.duration, scaledTime.max, currentTime),
            }

            const layout = {
                x1: this.getL(s.min) * y.min,
                x2: this.getL(s.max) * y.max,
                x3: this.getR(s.max) * y.max,
                x4: this.getR(s.min) * y.min,
                y1: y.min,
                y2: y.max,
                y3: y.max,
                y4: y.min,
            }

            const a =
                this.data.fade === FadeType.None
                    ? 0.5
                    : Math.remapClamped(
                          this.start.scaledTime,
                          this.end.scaledTime,
                          this.data.fade === FadeType.In ? 0 : 0.5,
                          this.data.fade === FadeType.In ? 0.5 : 0,
                          scaledTime.min
                      )

            if (this.useFallbackSprite) {
                skin.sprites.draw(this.fallbackSprite, layout, this.z, a)
            } else {
                skin.sprites.draw(this.normalSprite, layout, this.z, a)
            }
        }
    }

    getScale(scaledTime: number) {
        return this.ease(Math.unlerpClamped(this.head.scaledTime, this.tail.scaledTime, scaledTime))
    }

    ease(s: number) {
        return ease(this.data.ease, s)
    }

    getLane(scale: number) {
        return Math.lerp(this.head.lane, this.tail.lane, scale)
    }

    getL(scale: number) {
        return Math.lerp(this.head.l, this.tail.l, scale)
    }

    getR(scale: number) {
        return Math.lerp(this.head.r, this.tail.r, scale)
    }
    get normalSprite() {
        switch (this.data.color) {
            case Color.Neutral:
                return skin.sprites.guideNeutral.id

            case Color.Red:
                return skin.sprites.guideRed.id

            case Color.Green:
                return skin.sprites.guideGreen.id

            case Color.Blue:
                return skin.sprites.guideBlue.id

            case Color.Yellow:
                return skin.sprites.guideYellow.id

            case Color.Purple:
                return skin.sprites.guidePurple.id

            case Color.Cyan:
                return skin.sprites.guideCyan.id

            case Color.Black:
                return skin.sprites.guideBlack.id

            default:
                // Should never happen
                return skin.sprites.guideNeutral.id
        }
    }

    get fallbackSprite() {
        switch (this.data.color) {
            case Color.Neutral:
                return skin.sprites.guideNeutralFallback.id

            case Color.Red:
                return skin.sprites.guideRedFallback.id

            case Color.Green:
                return skin.sprites.guideGreenFallback.id

            case Color.Blue:
                return skin.sprites.guideBlueFallback.id

            case Color.Yellow:
                return skin.sprites.guideYellowFallback.id

            case Color.Purple:
                return skin.sprites.guidePurpleFallback.id

            case Color.Cyan:
                return skin.sprites.guideCyanFallback.id

            case Color.Black:
                return skin.sprites.guideBlackFallback.id

            default:
                // Should never happen
                return skin.sprites.guideNeutralFallback.id
        }
    }
}
