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
    noteCyanSprite,
    noteRedSprite,
    noteYellowSprite,
} from './common/note-sprite'
import { playCriticalTapJudgmentSFX, playTapJudgmentSFX } from './common/sfx'
import { checkTouchYInHitbox } from './common/touch'
import { disallowEmpties, disallowEnds, disallowStart } from './input'

export function tapNote(isCritical: boolean, isDamage: boolean): Script {
    const bucket = isCritical
        ? buckets.criticalTapNoteIndex
        : buckets.tapNoteIndex
    const window = isCritical
        ? windows.tapNote.critical
        : windows.tapNote.normal
    const noteSprite = isDamage
        ? noteRedSprite
        : isCritical
        ? noteYellowSprite
        : noteCyanSprite

    const noteLayout = getNoteLayout(EntityMemory.to(0))

    const preprocess = [
        preprocessNote(bucket, window.good.late, 0.625, Layer.NoteBody),
        calculateNoteLayout(NoteData.center, NoteData.width, noteLayout),
    ]

    const spawnOrder = noteSpawnTime

    const shouldSpawn = GreaterOr(Time, noteSpawnTime)

    const initialize = initializeNoteSimLine()

    const touch = Or(
        options.isAutoplay,
        And(
            Not(bool(noteInputState)),
            checkNoteTimeInEarlyWindow(window.good.early),
            TouchStarted,
            Not(disallowStart),
            checkTouchYInHitbox(),
            checkTouchXInNoteHitbox(),
            onComplete()
        )
    )

    const updateParallel = Or(
        And(
            Or(options.isAutoplay, NoteData.isDamage),
            GreaterOr(Time, NoteData.time)
        ),
        Equal(noteInputState, InputState.Terminated),
        Greater(Subtract(Time, NoteData.time, InputOffset), window.good.late),
        [
            updateNoteY(),

            noteSprite.draw(noteScale, noteBottom, noteTop, noteLayout, noteZ),
        ]
    )

    const terminate = [
        And(Or(options.isAutoplay, NoteData.isDamage), playVisualEffects()),
        And(NoteData.isDamage, Not(bool(noteInputState)), [
            InputJudgment.set(1),
            playTapJudgmentSFX(),
        ]),
    ]

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
            InputJudgment.set(
                If(
                    NoteData.isDamage,
                    0,
                    window.judge(Subtract(TouchST, InputOffset), NoteData.time)
                )
            ),
            InputAccuracy.set(Subtract(TouchST, InputOffset, NoteData.time)),
            InputBucket.set(bucket),
            InputBucketValue.set(Multiply(InputAccuracy, 1000)),
            playVisualEffects(),
            And(isDamage, playTapJudgmentSFX()),
            And(isCritical, playCriticalTapJudgmentSFX()),
            And(Not(isDamage), Not(isCritical), playTapJudgmentSFX()),
        ]
    }

    function playVisualEffects() {
        return [
            playNoteLaneEffect(),
            playNoteEffect(
                isCritical
                    ? ParticleEffect.NoteCircularTapYellow
                    : isDamage
                    ? ParticleEffect.NoteCircularTapRed
                    : ParticleEffect.NoteCircularTapCyan,
                isCritical
                    ? ParticleEffect.NoteLinearTapYellow
                    : isDamage
                    ? ParticleEffect.NoteLinearTapRed
                    : ParticleEffect.NoteLinearTapCyan,
                0,
                'normal'
            ),
            /* 1:Red 4: Yellow 6: Cyan*/
            playSlotEffect(isCritical ? 4 : isDamage ? 1 : 6),
        ]
    }
}
