const tilesEnum = {
  "S": 100,
  "L": 101,
  "O": 102,
  "Z": 103,
  "G": 104,
  "I": 105,
  "J": 106,
  "T": 107,
  "A": 108,
  "B": 109,
};
Object.freeze(tilesEnum);
export type TileNames = keyof typeof tilesEnum;

const tileNameMap: Map<number, TileNames> = new Map(Object.entries(tilesEnum).map(([name, id]) => [id, name])) as Map<number, TileNames>;
export function getTileNameById(id: number) {
  return tileNameMap.get(id);
}

export default tilesEnum;
