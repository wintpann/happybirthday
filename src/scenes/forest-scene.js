import { WalkScene } from '../walk-scene.js';
import { PassElement } from '../elements/pass.js';
import { Emitter } from '../emitter.js';
import { PersonElement } from '../elements/person.js';
import { DialogCompanion } from '../dialog-companion.js';
import { BatElement } from '../elements/bat.js';
import { BigBearElement } from '../elements/big-bear.js';
import { BigBushElement } from '../elements/big-bush.js';
import { TreeElement } from '../elements/tree.js';

export class ForestScene extends WalkScene {
  constructor() {
    super({
      emitter: new Emitter({
        GENERIC_GoToCity: 'GENERIC_GoToCity',
        GENERIC_Talk: 'GENERIC_Talk',
        GOAL_1FirstTalk: 'GOAL_1FirstTalk',
        GOAL_2GoToCity: 'GOAL_2GoToCity',
      }),
      sceneName: 'Лес',
      audio: '../audio/forest.mp3',
    });

    this.sereja = new PersonElement({
      x: 70,
      description: 'Сережа',
      interaction: [
        {
          key: 'f',
          description: 'Говорить',
          callback: () => {
            this.emitter.emit(this.emitter.events.GENERIC_Talk, {
              companion: DialogCompanion.Sereja,
            });
            this.emitter.emit(this.emitter.events.GOAL_1FirstTalk);
          },
        },
      ],
    });
    this.passToCity = new PassElement({
      x: -10,
      interaction: [
        {
          key: 'f',
          description: 'Уйти в город',
          callback: () => {
            this.emitter.emit(this.emitter.events.GENERIC_GoToCity);
            this.emitter.emit(this.emitter.events.GOAL_2GoToCity);
          },
        },
      ],
    });
    this.bat = new BatElement({ x: -80 });
    this.bigBear = new BigBearElement({ x: 100 });
    this.bigBush1 = new BigBushElement({ x: 20 });
    this.bigBush2 = new BigBushElement({ x: 40 });
    this.bigBush3 = new BigBushElement({ x: 50 });
    this.tree1 = new TreeElement({ x: 10 });
    this.tree2 = new TreeElement({ x: 130 });

    this.addToRender(
      this.sereja,
      this.passToCity,
      this.bat,
      this.bigBear,
      this.tree1,
      this.tree2,
      this.bigBush1,
      this.bigBush2,
      this.bigBush3,
    );
  }
}
