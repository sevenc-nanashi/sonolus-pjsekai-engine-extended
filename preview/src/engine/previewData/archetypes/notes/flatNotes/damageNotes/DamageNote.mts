import { skin } from "../../../../skin.mjs";
import { SlimNote } from "../SlimNote.mjs";

export class DamageNote extends SlimNote {
  sprites = {
    left: skin.sprites.damageNoteLeft,
    middle: skin.sprites.damageNoteMiddle,
    right: skin.sprites.damageNoteRight,
    fallback: skin.sprites.damageNoteFallback,
  };
}
