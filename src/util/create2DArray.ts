export default function create2DArray(rows: number, cols: number, fill?: any) {
  const array = new Array(cols)
    .fill(undefined)
    .map(_ =>
      new Array(rows)
        .fill(typeof fill !== "undefined" ? fill : undefined)
    );
  
  return array;
}
