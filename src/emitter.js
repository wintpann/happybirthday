export class Emitter {
  target = new EventTarget();

  constructor(events) {
    this.events = events;
  }

  emit(event, detail) {
    this.target.dispatchEvent(new CustomEvent(event, { detail }));
  }

  once(event, callback) {
    this.target.addEventListener(event, callback, { once: true });
    return () => this.target.removeEventListener(event, callback);
  }

  wait(event) {
    return new Promise((resolve) => this.once(event, resolve));
  }

  on(event, callback) {
    this.target.addEventListener(event, callback);
    return () => this.target.removeEventListener(event, callback);
  }

  off(event, callback) {
    this.target.removeEventListener(event, callback);
  }
}
