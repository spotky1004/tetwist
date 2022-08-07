export default function getWalls(timestemps: number[][], x: number, y: number) {
  const timestemp = timestemps[y][x];
  const neighbors: string[][] = [];
  for (let dy = -1; dy <= 1; dy++) {
    if (typeof timestemps[y+dy] === "undefined") {
      neighbors.push(["1", "1", "1"]);
      continue;
    }
    const row = timestemps[y+dy];
    neighbors.push([]);
    for (let dx = -1; dx <= 1; dx++) {
      const toCheck = row[x+dx];
      neighbors[dy+1].push(toCheck === timestemp ? "0" : "1");
    }
  }

  if (neighbors[0][1] === "1" || neighbors[1][0] === "1") {
    neighbors[0][0] = "1"
  }
  if (neighbors[0][1] === "1" || neighbors[1][2] === "1") {
    neighbors[0][2] = "1"
  }
  if (neighbors[1][0] === "1" || neighbors[2][1] === "1") {
    neighbors[2][0] = "1"
  }
  if (neighbors[1][2] === "1" || neighbors[2][1] === "1") {
    neighbors[2][2] = "1"
  }

  const walls =
    neighbors[0][0] +
    neighbors[0][1] +
    neighbors[0][2] +
    neighbors[1][2] +
    neighbors[2][2] +
    neighbors[2][1] +
    neighbors[2][0] +
    neighbors[1][0];
  return walls;
}
