export default function getWalls(fieldData, x, y) {
    const { tileId, timestamp } = fieldData[y][x];
    const isWall = [];
    for (let dy = -1; dy <= 1; dy++) {
        const row = fieldData[y + dy];
        if (typeof row === "undefined") {
            isWall.push(["1", "1", "1"]);
            continue;
        }
        isWall.push([]);
        for (let dx = -1; dx <= 1; dx++) {
            const cellToCompare = row[x + dx];
            const isCellConnected = cellToCompare &&
                cellToCompare.tileId === tileId &&
                cellToCompare.timestamp === timestamp;
            isWall[dy + 1].push(isCellConnected ? "0" : "1");
        }
    }
    if (isWall[0][1] === "1" || isWall[1][0] === "1") {
        isWall[0][0] = "1";
    }
    if (isWall[0][1] === "1" || isWall[1][2] === "1") {
        isWall[0][2] = "1";
    }
    if (isWall[1][0] === "1" || isWall[2][1] === "1") {
        isWall[2][0] = "1";
    }
    if (isWall[1][2] === "1" || isWall[2][1] === "1") {
        isWall[2][2] = "1";
    }
    const walls = isWall[0][0] +
        isWall[0][1] +
        isWall[0][2] +
        isWall[1][2] +
        isWall[2][2] +
        isWall[2][1] +
        isWall[2][0] +
        isWall[1][0];
    return walls;
}
