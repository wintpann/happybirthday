import { renderer } from './renderer.js';
import { ForestScene } from './scenes/forest-scene.js';
import { CityScene } from './scenes/city-scene.js';
import { DialogScene } from './dialog-scene.js';
import { DialogCompanion } from './dialog-companion.js';
import { success } from './notify.js';

export class GameFlow {
  constructor(mountPoint) {
    renderer.mount(mountPoint);

    this.toReturnFromDialogScene = null;
    this.forestScene = new ForestScene();
    this.cityScene = new CityScene();
    this.dialogScene = new DialogScene();

    this.genericEvents();
    this.goalEvents();
  }

  genericEvents() {
    this.dialogScene.emitter.on(
      this.dialogScene.emitter.events.GENERIC_ExitDialog,
      () => renderer.loadScene(this.toReturnFromDialogScene),
    );

    this.forestScene.emitter.on(
      this.forestScene.emitter.events.GENERIC_GoToCity,
      () => renderer.loadScene(this.cityScene),
    );
    this.forestScene.emitter.on(
      this.forestScene.emitter.events.GENERIC_Talk,
      (e) => {
        this.dialogScene.setActiveCompanion(e.detail.companion);
        renderer.loadScene(this.dialogScene);
        this.toReturnFromDialogScene = this.forestScene;
      },
    );

    this.cityScene.emitter.on(
      this.cityScene.emitter.events.GENERIC_GoToForest,
      () => renderer.loadScene(this.forestScene),
    );
  }

  goalEvents() {
    this.forestScene.emitter
      .wait(this.forestScene.emitter.events.GOAL_1FirstTalk)
      .then(() => {
        success(
          'Первая цель достигнута: поговорить с Сережей! Первый подарок ждет тебя в кухонном диване!',
        );
        return this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Sereja,
          'Что ето?',
          'Это ты жопка какая! Я значит хотел приехать такой в 00:00 сегодня и вручить тебе пакетик с подарками...',
        );
      })
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Sereja,
          'И чего????',
          'А ты ко мне домой приехала..',
        ),
      )
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Sereja,
          'Ну иииии... чего????',
          'А я не могу просто пакетик дома подарить.. надо было что то срочно придуматб!',
        ),
      )
      .then(() =>
        this.dialogScene.executeDisposableQuestion(
          DialogCompanion.Sereja,
          'И чего придумал?',
          'Придумал что этот квест поможет тебе найти подарки которые спрятаны дома..... что конкретно делать не скажу, а еще карта бесконечная, смотри не заблудись..',
        ),
      )
      .then(() =>
        this.forestScene.emitter.wait(
          this.forestScene.emitter.events.GOAL_2GoToCity,
        ),
      )
      .then(() => {
        success(
          'Вторая цель достигнута: выйти в город! Второй подарок ты найдешь... в духовом шкафу',
        );
        this.cityScene.pigeon.updateInteraction([
          {
            key: 'f',
            description: 'Покормить голубя!',
            callback: () =>
              this.cityScene.emitter.emit(
                this.cityScene.emitter.events.GOAL_3FeedAPigeon,
              ),
          },
        ]);
        return this.cityScene.emitter.wait(
          this.cityScene.emitter.events.GOAL_3FeedAPigeon,
        );
      })
      .then(() => {
        this.cityScene.pigeon.updateInteraction([]);
        this.cityScene.updateHUD();
        success(
          'Финальная цель достигнута: покормить голубя! Финальный подарок спрятался за твоей картиной :з',
        );
      });
  }

  start() {
    renderer.loadScene(this.forestScene);
  }
}
