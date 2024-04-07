import { effect } from '~/engine/watchData/effect.mjs'
import { particle } from '~/engine/watchData/particle.mjs'
import { options } from '../../../../configuration/options.mjs'
import { note } from '../../../note.mjs'
import { skin } from '../../../skin.mjs'
import { archetypes } from '../../index.mjs'
import { timeToScaledTime } from '../../timeScale.mjs'
import { FlatNote } from './FlatNote.mjs'

export class DamageNote extends FlatNote {
    sprites = {
        left: skin.sprites.damageNoteLeft,
        middle: skin.sprites.damageNoteMiddle,
        right: skin.sprites.damageNoteRight,
        fallback: skin.sprites.damageNoteFallback,
    }
    damageImport = this.defineImport({
        hitTime: { name: 'hitTime', type: Number },
    })

    clips = {
        perfect: effect.clips.normalGood,
    }

    effects = {
        circular: particle.effects.damageNoteCircular,
        linear: particle.effects.damageNoteLinear,
    }

    get slotEffect() {
        return archetypes.NormalSlotEffect
    }

    get slotGlowEffect() {
        return archetypes.NormalSlotGlowEffect
    }

    globalPreprocess() {
        this.life.miss = -40
    }

    preprocess() {
        if (options.mirror) this.data.lane *= -1

        this.targetTime = bpmChanges.at(this.data.beat).time

        if (this.hasInput) this.result.time = this.targetTime

        this.visualTime.max = timeToScaledTime(this.targetTime, this.data.timeScaleGroup)
        this.visualTime.min = this.visualTime.max - note.duration

        if (replay.isReplay && options.sfxEnabled && !this.data.judgment) {
            this.scheduleReplaySfx()
        }
    }

    despawnTerminate() {
        if (!(replay.isReplay && !this.data.judgment)) return
        if (options.noteEffectEnabled) this.playNoteEffects()
        if (options.laneEffectEnabled) this.playLaneEffects()
    }
}
