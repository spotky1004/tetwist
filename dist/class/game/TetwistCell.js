export default class TetwistCell {
    constructor(options) {
        this.tileId = options.tileId;
        this.timestemp = options.timestemp;
        this.hslAdjust = options.hslAdjust;
    }
    clone() {
        return new TetwistCell({
            tileId: this.tileId,
            timestemp: this.timestemp,
            hslAdjust: this.hslAdjust
        });
    }
}
