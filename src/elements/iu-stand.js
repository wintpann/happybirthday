import { Element } from '../element.js';

export class IUStandElement extends Element {
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
        '   //////-----------------------------------------------------------------\\\\\\\\\\\\',
        '   ||  |   _____       _                       _   _    _           _      |  ||',
        '   ||  |  |_   _|     | |                     | | | |  | |         | |     |  ||',
        '   ||  |    | |  _ __ | |_ ___ _ __ _ __   ___| |_| |  | |_ __ ___ | | __  |  ||',
        '   ||  |    | | | \'_ \\| __/ _ | \'__| \'_ \\ / _ | __| |  | | \'__/ _ \\| |/ /  |  ||',
        '   ||  |   _| |_| | | | ||  __| |  | | | |  __| |_| |__| | | | (_) |   <   |  ||',
        '   ||  |  |_____|_| |_|\\__\\___|_|  |_| |_|\\___|\\__|\\____/|_|  \\___/|_|\\_\\  |  ||',
        '   ||  |                                                                   |  ||',
        '   ||\\\\\\\\-----------------------------------------------------------------////||',
        '   ||                                                                         ||',
        '   ||                                                                         ||',
        '   ||                                                                         ||',
        ' __||__                                                                     __||__',
        '|______|                                                                   |______|',
      ],
      description: 'Стенд "ИнтернетУрок"',
      ...params,
    });
  }
}
