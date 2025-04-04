import { Element } from './element.js';
import { KeyframesAnimation } from './keyframe-animation.js';
import { Z_INDEX } from './constants.js';

export class Player extends Element {
  constructor(x = 0) {
    const animation = new KeyframesAnimation([' o ', '/|\\', ' | ', '/ \\'], {
      movingRight: [
        [' o ', '/|\\', ' ) ', '/ \\'],
        [' o ', '/|\\', ' ) ', '/| '],
        [' o ', '/|\\', ' ) ', ' / '],
      ],
      movingLeft: [
        [' o ', '/|\\', ' ( ', '/ \\'],
        [' o ', '/|\\', ' ( ', ' |\\'],
        [' o ', '/|\\', ' ( ', ' \\ '],
      ],
    });
    super({
      x,
      zIndex: Z_INDEX.PLAYER,
      body: animation.initial,
    });
    this.animation = animation;
  }

  moveLeft(delta = -1) {
    this.updateXByDelta(delta);
    this.animation.next('movingLeft');
    this.update(this.animation.current);
  }

  moveRight(delta = 1) {
    this.updateXByDelta(delta);
    this.animation.next('movingRight');
    this.update(this.animation.current);
  }

  stand() {
    this.animation.reset();
    this.update(this.animation.current);
  }
}
