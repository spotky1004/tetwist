import { getTileNameById } from "../../../data/tilesEnum.js";
import { getTilePosition } from "../../../data/tetwistTileset.js";
import imagePaths from "../../../data/imagePaths.js";
import Sprite from "../../util/Sprite.js";
import getWalls from "../../../util/game/getWalls.js";
import type TetwistField from "./TetwistField.js";

const twtwistTileset = new Sprite({
  imageUrl: imagePaths.tetwistTileset,
  rows: 40,
  cols: 12
});

export default class TetwistFieldCanvas {
  private readonly field: TetwistField;
  readonly canvasWrapper: HTMLElement;
  readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  constructor(field: TetwistField, canvasWrapper: HTMLElement, canvas: HTMLCanvasElement) {
    this.field = field;
    this.canvasWrapper = canvasWrapper;
    this.canvas = canvas;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("This browser does not support CanvasRenderingContext2D.");
    this.ctx = ctx;
  }

  render() {
    const field = this.field;
    const { width: fieldWidth, height: fieldHeight } = field;

    const canvasWrapper = this.canvasWrapper;
    const maxWidth = canvasWrapper.offsetWidth;
    const maxHeight = canvasWrapper.offsetHeight;
    const blockSize = Math.floor(Math.min(maxWidth/fieldWidth, maxHeight/fieldHeight));
    this.canvas.width = fieldWidth * blockSize;
    this.canvas.height = fieldHeight * blockSize;

    const ctx = this.ctx;
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const [tileIds, tileTimestemp] = field.fieldData;
    for (let y = 0; y < fieldHeight; y++) {
      const tileIdRow = tileIds[y];
      for (let x = 0; x < fieldWidth; x++) {
        const tileId = tileIdRow[x];
        const tileName = getTileNameById(tileId);
        if (!tileName) continue;
        switch (tileName) {
          // What's this...
          case "A": case "B": case "G": case "I": case "J": case "O": case "S": case "T": case "Z": case "L":
            const walls = getWalls(tileTimestemp, x, y);
            const spritePos = getTilePosition(tileName, walls);
            console.log(x, y, walls, spritePos);
            twtwistTileset.drawImage(ctx, spritePos[0], spritePos[1], x * blockSize, y * blockSize, blockSize, blockSize);
            break;
        }
      }
    }
  }
}
