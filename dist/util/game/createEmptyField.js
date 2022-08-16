import TetwistCell from "../../class/game/TetwistCell.js";
import array2D from "../etc/array2D.js";
import tilesEnum from "../../data/tilesEnum.js";
const defaultCellOptions = {
    tileId: tilesEnum.empty,
    timestamp: -1
};
export default function createEmptyField(width, height, fillWith) {
    return array2D.create(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
