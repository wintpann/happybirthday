import { Element } from './element.js';
import { RENDER_WINDOW, SYMBOL, Z_INDEX } from './constants.js';

export class HUDElement extends Element {
  static EmptyColumn = new Array(RENDER_WINDOW.WIDTH).fill(SYMBOL.EMPTY);
  constructor() {
    super({
      x: 0,
      zIndex: Z_INDEX.HUD,
      body: new Array(RENDER_WINDOW.HEIGHT).fill(HUDElement.EmptyColumn),
    });
  }

  updateColumns(columns) {
    if (columns.length > RENDER_WINDOW.HEIGHT - 1) {
      throw new Error('Too many HUD columns');
    }

    this.update([
      HUDElement.EmptyColumn,
      ...columns,
      ...new Array(RENDER_WINDOW.HEIGHT - 1 - columns.length).fill(
        HUDElement.EmptyColumn,
      ),
    ]);
  }
}
