import { options } from '~/engine/configuration/options.mjs'
import { Color } from '../../../../../shared/src/engine/data/Color.mjs'
import { EaseType, ease } from '../../../../../shared/src/engine/data/EaseType.mjs'
import { FadeType } from '../../../../../shared/src/engine/data/FadeType.mjs'
import { panel } from '../panel.mjs'
import { getZwithLayer, layer, skin } from '../skin.mjs'

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
    preprocess(): void {
        if (options.mirror) this.data.headLane *= -1
        if (options.mirror) this.data.tailLane *= -1
        if (options.mirror) this.data.startLane *= -1
        if (options.mirror) this.data.endLane *= -1
    }

    render() {
        const t = {
            min: bpmChanges.at(this.data.headBeat).time,
            max: bpmChanges.at(this.data.tailBeat).time,
        }

        const index = {
            min: Math.floor(t.min / panel.h),
            max: Math.floor(t.max / panel.h),
        }

        const l = {
            min: this.data.headLane - this.data.headSize,
            max: this.data.tailLane - this.data.tailSize,
        }
        const r = {
            min: this.data.headLane + this.data.headSize,
            max: this.data.tailLane + this.data.tailSize,
        }

        const z = getZwithLayer(layer.note.guide, t.min, this.data.headLane, this.data.color)

        for (let i = index.min; i <= index.max; i++) {
            const x = i * panel.w

            const pt = {
                min: Math.max(t.min, i * panel.h),
                max: Math.min(t.max, (i + 1) * panel.h),
            }

            const startTime = bpmChanges.at(this.data.startBeat).time
            const endTime = bpmChanges.at(this.data.endBeat).time

            for (let j = 0; j < 20; j++) {
                const st = {
                    min: Math.lerp(pt.min, pt.max, j / 20),
                    max: Math.lerp(pt.min, pt.max, (j + 1) / 20),
                }

                const s = {
                    min: ease(this.data.ease, Math.unlerp(t.min, t.max, st.min)),
                    max: ease(this.data.ease, Math.unlerp(t.min, t.max, st.max)),
                }

                const pos = {
                    min: new Vec(x, st.min - i * panel.h),
                    max: new Vec(x, st.max - i * panel.h),
                }

                const layout = new Quad({
                    p1: pos.min.translate(Math.lerp(l.min, l.max, s.min), 0),
                    p2: pos.max.translate(Math.lerp(l.min, l.max, s.max), 0),
                    p3: pos.max.translate(Math.lerp(r.min, r.max, s.max), 0),
                    p4: pos.min.translate(Math.lerp(r.min, r.max, s.min), 0),
                })

                const alpha =
                    this.data.fade === FadeType.None
                        ? 0.5
                        : Math.remapClamped(
                              startTime,
                              endTime,
                              this.data.fade === FadeType.In ? 0 : 0.5,
                              this.data.fade === FadeType.In ? 0.5 : 0,
                              st.min
                          )

                skin.sprites.draw(
                    this.useFallbackSprite ? this.fallbackSprite : this.normalSprite,
                    layout,
                    z,
                    alpha
                )
            }
        }
    }

    get useFallbackSprite() {
        return !skin.sprites.exists(this.normalSprite)
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
