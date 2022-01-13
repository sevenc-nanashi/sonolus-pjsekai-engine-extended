import {
    And,
    bool,
    EntityMemory,
    Equal,
    Greater,
    GreaterOr,
    If,
    InputAccuracy,
    InputBucket,
    InputBucketValue,
    InputJudgment,
    InputOffset,
    Multiply,
    Not,
    Or,
    ParticleEffect,
    Script,
    Subtract,
    Time,
    TouchId,
    TouchST,
    TouchStarted,
} from 'sonolus.js'
import { options } from '../../configuration/options'
import { buckets } from '../buckets'
import { Layer, windows } from './common/constants'
import {
    playNoteEffect,
    playNoteLaneEffect,
    playSlotEffect,
} from './common/effect'
import {
    checkNoteTimeInEarlyWindow,
    checkTouchXInNoteHitbox,
    initializeNoteSimLine,
    InputState,
    noteBottom,
    NoteData,
    noteInputState,
    noteScale,
    noteSpawnTime,
    noteTop,
    noteZ,
    preprocessNote,
    updateNoteY,
} from './common/note'
import {
    calculateNoteLayout,
    getNoteLayout,
    noteTraceGraySprite,
    noteTraceYellowSprite,
} from './common/note-sprite'
import {
    calculateTickLayout,
    getTickLayout,
    tickGraySprite,
    tickYellowSprite,
} from './common/tick-sprite'
import {
    playCriticalTraceJudgmentSFX,
    playTraceJudgmentSFX,
} from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { disallowEmpties, disallowEnds, disallowStart } from './input'

export function traceNote(isCritical: boolean): Script {
    const bucket = isCritical
        ? buckets.criticalTraceNoteIndex
        : buckets.traceNoteIndex
    const window = isCritical
        ? windows.tapNote.critical
        : windows.tapNote.normal
    const noteSprite = isCritical ? noteTraceYellowSprite : noteTraceGraySprite
    const tickSprite = isCritical ? tickYellowSprite : tickGraySprite

    const noteLayout = getNoteLayout(EntityMemory.to(0))
    const tickLayout = getTickLayout(EntityMemory.to(0))

    const preprocess = [
        preprocessNote(bucket, window.good.late, 0.625, Layer.NoteBody),
        calculateNoteLayout(NoteData.center, NoteData.width, noteLayout),
        calculateTickLayout(NoteData.center, NoteData.width, tickLayout),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize = initializeNoteSimLine()

    const touch = Or(
        options.isAutoplay,
        And(
            Not(bool(noteInputState)),
            Or(
                And(
                    checkNoteTimeInEarlyWindow(window.good.early),
                    TouchStarted
                ),
                checkNoteTimeInEarlyWindow(0)
            ),
            Not(disallowStart),
            checkTouchYInHitbox(),
            checkTouchXInNoteHitbox(),
            onComplete()
        )
    )

    const updateParallel = Or(
        And(options.isAutoplay, GreaterOr(Time, NoteData.time)),
        Equal(noteInputState, InputState.Terminated),
        Greater(Subtract(Time, NoteData.time, InputOffset), window.good.late),
        [
            updateNoteY(),

            noteSprite.draw(noteScale, noteBottom, noteTop, noteLayout, noteZ),
            tickSprite.draw(noteScale, noteBottom, noteTop, tickLayout, noteZ),
        ]
    )

    const terminate = And(options.isAutoplay, playVisualEffects())

    return {
        preprocess: {
            code: preprocess,
        },
        spawnOrder: {
            code: spawnOrder,
        },
        shouldSpawn: {
            code: shouldSpawn,
        },
        initialize: {
            code: initialize,
        },
        touch: {
            code: touch,
        },
        updateParallel: {
            code: updateParallel,
        },
        terminate: {
            code: terminate,
        },
    }

    function onComplete() {
        return [
            disallowStart.set(true),
            disallowEmpties.add(TouchId),
            disallowEnds.add(TouchId),
            noteInputState.set(InputState.Terminated),
            If(
                TouchStarted,
                [
                    InputJudgment.set(
                        window.judge(
                            Subtract(TouchST, InputOffset),
                            NoteData.time
                        )
                    ),
                    InputAccuracy.set(
                        Subtract(TouchST, InputOffset, NoteData.time)
                    ),
                    InputBucket.set(bucket),
                    InputBucketValue.set(Multiply(InputAccuracy, 1000)),
                ],
                [InputJudgment.set(1), InputAccuracy.set(0)]
            ),
            playVisualEffects(),
            isCritical
                ? playCriticalTraceJudgmentSFX()
                : playTraceJudgmentSFX(),
        ]
    }

    function playVisualEffects() {
        return [
            playNoteLaneEffect(),
            playNoteEffect(
                isCritical
                    ? ParticleEffect.NoteCircularTapYellow
                    : ParticleEffect.NoteCircularTapBase,
                isCritical
                    ? ParticleEffect.NoteLinearTapYellow
                    : ParticleEffect.NoteLinearTapBase,
                0,
                'normal'
            ),
            // playNoteEffect(
            //     isCritical
            //         ? ParticleEffect.NoteCircularAlternativeYellow
            //         : ParticleEffect.NoteCircularAlternativeBase,
            //     isCritical
            //         ? ParticleEffect.NoteLinearTapYellow
            //         : ParticleEffect.NoteLinearTapBase,
            //     0,
            //     'tick'
            // ),
            playSlotEffect(isCritical ? 4 : 0),
        ]
    }
}
