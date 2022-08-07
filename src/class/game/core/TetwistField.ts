import create2DArray from "../../../util/create2DArray.js";
import TetwistFieldCanvas from "./TetwistFieldCanvas.js";

type Field = [tileIds: number[][], tileTimestemp: number[][]];
interface TetwistFieldOptions {
  width: number;
  height: number;
  startingField?: Field;
  canvasWrapper: HTMLElement;
  canvas: HTMLCanvasElement;
}

export default class TetwistField {
  readonly width: number;
  readonly height: number;
  readonly fieldData: Field;
  readonly startingField: Field;
  readonly canvas: TetwistFieldCanvas;

  constructor(options: TetwistFieldOptions) {
    const { width, height, startingField } = options;

    this.width = width;
    this.height = height;
    this.fieldData = [create2DArray(width, height, -1), create2DArray(width, height, -1)];
    this.startingField = startingField ?? [create2DArray(width, height, -1), create2DArray(width, height, -1)];
    this.canvas = new TetwistFieldCanvas(this, options.canvasWrapper, options.canvas);
  }

  setTile(x: number, y: number, tileId: number, timestemp: number) {
    const [tileIds, tileTimestemp] = this.fieldData;
    tileIds[y][x] = tileId;
    tileTimestemp[y][x] = timestemp;
  }

  reset() {
    const field = this.fieldData;
    const startingField = this.startingField;
    for (const typeIdx of [0, 1]) {
      const fieldData = field[typeIdx];
      const startingFieldData = startingField[typeIdx];
      for (let y = 0; y < fieldData.length; y++) {
        const row = fieldData[y];
        const startingRow = startingFieldData[y];
        for (let x = 0; x < row.length; x++) {
          row[x] = startingRow[x];
        }
      }
    }
  }

  render() {
    this.canvas.render();
  }
}
