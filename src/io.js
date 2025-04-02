import { throttle } from './throttle.js';
import { debounce } from './debounce.js';

class IO {
  /**
   * @param handlers
   * @param {Object} [options]
   * @param {number} [options.throttle]
   * @param {number} [options.debounce]
   */
  keydown(handlers, options = { throttle: 100 }) {
    let handler = (e) => handlers[e.key]?.();
    if (options.throttle) {
      handler = throttle(handler, options.throttle);
    } else if (options.debounce) {
      handler = debounce(handler, options.debounce);
    }
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }
  /**
   * @param handlers
   * @param {Object} [options]
   * @param {number} [options.throttle]
   * @param {number} [options.debounce]
   */
  keyup(handlers, options = { throttle: 100 }) {
    let handler = (e) => handlers[e.key]?.();
    if (options.throttle) {
      handler = throttle(handler, options.throttle);
    } else if (options.debounce) {
      handler = debounce(handler, options.debounce);
    }
    document.addEventListener('keyup', handler);
    return () => document.removeEventListener('keyup', handler);
  }
}

export const io = new IO();
