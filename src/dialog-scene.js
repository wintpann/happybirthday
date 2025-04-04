import { HUDElement } from './hud-element.js';
import { Emitter } from './emitter.js';
import { renderer } from './renderer.js';
import { io } from './io.js';
import { DialogCompanion } from './dialog-companion.js';
import { BaseScene } from './base-scene.js';
import { RENDER_WINDOW } from './constants.js';

export class DialogScene extends BaseScene {
  unloadDestroyers = new Set();

  dialogs = {
    byCompanion: {
      [DialogCompanion.Managers]: { questions: [], answer: null },
      [DialogCompanion.Backend]: { questions: [], answer: null },
      [DialogCompanion.Frontend]: { questions: [], answer: null },
      [DialogCompanion.Devops]: { questions: [], answer: null },
    },
    activeCompanion: null,
    caret: 0,
  };

  constructor() {
    super();
    this.emitter = new Emitter({ GENERIC_ExitDialog: 'GENERIC_ExitDialog' });
    this.hud = new HUDElement();
    this.addToRender(this.hud);
    this.renderWindowXOffset = -1;
  }

  wrapMenuText(input) {
    const INDENTATION = ' ';
    let result = [];

    input.forEach(({ text, index }) => {
      let words = text.split(/(\s+)/);
      let chunk = '';
      let firstChunk = true;

      words.forEach((word) => {
        if ((chunk + word).trim().length > RENDER_WINDOW.WIDTH - 10) {
          if (chunk.trim()) {
            result.push({
              text: firstChunk ? chunk.trim() : INDENTATION + chunk.trim(),
              index,
              firstChunk,
            });
            firstChunk = false;
          }
          chunk = word;
        } else {
          chunk += word;
        }
      });

      if (chunk.trim()) {
        result.push({
          text: firstChunk ? chunk.trim() : INDENTATION + chunk.trim(),
          index,
          firstChunk,
        });
      }
    });

    return result;
  }

  executeDisposableQuestion(companion, question, answer) {
    this.dialogs.caret = 0;
    return new Promise((resolve) => {
      const item = {
        question,
        answer,
        onExecuted: () => {
          const index =
            this.dialogs.byCompanion[companion].questions.indexOf(item);
          if (index !== -1) {
            this.dialogs.byCompanion[companion].questions.splice(index, 1);
            this.dialogs.byCompanion[companion].answer = answer;
            this.dialogs.caret = 0;
          }
          resolve();
        },
      };
      this.dialogs.byCompanion[companion].questions.push(item);
      renderer.update(() => this.onDialogUpdate());
    });
  }

  setActiveCompanion(companion) {
    this.dialogs.caret = 0;
    this.dialogs.activeCompanion = companion;
    renderer.update(() => this.onDialogUpdate());
  }

  getDialogMenu() {
    if (!this.dialogs.byCompanion[this.dialogs.activeCompanion]) {
      return [];
    }

    if (this.dialogs.byCompanion[this.dialogs.activeCompanion].answer) {
      return [
        {
          text: this.dialogs.byCompanion[this.dialogs.activeCompanion].answer,
          onExecuted: () => {
            delete this.dialogs.byCompanion[this.dialogs.activeCompanion]
              .answer;
          },
        },
      ];
    }

    if (this.dialogs.byCompanion[this.dialogs.activeCompanion].questions) {
      return [
        ...this.dialogs.byCompanion[this.dialogs.activeCompanion].questions.map(
          (el) => ({
            text: el.question,
            onExecuted: el.onExecuted,
          }),
        ),
        {
          text: 'Пока',
          onExecuted: () => {
            this.emitter.emit(this.emitter.events.GENERIC_ExitDialog);
            this.setActiveCompanion(null);
          },
        },
      ];
    }
  }

  executeCaretMenuItem() {
    this.getDialogMenu()[this.dialogs.caret].onExecuted();
  }

  onDialogUpdate() {
    const menu = this.getDialogMenu();
    const wrapped = this.wrapMenuText(
      menu.map((el, index) => ({ text: el.text, index })),
    ).map(
      ({ text, index, firstChunk }) =>
        `${index === this.dialogs.caret && firstChunk ? '>' : ' '} ${text}`,
    );
    this.hud.updateColumns(wrapped);
  }

  moveCaretUp() {
    if (this.dialogs.caret === 0) {
      this.dialogs.caret = this.getDialogMenu().length - 1;
    } else {
      this.dialogs.caret--;
    }
  }

  moveCaretDown() {
    if (this.dialogs.caret === this.getDialogMenu().length - 1) {
      this.dialogs.caret = 0;
    } else {
      this.dialogs.caret++;
    }
  }

  load() {
    renderer.update(() => this.onDialogUpdate());
    this.unloadDestroyers.add(
      io.keydown({
        ArrowUp: () =>
          renderer.update(() => {
            this.moveCaretUp();
            this.onDialogUpdate();
          }),
        ArrowDown: () =>
          renderer.update(() => {
            this.moveCaretDown();
            this.onDialogUpdate();
          }),
        Enter: () =>
          renderer.update(() => {
            this.executeCaretMenuItem();
            this.onDialogUpdate();
          }),
      }),
    );
  }

  unload() {
    Array.from(this.unloadDestroyers).forEach((cb) => cb());
    this.unloadDestroyers.clear();
  }
}
