import { WalkScene } from '../walk-scene.js';
import { Emitter } from '../emitter.js';
import { CrowdElement } from '../elements/crowd.js';
import { ComputerElement } from '../elements/computer.js';
import { IUStandElement } from '../elements/iu-stand.js';
import { BasketballStandElement } from '../elements/basketball-stand.js';
import { PhoneElement } from '../elements/phone.js';
import { ChillingsElement } from '../elements/chillings.js';
import { PassElement } from '../elements/pass.js';
import { YCloudTower } from '../elements/ycloud-tower.js';
import { ShelfElement } from '../elements/shelf.js';
import { DialogCompanion } from '../dialog-companion.js';

export class IUScene extends WalkScene {
  constructor() {
    super({
      emitter: new Emitter({
        GENERIC_Talk: 'GENERIC_Talk',
        GENERIC_GoToCity: 'GENERIC_GoToCity',
        GENERIC_GoToShelf: 'GENERIC_GoToShelf',
      }),
      sceneName: 'Офис ИнтернетУрок',
      audio: '../audio/iu.mp3',
    });

    this.cityPass = new PassElement({
      x: -9,
      description: 'Выход в город',
      interaction: [
        {
          key: 'f',
          description: 'Выйти в город',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_GoToCity),
        },
      ],
    });
    this.iuStand = new IUStandElement({ x: -40 });
    this.chillings = new ChillingsElement({ x: -130 });
    this.phone = new PhoneElement({ x: 10 });
    this.basketStand1 = new BasketballStandElement({ x: 100 });
    this.basketStand2 = new BasketballStandElement({ x: -150 });
    this.myComputer = new ComputerElement({
      x: 50,
      description: 'Мой компьютер',
    });
    this.frontendCrows = new CrowdElement({
      x: 80,
      description: 'Коллеги фронтендеры',
      interaction: [
        {
          key: 'f',
          description: 'Говорить',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_Talk, {
              companion: DialogCompanion.Frontend,
            }),
        },
      ],
    });
    this.backendCrows = new CrowdElement({
      x: 110,
      description: 'Коллеги бэкендеры',
      interaction: [
        {
          key: 'f',
          description: 'Говорить',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_Talk, {
              companion: DialogCompanion.Backend,
            }),
        },
      ],
    });
    this.managersCrows = new CrowdElement({
      x: -60,
      description: 'Коллеги менеджеры',
      interaction: [
        {
          key: 'f',
          description: 'Говорить',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_Talk, {
              companion: DialogCompanion.Managers,
            }),
        },
      ],
    });
    this.devopsCrows = new CrowdElement({
      x: 160,
      description: 'Коллеги девопсы',
      interaction: [
        {
          key: 'f',
          description: 'Говорить',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_Talk, {
              companion: DialogCompanion.Devops,
            }),
        },
      ],
    });
    this.ycloudTower = new YCloudTower({ x: 140 });
    this.shelf = new ShelfElement({
      x: 190,
      interaction: [
        {
          key: 'f',
          description: 'Покопаться в библиотеке',
          callback: () =>
            this.emitter.emit(this.emitter.events.GENERIC_GoToShelf),
        },
      ],
    });

    this.addToRender(
      this.cityPass,
      this.iuStand,
      this.frontendCrows,
      this.backendCrows,
      this.basketStand1,
      this.basketStand2,
      this.ycloudTower,
      this.devopsCrows,
      this.managersCrows,
      this.chillings,
      this.phone,
      this.myComputer,
      this.shelf,
    );
  }
}
