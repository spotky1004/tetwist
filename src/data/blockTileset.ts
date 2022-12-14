const connectedWalls: Map<string, [number, number]> = new Map([
  ["11111111", [0, 0]], ["11101111", [1, 0]], ["11101110", [2, 0]], ["11111110", [3, 0]], ["10101010", [4, 0]], ["10001000", [5, 0]], ["10100010", [6, 0]], ["10001011", [7, 0]],
  ["11111011", [0, 1]], ["11100011", [1, 1]], ["11100000", [2, 1]], ["11111000", [3, 1]], ["10000000", [4, 1]], ["10000010", [5, 1]], ["10101000", [6, 1]], ["11101000", [7, 1]],
  ["10111011", [0, 2]], ["10000011", [1, 2]], ["00000000", [2, 2]], ["00111000", [3, 2]], ["00100000", [4, 2]], ["00101000", [5, 2]], ["00101010", [6, 2]], ["11100010", [7, 2]],
  ["10111111", [0, 3]], ["10001111", [1, 3]], ["00001110", [2, 3]], ["00111110", [3, 3]], ["00001000", [4, 3]], ["00100010", [5, 3]], ["10001110", [6, 3]], ["00111010", [7, 3]],
  ["11101011", [0, 4]], ["11111010", [1, 4]], ["10101110", [2, 4]], ["10101011", [3, 4]], ["00000010", [4, 4]], ["00001010", [5, 4]], ["00101110", [6, 4]], ["10111000", [7, 4]],
  ["10101111", [0, 5]], ["10111110", [1, 5]], ["11101010", [2, 5]], ["10111010", [3, 5]], ["10100000", [4, 5]], ["10001010", [5, 5]], ["10100011", [6, 5]],
]);

export function getTilePosition(walls: string): [number, number] {
  const wallIdx = connectedWalls.get(walls);
  // If invaild wall, return square tile
  if (!wallIdx) return getTilePosition("11111111");
  return [...wallIdx];
}
