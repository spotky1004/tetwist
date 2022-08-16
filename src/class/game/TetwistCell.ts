import type { HslAdjustOptions } from "../util/Sprite.js";

export interface TetwistCellOptions {
  isSolid: boolean;
  tileId: number;
  timestamp: number;
  hslAdjust?: HslAdjustOptions;
}

export default class TetwistCell {
  isSolid: boolean;
  tileId: number;
  timestamp: number;
  hslAdjust: HslAdjustOptions | undefined;

  constructor(options: TetwistCellOptions) {
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
    })
  }
}
