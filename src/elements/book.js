import { Element } from '../element.js';

export class BookElement extends Element {
  static NameMaxSize = 19;
  /**
   * @param {Object} params
   * @param {number} params.x
   * @param {number} [params.zIndex]
   * @param {string} [params.description]
   * @param {string} [params.name]
   * @param {Array<{key: string; description: string; callback: () => void}>} [params.interaction]
   */
  constructor(params) {
    const name = `${(params.name || 'Документация')
      .substring(0, BookElement.NameMaxSize)
      .padEnd(BookElement.NameMaxSize)}`;
    super({
      body: [
        `   ____/ ${name} \\____`,
        ' /| ------------- |  ------------ |\\',
        '||| ------------- | ------------- |||',
        '||| ------------- | ------------- |||',
        '||| ------- ----- | ------------- |||',
        '||| ------------- | ------------- |||',
        '||| ------------- | ------------- |||',
        '|||  ------------ | ----------    |||',
        '||| ------------- |  ------------ |||',
        '||| ------------- | ------------- |||',
        '||| ------------- | ------ -----  |||',
        '||| ------------  | ------------- |||',
        '|||_____________  |  _____________|||',
        'L/_____/--------\\\\_//W-------\\_____\\J',
      ],
      description: name,
      ...params,
    });
  }
}
