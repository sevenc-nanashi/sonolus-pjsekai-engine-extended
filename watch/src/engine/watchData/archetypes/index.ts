import { Guide } from "./Guide.js";
import { Initialization } from "./Initialization.js";
import { SimLine } from "./SimLine.js";
import { Stage } from "./Stage.js";
import { CriticalSlideEndNote } from "./notes/flatNotes/CriticalSlideEndNote.js";
import { CriticalSlideStartNote } from "./notes/flatNotes/CriticalSlideStartNote.js";
import { CriticalTapNote } from "./notes/flatNotes/CriticalTapNote.js";
import { DamageNote } from "./notes/flatNotes/DamageNote.js";
import { HiddenSlideStartNote } from "./notes/flatNotes/HiddenSlideStartNote.js";
import { NormalSlideEndNote } from "./notes/flatNotes/NormalSlideEndNote.js";
import { NormalSlideStartNote } from "./notes/flatNotes/NormalSlideStartNote.js";
import { NormalTapNote } from "./notes/flatNotes/NormalTapNote.js";
import { CriticalFlickNote } from "./notes/flatNotes/flickNotes/CriticalFlickNote.js";
import { CriticalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/CriticalSlideEndFlickNote.js";
import { NormalFlickNote } from "./notes/flatNotes/flickNotes/NormalFlickNote.js";
import { NormalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/NormalSlideEndFlickNote.js";
import { CriticalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/CriticalTraceFlickNote.js";
import { NonDirectionalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/NonDirectionalTraceFlickNote.js";
import { NormalTraceFlickNote } from "./notes/flatNotes/flickNotes/traceFlickNotes/NormalTraceFlickNote.js";
import { CriticalSlideTraceNote } from "./notes/flatNotes/traceNotes/CriticalSlideTraceNote.js";
import { CriticalTraceNote } from "./notes/flatNotes/traceNotes/CriticalTraceNote.js";
import { CriticalTraceSlideEndNote } from "./notes/flatNotes/traceNotes/CriticalTraceSlideEndNote.js";
import { NormalSlideTraceNote } from "./notes/flatNotes/traceNotes/NormalSlideTraceNote.js";
import { NormalTraceNote } from "./notes/flatNotes/traceNotes/NormalTraceNote.js";
import { NormalTraceSlideEndNote } from "./notes/flatNotes/traceNotes/NormalTraceSlideEndNote.js";
import { HiddenSlideTickNote } from "./notes/slideTickNotes/HiddenSlideTickNote.js";
import { IgnoredSlideTickNote } from "./notes/slideTickNotes/IgnoredSlideTickNote.js";
import { CriticalSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/CriticalSlideTickNote.js";
import { NormalSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/NormalSlideTickNote.js";
import { CriticalAttachedSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/CriticalAttachedSlideTickNote.js";
import { NormalAttachedSlideTickNote } from "./notes/slideTickNotes/visibleSlideTickNotes/attachedSlideTickNotes/NormalAttachedSlideTickNote.js";
import { CriticalSlideConnector } from "./slideConnectors/CriticalSlideConnector.js";
import { NormalSlideConnector } from "./slideConnectors/NormalSlideConnector.js";
import { CriticalSlotEffect } from "./slotEffects/CriticalSlotEffect.js";
import { FlickSlotEffect } from "./slotEffects/FlickSlotEffect.js";
import { NormalSlotEffect } from "./slotEffects/NormalSlotEffect.js";
import { SlideSlotEffect } from "./slotEffects/SlideSlotEffect.js";
import { CriticalSlotGlowEffect } from "./slotGlowEffects/CriticalSlotGlowEffect.js";
import { FlickSlotGlowEffect } from "./slotGlowEffects/FlickSlotGlowEffect.js";
import { NormalSlotGlowEffect } from "./slotGlowEffects/NormalSlotGlowEffect.js";
import { SlideSlotGlowEffect } from "./slotGlowEffects/SlideSlotGlowEffect.js";
import { TimeScaleChange } from "./timeScale/TimeScaleChange.js";
import { TimeScaleGroup } from "./timeScale/TimeScaleGroup.js";

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
