import TetwistCell from "../../class/game/TetwistCell.js";
import array2D from "../etc/array2D.js";
const defaultCellOptions = {
    tileId: 0,
    timestemp: -1
};
export default function createEmptyField(width, height, fillWith) {
    return array2D.create(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
