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
const tileNameMap = new Map(Object.entries(tilesEnum).map(([name, id]) => [id, name]));
export function getTileNameById(id) {
    return tileNameMap.get(id);
}
export default tilesEnum;
