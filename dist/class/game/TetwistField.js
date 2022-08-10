import TetwistCell from "./TetwistCell.js";
import TetwistFieldCanvas from "./TetwistFieldCanvas.js";
import createEmptyField from "../../util/game/createEmptyField.js";
export default class TetwistField {
    constructor(options) {
        const { width, height, startingFieldData: startingField } = options;
        this.width = width;
        this.height = height;
        this.fieldData = createEmptyField(width, height);
        this.startingField = startingField ?? createEmptyField(width, height);
        this.canvas = new TetwistFieldCanvas(this, options.canvasWrapper, options.canvas);
    }
    setCell(x, y, cellOptions) {
        if (0 > x || x >= this.width ||
            0 > y || y >= this.height)
            return;
        this.fieldData[y][x] = new TetwistCell(cellOptions);
    }
    editCell(x, y, cellOptions) {
        if (0 > x || x >= this.width ||
            0 > y || y >= this.height)
            return;
        const cell = this.fieldData[y][x];
        cell.tileId = cellOptions.tileId ?? cell.tileId;
        cell.timestemp = cellOptions.timestemp ?? cell.timestemp;
        cell.hslAdjust = cellOptions.hslAdjust ?? cell.hslAdjust;
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
