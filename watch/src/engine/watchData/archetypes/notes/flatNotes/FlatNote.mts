import { lane } from '../../../../../../../shared/src/engine/data/lane.mjs'
import { approach } from '../../../../../../../shared/src/engine/data/note.mjs'
import { perspectiveLayout } from '../../../../../../../shared/src/engine/data/utils.mjs'
import { options } from '../../../../configuration/options.mjs'
import { sfxDistance } from '../../../effect.mjs'
import { note } from '../../../note.mjs'
import { circularEffectLayout, linearEffectLayout, particle } from '../../../particle.mjs'
import { getZ, layer } from '../../../skin.mjs'
import { SlotEffect } from '../../slotEffects/SlotEffect.mjs'
import { SlotGlowEffect } from '../../slotGlowEffects/SlotGlowEffect.mjs'
import { scaledTimeToEarliestTime, timeToScaledTime } from '../../timeScale.mjs'
import { Note } from '../Note.mjs'

export abstract class FlatNote extends Note {
    abstract sprites: {
        left: SkinSprite
        middle: SkinSprite
        right: SkinSprite
        fallback: SkinSprite
    }

    abstract clips: {
        perfect: EffectClip
        great?: EffectClip
        good?: EffectClip
        fallback?: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    abstract slotEffect: SlotEffect
    abstract slotGlowEffect: SlotGlowEffect

    visualTime = this.entityMemory({
        min: Number,
        max: Number,
        hidden: Number,
    })

    initialized = this.entityMemory(Boolean)

    spriteLayouts = this.entityMemory({
        left: Quad,
        middle: Quad,
        right: Quad,
    })
    z = this.entityMemory(Number)

    y = this.entityMemory(Number)

    globalPreprocess() {
        this.life.miss = -80
    }

    preprocess() {
        super.preprocess()

        this.visualTime.max = timeToScaledTime(this.targetTime, this.data.timeScaleGroup)
        this.visualTime.min = this.visualTime.max - note.duration

        if (options.sfxEnabled) {
            if (replay.isReplay) {
                this.scheduleReplaySfx()
            } else {
                this.scheduleSfx()
            }
        }

        if (options.slotEffectEnabled && (replay.isReplay || this.data.judgment)) {
            this.spawnSlotEffects(replay.isReplay ? this.hitTime : this.targetTime)
        }
    }

    scheduleSfx() {
        if ('fallback' in this.clips && this.useFallbackClip) {
            this.clips.fallback.schedule(this.targetTime, sfxDistance)
        } else {
            this.clips.perfect.schedule(this.targetTime, sfxDistance)
        }
    }

    scheduleReplaySfx() {
        if (!this.data.judgment) return

        if ('fallback' in this.clips && this.useFallbackClip) {
            this.clips.fallback.schedule(this.hitTime, sfxDistance)
        } else if ('great' in this.clips && 'good' in this.clips) {
            switch (this.data.judgment) {
                case Judgment.Perfect:
                    this.clips.perfect.schedule(this.hitTime, sfxDistance)
                    break
                case Judgment.Great:
                    this.clips.great.schedule(this.hitTime, sfxDistance)
                    break
                case Judgment.Good:
                    this.clips.good.schedule(this.hitTime, sfxDistance)
                    break
            }
        } else {
            this.clips.perfect.schedule(this.hitTime, sfxDistance)
        }
    }

    get hitTime() {
        return this.targetTime + this.data.accuracy
    }

    spawnTime() {
        return Math.min(
            replay.isReplay ? this.hitTime : this.targetTime,
            scaledTimeToEarliestTime(
                Math.min(
                    this.visualTime.min,
                    this.visualTime.max,
                    timeToScaledTime(this.targetTime, this.data.timeScaleGroup)
                ),
                this.data.timeScaleGroup
            )
        )
    }

    despawnTime() {
        return replay.isReplay ? this.hitTime : this.targetTime
    }

    initialize() {
        if (this.initialized) return
        this.initialized = true

        this.globalInitialize()
    }

    updateParallel() {
        if (this.data.size < 0.125) return
        const scaledTime = timeToScaledTime(time.now, this.data.timeScaleGroup)
        if (options.hidden > 0 && scaledTime > this.visualTime.hidden) return
        if (scaledTime < this.visualTime.min) return

        this.render()
    }

    terminate() {
        if (time.skip) return

        this.despawnTerminate()
    }

    get useFallbackSprites() {
        return (
            !this.sprites.left.exists || !this.sprites.middle.exists || !this.sprites.right.exists
        )
    }

    get useFallbackClip() {
        return (
            !this.clips.perfect.exists ||
            ('great' in this.clips && !this.clips.great.exists) ||
            ('good' in this.clips && !this.clips.good.exists)
        )
    }

    globalInitialize() {
        if (options.hidden > 0)
            this.visualTime.hidden = this.visualTime.max - note.duration * options.hidden

        const l = this.data.lane - this.data.size + 0.1
        const r = this.data.lane + this.data.size - 0.1

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackSprites) {
            perspectiveLayout({ l, r, b, t }).copyTo(this.spriteLayouts.middle)
        } else {
            const ml = l + 0.25
            const mr = r - 0.25

            perspectiveLayout({ l, r: ml, b, t }).copyTo(this.spriteLayouts.left)
            perspectiveLayout({ l: ml, r: mr, b, t }).copyTo(this.spriteLayouts.middle)
            perspectiveLayout({ l: mr, r, b, t }).copyTo(this.spriteLayouts.right)
        }

        this.z = getZ(layer.note.body, this.targetTime, this.data.lane)
    }

    render() {
        this.y = approach(
            this.visualTime.min,
            this.visualTime.max,
            timeToScaledTime(time.now, this.data.timeScaleGroup)
        )

        if (this.useFallbackSprites) {
            this.sprites.fallback.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
        } else {
            this.sprites.left.draw(this.spriteLayouts.left.mul(this.y), this.z, 1)
            this.sprites.middle.draw(this.spriteLayouts.middle.mul(this.y), this.z, 1)
            this.sprites.right.draw(this.spriteLayouts.right.mul(this.y), this.z, 1)
        }
    }

    despawnTerminate() {
        if (replay.isReplay && !this.data.judgment) return
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }

    playNoteEffects() {
        this.playLinearNoteEffect()
        this.playCircularNoteEffect()
    }

    playLinearNoteEffect() {
        this.effects.linear.spawn(
            linearEffectLayout({
                lane: this.data.lane,
                shear: 0,
            }),
            0.5,
            false
        )
    }

    playCircularNoteEffect() {
        this.effects.circular.spawn(
            circularEffectLayout({
                lane: this.data.lane,
                w: 1.75,
                h: 1.05,
            }),
            0.6,
            false
        )
    }

    playLaneEffects() {
        particle.effects.lane.spawn(
            perspectiveLayout({
                l: this.data.lane - this.data.size,
                r: this.data.lane + this.data.size,
                b: lane.b,
                t: lane.t,
            }),
            0.3,
            false
        )
    }

    spawnSlotEffects(startTime: number) {
        const start = Math.floor(this.data.lane - this.data.size)
        const end = Math.ceil(this.data.lane + this.data.size)

        for (let i = start; i < end; i++) {
            this.slotEffect.spawn({
                startTime,
                lane: i + 0.5,
            })
        }

        this.slotGlowEffect.spawn({
            startTime,
            lane: this.data.lane,
            size: this.data.size,
        })
    }
}
