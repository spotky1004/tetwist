import TetwistCell, { TetwistCellOptions } from "./TetwistCell.js";
import TetwistFieldCanvas from "./TetwistFieldCanvas.js";
import createEmptyField from "../../util/game/createEmptyField.js";
import array2D from "../../util/etc/array2D.js";

export type FieldData = TetwistCell[][];
export interface TetwistFieldOptions {
  width: number;
  height: number;
  startingFieldData?: FieldData;
  canvasWrapper: HTMLElement;
  canvas: HTMLCanvasElement;
}

export default class TetwistField {
  readonly width: number;
  readonly height: number;
  readonly fieldData: FieldData;
  readonly startingField: FieldData;
  readonly canvas: TetwistFieldCanvas;

  constructor(options: TetwistFieldOptions) {
    const { width, height, startingFieldData: startingField } = options;

    this.width = width;
    this.height = height;
    this.fieldData = createEmptyField(width, height);
    this.startingField = startingField ?? createEmptyField(width, height);
    this.canvas = new TetwistFieldCanvas(this, options.canvasWrapper, options.canvas);
  }

  setCell(x: number, y: number, cellOptions: TetwistCellOptions) {
    if (
      0 > x || x >= this.width ||
      0 > y || y >= this.height
    ) return;
    this.fieldData[y][x] = new TetwistCell(cellOptions);
  }

  editCell(x: number, y: number, cellOptions: Partial<TetwistCellOptions>) {
    if (
      0 > x || x >= this.width ||
      0 > y || y >= this.height
    ) return;
    const cell = this.fieldData[y][x];
    cell.tileId = cellOptions.tileId ?? cell.tileId;
    cell.timestamp = cellOptions.timestamp ?? cell.timestamp;
    cell.hslAdjust = cellOptions.hslAdjust ?? cell.hslAdjust;
  }

  getSolidField(): boolean[][] {
    return array2D.create(this.width, this.height, (x, y) => this.fieldData[y][x].isSolid);
  }

  reset() {
    const fieldData = this.fieldData;
    const startingFieldData = this.startingField;
    for (let y = 0; y < fieldData.length; y++) {
      const row = fieldData[y];
      const startingRow = startingFieldData[y];
      for (let x = 0; x < row.length; x++) {
        row[x] = startingRow[x].clone();
      }
    }
  }

  cloneField() {
    const cloned = [];
    for (let y = 0; y < this.height; y++) {
      cloned.push(this.fieldData[y].map(cell => cell.clone()));
    }
    return cloned;
  }

  render() {
    this.canvas.render();
  }
}
