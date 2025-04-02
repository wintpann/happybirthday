import { RENDER_WINDOW, SYMBOL } from './constants.js';

export class BaseScene {
  renderElements = new Set();

  constructor() {
    this.renderWindowXOffset = 0;
  }

  addToRender(...elements) {
    for (const element of elements) {
      this.renderElements.add(element);
    }
  }

  removeFromRender(element) {
    this.renderElements.delete(element);
  }

  buildRenderGrid() {
    const grid = [];
    const sortedElements = Array.from(this.renderElements).sort(
      (a, b) => a.zIndex - b.zIndex,
    );
    const gridRenderPoints = new Map(
      sortedElements.flatMap((el) => el.getRenderPointEntries()),
    );

    for (let i = 0; i < RENDER_WINDOW.HEIGHT; i++) {
      grid.push([]);
      for (
        let j = this.renderWindowXOffset;
        j < RENDER_WINDOW.WIDTH + this.renderWindowXOffset;
        j++
      ) {
        grid[i].push(gridRenderPoints.get(`${j}:${i}`) || SYMBOL.EMPTY);
      }
    }
    return grid;
  }
}
