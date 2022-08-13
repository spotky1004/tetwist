import TetwistField, { TetwistFieldOptions } from "./TetwistField.js";
import GameEffects from "./effect/GameEffects.js";
import KeyboardEventsManager from "../util/KeyboardEventsManager.js";

interface GameOptions {
  field: TetwistFieldOptions;
}

export default class Game {
  readonly field: TetwistField;
  readonly effects: GameEffects;
  private keyboardEventsManager: KeyboardEventsManager;

  constructor(options: GameOptions) {
    this.field = new TetwistField(options.field);
    this.effects = new GameEffects(this);
    this.keyboardEventsManager = new KeyboardEventsManager();
    this.keyboardEventsManager;
  }

  tick(dt: number) {
    this.effects.tick(dt);
  }

  render() {
    this.field.render();
  }
}
