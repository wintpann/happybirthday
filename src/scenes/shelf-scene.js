import { WalkScene } from '../walk-scene.js';
import { Emitter } from '../emitter.js';
import { PassElement } from '../elements/pass.js';
import { BookElement } from '../elements/book.js';

export class ShelfScene extends WalkScene {
  constructor() {
    super({
      emitter: new Emitter({
        GENERIC_GoBackToOffice: 'GENERIC_GoBackToOffice',
      }),
      sceneName: 'Книжная полка',
      audio: '../audio/shelf.mp3',
      initialPlayerX: 4,
    });

    this.docs1 = new BookElement({ x: 20, name: 'Документация #1' });
    this.docs2 = new BookElement({ x: 80, name: 'Документация #2' });
    this.docs3 = new BookElement({ x: 140, name: 'Документация #3' });
    this.docs4 = new BookElement({ x: 200, name: 'Документация #4' });
    this.docs5 = new BookElement({ x: -50, name: 'Документация #5' });
    this.docs6 = new BookElement({ x: -100, name: 'Документация #6' });
    this.handbook = new BookElement({ x: -150, name: 'Тел. справочник' });
    this.backPass = new PassElement({
      x: 0,
      description: 'Выход',
      interaction: [
        {
          key: 'f',
          description: 'Вернуться в офис',
          callback: () => {
            this.emitter.emit(this.emitter.events.GENERIC_GoBackToOffice);
          },
        },
      ],
    });

    this.addToRender(
      this.backPass,
      this.docs1,
      this.docs2,
      this.docs3,
      this.docs4,
      this.docs5,
      this.docs6,
      this.handbook,
    );
  }
}
