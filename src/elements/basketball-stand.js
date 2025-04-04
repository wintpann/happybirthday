import { Element } from '../element.js';

export class BasketballStandElement extends Element {
  /**
   * @param {Object} params
   * @param {number} params.x
   * @param {number} [params.zIndex]
   * @param {string} [params.description]
   * @param {Array<{key: string; description: string; callback: () => void}>} [params.interaction]
   */
  constructor(params) {
    super({
      body: [
        ' ________',
        '|   __   |',
        '|  |__|  |',
        '|___WW___|',
        '    ||',
        '    ||',
        '    ||',
        '    ||',
      ],
      description: 'Баскетбольный стенд',
      ...params,
    });
  }
}
