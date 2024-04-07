import { options } from '../../../../../configuration/options.mjs'
import { skin } from '../../../../skin.mjs'
import { note } from '../../../constants.mjs'
import { layer } from '../../../layer.mjs'
import { scaledScreen } from '../../../shared.mjs'
import { getZ, linearEffectLayout, perspectiveLayout } from '../../../utils.mjs'
import { FlickDirection } from '../flickNotes/FlickDirection.mjs'
import { TraceFlickNote } from './TraceFlickNote.mjs'

export abstract class DirectionalTraceFlickNote extends TraceFlickNote {
    leniency = 1

    abstract arrowSprites: {
        up: SkinSprite[]
        left: SkinSprite[]
        fallback: SkinSprite
    }

    abstract directionalEffect: ParticleEffect

    abstract tickSprites: {
        tick: SkinSprite
        fallback: SkinSprite
    }

    tickSpriteLayout = this.entityMemory(Quad)

    flickData = this.defineImport({
        direction: { name: 'direction', type: DataType<FlickDirection> },
    })

    arrow = this.entityMemory({
        sprite: SkinSpriteId,
        layout: Quad,
        animation: Vec,
        z: Number,
    })

    preprocess() {
        super.preprocess()

        if (options.mirror) this.flickData.direction *= -1
    }

    initialize() {
        super.initialize()

        const size = Math.clamp(Math.round(this.data.size * 2), 1, 6)
        if (size === 1) {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[0].id
                : this.arrowSprites.up[0].id
        } else if (size === 2) {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[1].id
                : this.arrowSprites.up[1].id
        } else if (size === 3) {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[2].id
                : this.arrowSprites.up[2].id
        } else if (size === 4) {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[3].id
                : this.arrowSprites.up[3].id
        } else if (size === 5) {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[4].id
                : this.arrowSprites.up[4].id
        } else {
            this.arrow.sprite = this.flickData.direction
                ? this.arrowSprites.left[5].id
                : this.arrowSprites.up[5].id
        }

        if (skin.sprites.exists(this.arrow.sprite)) {
            const w = (Math.clamp(this.data.size, 0, 3) * (-this.flickData.direction || 1)) / 2

            new Rect({
                l: this.data.lane - w,
                r: this.data.lane + w,
                b: 1,
                t: 1 - 2 * Math.abs(w) * scaledScreen.wToH,
            })
                .toQuad()
                .copyTo(this.arrow.layout)
        } else {
            this.arrow.sprite = this.arrowSprites.fallback.id

            const w = Math.clamp(this.data.size / 2, 1, 2)

            new Rect({ l: -1, r: 1, b: 1, t: -1 })
                .toQuad()
                .rotate((Math.PI / 6) * this.flickData.direction)
                .scale(w, w * scaledScreen.wToH)
                .translate(this.data.lane, 1 - w * scaledScreen.wToH)
                .copyTo(this.arrow.layout)
        }

        if (options.markerAnimation)
            new Vec(this.flickData.direction, -2 * scaledScreen.wToH).copyTo(this.arrow.animation)

        this.arrow.z = getZ(layer.note.arrow, this.targetTime, this.data.lane)
    }

    render() {
        if (!options.showNotes) return
        super.render()

        if (this.useFallbackTickSprite) {
            this.tickSprites.fallback.draw(this.tickSpriteLayout.mul(this.y), this.z + 1, 1)
        } else {
            this.tickSprites.tick.draw(this.tickSpriteLayout.mul(this.y), this.z + 1, 1)
        }

        if (options.markerAnimation) {
            const s = Math.mod(time.now, 0.5) / 0.5

            skin.sprites.draw(
                this.arrow.sprite,
                this.arrow.layout.add(this.arrow.animation.mul(s)).mul(this.y),
                this.arrow.z,
                1 - Math.ease('In', 'Cubic', s)
            )
        } else {
            skin.sprites.draw(this.arrow.sprite, this.arrow.layout.mul(this.y), this.arrow.z, 1)
        }
    }

    playNoteEffects() {
        super.playNoteEffects()

        this.playDirectionalNoteEffect()
    }

    playDirectionalNoteEffect() {
        this.directionalEffect.spawn(
            linearEffectLayout({
                lane: this.data.lane,
                shear: this.flickData.direction,
            }),
            0.32,
            false
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
}
