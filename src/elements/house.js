import { Element } from '../element.js';

export class HouseElement extends Element {
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
        '     ________________     ',
        '    /\\               \\    ',
        '   /  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\   ',
        '  /    \\               \\  ',
        ' /______\\_______________\\ ',
        ' |  __   |              | ',
        ' | |__|  |              | ',
        ' | |__|  |              | ',
        ' |_______|______________| ',
      ],
      description: 'Похоже на дом',
      ...params,
    });
  }
}
