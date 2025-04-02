import { Element } from '../element.js';

export class CockElement extends Element {
  /**
   * @param {Object} params
   * @param {number} params.x
   * @param {number} [params.zIndex]
   * @param {string} [params.description]
   * @param {Array<{key: string; description: string; callback: () => void}>} [params.interaction]
   */
  constructor(params) {
    super({
      body: ['   \\\\', '   (o>', '\\\\_//)', ' \\_/_)', '  _|_'],
      description: 'Петушок',
      ...params,
    });
  }
}
