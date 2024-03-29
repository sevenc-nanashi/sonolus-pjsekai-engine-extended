import { buckets } from '~/engine/playData/buckets.mjs'
import { options } from '../../../../../configuration/options.mjs'
import { claimEnd, getClaimedEnd } from '../../../InputManager.mjs'
import { note } from '../../../constants.mjs'
import { archetypes } from '../../../index.mjs'
import { scaledScreen } from '../../../shared.mjs'
import { perspectiveLayout } from '../../../utils.mjs'
import { windows } from '../../../windows.mjs'
import { SlimNote } from '../SlimNote.mjs'

export abstract class TraceSlideEndNote extends SlimNote {
    leniency = 1

    abstract tickSprites: {
        tick: SkinSprite
        fallback: SkinSprite
    }

    abstract clips: {
        perfect: EffectClip
        fallback: EffectClip
    }

    abstract effects: {
        circular: ParticleEffect
        linear: ParticleEffect
    }

    windows = windows.tapNote.normal

    bucket = buckets.normalTraceNote

    slideEndData = this.defineImport({
        slideRef: { name: 'slide', type: Number },
    })

    tickSpriteLayout = this.entityMemory(Quad)

    get startSharedMemory() {
        return archetypes.NormalSlideStartNote.sharedMemory.get(this.slideData.startRef)
    }

    updateSequential() {
        if (time.now < this.inputTime.min) return

        // if (this.startInfo.state !== EntityState.Despawned) return

        claimEnd(
            this.info.index,
            this.targetTime,
            this.hitbox,
            this.fullHitbox,

            Math.abs(this.startSharedMemory.lastActiveTime - time.now) <= time.delta
                ? this.targetTime
                : 99999
        )
    }

    setLayout({ l, r }: { l: number; r: number }): void {
        super.setLayout({ l, r })

        const b = 1 + note.h
        const t = 1 - note.h

        if (this.useFallbackTickSprite) {
            const l = this.data.lane - this.data.size
            const r = this.data.lane + this.data.size

            perspectiveLayout({ l, r, b, t }).copyTo(this.tickSpriteLayout)
        } else {
            const w = note.h / scaledScreen.wToH

            new Rect({
                l: this.data.lane - w,
                r: this.data.lane + w,
                b,
                t,
            })
                .toQuad()
                .copyTo(this.tickSpriteLayout)
        }
    }

    get useFallbackTickSprite() {
        return !this.tickSprites.tick.exists
    }

    get slideData() {
        return archetypes.NormalSlideConnector.data.get(this.slideEndData.slideRef)
    }

    get startInfo() {
        return entityInfos.get(this.slideData.startRef)
    }

    globalPreprocess() {
        super.globalPreprocess()
        this.life.miss = -40
    }

    touch() {
        if (time.now < this.inputTime.min) return

        // if (this.startInfo.state !== EntityState.Despawned) return

        const index = getClaimedEnd(this.info.index)
        if (index !== -1) {
            this.complete(touches.get(index))
            return
        }

        if (time.now < this.targetTime) return

        for (const touch of touches) {
            if (!this.fullHitbox.contains(touch.position)) continue

            this.complete(touch)
            return
        }
    }

    render(): void {
        if (!options.showNotes) return
        super.render()

        if (this.useFallbackTickSprite) {
            this.tickSprites.fallback.draw(this.tickSpriteLayout.mul(this.y), this.z + 1, 1)
        } else {
            this.tickSprites.tick.draw(this.tickSpriteLayout.mul(this.y), this.z + 1, 1)
        }
    }

    complete(touch: Touch) {
        this.result.judgment = Judgment.Perfect
        this.result.accuracy = 0

        this.result.bucket.index = this.bucket.index
        this.result.bucket.value = this.result.accuracy * 1000

        this.playHitEffects(touch.startTime)

        this.despawn = true
    }
}
