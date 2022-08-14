export default class TetwistCell {
    constructor(options) {
        this.isSolid = options.isSolid;
        this.tileId = options.tileId;
        this.timestemp = options.timestemp;
        this.hslAdjust = options.hslAdjust;
    }
    clone() {
        return new TetwistCell({
            isSolid: this.isSolid,
            tileId: this.tileId,
            timestemp: this.timestemp,
            hslAdjust: this.hslAdjust
        });
    }
}
