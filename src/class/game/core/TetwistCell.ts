import type { HslAdjustOptions } from "../../util/Sprite.js";

export interface TetwistCellOptions {
  tileId: number;
  timestemp: number;
  hslAdjust?: HslAdjustOptions;
}

export default class TetwistCell {
  tileId: number;
  timestemp: number;
  hslAdjust: HslAdjustOptions | undefined;

  constructor(options: TetwistCellOptions) {
    this.tileId = options.tileId;
    this.timestemp = options.timestemp;
    this.hslAdjust = options.hslAdjust;
  }

  clone() {
    return new TetwistCell({
      tileId: this.tileId,
      timestemp: this.timestemp,
      hslAdjust: this.hslAdjust
    })
  }
}
