import { createBuckets } from "../../../../shared/src/engine/data/buckets.mjs";
import { skin } from "./skin.mjs";

export const buckets = defineBuckets(createBuckets(skin.sprites));
