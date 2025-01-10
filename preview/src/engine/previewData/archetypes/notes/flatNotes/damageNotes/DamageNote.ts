import { skin } from "../../../../skin.js";
import { SlimNote } from "../SlimNote.js";

export class DamageNote extends SlimNote {
  sprites = {
    left: skin.sprites.damageNoteLeft,
    middle: skin.sprites.damageNoteMiddle,
    right: skin.sprites.damageNoteRight,
    fallback: skin.sprites.damageNoteFallback,
  };
}
