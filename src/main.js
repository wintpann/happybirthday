import { GameFlow } from './game-flow.js';

const isDev = () => {
  let params = new URL(document.location.toString()).searchParams;
  return params.get('dev');
};

const start = () => {
  const root = document.querySelector('#root');
  const scene = document.createElement('div');
  if (isDev()) {
    scene.classList.add('no-transition');
  }
  scene.id = 'scene';
  root.appendChild(scene);
  new GameFlow(scene).start();
  setTimeout(() => scene.classList.add('visible'), 500);
};

if (isDev()) {
  start();
} else {
  document.addEventListener('keydown', start, { once: true });
}
