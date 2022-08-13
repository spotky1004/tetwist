import TetwistField from "./TetwistField.js";
import GameEffects from "./effect/GameEffects.js";
import KeyboardEventsManager from "../util/KeyboardEventsManager.js";
export default class Game {
    constructor(options) {
        this.field = new TetwistField(options.field);
        this.effects = new GameEffects(this);
        this.keyboardEventsManager = new KeyboardEventsManager();
        this.keyboardEventsManager;
    }
    tick(dt) {
        this.effects.tick(dt);
    }
    render() {
        this.field.render();
    }
}
