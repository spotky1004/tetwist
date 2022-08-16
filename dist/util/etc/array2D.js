function create(rows, cols, toFill) {
    const isFillCallback = typeof toFill === "function";
    const array = new Array(cols)
        .fill(undefined)
        .map((_, y) => new Array(rows)
        .fill(undefined)
        .map((_, x) => !isFillCallback ? toFill : toFill(x, y)));
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
function rotate(arr, rotateCount) {
    if (!Number.isInteger(rotateCount))
        throw new Error("Rotate count must be an integer");
    const [width, height] = measure(arr);
    if (width !== height)
        throw new Error("Width and height of the array must be the same to rotate");
    const theta = Math.PI / 2 * (rotateCount % 4);
    const sint = Math.round(Math.sin(theta));
    const cost = Math.round(Math.cos(theta));
    const result = [];
    for (let y = 0; y < height; y++) {
        const row = [];
        result.push(row);
        for (let x = 0; x < width; x++) {
            const shiftedX = x - (width - 1) / 2;
            const shiftedY = y - (height - 1) / 2;
            const xIdx = shiftedX * cost - shiftedY * sint + (width - 1) / 2;
            const yIdx = shiftedX * sint + shiftedY * cost + (height - 1) / 2;
            row.push(arr[yIdx][xIdx]);
        }
    }
    return result;
}
function freeze(arr) {
    Object.freeze(arr);
    for (let y = 0; y < arr.length; y++) {
        Object.freeze(arr[y]);
    }
}
export default {
    create,
    fill,
    is,
    measure,
    trim,
    replace,
    rotate,
    freeze
};
