const tilesEnum = {
  "normalBlock": 100,
};
Object.freeze(tilesEnum);
export type TileNames = keyof typeof tilesEnum;

const tileNameMap: Map<number, TileNames> = new Map(Object.entries(tilesEnum).map(([name, id]) => [id, name])) as Map<number, TileNames>;
export function getTileNameById(id: number) {
  return tileNameMap.get(id);
}

export default tilesEnum;
