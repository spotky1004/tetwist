import { getTileNameById } from "../../../data/tilesEnum.js";
import { getTilePosition } from "../../../data/tetwistTileset.js";
import imagePaths from "../../../data/imagePaths.js";
import Sprite from "../../util/Sprite.js";
import getWalls from "../../../util/game/getWalls.js";
const twtwistTileset = new Sprite({
    imageUrl: imagePaths.tetwistTileset,
    rows: 20,
    cols: 12
});
export default class TetwistFieldCanvas {
    constructor(field, canvasWrapper, canvas) {
        this.field = field;
        this.canvasWrapper = canvasWrapper;
        this.canvas = canvas;
        const ctx = canvas.getContext("2d");
        if (!ctx)
            throw new Error("This browser does not support CanvasRenderingContext2D.");
        this.ctx = ctx;
    }
    render() {
        const field = this.field;
        const { width: fieldWidth, height: fieldHeight } = field;
        const canvasWrapper = this.canvasWrapper;
        const maxWidth = canvasWrapper.offsetWidth;
        const maxHeight = canvasWrapper.offsetHeight;
        const maxDiv = Math.max(1, fieldWidth / maxWidth, fieldHeight / maxHeight);
        this.canvas.width = maxWidth / maxDiv;
        this.canvas.height = maxHeight / maxDiv;
        const ctx = this.ctx;
        const blockSize = maxWidth / maxDiv / fieldWidth;
        const [tileIds, tileTimestemp] = field.fieldData;
        for (let y = 0; y < fieldHeight; y++) {
            const tileIdRow = tileIds[y];
            for (let x = 0; x < fieldWidth; x++) {
                const tileId = tileIdRow[x];
                const tileName = getTileNameById(tileId);
                if (!tileName)
                    continue;
                // What's this...
                switch (tileName) {
                    case "A":
                    case "B":
                    case "G":
                    case "I":
                    case "J":
                    case "O":
                    case "S":
                    case "T":
                    case "Z":
                    case "L":
                        const walls = getWalls(tileTimestemp, x, y);
                        const spritePos = getTilePosition(tileName, walls);
                        twtwistTileset.drawImage(ctx, spritePos[0], spritePos[1], x * blockSize, y * blockSize, blockSize, blockSize);
                        break;
                }
            }
        }
    }
}
