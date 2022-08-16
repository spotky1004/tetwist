import TetwistField, { TetwistFieldOptions } from "./field/TetwistField.js";
import GameEffects from "./effect/GameEffects.js";
import ControlManager from "./ControlManager.js";

interface GameOptions {
  field: TetwistFieldOptions;
}

export default class Game {
  readonly field: TetwistField;
  readonly effects: GameEffects;
  readonly controlManager: ControlManager;

  constructor(options: GameOptions) {
    this.field = new TetwistField(options.field);
    this.effects = new GameEffects(this);
    this.controlManager = new ControlManager(this);
  }

  tick(dt: number) {
    this.effects.tick(dt);
  }

  render() {
    this.field.render();
  }
}
