import { createBuckets } from "../../../../shared/src/engine/data/buckets.js";
import { skin } from "./skin.js";

export const buckets = defineBuckets(createBuckets(skin.sprites));
