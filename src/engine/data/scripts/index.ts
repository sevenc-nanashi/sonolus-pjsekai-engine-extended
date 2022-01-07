import { defineScripts } from 'sonolus.js'
import { autoSFX } from './auto-sfx'
import { flickNote } from './flick-note'
import { initialization } from './initialization'
import { input } from './input'
import { simLine } from './sim-line'
import { slideConnector } from './slide-connector'
import { slideEnd } from './slide-end'
import { slideEndFlick } from './slide-end-flick'
import { slideStart } from './slide-start'
import { slideTick } from './slide-tick'
import { slotEffect } from './slot-effect'
import { slotGlowEffect } from './slot-glow-effect'
import { stage } from './stage'
import { tapNote } from './tap-note'
import { fuzzyNote } from './fuzzy-note'
import { fuzzyFlick } from './fuzzy-flick'
import { speedChange } from './speed-change'

export const scripts = defineScripts({
    initialization,
    stage,
    input,

    tapNote: () => tapNote(false, false),
    flickNote: () => flickNote(false),
    slideStart: () => slideStart(false),
    slideTick: () => slideTick(false),
    slideEnd: () => slideEnd(false),
    slideEndFlick: () => slideEndFlick(false),
    slideConnector: () => slideConnector(false),

    criticalTapNote: () => tapNote(true, false),
    criticalFlickNote: () => flickNote(true),
    criticalSlideStart: () => slideStart(true),
    criticalSlideTick: () => slideTick(true),
    criticalSlideEnd: () => slideEnd(true),
    criticalSlideEndFlick: () => slideEndFlick(true),
    criticalSlideConnector: () => slideConnector(true),

    slideHiddenTick: () => slideTick(false, false),

    fuzzyNote: () => fuzzyNote(),
    fuzzyFlick: () => fuzzyFlick(),

    damageNote: () => tapNote(false, true),

    speedChange: () => speedChange(),

    autoSFX,
    simLine,

    slotEffect,
    slotGlowEffect,
})
