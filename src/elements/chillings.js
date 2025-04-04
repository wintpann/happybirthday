import { Element } from '../element.js';

export class ChillingsElement extends Element {
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
        '                       !###',
        '                       ! ###',
        '                       !  ###',
        '                       !   ###',
        '  *   _________________!____###________O_______',
        '/            O          \\    ##!     ==||       \\',
        '\\O         /||--         \\    #!       //        \\',
        '||\\_        \\\\            \\    !      _\\\\   O     \\',
        '\\\\           LL            \\   !          ==||     \\',
        ' LL                         \\  !            //      \\',
        '   \\                         \\ !           _\\\\       \\',
        '    \\_________________________\\!______________________\\',
      ],
      description: 'Чил зона',
      ...params,
    });
  }
}
