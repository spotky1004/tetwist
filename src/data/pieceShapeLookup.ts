import tilesEnum from "./tilesEnum.js";

const lookup: Map<string, number> = new Map();
lookup.set("o", tilesEnum.normalBlock);

export function getTileIdOfPieceShapeChar(char: string) {
  return lookup.get(char) ?? undefined;
}
