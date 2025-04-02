import { Element } from '../element.js';

export class TreeElement extends Element {
  /**
   * @param {Object} params
   * @param {number} params.x
   * @param {number} [params.zIndex]
   * @param {string} [params.description]
   * @param {Array<{key: string; description: string; callback: () => void}>} [params.interaction]
   */
  constructor(params) {
    super({
      body: ['   _    ', '  /|\\   ', ' / | \\  ', '/__|__\\ ', '   |    '],
      description: 'Деревце',
      ...params,
    });
  }
}
