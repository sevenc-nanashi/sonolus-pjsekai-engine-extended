import { skin } from "../../skin.js";
import { archetypes } from "../index.js";
import { SlideConnector } from "./SlideConnector.js";

export class CriticalSlideConnector extends SlideConnector {
  sprites = {
    normal: skin.sprites.criticalSlideConnectorNormal,
    fallback: skin.sprites.criticalSlideConnectorFallback,
  };

  zOrder = 5;

  get slideStartNote() {
    return archetypes.CriticalSlideStartNote;
  }
}
