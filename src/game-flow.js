import { renderer } from './renderer.js';
import { CityScene } from './scenes/city-scene.js';
import { IUScene } from './scenes/iu-scene.js';
import { ShelfScene } from './scenes/shelf-scene.js';
import { DialogScene } from './dialog-scene.js';
import { notify } from './notify.js';
import { DialogCompanion } from './dialog-companion.js';

export class GameFlow {
  constructor(mountPoint) {
    renderer.mount(mountPoint);

    this.toReturnFromDialogScene = null;
    this.cityScene = new CityScene();
    this.iuScene = new IUScene();
    this.shelfScene = new ShelfScene();
    this.dialogScene = new DialogScene();

    this.genericEvents();
    this.goalEvents();
  }

  genericEvents() {
    this.dialogScene.emitter.on(
      this.dialogScene.emitter.events.GENERIC_ExitDialog,
      () => renderer.loadScene(this.toReturnFromDialogScene),
    );

    this.cityScene.emitter.on(
      this.cityScene.emitter.events.GENERIC_GoToIU,
      () => renderer.loadScene(this.iuScene),
    );

    this.shelfScene.emitter.on(
      this.shelfScene.emitter.events.GENERIC_GoBackToOffice,
      () => renderer.loadScene(this.iuScene),
    );

    this.iuScene.emitter.on(this.iuScene.emitter.events.GENERIC_GoToCity, () =>
      renderer.loadScene(this.cityScene),
    );
    this.iuScene.emitter.on(this.iuScene.emitter.events.GENERIC_GoToShelf, () =>
      renderer.loadScene(this.shelfScene),
    );
    this.iuScene.emitter.on(this.iuScene.emitter.events.GENERIC_Talk, (e) => {
      this.dialogScene.setActiveCompanion(e.detail.companion);
      renderer.loadScene(this.dialogScene);
      this.toReturnFromDialogScene = this.iuScene;
    });
  }

  goalEvents() {
    notify('Задание 0 выполнено: пройти обучение. Теперь нужно попасть в офис');
    this.cityScene.emitter
      .wait(this.cityScene.emitter.events.GOAL_GoToOffice)
      .then(() => {
        notify(
          'Задание 1 выполнено: попасть в офис. Но вот беда: в офисе неразбериха и работа встала! Найди того, кому можно помочь...',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Managers,
          'Как дела?',
          'Нужно ставить задачи, но жира легла :( Не могла бы ты сходить к девопсам и попросить нам все починить?',
        );
      })
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Managers,
          'Секундочку! Ща все будет',
          'Спасибо',
        ),
      )
      .then(() => {
        notify(
          'Задание 2 выполнено: поговорить с менеджерами. Теперь нужно найти девопсов',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Devops,
          'Приветики пистолетики! Почините жиру пожалуйста',
          'А, жира легла? Щас все починим..',
        );
      })
      .then(() => {
        notify(
          'Задание 3 выполнено: поговорить с девопсами. Задачи готовы но фронты не хотят ничего делать... Нужно разобраться с этим',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Frontend,
          'Как дела? Чего прокрастинируем...',
          'А у нас бэк пятисотит, делать нечего..',
        );
      })
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Frontend,
          'Ясно! Пойду узнаю у бэкендеров что случилось',
          'Спасибо',
        ),
      )
      .then(() => {
        notify(
          'Задание 4 выполнено: поговорить с фронтами. Теперь нужно узнать у бэков почему ничего не работает...',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Backend,
          'Привет! Стендам плохо, они похоже заболели.. Нужно подлатать',
          'А курл будет?',
        );
      })
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Backend,
          'Курла не будет. Просто почините..',
          'Ладно. Но у нас инфраструктура упала... Ничего поделать не можем, лапки..',
        ),
      )
      .then(() => {
        notify(
          'Задание 5 выполнено: поговорить с бэками. Нужно снова идти к девопсам...',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Devops,
          'Угадайте что нужно? Инфра упала, надо починить..',
          'Ничего чинить не будем.. Уже обед а мы голодные. Вот бы пиццы сейчас..',
        );
      })
      .then(
        () =>
          new Promise((resolve) => {
            notify(
              'Задание 6 выполнено: поговорить с девопсами. Нужно найти способ заказать в офис пиццу..',
            );
            this.iuScene.phone.updateInteraction([
              {
                key: 'f',
                description: 'Заказать пиццу',
                callback: () => {
                  notify(
                    'Упс, телефон срочной доставки пиццы где то потерялся.. Нужно найти',
                  );
                  this.iuScene.phone.updateInteraction([]);
                  this.iuScene.updateHUD();
                  this.shelfScene.handbook.updateInteraction([
                    {
                      key: 'f',
                      description: 'Взять номер срочной доставки пиццы',
                      callback: () => {
                        resolve();
                        notify('Ага, номер у нас в кармане');
                        this.shelfScene.handbook.updateInteraction([]);
                        this.shelfScene.updateHUD();
                      },
                    },
                  ]);
                },
              },
            ]);
          }),
      )
      .then(
        () =>
          new Promise((resolve) =>
            this.iuScene.phone.updateInteraction([
              {
                key: 'f',
                description: 'Заказать пиццу',
                callback: () => {
                  this.iuScene.phone.updateInteraction([]);
                  this.iuScene.updateHUD();
                  resolve();
                },
              },
            ]),
          ),
      )
      .then(() => {
        notify(
          'Задание 7 выполнено: заказать пиццу. Курьер уже приехал, нужно его встретить',
        );
        this.cityScene.addCourier();
        return this.cityScene.emitter.wait(
          this.cityScene.emitter.events.GOAL_TakePizza,
        );
      })
      .then(() => {
        this.cityScene.removeCourier();
        notify(
          'Задание 8 выполнено: забрать пиццу. Девопсы довольны а значит можно снова приступать к работе',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Devops,
          'Ну что? Как там с инфрой?',
          'А, нужно связаться с яндекс клаудом, че то на их стороне барахлит..',
        );
      })
      .then(
        () =>
          new Promise((resolve) => {
            notify(
              'На сегодня последнее задание: связаться с поддержкой клауда...',
            );
            this.iuScene.ycloudTower.updateInteraction([
              {
                key: 'f',
                description: 'Призвать поддержку ЯКлауд',
                callback: () => {
                  this.iuScene.ycloudTower.updateInteraction([]);
                  this.iuScene.updateHUD();
                  resolve();
                },
              },
            ]);
          }),
      )
      .then(
        () =>
          new Promise((resolve) => {
            notify(
              'Упс, недостаточно маны для призыва ЯКлауда. Нужно подкрепиться',
            );
            this.iuScene.chillings.updateInteraction([
              {
                key: 'f',
                description:
                  'Сходить на кухню и покушать пиццы. А то че это я тут весь день бегаю',
                callback: () => {
                  this.iuScene.chillings.updateInteraction([]);
                  this.iuScene.updateHUD();
                  resolve();
                },
              },
            ]);
          }),
      )
      .then(
        () =>
          new Promise((resolve) => {
            notify('Славно! Теперь можно попробовать еще раз');
            this.iuScene.ycloudTower.updateInteraction([
              {
                key: 'f',
                description: 'Призвать поддержку ЯКлауд!!!',
                callback: () => {
                  this.iuScene.ycloudTower.updateInteraction([]);
                  this.iuScene.updateHUD();
                  resolve();
                },
              },
            ]);
          }),
      )
      .then(() => {
        notify(
          'Браво! Все задачи на сегодня выполнены! Миссия завершена. Приходите как нибудь еще в наш дружный офис :з',
        );
      });
  }

  start() {
    renderer.loadScene(this.cityScene);
  }
}
