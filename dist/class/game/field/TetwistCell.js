export default class TetwistCell {
    constructor(options) {
        this.isSolid = options.isSolid;
        this.tileId = options.tileId;
        this.timestamp = options.timestamp;
        this.hslAdjust = options.hslAdjust;
    }
    clone() {
        return new TetwistCell({
            isSolid: this.isSolid,
            tileId: this.tileId,
            timestamp: this.timestamp,
            hslAdjust: this.hslAdjust
        });
    }
}
