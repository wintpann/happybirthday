import { Element } from '../element.js';

export class BuildingElement extends Element {
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
        '                 _ _.-\'`-._ _',
        '                ;.\'________\'.;',
        '     _________n.[____________].n_________',
        '    |""_""_""_""||==||==||==||""_""_""_""]',
        '    |"""""""""""||..||..||..||"""""""""""|',
        '    |LI LI LI LI||LI||LI||LI||LI LI LI LI|',
        '    |.. .. .. ..||..||..||..||.. .. .. ..|',
        '    |LI LI LI LI||LI||LI||LI||LI LI LI LI|',
        ' ,,;;,;;;,;;;,;;;,;;;,;;;,;;;,;;,;;;,;;;,;;,,',
        ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;',
      ],
      description: 'Здание',
      ...params,
    });
  }
}
