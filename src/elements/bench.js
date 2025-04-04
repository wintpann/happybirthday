import { Element } from '../element.js';

export class BenchElement extends Element {
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
        '  ___________________________',
        ' |__:_____________________:__|',
        '   |_|___________________|_|',
        '  /__.___________________.__\\',
        '   |_|                   |_|',
      ],
      description: 'Лавочка',
      ...params,
    });
  }
}
