import { EngineArchetypeName } from "@sonolus/core";
import { BpmChange } from "./BpmChange.js";
import { Initialization } from "./Initialization.js";
import { SimLine } from "./SimLine.js";
import { Stage } from "./Stage.js";
import { TimeScaleChange } from "./TimeScaleChange.js";
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

import { Guide } from "./Guide.js";
import { DamageNote } from "./notes/flatNotes/damageNotes/DamageNote.js";
import { CriticalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/CriticalTraceFlickNote.js";
import { NonDirectionalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/NonDirectionalTraceFlickNote.js";
import { NormalTraceFlickNote } from "./notes/flatNotes/traceFlickNotes/NormalTraceFlickNote.js";
import { CriticalTraceNote } from "./notes/flatNotes/traceNotes/CriticalTraceNote.js";
import { NormalTraceNote } from "./notes/flatNotes/traceNotes/NormalTraceNote.js";

export const archetypes = defineArchetypes({
  Initialization,

  [EngineArchetypeName.BpmChange]: BpmChange,
  TimeScaleChange,

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

  HiddenSlideTickNote,
  NormalSlideTickNote,
  CriticalSlideTickNote,

  IgnoredSlideTickNote,
  NormalAttachedSlideTickNote,
  CriticalAttachedSlideTickNote,

  NormalSlideConnector,
  CriticalSlideConnector,

  SimLine,

  // Extended

  NormalTraceNote,
  CriticalTraceNote,

  NormalTraceSlideStartNote: NormalTraceNote,
  CriticalTraceSlideStartNote: CriticalTraceNote,
  NormalTraceSlideEndNote: NormalTraceNote,
  CriticalTraceSlideEndNote: CriticalTraceNote,

  DamageNote,

  NormalTraceFlickNote,
  CriticalTraceFlickNote,
  NonDirectionalTraceFlickNote,

  Guide,
  HiddenSlideStartNote: HiddenSlideTickNote,
});
