import TetwistField from "./field/TetwistField.js";
import GameEffects from "./effect/GameEffects.js";
import ControlManager from "./ControlManager.js";
export default class Game {
    constructor(options) {
        this.field = new TetwistField(options.field);
        this.effects = new GameEffects(this);
        this.controlManager = new ControlManager(this);
    }
    tick(dt) {
        this.effects.tick(dt);
    }
    render() {
        this.field.render();
    }
}
