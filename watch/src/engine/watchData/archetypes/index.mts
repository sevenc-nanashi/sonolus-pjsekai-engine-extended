import { Guide } from "./Guide.mjs";
import { Initialization } from "./Initialization.mjs";
import { SimLine } from "./SimLine.mjs";
import { Stage } from "./Stage.mjs";
import { CriticalSlideEndNote } from "./notes/flatNotes/CriticalSlideEndNote.mjs";
import { CriticalSlideStartNote } from "./notes/flatNotes/CriticalSlideStartNote.mjs";
import { CriticalTapNote } from "./notes/flatNotes/CriticalTapNote.mjs";
import { DamageNote } from "./notes/flatNotes/DamageNote.mjs";
import { HiddenSlideStartNote } from "./notes/flatNotes/HiddenSlideStartNote.mjs";
import { NormalSlideEndNote } from "./notes/flatNotes/NormalSlideEndNote.mjs";
import { NormalSlideStartNote } from "./notes/flatNotes/NormalSlideStartNote.mjs";
import { NormalTapNote } from "./notes/flatNotes/NormalTapNote.mjs";
import { CriticalFlickNote } from "./notes/flatNotes/flickNotes/CriticalFlickNote.mjs";
import { CriticalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/CriticalSlideEndFlickNote.mjs";
import { NormalFlickNote } from "./notes/flatNotes/flickNotes/NormalFlickNote.mjs";
import { NormalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/NormalSlideEndFlickNote.mjs";
import { CriticalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/CriticalTraceFlickNote.mjs";
import { NonDirectionalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/NonDirectionalTraceFlickNote.mjs";
import { NormalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/NormalTraceFlickNote.mjs";
import { CriticalSlideTraceNote } from "./notes/flatNotes/traceNotes/CriticalSlideTraceNote.mjs";
import { CriticalTraceNote } from "./notes/flatNotes/traceNotes/CriticalTraceNote.mjs";
import { CriticalTraceSlideEndNote } from "./notes/flatNotes/traceNotes/CriticalTraceSlideEndNote.mjs";
import { NormalSlideTraceNote } from "./notes/flatNotes/traceNotes/NormalSlideTraceNote.mjs";
import { NormalTraceNote } from "./notes/flatNotes/traceNotes/NormalTraceNote.mjs";
import { NormalTraceSlideEndNote } from "./notes/flatNotes/traceNotes/NormalTraceSlideEndNote.mjs";
import { HiddenSlideTickNote } from "./notes/slideTickNotes/HiddenSlideTickNote.mjs";
import { IgnoredSlideTickNote } from "./notes/slideTickNotes/IgnoredSlideTickNote.mjs";
import { CriticalSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/CriticalSlideTickNote.mjs";
import { NormalSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/NormalSlideTickNote.mjs";
import { CriticalAttachedSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/CriticalAttachedSlideTickNote.mjs";
import { NormalAttachedSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/NormalAttachedSlideTickNote.mjs";
import { CriticalSlideConnector } from "./slideConnectors/CriticalSlideConnector.mjs";
import { NormalSlideConnector } from "./slideConnectors/NormalSlideConnector.mjs";
import { CriticalSlotEffect } from "./slotEffects/CriticalSlotEffect.mjs";
import { FlickSlotEffect } from "./slotEffects/FlickSlotEffect.mjs";
import { NormalSlotEffect } from "./slotEffects/NormalSlotEffect.mjs";
import { SlideSlotEffect } from "./slotEffects/SlideSlotEffect.mjs";
import { CriticalSlotGlowEffect } from "./slotGlowEffects/CriticalSlotGlowEffect.mjs";
import { FlickSlotGlowEffect } from "./slotGlowEffects/FlickSlotGlowEffect.mjs";
import { NormalSlotGlowEffect } from "./slotGlowEffects/NormalSlotGlowEffect.mjs";
import { SlideSlotGlowEffect } from "./slotGlowEffects/SlideSlotGlowEffect.mjs";
import { TimeScaleChange } from "./timeScale/TimeScaleChange.mjs";
import { TimeScaleGroup } from "./timeScale/TimeScaleGroup.mjs";

export const archetypes = defineArchetypes({
  Initialization,

  Stage,

  NormalTapNote,
  CriticalTapNote,

  NormalFlickNote,
  CriticalFlickNote,

  NormalTraceNote,
  CriticalTraceNote,

  NormalTraceFlickNote,
  CriticalTraceFlickNote,
  NonDirectionalTraceFlickNote,

  NormalSlideTraceNote,
  CriticalSlideTraceNote,

  NormalSlideStartNote,
  CriticalSlideStartNote,
  HiddenSlideStartNote,

  NormalTraceSlideStartNote: NormalTraceNote,
  CriticalTraceSlideStartNote: CriticalTraceNote,

  NormalSlideEndNote,
  CriticalSlideEndNote,

  NormalTraceSlideEndNote,
  CriticalTraceSlideEndNote,

  NormalSlideEndFlickNote,
  CriticalSlideEndFlickNote,

  IgnoredSlideTickNote,
  NormalSlideTickNote,
  CriticalSlideTickNote,

  HiddenSlideTickNote,
  NormalAttachedSlideTickNote,
  CriticalAttachedSlideTickNote,

  NormalSlideConnector,
  CriticalSlideConnector,

  SimLine,

  NormalSlotEffect,
  SlideSlotEffect,
  FlickSlotEffect,
  CriticalSlotEffect,

  NormalSlotGlowEffect,
  SlideSlotGlowEffect,
  FlickSlotGlowEffect,
  CriticalSlotGlowEffect,

  TimeScaleChange,
  TimeScaleGroup,

  Guide,

  DamageNote,
});
