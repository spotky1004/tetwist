import Scheduler from "../../util/Scheduler.js";
export default class GameEffects {
    constructor(game) {
        this.game = game;
        this.effectDatas = [];
        this.eventActivateCount = new Map();
        this.scheduler = new Scheduler();
    }
    tick(dt) {
        this.scheduler.tick(dt);
    }
    activeActions(eventName) {
        const activateCount = (this.eventActivateCount.get(eventName) ?? 0) + 1;
        for (const effectData of this.effectDatas) {
            const [effect, tier] = effectData;
            effect.callAction(this.game, eventName, tier, activateCount);
        }
        this.eventActivateCount.set(eventName, activateCount);
    }
    addEffect(effect, tier = 0) {
        this.effectDatas.push([effect, tier]);
        const schdeuledActions = effect.getSchdeuledActions();
        for (const schdeuledAction of schdeuledActions) {
            const [callback, rawInterval] = schdeuledAction;
            const interval = typeof rawInterval === "number" ? rawInterval : rawInterval(tier);
            const schedulerFunction = (repeatCount) => {
                callback(this.game, tier, repeatCount);
            };
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
