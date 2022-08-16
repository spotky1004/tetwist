import parsePieceShape from "../../../util/game/parsePieceShape.js";
import array2D from "../../../util/etc/array2D.js";
import { getTileIdOfPieceShapeChar } from "../../../data/pieceShapeLookup.js";
import Kicktable from "./Kicktable.js";
import type { HslAdjustOptions } from "../../util/Sprite.js";

export type PieceSpace = (number | null)[][];

interface PieceOptions {
  shape: string;
  centerMode: "normal";
  kicktable: Kicktable;
  hslAdjust?: HslAdjustOptions;
}

export default class Piece {
  readonly pieceSpace: PieceSpace;
  private readonly rotatedPieceSpaces: PieceSpace[];
  readonly hslAdjust: HslAdjustOptions | undefined;
  readonly kicktable: Kicktable;

  constructor(options: PieceOptions) {
    const parsedPiece = parsePieceShape(options.shape);
    const [width, height] = array2D.measure(parsedPiece);
    let centeredPiece;
    if (options.centerMode === "normal") {
      const defSize = Math.max(width, height);
      const size = defSize%2 === 0 ? defSize + 1 : defSize;
      const xOffset = Math.ceil(Math.max(0, (size - width)) / 2);
      const yOffset = Math.floor(Math.max(0, (size - height)) / 2);
      centeredPiece = array2D.fill(parsedPiece, size, size, xOffset, yOffset, null);
    } else {
      throw new Error("Unknown error");
    }
    this.pieceSpace = array2D.replace(centeredPiece, (pieceShapeChar) => {
      if (pieceShapeChar === null) return pieceShapeChar;
      const tileId = getTileIdOfPieceShapeChar(pieceShapeChar);
      if (typeof tileId === "undefined") throw new Error("Invaild char in piece shape");
      return tileId;
    });
    void array2D.freeze(this.pieceSpace);

    this.rotatedPieceSpaces = [];
    for (let i = 0; i < 4; i++) {
      const rotated = array2D.rotate(this.pieceSpace, i);
      void array2D.freeze(rotated);
      this.rotatedPieceSpaces.push(rotated);
    }

    this.hslAdjust = options.hslAdjust;
    this.kicktable = options.kicktable;
  }

  getSize() {
    return this.pieceSpace.length;
  }

  getRotetedState(rotateCount: number) {
    rotateCount = rotateCount % 4;
    return this.rotatedPieceSpaces[rotateCount];
  }
}
