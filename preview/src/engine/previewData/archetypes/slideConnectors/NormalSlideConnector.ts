import { skin } from "../../skin.js";
import { archetypes } from "../index.js";
import { SlideConnector } from "./SlideConnector.js";

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
