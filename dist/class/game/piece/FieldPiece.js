import array2D from "../../../util/etc/array2D.js";
import tilesEnum from "../../../data/tilesEnum.js";
import { isVaildConvention } from "./Kicktable.js";
export default class FieldPiece {
    constructor(options) {
        this.field = options.field;
        this.piece = options.piece;
        this._rotateCount = Math.floor((options.rotateCount ?? 0) % 4);
        this.state = ["0", "R", "2", "L"][this._rotateCount];
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
    set rotateCount(rotateCount) {
        rotateCount = Math.floor(rotateCount % 4);
        this._rotateCount = rotateCount;
    }
    getPieceSpace() {
        return this.piece.getRotetedState(this._rotateCount);
    }
    setPieceToField(isSolid = false) {
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
                if (tileId === null)
                    continue;
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
            for (let x = 0; x < width; x++) {
                const fieldX = x + this._x;
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
    testAndRotate(rotateCount, convention) {
        rotateCount = Math.floor(rotateCount % 4);
        const piece = this.piece;
        const nextRotateState = piece.getRotetedState(rotateCount);
        const solidField = this.field.getSolidField();
        const [width, height] = array2D.measure(nextRotateState);
        const kicktests = piece.kicktable.getKicktests(convention);
        let vaildKick = undefined;
        kicktestLoop: for (const kicktest of kicktests) {
            const [xOffset, yOffset] = kicktest;
            for (let y = 0; y < height; y++) {
                const fieldY = y + this._y + yOffset;
                const pieceRow = nextRotateState[y];
                const fieldRow = solidField[fieldY];
                if (typeof fieldRow === "undefined")
                    continue kicktestLoop;
                for (let x = 0; x < width; x++) {
                    const fieldX = x + this._x + xOffset;
                    if (pieceRow[x] === null)
                        continue;
                    if (fieldRow[fieldX] === true)
                        continue kicktestLoop;
                }
                vaildKick = kicktest;
                break kicktestLoop;
            }
        }
        if (typeof vaildKick === "undefined")
            return false;
        this.removePieceFromField();
        const [xOffset, yOffset] = vaildKick;
        this._x += xOffset;
        this._y += yOffset;
        this.rotateCount = rotateCount;
        this.setPieceToField();
        return true;
    }
    getNextConvention(rotateCount) {
        const nextRotate = Math.floor(rotateCount % 4);
        let nextState = null;
        switch (nextRotate) {
            case 0:
                nextState = "0";
                break;
            case 1:
                nextState = "R";
                break;
            case 2:
                nextState = "2";
                break;
            case 3:
                nextState = "L";
                break;
        }
        if (nextState === null)
            return null;
        const nextConvention = `${this.state}${nextState}`;
        return nextConvention;
    }
    doRotate(count) {
        const nextRotate = this._rotateCount + count;
        const nextConvention = this.getNextConvention(nextRotate);
        if (nextConvention === null ||
            !isVaildConvention(nextConvention))
            return;
        this.testAndRotate(nextRotate, nextConvention);
    }
    rotateCw() {
        this.doRotate(1);
    }
    rotateCcw() {
        this.doRotate(-1);
    }
    rotate180() {
        this.doRotate(2);
    }
}
