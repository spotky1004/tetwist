import Scheduler, { SchedulerFunction } from "../../util/Scheduler.js";
import type Game from "../Game.js";
import type { default as Effect, ActivateableEventNames } from "./Effect.js";

export default class GameEffects {
  private readonly game: Game;
  private effectDatas: [effect: Effect, tier: number][];
  private eventActivateCount: Map<ActivateableEventNames, number>;
  private readonly scheduler: Scheduler;

  constructor(game: Game) {
    this.game = game;
    this.effectDatas = [];
    this.eventActivateCount = new Map();
    this.scheduler = new Scheduler();
  }

  tick(dt: number) {
    this.scheduler.tick(dt);
  }

  activeActions(eventName: ActivateableEventNames) {
    const activateCount = (this.eventActivateCount.get(eventName) ?? 0) + 1;
    for (const effectData of this.effectDatas) {
      const [effect, tier] = effectData;
      effect.callAction(this.game, eventName, tier, activateCount);
    }
    this.eventActivateCount.set(eventName, activateCount);
  }

  addEffect(effect: Effect, tier: number=0) {
    this.effectDatas.push([effect, tier]);

    const schdeuledActions = effect.getSchdeuledActions();
    for (const schdeuledAction of schdeuledActions) {
      const [callback, rawInterval] = schdeuledAction;
      const interval = typeof rawInterval === "number" ? rawInterval : rawInterval(tier);
      const schedulerFunction: SchedulerFunction = (repeatCount) => {
        callback(this.game, tier, repeatCount);
      }
      this.scheduler.addSchedule(schedulerFunction, 0, interval);
    }
  }

  getEffects() {
    return [...this.effectDatas];
  }

  restart() {
    this.eventActivateCount = new Map();
    this.scheduler.restart();
  }

  clear() {
    this.effectDatas = [];
    this.eventActivateCount = new Map();
    this.scheduler.clearSchedule();
  }
}
