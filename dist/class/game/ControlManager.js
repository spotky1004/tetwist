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
        k.attatchEvent("down", "KeyX", () => {
            g.field.piece?.rotateCw();
        });
        k.attatchEvent("down", "ArrowUp", () => {
            g.field.piece?.rotateCw();
        });
        k.attatchEvent("down", "KeyZ", () => {
            g.field.piece?.rotateCcw();
        });
        k.attatchEvent("down", "KeyA", () => {
            g.field.piece?.rotate180();
        });
        k.attatchEvent("down", "Space", () => {
            let result = true;
            while (result) {
                result = g.field.piece?.moveDown() ?? false;
            }
            g.field.placePiece();
            g.field.spawnPiece();
        });
        k.attatchEvent("down", "ArrowDown", () => {
            g.field.piece?.moveDown();
        });
        k.attatchEvent("down", "ArrowLeft", () => {
            g.field.piece?.moveLeft();
        });
        k.attatchEvent("down", "ArrowRight", () => {
            g.field.piece?.moveRight();
        });
    }
}
