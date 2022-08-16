import TetwistCell, { TetwistCellOptions } from "../../class/game/field/TetwistCell.js";
import array2D from "../etc/array2D.js";
import tilesEnum from "../../data/tilesEnum.js";

export type Field = TetwistCell[][];

const defaultCellOptions: TetwistCellOptions = {
  isSolid: false,
  tileId: tilesEnum.empty,
  timestamp: -1
}

export default function createEmptyField(width: number, height: number, fillWith?: TetwistCellOptions) {
  return array2D.create(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
