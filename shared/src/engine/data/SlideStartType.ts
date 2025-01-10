export const SlideStartType = {
  Tap: 0,
  Trace: 1,
  None: 2,
} as const;

export type SlideStartType =
  (typeof SlideStartType)[keyof typeof SlideStartType];
