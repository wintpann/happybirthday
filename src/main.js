import { GameFlow } from './game-flow.js';

const isDev = () => {
  let params = new URL(document.location.toString()).searchParams;
  return params.get('dev');
};

const start = () => {
  const root = document.querySelector('#root');
  const scene = document.createElement('div');
  const intro = document.querySelector('#intro');
  if (isDev()) {
    scene.classList.add('no-transition');
  }
  scene.id = 'scene';
  root.appendChild(scene);
  new GameFlow(scene).start();
  if (isDev()) {
    setTimeout(() => scene.classList.add('visible'), 500);
  } else {
    intro.classList.remove('visible');
    setTimeout(() => scene.classList.add('visible'), 1500);
  }
};

const intro = (callback) => {
  const intro = document.querySelector('#intro');
  setTimeout(() => intro.classList.add('visible'), 500);
  setTimeout(
    () => intro.querySelector('.tip-1').classList.add('visible'),
    2000,
  );
  setTimeout(
    () => intro.querySelector('.tip-2').classList.add('visible'),
    3000,
  );
  setTimeout(
    () => intro.querySelector('.tip-3').classList.add('visible'),
    4000,
  );
  setTimeout(callback, 4300);
};

if (isDev()) {
  start();
} else {
  intro(() => {
    const handler = (e) => {
      if (e.key === 'Enter') {
        start();
        document.removeEventListener('keydown', handler);
      }
    };
    document.addEventListener('keydown', handler);
  });
}
