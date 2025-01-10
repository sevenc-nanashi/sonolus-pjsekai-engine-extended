import { skin } from "../../skin.mjs";
import { archetypes } from "../index.mjs";
import { SlideConnector } from "./SlideConnector.mjs";

export class NormalSlideConnector extends SlideConnector {
  sprites = {
    normal: skin.sprites.normalSlideConnectorNormal,
    fallback: skin.sprites.normalSlideConnectorFallback,
  };

  zOrder = 0;

  get slideStartNote() {
    return archetypes.NormalSlideStartNote;
  }
}
