import { getTileNameById } from "../../data/tilesEnum.js";
import { getTilePosition } from "../../data/blockTileset.js";
import imagePaths from "../../data/imagePaths.js";
import Sprite from "../util/Sprite.js";
import getWalls from "../../util/game/getWalls.js";
const twtwistTileset = new Sprite({
    imageUrl: imagePaths.blockTileset,
    rows: 8,
    cols: 6
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
        const blockSize = Math.floor(Math.min(maxWidth / fieldWidth, maxHeight / fieldHeight));
        this.canvas.width = fieldWidth * blockSize;
        this.canvas.height = fieldHeight * blockSize;
        const { width, height } = this.canvas;
        const ctx = this.ctx;
        ctx.fillStyle = "#000";
        // ctx.fillRect(0, 0, width, height);
        ctx.lineWidth = 0.5;
        ctx.strokeStyle = "#ffffff";
        // Draw grid
        for (let i = 1; i < fieldWidth; i++) {
            ctx.beginPath();
            ctx.moveTo(i * width / fieldWidth, 0);
            ctx.lineTo(i * width / fieldWidth, height);
            ctx.stroke();
        }
        for (let i = 1; i < fieldHeight; i++) {
            ctx.beginPath();
            ctx.moveTo(0, i * height / fieldHeight);
            ctx.lineTo(width, i * height / fieldHeight);
            ctx.stroke();
        }
        // Draw cells
        const fieldData = field.fieldData;
        for (let y = 0; y < fieldHeight; y++) {
            const fieldRow = fieldData[y];
            for (let x = 0; x < fieldWidth; x++) {
                const cell = fieldRow[x];
                const tileName = getTileNameById(cell.tileId);
                if (!tileName)
                    continue;
                const xPos = x * blockSize;
                const yPos = y * blockSize;
                switch (tileName) {
                    case "normalBlock":
                        const walls = getWalls(fieldData, x, y);
                        const spritePos = getTilePosition(walls);
                        twtwistTileset.drawImage(ctx, spritePos[0], spritePos[1], xPos + 1, yPos + 1, blockSize - 1, blockSize - 1, cell.hslAdjust);
                        break;
                }
            }
        }
    }
}
