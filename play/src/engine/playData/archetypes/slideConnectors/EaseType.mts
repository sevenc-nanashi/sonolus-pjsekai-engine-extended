export const EaseType = {
    OutIn: -2,
    Out: -1,
    Linear: 0,
    In: 1,
    InOut: 2,
} as const

export type EaseType = (typeof EaseType)[keyof typeof EaseType]

export const ease = (ease: EaseType, s: number) => {
    if (ease === EaseType.In) {
        return Math.ease('In', 'Quad', s)
    } else if (ease === EaseType.Out) {
        return Math.ease('Out', 'Quad', s)
    } else if (ease === EaseType.InOut) {
        return Math.ease('InOut', 'Quad', s)
    } else if (ease === EaseType.OutIn) {
        return Math.ease('OutIn', 'Quad', s)
    } else {
        return s
    }
}