import TetwistCell from "../../class/game/core/TetwistCell.js";
import create2DArray from "../create2DArray.js";
const defaultCellOptions = {
    tileId: 0,
    timestemp: -1
};
export default function createEmptyField(width, height, fillWith) {
    return create2DArray(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
