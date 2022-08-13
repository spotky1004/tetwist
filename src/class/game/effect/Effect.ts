import type Game from "../Game.js";

export type ActivateableEventNames = "softDrop" | "hardDrop" | "piecePlace";
type EventNames = "scheduled" | ActivateableEventNames;
type ActionCallback = (game: Game, tier: number, actionRepeatCount: number) => void;
type ActionTimeCallback = (tier: number) => number;
type EffectAction = [eventName: EventNames, callback: ActionCallback, rawTime: number | ActionTimeCallback];
type EffectDescriptionCallback = (tier: number) => string;

interface EffectOptions {
  name: string;
  description: string | EffectDescriptionCallback;
}

export default class Effect {
  readonly name: string;
  readonly description: string | EffectDescriptionCallback;
  private readonly actions: EffectAction[];
  private _freezed: boolean;

  constructor(options: EffectOptions) {
    this.name = options.name;
    this.description = options.description;
    this.actions = [];
    this._freezed = false;
  }

  callAction(game: Game, eventNameToCall: ActivateableEventNames, tier: number, activateCount: number) {
    for (const action of this.actions) {
      const [eventName, callback, rawTime] = action;
      const time = typeof rawTime === "number" ? rawTime : rawTime(tier);
      if (
        eventName === eventNameToCall &&
        (
          time <= 1 ||
          (activateCount !== 0 && activateCount % time === 0)
        )
      ) continue;
      const actionRepeatCount = Math.floor(activateCount / Math.max(1, time));
      callback(game, tier, actionRepeatCount);
    }
  }

  getSchdeuledActions(): [callback: ActionCallback, interval: number | ActionTimeCallback][] {
    const scheduledActions = this.actions.filter(([eventName]) => eventName === "scheduled");
    return scheduledActions.map(([_, callback, time]) => [callback, time]);
  }

  get freezed() {
    return this._freezed;
  }

  /**
   * This will freeze this Effect from add new actions.
   */
  freeze() {
    this._freezed = true;
  }

  addAction(eventName: EventNames, callback: ActionCallback, every: number | ActionTimeCallback = 1) {
    if (this._freezed) throw new Error("This effect has been frozen");
    const action: EffectAction = [eventName, callback, every];
    this.actions.push(action);

    return this;
  }

  addScheduledAction(callback: ActionCallback, interval: number | ActionTimeCallback) {
    if (this._freezed) throw new Error("This effect has been frozen");
    const action: EffectAction = ["scheduled", callback, interval];
    this.actions.push(action);

    return this;
  }
}
