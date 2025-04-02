import { RENDER_WINDOW, SYMBOL } from './constants.js';

export class Element {
  /**
   * @param {Object} params
   * @param {number} params.x
   * @param {number} params.zIndex
   * @param {array} params.body
   * @param {string} [params.description]
   * @param {Array<{key: string; description: string; callback: () => void}>} [params.interaction]
   */
  constructor(params) {
    this.x = params.x;
    this.body = params.body;
    this.zIndex = params.zIndex || 0;
    this.description = params.description || '';
    this.interaction = params.interaction || [];
  }

  update(body) {
    this.body = body;
  }

  updateDescription(description) {
    this.description = description;
  }

  updateInteraction(interaction) {
    this.interaction = interaction;
  }

  updateXByDelta(delta) {
    this.x = this.x + delta;
  }

  updateX(x) {
    this.x = x;
  }

  getRenderPointEntries() {
    const entries = [];

    for (let i = 0; i < this.body.length; i++) {
      for (let j = 0; j < this.body[i].length; j++) {
        const y = RENDER_WINDOW.HEIGHT - this.body.length + i;
        const x = this.x + j;
        if (this.body[i][j] !== SYMBOL.EMPTY) {
          entries.push([`${x}:${y}`, this.body[i][j]]);
        }
      }
    }

    return entries;
  }
}
