import TetwistCell, { TetwistCellOptions } from "../../class/game/core/TetwistCell.js";
import array2D from "../etc/array2D.js";

export type Field = TetwistCell[][];

const defaultCellOptions: TetwistCellOptions = {
  tileId: 0,
  timestemp: -1
}

export default function createEmptyField(width: number, height: number, fillWith?: TetwistCellOptions) {
  return array2D.create(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
