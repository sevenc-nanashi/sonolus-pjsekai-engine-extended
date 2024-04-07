import { SlideStartType } from '~shared/engine/data/SlideStartType.mjs'
import { perspectiveLayout } from '~shared/engine/data/utils.mjs'
import { EaseType, ease } from '../../../../../../shared/src/engine/data/EaseType.mjs'
import { approach } from '../../../../../../shared/src/engine/data/note.mjs'
import { options } from '../../../configuration/options.mjs'
import { effect } from '../../effect.mjs'
import { note } from '../../note.mjs'
import { circularEffectLayout, linearEffectLayout, particle } from '../../particle.mjs'
import { scaledScreen } from '../../scaledScreen.mjs'
import { getZwithLayer, layer } from '../../skin.mjs'
import { FlatNote } from '../notes/flatNotes/FlatNote.mjs'
import { scaledTimeToEarliestTime, timeToScaledTime } from '../timeScale.mjs'

export abstract class SlideConnector extends Archetype {
    abstract sprites: {
        normal: SkinSprite
        active: SkinSprite
        fallback: SkinSprite

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

    abstract slideStartNote: FlatNote

    abstract zOrder: number

    data = this.defineImport({
        startRef: { name: 'start', type: Number },
        headRef: { name: 'head', type: Number },
        tailRef: { name: 'tail', type: Number },
        ease: { name: 'ease', type: DataType<EaseType> },
        startType: { name: 'startType', type: DataType<SlideStartType> },
    })

    initialized = this.entityMemory(Boolean)

    start = this.entityMemory({
        time: Number,
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

    visualTime = this.entityMemory({
        min: Number,
        hidden: Number,
    })

    effectInstanceIds = this.entityMemory({
        circular: ParticleEffectInstanceId,
        linear: ParticleEffectInstanceId,
    })

    slideZ = this.entityMemory(Number)

    z = this.entityMemory(Number)

    spawnTimeCache = this.entityMemory(Number)

    preprocess() {
        this.head.time = bpmChanges.at(this.headData.beat).time
        this.head.scaledTime = timeToScaledTime(this.head.time, this.headData.timeScaleGroup)

        this.tail.time = bpmChanges.at(this.tailData.beat).time
        this.tail.scaledTime = timeToScaledTime(this.tail.time, this.tailData.timeScaleGroup)

        this.visualTime.min = this.head.scaledTime - note.duration
        if (options.sfxEnabled) {
            const id =
                'fallback' in this.clips && this.useFallbackClip
                    ? this.clips.fallback.scheduleLoop(this.head.time)
                    : this.clips.hold.scheduleLoop(this.head.time)
            effect.clips.scheduleStopLoop(id, this.tail.time)
        }
    }

    spawnTime() {
        const spawnTime = Math.min(this.visualTime.min, this.head.scaledTime)

        return Math.min(
            scaledTimeToEarliestTime(spawnTime, this.headData.timeScaleGroup),
            scaledTimeToEarliestTime(spawnTime, this.tailData.timeScaleGroup)
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
        if (timeToScaledTime(time.now, this.headData.timeScaleGroup) < this.visualTime.min) return
        this.renderConnector()

        if (time.skip) {
            if (this.shouldScheduleCircularEffect) this.effectInstanceIds.circular = 0

            if (this.shouldScheduleLinearEffect) this.effectInstanceIds.linear = 0
        }

        const s = this.getScale(timeToScaledTime(time.now, this.headData.timeScaleGroup))
        if (time.now <= this.head.time || Math.abs(this.getL(s) - this.getR(s)) < 0.25) return

        if (this.shouldScheduleCircularEffect && !this.effectInstanceIds.circular)
            this.spawnCircularEffect()

        if (this.shouldScheduleLinearEffect && !this.effectInstanceIds.linear)
            this.spawnLinearEffect()

        if (Math.abs(this.getL(s) - this.getR(s)) < 0.25) return

        if (this.effectInstanceIds.circular) this.updateCircularEffect()

        if (this.effectInstanceIds.linear) this.updateLinearEffect()

        this.renderSlide()
    }

    get startData() {
        return this.slideStartNote.data.get(this.data.startRef)
    }

    get headData() {
        return this.slideStartNote.data.get(this.data.headRef)
    }

    get tailData() {
        return this.slideStartNote.data.get(this.data.tailRef)
    }

    get useFallbackSprite() {
        return !this.sprites.normal.exists || !this.sprites.active.exists
    }

    globalInitialize() {
        this.start.time = bpmChanges.at(this.startData.beat).time

        this.head.lane = this.headData.lane
        this.head.l = this.head.lane - this.headData.size
        this.head.r = this.head.lane + this.headData.size

        this.tail.lane = this.tailData.lane
        this.tail.l = this.tail.lane - this.tailData.size
        this.tail.r = this.tail.lane + this.tailData.size

        if (options.hidden > 0)
            this.visualTime.hidden = this.tail.scaledTime - note.duration * options.hidden

        this.z = getZwithLayer(
            layer.note.connector,
            this.start.time,
            this.startData.lane,
            this.zOrder
        )

        this.slideZ = getZwithLayer(
            layer.note.slide,
            this.head.time,
            this.headData.lane,
            this.zOrder
        )
    }

    renderConnector() {
        if (!options.showNotes) return
        if (
            options.hidden > 0 &&
            timeToScaledTime(time.now, this.headData.timeScaleGroup) > this.visualTime.hidden
        )
            return

        const isActivated = time.now >= this.start.time

        const hiddenDuration = options.hidden > 0 ? note.duration * options.hidden : 0

        const now = timeToScaledTime(time.now, this.headData.timeScaleGroup)

        const visibleTime = {
            min: Math.max(
                this.head.scaledTime,
                time.now > this.head.time ? now + hiddenDuration : now - note.duration * 1.5
            ),
            max: Math.min(this.tail.scaledTime, now + note.duration),
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
                min: approach(scaledTime.min - note.duration, scaledTime.min, now),
                max: approach(scaledTime.max - note.duration, scaledTime.max, now),
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

            const a = options.connectorAlpha

            if (this.useFallbackSprite) {
                this.sprites.fallback.draw(layout, this.z, a)
            } else if (options.connectorAnimation && isActivated) {
                const activeA = (Math.sin(time.now * 2 * Math.PI) + 1) / 2

                this.sprites.active.draw(
                    layout,
                    this.z,
                    Math.ease('Out', 'Cubic', activeA) * options.connectorAlpha
                )
                this.sprites.normal.draw(
                    layout,
                    this.z + 1,
                    Math.ease('Out', 'Cubic', 1 - activeA) * options.connectorAlpha
                )
            } else {
                this.sprites.normal.draw(layout, this.z, a)
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

    renderSlide() {
        if (this.data.startType === SlideStartType.None) return
        const s = this.getScale(timeToScaledTime(time.now, this.headData.timeScaleGroup))

        const l = this.getL(s)
        const r = this.getR(s)
        const lane = this.getLane(s)
        const b = 1 + note.h
        const t = 1 - note.h

        if (this.data.startType === SlideStartType.Trace) {
            const fb = 1 + note.h / 2
            const ft = 1 - note.h

            if (this.useFallbackSlideSprites) {
                this.sprites.traceSlide.fallback.draw(
                    perspectiveLayout({ l, r, b: fb, t: ft }),
                    this.slideZ,
                    1
                )
            } else {
                const ml = l + 0.125
                const mr = r - 0.125

                this.sprites.traceSlide.left.draw(
                    perspectiveLayout({ l, r: ml, b, t }),
                    this.slideZ,
                    1
                )
                this.sprites.traceSlide.middle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slideZ,
                    1
                )
                this.sprites.traceSlide.right.draw(
                    perspectiveLayout({ l: mr, r, b, t }),
                    this.slideZ,
                    1
                )
            }
            if (this.useFallbackTraceTickSprites) {
                this.sprites.traceSlideTick.fallback.draw(
                    perspectiveLayout({ l, r, b, t }),
                    this.slideZ + 1,
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
                    this.slideZ + 1,
                    1
                )
            }
        } else {
            if (this.useFallbackSlideSprites) {
                this.sprites.slide.fallback.draw(perspectiveLayout({ l, r, b, t }), this.slideZ, 1)
            } else {
                const ml = l + 0.25
                const mr = r - 0.25

                this.sprites.slide.left.draw(perspectiveLayout({ l, r: ml, b, t }), this.slideZ, 1)
                this.sprites.slide.middle.draw(
                    perspectiveLayout({ l: ml, r: mr, b, t }),
                    this.slideZ,
                    1
                )
                this.sprites.slide.right.draw(perspectiveLayout({ l: mr, r, b, t }), this.slideZ, 1)
            }
        }
    }

    terminate() {
        if (this.shouldScheduleCircularEffect && this.effectInstanceIds.circular)
            this.destroyCircularEffect()

        if (this.shouldScheduleLinearEffect && this.effectInstanceIds.linear)
            this.destroyLinearEffect()
    }

    get useFallbackSlideSprites() {
        return (
            !this.sprites.slide.left.exists ||
            !this.sprites.slide.middle.exists ||
            !this.sprites.slide.right.exists
        )
    }

    get useFallbackTraceSlideSprites() {
        return (
            !this.sprites.traceSlide.left.exists ||
            !this.sprites.traceSlide.middle.exists ||
            !this.sprites.traceSlide.right.exists
        )
    }

    get useFallbackTraceTickSprites() {
        return !this.sprites.traceSlideTick.tick.exists
    }

    get useFallbackClip() {
        return !this.clips.hold.exists
    }

    get shouldScheduleCircularEffect() {
        return options.noteEffectEnabled && this.effects.circular.exists
    }

    get shouldScheduleLinearEffect() {
        return options.noteEffectEnabled && this.effects.linear.exists
    }

    spawnCircularEffect() {
        this.effectInstanceIds.circular = this.effects.circular.spawn(new Quad(), 1, true)
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

    destroyCircularEffect() {
        particle.effects.destroy(this.effectInstanceIds.circular)
        this.effectInstanceIds.circular = 0
    }

    spawnLinearEffect() {
        this.effectInstanceIds.linear = this.effects.linear.spawn(new Quad(), 1, true)
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

    destroyLinearEffect() {
        particle.effects.destroy(this.effectInstanceIds.linear)
        this.effectInstanceIds.linear = 0
    }
}
