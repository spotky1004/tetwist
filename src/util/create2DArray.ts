export default function create2DArray(rows: number, cols: number, toFill?: any) {
  const isFillCallback = typeof toFill === "function";

  const array = new Array(cols)
    .fill(undefined)
    .map(_ =>
      new Array(rows)
        .fill(!isFillCallback ? toFill : toFill())
    );
  
  return array;
}
