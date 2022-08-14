import type { HslAdjustOptions } from "../util/Sprite.js";

export interface TetwistCellOptions {
  isSolid: boolean;
  tileId: number;
  timestemp: number;
  hslAdjust?: HslAdjustOptions;
}

export default class TetwistCell {
  isSolid: boolean;
  tileId: number;
  timestemp: number;
  hslAdjust: HslAdjustOptions | undefined;

  constructor(options: TetwistCellOptions) {
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
    })
  }
}
