const connectedWalls = new Map([
    ["1101", [0, 0]], ["1001", [0, 1]], ["1000", [0, 2]], ["1100", [0, 3]],
    ["0101", [1, 0]], ["0001", [1, 1]], ["0000", [1, 2]], ["0100", [1, 3]],
    ["0111", [2, 0]], ["0011", [2, 1]], ["0010", [2, 2]], ["0110", [2, 3]],
    ["1111", [3, 0]], ["1011", [3, 1]], ["1010", [3, 2]], ["1110", [3, 3]],
    ["1221", [4, 0]], ["1122", [4, 1]], ["2212", [4, 2]], ["2221", [4, 3]],
    ["2211", [5, 0]], ["2112", [5, 1]], ["1222", [5, 2]], ["2122", [5, 3]]
]);
const piecePositions = {
    S: [0, 0],
    L: [4, 0],
    O: [8, 0],
    Z: [12, 0],
    G: [16, 0],
    I: [0, 6],
    J: [4, 6],
    T: [8, 6],
    A: [12, 6],
    B: [16, 6]
};
// Freeze piecePositions
Object.freeze(piecePositions);
(() => {
    let pieceName;
    for (pieceName in piecePositions) {
        Object.freeze(piecePositions[pieceName]);
    }
})();
export function getTilePosition(pieceName, id) {
    const piecePosition = piecePositions[pieceName];
    const wallIdx = connectedWalls.get(id);
    // If invaild wall, return 1111 Black tile
    if (!wallIdx)
        return [16, 9];
    return [
        piecePosition[0] + wallIdx[0],
        piecePosition[1] + wallIdx[1]
    ];
}
