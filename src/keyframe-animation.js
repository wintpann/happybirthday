export class KeyframesAnimation {
  constructor(initial, animations) {
    this.initial = initial;
    this.current = initial;
    this.animations = animations;
  }

  next(key) {
    const keyframes = this.animations[key];
    const currentIndex = Math.max(
      0,
      keyframes.findIndex((keyframe) => keyframe === this.current),
    );
    const nextIndex =
      currentIndex + 1 >= keyframes.length ? 0 : currentIndex + 1;
    this.current = keyframes[nextIndex];
  }

  reset() {
    this.current = this.initial;
  }
}
