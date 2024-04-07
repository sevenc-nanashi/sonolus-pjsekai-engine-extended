import { SlideStartType } from '~shared/engine/data/SlideStartType.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect } from '../../effect.mjs'
import { particle } from '../../particle.mjs'
import { disallowEmpty } from '../InputManager.mjs'
import { note } from '../constants.mjs'
import { layer } from '../layer.mjs'
import { Note } from '../notes/Note.mjs'
import { SlideStartNote } from '../notes/flatNotes/slideStartNotes/SlideStartNote.mjs'
import { scaledScreen } from '../shared.mjs'
import {
    circularEffectLayout,
    getHitbox,
    getScheduleSFXTime,
    getZwithLayer,
    linearEffectLayout,
    perspectiveLayout,
    scaledTimeToEarliestTime,
    timeToScaledTime,
} from '../utils.mjs'
import { EaseType, ease } from './EaseType.mjs'

const VisualType = {
    Waiting: 0,
    NotActivated: 1,
    Activated: 2,
} as const

type VisualType = (typeof VisualType)[keyof typeof VisualType]

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        connector: {
            normal: SkinSprite
            active: SkinSprite
            fallback: SkinSprite
        }

        slide: {
            left: SkinSprite
            middle: SkinSprite
            right: SkinSprite
            fallback: SkinSprite
        }
        traceSlide: {
            left: SkinSprite
            middle: SkinSprite
            right: SkinSprite
            fallback: SkinSprite
        }
        traceSlideTick: {
            tick: SkinSprite
            fallback: SkinSprite
        }
    }

    abstract clips: {
        hold: EffectClip
        fallback: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract zOrder: number

    abstract slideStartNote: SlideStartNote

    leniency = 1

    data = this.defineImport({
        startRef: { name: 'start', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        endRef: { name: 'end', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
        startType: { name: 'startType', type: DataType<SlideStartType> },
    })

    start = this.entityMemory({
        time: Number,
        judgeTime: Number,
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

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeToScaledTime(this.head.time, this.headData.timeScaleGroup)

        this.scheduleSFXTime = getScheduleSFXTime(this.head.time)

        this.visualTime.min = this.head.scaledTime - Note.duration

        const spawnTime = Math.min(
            this.visualTime.min,
            timeToScaledTime(this.scheduleSFXTime, this.headData.timeScaleGroup)
        )

        this.spawnTime = Math.min(
            scaledTimeToEarliestTime(spawnTime, this.headData.timeScaleGroup),
            scaledTimeToEarliestTime(spawnTime, this.tailData.timeScaleGroup)
        )

        this.start.time = bpmChanges.at(this.startData.beat).time
        this.start.judgeTime = bpmChanges.at(this.startData.beat + 0.5).time
        this.start.scaledTime = timeToScaledTime(this.start.time, this.startData.timeScaleGroup)
        this.end.time = bpmChanges.at(this.endData.beat).time
        this.end.scaledTime = timeToScaledTime(this.end.time, this.endData.timeScaleGroup)

        this.head.lane = this.headData.lane
        this.head.l = this.head.lane - this.headData.size
        this.head.r = this.head.lane + this.headData.size

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.lane = this.tailData.lane
        this.tail.scaledTime = timeToScaledTime(this.tail.time, this.tailData.timeScaleGroup)
        this.tail.l = this.tail.lane - this.tailData.size
        this.tail.r = this.tail.lane + this.tailData.size

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - Note.duration * options.hidden

        this.connector.z = getZwithLayer(
            layer.note.connector,
            this.head.time,
            this.headData.lane,
            this.zOrder
        )

        this.slide.z = getZwithLayer(
            layer.note.slide,
            this.head.time,
            this.headData.lane,
            this.zOrder
        )
    }

    spawnOrder() {
        return 1000 + this.spawnTime
    }

    shouldSpawn() {
        return time.now >= this.spawnTime
    }

    updateSequentialOrder = 1
    updateSequential() {
        if (time.now < this.head.time) return

        const s = this.getScale(
            timeToScaledTime(time.now - input.offset, this.headData.timeScaleGroup)
        )

        const hitbox = getHitbox({
            l: this.getL(s),
            r: this.getR(s),
            leniency: this.leniency,
        })

        for (const touch of touches) {
            if (touch.ended) continue
            if (!hitbox.contains(touch.position)) continue

            disallowEmpty(touch)

            this.startSharedMemory.lastActiveTime = time.now

            if (this.shouldPlaySFX && !this.sfxInstanceId) this.playSFX()

            if (this.shouldPlayCircularEffect && !this.effectInstanceIds.circular)
                this.spawnCircularEffect()

            if (this.shouldPlayLinearEffect && !this.effectInstanceIds.linear)
                this.spawnLinearEffect()
        }

        if (this.startSharedMemory.lastActiveTime === time.now) return

        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (this.shouldPlayCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldPlayLinearEffect && this.effectInstanceIds.linear) this.destroyLinearEffect()
    }

    updateParallel() {
        if (time.now >= this.tail.time) {
            this.despawn = true
            return
        }

        if (this.shouldScheduleSFX && !this.hasSFXScheduled && time.now >= this.scheduleSFXTime)
            this.scheduleSFX()

        if (timeToScaledTime(time.now, this.headData.timeScaleGroup) < this.visualTime.min) return

        this.renderConnector()

        const s = this.getScale(
            timeToScaledTime(time.now - input.offset, this.headData.timeScaleGroup)
        )
        if (time.now <= this.head.time || Math.abs(this.getL(s) - this.getR(s)) < 0.25) return

        if (this.effectInstanceIds.circular) this.updateCircularEffect()
        if (this.effectInstanceIds.linear) this.updateLinearEffect()

        this.renderSlide()
    }

    terminate() {
        if (this.shouldPlaySFX && this.sfxInstanceId) this.stopSFX()

        if (
            (this.shouldScheduleCircularEffect || this.shouldPlayCircularEffect) &&
            this.effectInstanceIds.circular
        )
            this.destroyCircularEffect()
        if (
            (this.shouldScheduleLinearEffect || this.shouldPlayLinearEffect) &&
            this.effectInstanceIds.linear
        )
            this.destroyLinearEffect()
    }

    get startData() {
        return this.slideStartNote.data.get(this.data.startRef)
    }

    get endData() {
        return this.slideStartNote.data.get(this.data.endRef)
    }

    get startSharedMemory() {
        return this.slideStartNote.sharedMemory.get(this.data.startRef)
    }

    get headData() {
        return this.slideStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return this.slideStartNote.data.get(this.data.tailRef)
    }

    get shouldScheduleSFX() {
        return (
            options.sfxEnabled &&
            (this.useFallbackClip ? this.clips.fallback.exists : this.clips.hold.exists) &&
            options.autoSFX
        )
    }

    get shouldPlaySFX() {
        return (
            options.sfxEnabled &&
            (this.useFallbackClip ? this.clips.fallback.exists : this.clips.hold.exists) &&
            !options.autoSFX
        )
    }

    get shouldScheduleCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists
    }

    get shouldPlayLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists
    }

    get shouldPlayCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists
    }

    get shouldScheduleLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists
    }

    get useFallbackConnectorSprites() {
        return !this.sprites.connector.normal.exists || !this.sprites.connector.active.exists
    }
    get useFallbackSlideSprites() {
        return (
            !this.sprites.slide.left.exists ||
            !this.sprites.slide.middle.exists ||
            !this.sprites.slide.right.exists
        )
    }

    get useFallbackSlideTraceSprites() {
        return (
            !this.sprites.traceSlide.left.exists ||
            !this.sprites.traceSlide.middle.exists ||
            !this.sprites.traceSlide.right.exists
        )
    }

    get useFallbackSlideTraceTickSprites() {
        return !this.sprites.traceSlideTick.tick.exists
    }

    get useFallbackClip() {
        return !this.clips.hold.exists
    }

    scheduleSFX() {
        const id = this.useFallbackClip
            ? this.clips.fallback.scheduleLoop(this.head.time)
            : this.clips.hold.scheduleLoop(this.head.time)
        effect.clips.scheduleStopLoop(id, this.tail.time)

        this.hasSFXScheduled = true
    }

    playSFX() {
        this.sfxInstanceId = this.useFallbackClip
            ? this.clips.fallback.loop()
            : this.clips.hold.loop()
    }

    stopSFX() {
        effect.clips.stopLoop(this.sfxInstanceId)
        this.sfxInstanceId = 0
    }

    spawnCircularEffect() {
        this.effectInstanceIds.circular = this.effects.circular.spawn(new Quad(), 1, true)
    }

    spawnLinearEffect() {
        this.effectInstanceIds.linear = this.effects.linear.spawn(new Quad(), 1, true)
    }

    updateCircularEffect() {
        const s = this.getScale(timeToScaledTime(time.now, this.headData.timeScaleGroup))
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.circular,
            circularEffectLayout({
                lane,
                w: 3.5,
                h: 2.1,
            })
        )
    }

    updateLinearEffect() {
        const s = this.getScale(timeToScaledTime(time.now, this.headData.timeScaleGroup))
        const lane = this.getLane(s)

        particle.effects.move(
            this.effectInstanceIds.linear,
            linearEffectLayout({
                lane,
                shear: 0,
            })
        )
    }

    destroyCircularEffect() {
        particle.effects.destroy(this.effectInstanceIds.circular)
        this.effectInstanceIds.circular = 0
    }

    destroyLinearEffect() {
        particle.effects.destroy(this.effectInstanceIds.linear)
        this.effectInstanceIds.linear = 0
    }

    renderConnector() {
        if (!options.showNotes) return
        if (
            options.hidden > 0 &&
            timeToScaledTime(time.now, this.headData.timeScaleGroup) > this.visualTime.hidden
        )
            return

        const visual =
            this.startSharedMemory.lastActiveTime === time.now
                ? VisualType.Activated
                : time.now >= this.start.judgeTime + input.offset
                ? VisualType.NotActivated
                : VisualType.Waiting

        const hiddenDuration = options.hidden > 0 ? Note.duration * options.hidden : 0

        const now = timeToScaledTime(time.now, this.headData.timeScaleGroup)

        const visibleTime = {
            min: Math.max(
                this.head.scaledTime,
                time.now > this.head.time ? now + hiddenDuration : now - Note.duration * 1.5
            ),
            max: Math.min(this.tail.scaledTime, now + Note.duration),
        }

        for (let i = 0; i < options.slideQuality; i++) {
            const scaledTime = {
                min: Math.lerp(visibleTime.min, visibleTime.max, i / options.slideQuality),
                max: Math.lerp(visibleTime.min, visibleTime.max, (i + 1) / options.slideQuality),
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

            if (this.useFallbackConnectorSprites) {
                this.sprites.connector.fallback.draw(
                    layout,
                    this.connector.z,
                    (visual === VisualType.NotActivated ? 0.5 : 1) * options.connectorAlpha
                )
            } else if (options.connectorAnimation && visual === VisualType.Activated) {
                const activeA = (Math.sin(time.now * 2 * Math.PI) + 1) / 2

                this.sprites.connector.active.draw(
                    layout,
                    this.connector.z,
                    Math.ease('Out', 'Cubic', activeA) * options.connectorAlpha
                )
                this.sprites.connector.normal.draw(
                    layout,
                    this.connector.z + 1,
                    Math.ease('Out', 'Cubic', 1 - activeA) * options.connectorAlpha
                )
            } else {
                this.sprites.connector.normal.draw(
                    layout,
                    this.connector.z,
                    (visual === VisualType.NotActivated ? 0.5 : 1) * options.connectorAlpha
                )
            }
        }
    }

    renderSlide() {
        if (!options.showNotes) return
        if (this.data.startType === SlideStartType.None) return
        const s = this.getScale(timeToScaledTime(time.now, this.headData.timeScaleGroup))

        const l = this.getL(s)
        const r = this.getR(s)
        const lane = this.getLane(s)

        if (Math.abs(l - r) < 0.25) {
            return
        }

        if (this.data.startType === SlideStartType.Trace) {
            const b = 1 + note.h
            const t = 1 - note.h
            const fb = 1 + note.h / 2
            const ft = 1 - note.h

            if (this.useFallbackSlideSprites) {
                this.sprites.traceSlide.fallback.draw(
                    perspectiveLayout({ l, r, b: fb, t: ft }),
                    this.slide.z,
                    1
                )
            } else {
                const ml = l + 0.125
                const mr = r - 0.125

                this.sprites.traceSlide.left.draw(
                    perspectiveLayout({ l, r: ml, b, t }),
                    this.slide.z,
                    1
                )
                this.sprites.traceSlide.middle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slide.z,
                    1
                )
                this.sprites.traceSlide.right.draw(
                    perspectiveLayout({ l: mr, r, b, t }),
                    this.slide.z,
                    1
                )
            }
            if (this.useFallbackSlideTraceTickSprites) {
                this.sprites.traceSlideTick.fallback.draw(
                    perspectiveLayout({ l, r, b, t }),
                    this.slide.z + 1,
                    1
                )
            } else {
                const w = note.h / scaledScreen.wToH
                this.sprites.traceSlideTick.tick.draw(
                    new Rect({
                        l: lane - w,
                        r: lane + w,
                        b,
                        t,
                    }).toQuad(),
                    this.slide.z + 1,
                    1
                )
            }
        } else {
            const b = 1 + note.h
            const t = 1 - note.h

            if (this.useFallbackSlideSprites) {
                this.sprites.slide.fallback.draw(perspectiveLayout({ l, r, b, t }), this.slide.z, 1)
            } else {
                const ml = l + 0.25
                const mr = r - 0.25

                this.sprites.slide.left.draw(perspectiveLayout({ l, r: ml, b, t }), this.slide.z, 1)
                this.sprites.slide.middle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slide.z,
                    1
                )
                this.sprites.slide.right.draw(
                    perspectiveLayout({ l: mr, r, b, t }),
                    this.slide.z,
                    1
                )
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
}
