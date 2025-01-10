import { Initialization } from "./Initialization.js";
import { InputManager } from "./InputManager.js";
import { SimLine } from "./SimLine.js";
import { Stage } from "./Stage.js";
import { CriticalFlickNote } from "./notes/flatNotes/flickNotes/singleFlickNotes/CriticalFlickNote.js";
import { NormalFlickNote } from "./notes/flatNotes/flickNotes/singleFlickNotes/NormalFlickNote.js";
import { CriticalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/slideEndFlickNotes/CriticalSlideEndFlickNote.js";
import { NormalSlideEndFlickNote } from "./notes/flatNotes/flickNotes/slideEndFlickNotes/NormalSlideEndFlickNote.js";
import { CriticalSlideEndNote } from "./notes/flatNotes/slideEndNotes/CriticalSlideEndNote.js";
import { NormalSlideEndNote } from "./notes/flatNotes/slideEndNotes/NormalSlideEndNote.js";
import { CriticalSlideStartNote } from "./notes/flatNotes/slideStartNotes/CriticalSlideStartNote.js";
import { NormalSlideStartNote } from "./notes/flatNotes/slideStartNotes/NormalSlideStartNote.js";
import { CriticalTapNote } from "./notes/flatNotes/tapNotes/CriticalTapNote.js";
import { NormalTapNote } from "./notes/flatNotes/tapNotes/NormalTapNote.js";
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

import { Guide } from "./Guide.js";
import { DamageNote } from "./notes/flatNotes/damageNotes/DamageNote.js";
import { HiddenSlideStartNote } from "./notes/flatNotes/slideStartNotes/HiddenSlideStartNote.js";
import { CriticalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/CriticalTraceFlickNote.js";
import { NonDirectionalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/NonDirectionalTraceFlickNote.js";
import { NormalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/NormalTraceFlickNote.js";
import { CriticalTraceNote } from "./notes/flatNotes/traceNotes/CriticalTraceNote.js";
import { NormalTraceNote } from "./notes/flatNotes/traceNotes/NormalTraceNote.js";
import { CriticalTraceSlideEndNote } from "./notes/flatNotes/traceSlideEndNotes/CriticalTraceSlideEndNote.js";
import { NormalTraceSlideEndNote } from "./notes/flatNotes/traceSlideEndNotes/NormalTraceSlideEndNote.js";
import { CriticalTraceSlideStartNote } from "./notes/flatNotes/traceSlideStartNotes/CriticalTraceSlideStartNote.js";
import { NormalTraceSlideStartNote } from "./notes/flatNotes/traceSlideStartNotes/NormalTraceSlideStartNote.js";
import { TimeScaleChange } from "./timeScale/TimeScaleChange.js";
import { TimeScaleGroup } from "./timeScale/TimeScaleGroup.js";

export const archetypes = defineArchetypes({
  Initialization,
  InputManager,

  Stage,

  NormalTapNote,
  CriticalTapNote,

  NormalFlickNote,
  CriticalFlickNote,

  NormalSlideStartNote,
  CriticalSlideStartNote,

  NormalSlideEndNote,
  CriticalSlideEndNote,

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

  // Extended

  NormalTraceNote,
  CriticalTraceNote,

  DamageNote,

  NormalTraceFlickNote,
  CriticalTraceFlickNote,
  NonDirectionalTraceFlickNote,

  HiddenSlideStartNote,

  NormalTraceSlideStartNote,
  CriticalTraceSlideStartNote,

  NormalTraceSlideEndNote,
  CriticalTraceSlideEndNote,

  TimeScaleGroup,
  TimeScaleChange,

  Guide,
});
