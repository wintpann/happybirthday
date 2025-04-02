export class Sound {
  sound;
  static TICK_INTERVAL = 13;

  constructor(src, infinite = true) {
    this.sound = new Audio(src);
    if (infinite) {
      this.sound.addEventListener('ended', () => this.fadeIn());
    }
  }

  adjustVolume(newVolume, duration = 500) {
    const originalVolume = this.sound.volume;
    const delta = newVolume - originalVolume;

    if (!delta) {
      return Promise.resolve();
    }

    const ticks = Math.floor(duration / Sound.TICK_INTERVAL);
    let tick = 1;

    return new Promise((resolve) => {
      const timer = setInterval(() => {
        this.sound.volume = originalVolume + (tick / ticks) * delta;

        if (++tick === ticks + 1) {
          clearInterval(timer);
          resolve();
        }
      }, Sound.TICK_INTERVAL);
    });
  }

  fadeIn(duration = 500) {
    this.sound.volume = 0;
    this.sound.play();
    return this.adjustVolume(1, duration);
  }

  fadeOut(duration = 500) {
    this.adjustVolume(0, duration).then(() => {
      this.sound.pause();
      this.sound.volume = 1;
    });
  }
}
