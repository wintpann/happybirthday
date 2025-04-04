import { Element } from '../element.js';

export class ShelfElement extends Element {
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
        '       .--.           .---.        .-.',
        '   .---|--|   .-.     | A |  .---. |~|    .--.',
        '.--|===|Ch|---|_|--.__| S |--|:::| |~|-==-|==|---.',
        '|%%|NT2|oc|===| |~~|%%| C |--|   |_|~|CATS|  |___|-.',
        '|  |   |ah|===| |==|  | I |  |:::|=| |    |GB|---|=|',
        '|  |   |ol|   |_|__|  | I |__|   | | |    |  |___| |',
        '|~~|===|--|===|~|~~|%%|~~~|--|:::|=|~|----|==|---|=|',
        '^--^---\'--^---^-^--^--^---\'--^---^-^-^-==-^--^---^-\'',
      ],
      description: 'Библиотека: книги, справочники, документация',
      ...params,
    });
  }
}
