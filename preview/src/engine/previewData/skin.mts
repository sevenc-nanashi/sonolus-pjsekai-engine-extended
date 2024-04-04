import { SkinSpriteName } from '@sonolus/core'
import { panel } from './panel.mjs'

export const skin = defineSkin({
    sprites: {
        lane: SkinSpriteName.Lane,
        stageLeftBorder: SkinSpriteName.StageLeftBorder,
        stageRightBorder: SkinSpriteName.StageRightBorder,

        simLine: SkinSpriteName.SimultaneousConnectionNeutral,

        normalNoteLeft: 'Sekai Note Cyan Left',
        normalNoteMiddle: 'Sekai Note Cyan Middle',
        normalNoteRight: 'Sekai Note Cyan Right',
        normalNoteFallback: SkinSpriteName.NoteHeadCyan,

        slideNoteLeft: 'Sekai Note Green Left',
        slideNoteMiddle: 'Sekai Note Green Middle',
        slideNoteRight: 'Sekai Note Green Right',
        slideNoteFallback: SkinSpriteName.NoteHeadGreen,
        slideNoteEndFallback: SkinSpriteName.NoteTailGreen,

        flickNoteLeft: 'Sekai Note Red Left',
        flickNoteMiddle: 'Sekai Note Red Middle',
        flickNoteRight: 'Sekai Note Red Right',
        flickNoteFallback: SkinSpriteName.NoteHeadRed,
        flickNoteEndFallback: SkinSpriteName.NoteTailRed,

        criticalNoteLeft: 'Sekai Note Yellow Left',
        criticalNoteMiddle: 'Sekai Note Yellow Middle',
        criticalNoteRight: 'Sekai Note Yellow Right',
        criticalNoteFallback: SkinSpriteName.NoteHeadYellow,
        criticalNoteEndFallback: SkinSpriteName.NoteTailYellow,

        normalSlideTickNote: 'Sekai Diamond Green',
        normalSlideTickNoteFallback: SkinSpriteName.NoteTickGreen,

        criticalSlideTickNote: 'Sekai Diamond Yellow',
        criticalSlideTickNoteFallback: SkinSpriteName.NoteTickYellow,

        normalSlideConnectorNormal: 'Sekai Slide Connection',
        normalSlideConnectorFallback: SkinSpriteName.NoteConnectionGreenSeamless,

        criticalSlideConnectorNormal: 'Sekai Critical Slide Connection',
        criticalSlideConnectorFallback: SkinSpriteName.NoteConnectionYellowSeamless,

        flickArrowUp1: 'Sekai Flick Arrow Red Up 1',
        flickArrowUp2: 'Sekai Flick Arrow Red Up 2',
        flickArrowUp3: 'Sekai Flick Arrow Red Up 3',
        flickArrowUp4: 'Sekai Flick Arrow Red Up 4',
        flickArrowUp5: 'Sekai Flick Arrow Red Up 5',
        flickArrowUp6: 'Sekai Flick Arrow Red Up 6',
        flickArrowLeft1: 'Sekai Flick Arrow Red Left 1',
        flickArrowLeft2: 'Sekai Flick Arrow Red Left 2',
        flickArrowLeft3: 'Sekai Flick Arrow Red Left 3',
        flickArrowLeft4: 'Sekai Flick Arrow Red Left 4',
        flickArrowLeft5: 'Sekai Flick Arrow Red Left 5',
        flickArrowLeft6: 'Sekai Flick Arrow Red Left 6',
        flickArrowFallback: SkinSpriteName.DirectionalMarkerRed,

        criticalArrowUp1: 'Sekai Flick Arrow Yellow Up 1',
        criticalArrowUp2: 'Sekai Flick Arrow Yellow Up 2',
        criticalArrowUp3: 'Sekai Flick Arrow Yellow Up 3',
        criticalArrowUp4: 'Sekai Flick Arrow Yellow Up 4',
        criticalArrowUp5: 'Sekai Flick Arrow Yellow Up 5',
        criticalArrowUp6: 'Sekai Flick Arrow Yellow Up 6',
        criticalArrowLeft1: 'Sekai Flick Arrow Yellow Left 1',
        criticalArrowLeft2: 'Sekai Flick Arrow Yellow Left 2',
        criticalArrowLeft3: 'Sekai Flick Arrow Yellow Left 3',
        criticalArrowLeft4: 'Sekai Flick Arrow Yellow Left 4',
        criticalArrowLeft5: 'Sekai Flick Arrow Yellow Left 5',
        criticalArrowLeft6: 'Sekai Flick Arrow Yellow Left 6',
        criticalArrowFallback: SkinSpriteName.DirectionalMarkerYellow,

        beatLine: SkinSpriteName.GridNeutral,
        bpmChangeLine: SkinSpriteName.GridPurple,
        timeScaleChangeLine: SkinSpriteName.GridYellow,

        // Extended

        normalTraceNoteLeft: 'Sekai Trace Note Green Left',
        normalTraceNoteMiddle: 'Sekai Trace Note Green Middle',
        normalTraceNoteRight: 'Sekai Trace Note Green Right',
        normalTraceNoteSecondaryFallback: SkinSpriteName.NoteHeadGreen,

        criticalTraceNoteLeft: 'Sekai Trace Note Yellow Left',
        criticalTraceNoteMiddle: 'Sekai Trace Note Yellow Middle',
        criticalTraceNoteRight: 'Sekai Trace Note Yellow Right',
        criticalTraceNoteFallback: SkinSpriteName.NoteHeadYellow,

        traceFlickNoteLeft: 'Sekai Trace Note Red Left',
        traceFlickNoteMiddle: 'Sekai Trace Note Red Middle',
        traceFlickNoteRight: 'Sekai Trace Note Red Right',
        traceFlickTickNote: 'Sekai Diamond Red',
        traceFlickTickNoteFallback: SkinSpriteName.NoteTickRed,

        guideGreen: 'Sekai+ Guide Green',
        guideGreenFallback: SkinSpriteName.NoteConnectionGreenSeamless,
        guideYellow: 'Sekai+ Guide Yellow',
        guideYellowFallback: SkinSpriteName.NoteConnectionYellowSeamless,
        guideRed: 'Sekai+ Guide Red',
        guideRedFallback: SkinSpriteName.NoteConnectionRedSeamless,
        guidePurple: 'Sekai+ Guide Purple',
        guidePurpleFallback: SkinSpriteName.NoteConnectionPurpleSeamless,
        guideCyan: 'Sekai+ Guide Cyan',
        guideCyanFallback: SkinSpriteName.NoteConnectionCyanSeamless,
        guideBlue: 'Sekai+ Guide Blue',
        guideBlueFallback: SkinSpriteName.NoteConnectionBlueSeamless,
        guideNeutral: 'Sekai+ Guide Neutral',
        guideNeutralFallback: SkinSpriteName.NoteConnectionNeutralSeamless,
        guideBlack: 'Sekai+ Guide Black',
        guideBlackFallback: SkinSpriteName.NoteConnectionNeutralSeamless,

        damageNoteLeft: 'Sekai Trace Note Purple Left',
        damageNoteMiddle: 'Sekai Trace Note Purple Middle',
        damageNoteRight: 'Sekai Trace Note Purple Right',
        damageNoteFallback: SkinSpriteName.NoteHeadPurple,

        backgroundDim: 'Sekai+ Black Background',
    },
})

export const layer = {
    note: {
        arrow: 101,
        body: 100,
        connector: 99,
        guide: 98
    },

    simLine: 90,

    line: 10,

    stage: 0,
}

export const line = (sprite: SkinSprite, beat: number, a: number) => {
    const pos = panel.getPos(bpmChanges.at(beat).time)

    sprite.draw(
        new Rect({
            l: -6,
            r: 6,
            b: -panel.h * 0.0025,
            t: panel.h * 0.0025,
        }).add(pos),
        layer.line,
        a
    )
}

export const getZ = (layer: number, time: number, lane: number) =>
    (layer - time / 1000 - lane / 100000) * 10

export const getZwithLayer = (layer: number, time: number, lane: number, priority: number) =>
    (layer - time / 1000 - lane / 100000) * 10 + priority