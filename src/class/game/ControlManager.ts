import Game from "./Game.js";
import KeyboardEventsManager from "../util/KeyboardEventsManager.js";

export default class ControlManager {
  private game: Game;
  private keyboardEventsManager: KeyboardEventsManager;

  constructor(game: Game) {
    this.game = game;
    this.keyboardEventsManager = new KeyboardEventsManager();

    this.init();
  }

  init() {
    const k = this.keyboardEventsManager;
    const g = this.game;
    const f = g.field;

    k.attatchEvent("down", "KeyX", () => {
      f.piece?.rotateCw();
    });
    k.attatchEvent("down", "ArrowUp", () => {
      f.piece?.rotateCw();
    });
    k.attatchEvent("down", "KeyZ", () => {
      f.piece?.rotateCcw();
    });
    k.attatchEvent("down", "KeyA", () => {
      f.piece?.rotate180();
    });

    k.attatchEvent("down", "ArrowDown", () => {
      f.piece?.moveDown();
    });
    k.attatchEvent("down", "ArrowLeft", () => {
      f.piece?.moveLeft();
    });
    k.attatchEvent("down", "ArrowRight", () => {
      f.piece?.moveRight();
    });
  }
}
