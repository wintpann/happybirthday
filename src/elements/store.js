import { Element } from '../element.js';

export class StoreElement extends Element {
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
        '           _   _._',
        "          |_|-'_~_`-._",
        "       _.-'-_~_-~_-~-_`-._",
        "   _.-'_~-_~-_-~-_~_~-_~-_`-._",
        '  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~',
        '    |  []  []   []   []  [] |',
        '    |           __    ___   |   ',
        '  ._|  []  []  | .|  [___]  |_._._._._._._._._._._._._._._._._.  ',
        '  |=|________()|__|()_______|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=|=| ',
        '^^^^^^^^^^^^^^^ === ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ ',
      ],
      description: 'Магазин',
      ...params,
    });
  }
}
