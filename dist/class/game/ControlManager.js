import KeyboardEventsManager from "../util/KeyboardEventsManager.js";
export default class ControlManager {
    constructor(game) {
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
