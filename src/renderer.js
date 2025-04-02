import { RENDER_WINDOW, SYMBOL } from './constants.js';

class Renderer {
  nodeCells = [];
  scene;

  constructor() {
    this.grid = this.getEmptyGrid();
  }

  getEmptyGrid() {
    const grid = [];
    for (let i = 0; i < RENDER_WINDOW.HEIGHT; i++) {
      const column = [];
      for (let j = 0; j < RENDER_WINDOW.WIDTH; j++) {
        column.push(SYMBOL.EMPTY);
      }
      grid.push(column);
    }
    return grid;
  }

  mount(mountPoint) {
    for (let i = 0; i < RENDER_WINDOW.HEIGHT; i++) {
      const column = document.createElement('div');
      column.classList.add('column');
      this.nodeCells.push([]);
      for (let j = 0; j < RENDER_WINDOW.WIDTH; j++) {
        const cell = document.createElement('div');
        cell.innerText = this.grid[i][j];
        cell.classList.add('cell');
        cell.dataset.x = j;
        cell.dataset.y = i;
        this.nodeCells[i].push(cell);
        column.appendChild(cell);
      }
      mountPoint.appendChild(column);
    }
  }

  update(fn) {
    fn();
    this.render();
  }

  render() {
    if (!this.scene) {
      return;
    }

    requestAnimationFrame(() => {
      const grid = this.scene.buildRenderGrid();

      for (let i = 0; i < RENDER_WINDOW.HEIGHT; i++) {
        for (let j = 0; j < RENDER_WINDOW.WIDTH; j++) {
          if (this.grid[i][j] !== grid[i][j]) {
            this.nodeCells[i][j].innerText = grid[i][j];
          }
        }
      }

      this.grid = grid;
    });
  }

  loadScene(scene) {
    this.scene?.unload();
    this.scene = scene;
    this.scene.load();
    this.render();
  }
}

export const renderer = new Renderer();
