import type { HslAdjustOptions } from "../../util/Sprite.js";

export interface TetwistCellOptions {
  tileId: number;
  timestamp: number;
  hslAdjust?: HslAdjustOptions;
}

export default class TetwistCell {
  tileId: number;
  timestemp: number;
  hslAdjust: HslAdjustOptions | undefined;

  constructor(options: TetwistCellOptions) {
    this.tileId = options.tileId;
    this.timestemp = options.timestamp;
    this.hslAdjust = options.hslAdjust;
  }

  clone() {
    return new TetwistCell({
      tileId: this.tileId,
      timestamp: this.timestemp,
      hslAdjust: this.hslAdjust
    })
  }
}
