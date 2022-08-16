import shuffleArray from "../../../util/etc/shuffleArray.js";
import type Piece from "./Piece.js";

export default class Bag {
  readonly pieces: Piece[];
  readonly nexts: Piece[];
  private quene: Piece[];

  constructor(pieces: Piece[]) {
    this.pieces = pieces;
    this.nexts = [];
    this.quene = shuffleArray(pieces);
    for (let i = 0; i < 10; i++ ) {
      this.addNext();
    }
  }

  getNext() {
    const next = this.nexts.pop() as Piece;
    this.addNext();
    return next;
  }

  private addNext() {
    if (this.quene.length === 0) {
      this.quene = shuffleArray(this.pieces);
    }
    const next = this.quene.shift();
    if (!next) return;
    this.nexts.push(next);
  }

  reset() {
    while (this.nexts.length > 0) {
      this.nexts.pop();
    }
    this.quene = shuffleArray(this.pieces);
  }
}
