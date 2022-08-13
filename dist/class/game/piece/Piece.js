import parsePieceShape from "../../../util/game/parsePieceShape.js";
import array2D from "../../../util/etc/array2D.js";
import { getTileIdOfPieceShapeChar } from "../../../data/pieceShapeLookup.js";
export default class Piece {
    constructor(options) {
        const parsedPiece = parsePieceShape(options.shape);
        const [width, height] = array2D.measure(parsedPiece);
        let centeredPiece;
        if (options.centerMode === "normal") {
            const size = Math.max(width, height);
            const xOffset = Math.floor(Math.max(0, (size - width)) / 2);
            const yOffset = Math.floor(Math.max(0, (size - height)) / 2);
            centeredPiece = array2D.fill(parsedPiece, size, size, xOffset, yOffset, null);
        }
        else {
            throw new Error("Unknown error");
        }
        this.pieceSpace = array2D.replace(centeredPiece, (pieceShapeChar) => {
            if (pieceShapeChar === null)
                return pieceShapeChar;
            const tileId = getTileIdOfPieceShapeChar(pieceShapeChar);
            if (typeof tileId === "undefined")
                throw new Error("Invaild char in piece shape");
            return tileId;
        });
    }
}
