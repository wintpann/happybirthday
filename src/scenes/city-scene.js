import { WalkScene } from '../walk-scene.js';
import { Emitter } from '../emitter.js';
import { BuildingElement } from '../elements/building.js';
import { BenchElement } from '../elements/bench.js';
import { StoreElement } from '../elements/store.js';
import { CarElement } from '../elements/car.js';

export class CityScene extends WalkScene {
  constructor() {
    super({
      emitter: new Emitter({
        GENERIC_GoToIU: 'GENERIC_GoToIU',
        GOAL_GoToOffice: 'GOAL_GoToOffice',
        GOAL_TakePizza: 'GOAL_TakePizza',
      }),
      sceneName: 'Город',
      audio: '../audio/city.mp3',
    });

    this.store = new StoreElement({ x: 60 });
    this.benceh = new BenchElement({ x: 16 });
    this.office = new BuildingElement({
      x: -49,
      description: 'Офис ИнтернетУрок',
      interaction: [
        {
          key: 'f',
          description: 'Зайти в офис',
          callback: () => {
            this.emitter.emit(this.emitter.events.GENERIC_GoToIU);
            this.emitter.emit(this.emitter.events.GOAL_GoToOffice);
          },
        },
      ],
    });

    this.addToRender(this.office, this.store, this.benceh);
  }

  addCourier() {
    this.courier = new CarElement({
      x: -80,
      description: 'Курьер',
      interaction: [
        {
          key: 'f',
          description: 'Забрать пиццу!',
          callback: () => this.emitter.emit(this.emitter.events.GOAL_TakePizza),
        },
      ],
    });
    this.addToRender(this.courier)
  }

  removeCourier() {
    this.removeFromRender(this.courier)
  }
}
