import { RENDER_WINDOW } from './constants.js';
import { Player } from './player.js';
import { io } from './io.js';
import { renderer } from './renderer.js';
import { HUDElement } from './hud-element.js';
import { Sound } from './sound.js';
import { BaseScene } from './base-scene.js';

export class WalkScene extends BaseScene {
  unloadDestroyers = new Set();
  lastPlayerMoveTimestamp = Date.now();
  intersectionElement = null;
  intersectionElementInteractionsDestroyers = new Set();
  sound = null;

  /**
   * @param {Object} [params]
   * @param {number} [params.initialPlayerX]
   * @param {string} [params.audio]
   * @param {Emitter} [params.emitter]
   * @param {string} [params.sceneName]
   */
  constructor(params = {}) {
    super();
    this.player = new Player(params.initialPlayerX);
    this.emitter = params.emitter;
    this.addToRender(this.player);
    this.hud = new HUDElement();
    this.addToRender(this.hud);
    this.onPlayerUpdatePosition();
    this.sound = params.audio ? new Sound(params.audio) : null;
    this.sceneName = params.sceneName;
  }

  updateLastPlayerMove() {
    this.lastPlayerMoveTimestamp = Date.now();
  }

  isPlayerMovedLast(ms) {
    return Date.now() - this.lastPlayerMoveTimestamp < ms;
  }

  updateRenderWindow() {
    this.renderWindowXOffset = Math.round(
      this.player.x - RENDER_WINDOW.WIDTH / 2,
    );
  }

  findIntersectionElement() {
    const possibleIntersectionElements = new Set(this.renderElements);
    possibleIntersectionElements.delete(this.player);
    possibleIntersectionElements.delete(this.hud);
    const entries = Array.from(possibleIntersectionElements).map((element) => [
      element,
      element.getRenderPointEntries().map(([coords]) => coords),
    ]);
    const playerRenderPoints = this.player
      .getRenderPointEntries()
      .map(([coords]) => coords);
    for (const [renderElement, renderPoints] of entries) {
      const mergedPoints = new Set([...renderPoints, ...playerRenderPoints]);
      if (mergedPoints.size < playerRenderPoints.length + renderPoints.length) {
        this.intersectionElement = renderElement;
        return;
      }
    }
    this.intersectionElement = null;
  }

  updateHUD() {
    this.hud.updateX(this.renderWindowXOffset + 2);
    this.intersectionElementInteractionsDestroyers.forEach((cb) => cb());
    this.intersectionElementInteractionsDestroyers.clear();
    const sceneName = this.sceneName ? `Локация: "${this.sceneName}"` : '';
    const sceneTitle = sceneName
      ? sceneName.padStart((RENDER_WINDOW.WIDTH + sceneName.length) / 2)
      : sceneName;

    if (!this.intersectionElement) {
      this.hud.updateColumns([sceneTitle].filter(Boolean));
      return;
    }

    const intersectionElementInteractions =
      this.intersectionElement.interaction.map(
        ({ key, callback, description }) => {
          const destroy = io.keydown({
            [key]: () => renderer.update(callback),
          });
          this.intersectionElementInteractionsDestroyers.add(destroy);
          return `${key.toUpperCase()}: ${description}`;
        },
      );

    this.hud.updateColumns(
      [
        sceneTitle,
        HUDElement.EmptyColumn,
        this.intersectionElement.description,
        ...intersectionElementInteractions,
      ].filter(Boolean),
    );
  }

  onPlayerUpdatePosition() {
    this.updateLastPlayerMove();
    this.updateRenderWindow();
    this.findIntersectionElement();
    this.updateHUD();
  }

  load() {
    this.sound?.fadeIn();
    this.onPlayerUpdatePosition();
    this.unloadDestroyers.add(
      io.keydown({
        ArrowLeft: () =>
          renderer.update(() => {
            this.player.moveLeft();
            this.onPlayerUpdatePosition();
          }),
        ArrowRight: () =>
          renderer.update(() => {
            this.player.moveRight();
            this.onPlayerUpdatePosition();
          }),
      }),
    );

    const standStillHandler = () => {
      if (!this.isPlayerMovedLast(450)) {
        renderer.update(() => this.player.stand());
      }
    };
    this.unloadDestroyers.add(
      io.keyup(
        { ArrowLeft: standStillHandler, ArrowRight: standStillHandler },
        { debounce: 500 },
      ),
    );
  }

  unload() {
    this.sound?.fadeOut();
    Array.from(this.unloadDestroyers).forEach((cb) => cb());
    this.unloadDestroyers.clear();
    this.intersectionElementInteractionsDestroyers.forEach((cb) => cb());
    this.intersectionElementInteractionsDestroyers.clear();
  }
}
