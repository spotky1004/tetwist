export default class Effect {
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.actions = [];
        this._freezed = false;
    }
    callAction(game, eventNameToCall, tier, activateCount) {
        for (const action of this.actions) {
            const [eventName, callback, rawTime] = action;
            const time = typeof rawTime === "number" ? rawTime : rawTime(tier);
            if (eventName === eventNameToCall &&
                (time <= 1 ||
                    (activateCount !== 0 && activateCount % time === 0)))
                continue;
            const actionRepeatCount = Math.floor(activateCount / Math.max(1, time));
            callback(game, tier, actionRepeatCount);
        }
    }
    getSchdeuledActions() {
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
    addAction(eventName, callback, every = 1) {
        if (this._freezed)
            throw new Error("This effect has been frozen");
        const action = [eventName, callback, every];
        this.actions.push(action);
        return this;
    }
    addScheduledAction(callback, interval) {
        if (this._freezed)
            throw new Error("This effect has been frozen");
        const action = ["scheduled", callback, interval];
        this.actions.push(action);
        return this;
    }
}
