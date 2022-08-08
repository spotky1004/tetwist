export default class TetwistCell {
    constructor(options) {
        this.tileId = options.tileId;
        this.timestemp = options.timestamp;
        this.hslAdjust = options.hslAdjust;
    }
    clone() {
        return new TetwistCell({
            tileId: this.tileId,
            timestamp: this.timestemp,
            hslAdjust: this.hslAdjust
        });
    }
}
