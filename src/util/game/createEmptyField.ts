import TetwistCell, { TetwistCellOptions } from "../../class/game/core/TetwistCell.js";
import create2DArray from "../create2DArray.js";

export type Field = TetwistCell[][];

const defaultCellOptions: TetwistCellOptions = {
  tileId: 0,
  timestemp: -1
}

export default function createEmptyField(width: number, height: number, fillWith?: TetwistCellOptions) {
  return create2DArray(width, height, () => new TetwistCell(fillWith ?? defaultCellOptions));
}
