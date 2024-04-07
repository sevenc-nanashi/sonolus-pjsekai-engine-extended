import { Text } from '@sonolus/core'

export const createBuckets = (sprites: any) => ({
    normalTapNote: {
        sprites: [
            {
                id: sprites.normalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    normalFlickNote: {
        sprites: [
            {
                id: sprites.flickNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: sprites.flickArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    normalSlideStartNote: {
        sprites: [
            {
                id: sprites.normalSlideConnectorFallback.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.slideNoteFallback.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    normalSlideEndNote: {
        sprites: [
            {
                id: sprites.normalSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.slideNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    normalSlideEndFlickNote: {
        sprites: [
            {
                id: sprites.normalSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.flickNoteFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: sprites.flickArrowFallback.id,
                x: 3,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },

    criticalTapNote: {
        sprites: [
            {
                id: sprites.criticalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    criticalFlickNote: {
        sprites: [
            {
                id: sprites.criticalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: sprites.criticalArrowFallback.id,
                x: 1,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    criticalSlideStartNote: {
        sprites: [
            {
                id: sprites.criticalSlideConnectorFallback.id,
                x: 0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.criticalNoteFallback.id,
                x: -2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    criticalSlideEndNote: {
        sprites: [
            {
                id: sprites.criticalSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.criticalNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    criticalSlideEndFlickNote: {
        sprites: [
            {
                id: sprites.criticalSlideConnectorFallback.id,
                x: -0.5,
                y: 0,
                w: 2,
                h: 5,
                rotation: -90,
            },
            {
                id: sprites.criticalNoteEndFallback.id,
                x: 2,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
            {
                id: sprites.criticalArrowFallback.id,
                x: 3,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
    // Extended
    normalTraceNote: {
        sprites: [
            {
                id: sprites.normalNoteFallback.id,
                x: 0,
                y: 0,
                w: 2,
                h: 2,
                rotation: -90,
            },
        ],
        unit: Text.MillisecondUnit,
    },
})

