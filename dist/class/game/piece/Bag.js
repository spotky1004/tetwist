import shuffleArray from "../../../util/etc/shuffleArray.js";
export default class Bag {
    constructor(pieces) {
        this.pieces = pieces;
        this.nexts = [];
        this.quene = shuffleArray(pieces);
        for (let i = 0; i < 10; i++) {
            this.addNext();
        }
    }
    getNext() {
        const next = this.nexts.pop();
        this.addNext();
        return next;
    }
    addNext() {
        if (this.quene.length === 0) {
            this.quene = shuffleArray(this.pieces);
        }
        const next = this.quene.shift();
        if (!next)
            return;
        this.nexts.push(next);
    }
    reset() {
        while (this.nexts.length > 0) {
            this.nexts.pop();
        }
        this.quene = shuffleArray(this.pieces);
    }
}
