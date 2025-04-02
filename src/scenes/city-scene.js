import { WalkScene } from '../walk-scene.js';
import { Emitter } from '../emitter.js';
import { PassElement } from '../elements/pass.js';
import { BasketballStandElement } from '../elements/basketball-stand.js';
import { PersonElement } from '../elements/person.js';
import { PigeonElement } from '../elements/pigeon.js';
import { HouseElement } from '../elements/house.js';
import { TreeElement } from '../elements/tree.js';

export class CityScene extends WalkScene {
  constructor() {
    super({
      emitter: new Emitter({
        GENERIC_GoToForest: 'GENERIC_GoToForest',
        GOAL_3FeedAPigeon: 'GOAL_3FeedAPigeon',
      }),
      sceneName: 'Город',
      audio: '../audio/city.mp3',
    });

    this.passToForest = new PassElement({
      x: -10,
      interaction: [
        {
          key: 'f',
          description: 'Уйти в лес',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_GoToForest),
        },
      ],
    });
    this.basketballStand = new BasketballStandElement({ x: 10 });
    this.person = new PersonElement({ x: 20 });
    this.house = new HouseElement({ x: 30 });
    this.house2 = new HouseElement({ x: 120 });
    this.pigeon = new PigeonElement({ x: -100 });
    this.tree1 = new TreeElement({ x: 80 });
    this.tree2 = new TreeElement({ x: -20 });

    this.addToRender(
      this.passToForest,
      this.basketballStand,
      this.person,
      this.house,
      this.house2,
      this.pigeon,
      this.tree1,
      this.tree2,
    );
  }
}
