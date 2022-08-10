function create(rows, cols, toFill) {
    const isFillCallback = typeof toFill === "function";
    const array = new Array(cols)
        .fill(undefined)
        .map(_ => new Array(rows)
        .fill(!isFillCallback ? toFill : toFill()));
    return array;
}
function fill(arr, width, height, xOffset, yOffset, fillWith) {
    const [arrWidth, arrHeight] = measure(arr);
    const result = [];
    for (let y = 0; y < height; y++) {
        const arrYIndex = y - yOffset;
        const inArrHeightRange = 0 <= arrYIndex && arrYIndex < arrHeight;
        if (!inArrHeightRange) {
            result.push(Array(width).fill(fillWith));
        }
        else {
            const line = [];
            result.push(line);
            for (let x = 0; x < width; x++) {
                const arrXIndex = x - xOffset;
                const inArrWidthRange = 0 <= arrXIndex && arrXIndex < arrWidth;
                if (inArrWidthRange) {
                    line.push(arr[arrYIndex][arrXIndex]);
                }
                else {
                    line.push(fillWith);
                }
            }
        }
    }
    return result;
}
function is(arr) {
    const width = (arr[0] ?? []).length;
    return arr.every(row => row.length === width);
}
function measure(arr) {
    if (!is(arr))
        throw new Error("Width of array must be a constant");
    return [(arr[0] ?? []).length, arr.length];
}
function trim(arr, toTrim, clone = false) {
    if (clone) {
        arr = [...arr.map(line => [...line])];
    }
    // check array is 2DArray
    let width = (arr[0] ?? []).length;
    if (!arr.every(row => row.length === width)) {
        throw new Error("Width of array must be a constant");
    }
    // trim from top
    for (let y = 0; y < arr.length; y++) {
        if (arr[y].every(char => char === toTrim)) {
            arr.shift();
            y--;
        }
        else {
            break;
        }
    }
    // trim from bottom
    for (let y = arr.length - 1; y >= 0; y--) {
        if (arr[y].every(char => char === toTrim)) {
            arr.pop();
        }
        else {
            break;
        }
    }
    // trim from left
    let leftTrimCount = 0;
    teimLeft: for (let x = 0; x < width; x++) {
        for (let y = 0; y < arr.length; y++) {
            if (arr[y][x] !== toTrim)
                break teimLeft;
        }
        leftTrimCount++;
    }
    for (let y = 0; y < arr.length; y++) {
        arr[y].splice(0, leftTrimCount);
    }
    width -= leftTrimCount;
    // trim from right
    let rightTrimCount = 0;
    teimRight: for (let x = width - 1; x >= 0; x--) {
        for (let y = 0; y < arr.length; y++) {
            if (arr[y][x] !== toTrim)
                break teimRight;
        }
        rightTrimCount++;
    }
    for (let y = 0; y < arr.length; y++) {
        arr[y].splice(width - rightTrimCount, rightTrimCount);
    }
    width -= rightTrimCount;
    return arr;
}
function replace(arr, replacer) {
    const result = [];
    const [width, height] = measure(arr);
    for (let y = 0; y < height; y++) {
        const row = [];
        const arrRow = arr[y];
        result.push(row);
        for (let x = 0; x < width; x++) {
            row.push(replacer(arrRow[x]));
        }
    }
    return result;
}
export default {
    create,
    fill,
    is,
    measure,
    trim,
    replace
};
