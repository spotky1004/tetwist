import array2D from "../../../util/etc/array2D.js";
import tilesEnum from "../../../data/tilesEnum.js";
import { State, Convention } from "./Kicktable.js";
import type TetwistField from "../field/TetwistField.js";
import type Piece from "./Piece.js";

interface FieldPieceOptions {
  field: TetwistField,
  piece: Piece,
  rotateCount?: number,
  x: number,
  y: number
}

export default class FieldPiece {
  private readonly field: TetwistField;
  private readonly piece: Piece;
  private _rotateCount: number;
  private state: State;
  private _x: number;
  private _y: number;

  constructor(options: FieldPieceOptions) {
    this.field = options.field;
    this.piece = options.piece;
    this._rotateCount = Math.floor((options.rotateCount ?? 0) % 4);
    this.state = ["0", "R", "2", "L"][this._rotateCount] as State;

    this._x = options.x;
    this._y = options.y;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
  
  get rotateCount() {
    return this._rotateCount;
  }

  set rotateCount(rotateCount: number) {
    rotateCount = Math.floor(rotateCount % 4);
    this._rotateCount = rotateCount;
  }

  getPieceSpace() {
    return this.piece.getRotetedState(this._rotateCount);
  }

  setPieceToField(isSolid: boolean=false) {
    const field = this.field;
    const pieceSpace = this.getPieceSpace();
    const [width, height] = array2D.measure(pieceSpace);
    const timestamp = Date.now();
    const hslAdjust = this.piece.hslAdjust;
    
    for (let y = 0; y < height; y++) {
      const fieldY = y + this._y;
      const row = pieceSpace[y];
      for (let x = 0; x < width; x++) {
        const fieldX = x + this._x;
        const tileId = row[x];
        if (tileId === null) continue;
        field.setCell(fieldX, fieldY, {
          isSolid,
          tileId,
          timestamp,
          hslAdjust
        });
      }
    }
  }

  removePieceFromField() {
    const field = this.field;
    const pieceSpace = this.getPieceSpace();
    const [width, height] = array2D.measure(pieceSpace);
    
    for (let y = 0; y < height; y++) {
      const fieldY = y + this._y;
      const row = pieceSpace[y];
      for (let x = 0; x < width; x++) {
        const fieldX = x + this._x;
        const tileId = row[x];
        if (tileId === null) continue;
        field.setCell(fieldX, fieldY, {
          isSolid: false,
          tileId: tilesEnum.empty,
          timestamp: -1
        });
      }
    }
  }

  placePiece() {
    this.setPieceToField(true);
  }

  testAndRotate(rotateCount: number, convention: Convention): boolean {
    rotateCount = Math.floor(rotateCount % 4);

    const piece = this.piece;

    const nextRotateState = piece.getRotetedState(rotateCount);
    const solidField = this.field.getSolidField();
    const kicktests = piece.kicktable.getKicktests(convention);

    let vaildKick: [xOffset: number, yOffset: number] | undefined = undefined;
    for (const kicktest of kicktests) {
      const [xOffset, yOffset] = kicktest;
      const isVaildKick = !solidField.testCollision(nextRotateState, this._x + xOffset, this._y + yOffset);
      if (!isVaildKick) continue;
      vaildKick = kicktest;
      break;
    }

    if (typeof vaildKick === "undefined") return false;
    this.removePieceFromField();
    const [xOffset, yOffset] = vaildKick;
    this._x += xOffset;
    this._y += yOffset;
    this.rotateCount = rotateCount;
    this.setPieceToField();
    return true;
  }

  private getNextState(rotateCount: number) {
    const nextRotate = Math.floor(rotateCount % 4);
    let nextState: State | null = null;
    switch (nextRotate) {
      case 0:
        nextState = "0";
        break;
      case 1:
        nextState = "L";
        break;
      case 2:
        nextState = "2";
        break;
      case 3:
        nextState = "R";
        break;
    }
    return nextState;
  }

  private getNextConvention(rotateCount: number) {
    let nextState: State | null = this.getNextState(rotateCount);
    if (nextState === null) return null;
    const nextConvention: Convention = `${this.state}${nextState}`;
    return nextConvention;
  }

  doRotate(count: number) {
    const nextRotate = Math.floor(this._rotateCount + count + 4) % 4;
    const nextState = this.getNextState(nextRotate);
    const nextConvention = this.getNextConvention(nextRotate);
    if (
      nextState === null ||
      nextConvention === null
    ) return;
    const result = this.testAndRotate(nextRotate, nextConvention);
    if (!result) return;
    this.state = nextState;
  }

  rotateCw() {
    this.doRotate(-1);
  }

  rotateCcw() {
    this.doRotate(1);
  }

  rotate180() {
    this.doRotate(2);
  }

  move(x: number, y: number): boolean {
    const pieceSpace = this.getPieceSpace();
    const solidField = this.field.getSolidField();
    
    const nextX = this._x + x;
    const nextY = this._y + y;

    const isVaildMove = !solidField.testCollision(pieceSpace, nextX, nextY);
    if (!isVaildMove) return false;
    this.removePieceFromField();
    this._x = nextX;
    this._y = nextY;
    this.setPieceToField();
    return true;
  }

  moveDown() {
    return this.move(0, 1);
  }

  moveLeft() {
    return this.move(-1, 0);
  }

  moveRight() {
    return this.move(1, 0);
  }
}
