import array2D from "../../../util/etc/array2D.js";
export default class SolidField {
    constructor(solidFieldData) {
        this.solidFieldData = solidFieldData;
    }
    testCollision(pieceSpace, xOffset, yOffset) {
        const solidField = this.solidFieldData;
        const [width, height] = array2D.measure(pieceSpace);
        for (let y = 0; y < height; y++) {
            const fieldY = y + yOffset;
            const pieceRow = pieceSpace[y];
            const fieldRow = solidField[fieldY];
            if (typeof fieldRow === "undefined" &&
                !pieceRow.every(id => id === null))
                return true;
            for (let x = 0; x < width; x++) {
                const fieldX = x + xOffset;
                if (pieceRow[x] === null)
                    continue;
                const isSolid = fieldRow[fieldX];
                if (typeof isSolid === "undefined" ||
                    isSolid === true)
                    return true;
            }
        }
        return false;
    }
}
