import { skin } from '../../../../skin.mjs'
import { TraceFlickNote } from './TraceFlickNote.mjs'

export class CriticalTraceFlickNote extends TraceFlickNote {
    sprites = {
        left: skin.sprites.criticalTraceNoteLeft,
        middle: skin.sprites.criticalTraceNoteMiddle,
        right: skin.sprites.criticalTraceNoteRight,
        fallback: {
            left: skin.sprites.criticalNoteLeft,
            middle: skin.sprites.criticalNoteMiddle,
            right: skin.sprites.criticalNoteRight,
        },
        secondaryFallback: skin.sprites.criticalNoteFallback,
    }

    tickSprites = {
        tick: skin.sprites.criticalSlideTickNote,
        fallback: skin.sprites.criticalSlideTickNoteFallback,
    }

    arrowSprites = {
        up: [
            skin.sprites.criticalArrowUp1,
            skin.sprites.criticalArrowUp2,
            skin.sprites.criticalArrowUp3,
            skin.sprites.criticalArrowUp4,
            skin.sprites.criticalArrowUp5,
            skin.sprites.criticalArrowUp6,
        ],
        left: [
            skin.sprites.criticalArrowLeft1,
            skin.sprites.criticalArrowLeft2,
            skin.sprites.criticalArrowLeft3,
            skin.sprites.criticalArrowLeft4,
            skin.sprites.criticalArrowLeft5,
            skin.sprites.criticalArrowLeft6,
        ],
        fallback: skin.sprites.criticalArrowFallback,
    }
}
