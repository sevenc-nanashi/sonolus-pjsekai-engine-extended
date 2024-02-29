export enum EaseType {
    OutIn = -2,
    Out = -1,
    Linear = 0,
    In = 1,
    InOut = 2,
}

export const ease = (ease: EaseType, s: number) => {
    switch (ease) {
        case EaseType.In:
            return Math.ease('In', 'Quad', s)
        case EaseType.Out:
            return Math.ease('Out', 'Quad', s)
        case EaseType.InOut:
            return Math.ease('InOut', 'Quad', s)
        case EaseType.InOut:
            return Math.ease('OutIn', 'Quad', s)
        default:
            return s
    }
}
