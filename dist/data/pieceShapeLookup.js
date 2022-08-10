import tilesEnum from "./tilesEnum.js";
const lookup = new Map();
lookup.set("o", tilesEnum.normalBlock);
export function getTileIdOfPieceShapeChar(char) {
    return lookup.get(char) ?? undefined;
}
