const tilesEnum = {
    "empty": 0,
    "normalBlock": 100,
};
Object.freeze(tilesEnum);
const tileNameMap = new Map(Object.entries(tilesEnum).map(([name, id]) => [id, name]));
export function getTileNameById(id) {
    return tileNameMap.get(id);
}
export default tilesEnum;
