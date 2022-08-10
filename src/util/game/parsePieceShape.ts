import array2D from "../etc/array2D.js";

export default function parsePieceShape(shape: string, emptyChar: string=".") {
  let piece: (string | null)[][] = [];

  const shapeLines = shape.split("\n");
  if (!shapeLines.every(line => line.length === shapeLines[0].length)) {
    throw new Error("Invaild piece shape");
  }
  for (let y = 0; y < shapeLines.length; y++) {
    const line = shapeLines[y].split("").map(char => char === emptyChar ? null : char);
    piece.push(line);
  }

  void array2D.trim(piece, null);
  return piece;
}
