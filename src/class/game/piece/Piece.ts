import parsePieceShape from "../../../util/game/parsePieceShape.js";
import array2D from "../../../util/etc/array2D.js";
import { getTileIdOfPieceShapeChar } from "../../../data/pieceShapeLookup.js";
import type { HslAdjustOptions } from "../../util/Sprite.js";

type PieceSpace = (number | null)[][];

interface PieceOptions {
  shape: string;
  centerMode: "normal";
  hslAdjust?: HslAdjustOptions;
}

export default class Piece {
  readonly pieceSpace: PieceSpace;

  constructor(options: PieceOptions) {
    const parsedPiece = parsePieceShape(options.shape);
    const [width, height] = array2D.measure(parsedPiece);
    let centeredPiece;
    if (options.centerMode === "normal") {
      const size = Math.max(width, height);
      const xOffset = Math.floor(Math.max(0, (size - width)) / 2);
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
    array2D.freeze(this.pieceSpace);
  }
}
