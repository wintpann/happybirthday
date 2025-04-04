import { Element } from '../element.js';

export class CarElement extends Element {
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
        '        _______',
        '       //  ||\\ \\',
        ' _____//___||_\\ \\___',
        ' )  _          _    \\',
        ' |_/ \\________/ \\___|',
        '   \\_/        \\_/',
      ],
      description: 'Машина',
      ...params,
    });
  }
}
