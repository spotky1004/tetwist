export default class KeyboardEventsManager {
    constructor() {
        this.isWorking = false;
        this.workingListners = null;
        this.attatchedListeners = new Map();
        this.start();
    }
    attatchEvent(eventType, key, listener) {
        const listenerKey = eventType + "/" + key;
        const attatchedListener = this.attatchedListeners.get(listenerKey);
        if (typeof attatchedListener === "undefined") {
            this.attatchedListeners.set(listenerKey, [listener]);
        }
        else {
            attatchedListener.push(listener);
        }
        return this;
    }
    disattachEvent(eventType, key, listener) {
        const listenerKey = eventType + "/" + key;
        const attatchedListener = this.attatchedListeners.get(listenerKey);
        if (typeof attatchedListener !== "undefined") {
            this.attatchedListeners.set(listenerKey, attatchedListener.filter(c => c !== listener));
            if (this.attatchedListeners.get(listenerKey)?.length === 0) {
                this.attatchedListeners.delete(listenerKey);
            }
        }
        return this;
    }
    start() {
        if (this.isWorking)
            return;
        this.isWorking = true;
        const createKeyboardEventsManagerListener = (eventType) => (keyboardEvent) => {
            const attatchedListener = this.attatchedListeners.get(eventType + "/" + keyboardEvent.key);
            if (typeof attatchedListener === "undefined")
                return;
            for (const listner of attatchedListener) {
                listner(keyboardEvent);
            }
        };
        const keypress = createKeyboardEventsManagerListener("press");
        const keyup = createKeyboardEventsManagerListener("up");
        const keydown = createKeyboardEventsManagerListener("down");
        window.addEventListener("keypress", keypress);
        window.addEventListener("keyup", keyup);
        window.addEventListener("keydown", keydown);
        this.workingListners = [keypress, keyup, keydown];
    }
    stop() {
        if (!this.isWorking || !this.workingListners)
            return;
        this.isWorking = false;
        const [keypress, keyup, keydown] = this.workingListners;
        window.removeEventListener("keypress", keypress);
        window.removeEventListener("keyup", keyup);
        window.removeEventListener("keydown", keydown);
        this.workingListners = null;
    }
}
