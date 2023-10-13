import { Color } from '../../../../../shared/src/engine/data/Color.mjs'
import { FadeType } from '../../../../../shared/src/engine/data/FadeType.mjs'
import { options } from '../../configuration/options.mjs'
import { skin } from '../skin.mjs'
import { layer } from './layer.mjs'
import { Note } from './notes/Note.mjs'
import { EaseType, ease } from './slideConnectors/EaseType.mjs'
import { getScheduleSFXTime, getZ, scaledTimeToEarliestTime, timeToScaledTime } from './utils.mjs'

export class Guide extends Archetype {
    leniency = 1

    data = this.defineData({
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

    start = this.entityMemory({
        time: Number,
        scaledTime: Number,
    })
    end = this.entityMemory({
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

    scheduleSFXTime = this.entityMemory(Number)

    visualTime = this.entityMemory({
        min: Number,
        hidden: Number,
    })

    spawnTime = this.entityMemory(Number)

    hasSFXScheduled = this.entityMemory(Boolean)

    sfxInstanceId = this.entityMemory(LoopedEffectClipInstanceId)
    effectInstanceIds = this.entityMemory({
        circular: ParticleEffectInstanceId,
        linear: ParticleEffectInstanceId,
    })

    connector = this.entityMemory({
        z: Number,
    })

    slide = this.entityMemory({
        z: Number,
    })

    sprites = this.entityMemory({
        normal: SkinSpriteId,
        fallback: SkinSpriteId,
    })

    preprocess() {
        this.head.time = bpmChanges.at(this.data.headBeat).time
        this.head.scaledTime = timeToScaledTime(this.head.time, this.data.headTimeScaleGroup)

        this.scheduleSFXTime = getScheduleSFXTime(this.head.time)

        this.visualTime.min = this.head.scaledTime - Note.duration

        const spawnTime = Math.min(
            this.visualTime.min,
            timeToScaledTime(this.scheduleSFXTime, this.data.headTimeScaleGroup)
        )

        this.spawnTime = Math.min(
            scaledTimeToEarliestTime(spawnTime, this.data.headTimeScaleGroup),
            scaledTimeToEarliestTime(spawnTime, this.data.tailTimeScaleGroup)
        )

        this.start.time = bpmChanges.at(this.data.startBeat).time
        this.start.scaledTime = timeToScaledTime(this.start.time, this.data.startTimeScaleGroup)
        this.end.time = bpmChanges.at(this.data.endBeat).time
        this.end.scaledTime = timeToScaledTime(this.end.time, this.data.endTimeScaleGroup)

        this.head.lane = this.data.headLane
        this.head.l = this.head.lane - this.data.headSize
        this.head.r = this.head.lane + this.data.headSize

        this.tail.time = bpmChanges.at(this.data.tailBeat).time
        this.tail.lane = this.data.tailLane
        this.tail.scaledTime = timeToScaledTime(this.tail.time, this.data.tailTimeScaleGroup)
        this.tail.l = this.tail.lane - this.data.tailSize
        this.tail.r = this.tail.lane + this.data.tailSize

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - Note.duration * options.hidden

        this.connector.z = getZ(layer.note.connector, this.head.time, this.data.headLane)

        this.slide.z = getZ(layer.note.slide, this.head.time, this.data.headLane)

        this.sprites.normal = this.normalSprite
        this.sprites.fallback = this.fallbackSprite
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    updateSequentialOrder = 1
    updateParallel() {
        if (time.now >= this.tail.time) {
            this.despawn = true
            return
        }
        this.renderConnector()
    }

    renderConnector() {
        if (
            options.hidden > 0 &&
            timeToScaledTime(time.now, this.data.headTimeScaleGroup) > this.visualTime.hidden
        )
            return

        const hiddenDuration = options.hidden > 0 ? Note.duration * options.hidden : 0

        const now = timeToScaledTime(time.now, this.data.headTimeScaleGroup)

        const visibleTime = {
            min: Math.max(
                this.head.scaledTime,
                time.now > this.head.time ? now + hiddenDuration : now - Note.duration * 1.5
            ),
            max: Math.min(this.tail.scaledTime, now + Note.duration),
        }
        if (visibleTime.min >= visibleTime.max) return

        for (let i = 0; i < 10; i++) {
            const scaledTime = {
                min: Math.lerp(visibleTime.min, visibleTime.max, i / 10),
                max: Math.lerp(visibleTime.min, visibleTime.max, (i + 1) / 10),
            }

            const s = {
                min: this.getScale(scaledTime.min),
                max: this.getScale(scaledTime.max),
            }

            const y = {
                min: Note.approach(scaledTime.min - Note.duration, scaledTime.min, now),
                max: Note.approach(scaledTime.max - Note.duration, scaledTime.max, now),
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

            const alpha =
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
                skin.sprites.draw(this.sprites.fallback, layout, this.connector.z, alpha)
            } else {
                skin.sprites.draw(this.sprites.normal, layout, this.connector.z, alpha)
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

    get useFallbackSprite() {
        return !skin.sprites.exists(this.sprites.normal)
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

            default:
                // Should never happen
                return skin.sprites.guideNeutralFallback.id
        }
    }
}