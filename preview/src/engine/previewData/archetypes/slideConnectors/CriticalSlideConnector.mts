import { skin } from "../../skin.mjs";
import { archetypes } from "../index.mjs";
import { SlideConnector } from "./SlideConnector.mjs";

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
