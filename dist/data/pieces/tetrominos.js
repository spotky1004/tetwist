import Piece from "../../class/game/piece/Piece.js";
import Kicktable from "../../class/game/piece/Kicktable.js";
// https://tetris.wiki/Super_Rotation_System
const defaultKicktable = new Kicktable({
    "0": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    "R": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
    "2": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    "L": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
});
const jPiece = new Piece({
    shape: `o..\nooo`,
    centerMode: "normal",
    kicktable: defaultKicktable,
    hslAdjust: {
        hue: 215,
        lightness: 100,
        saturation: 100
    }
});
export default {
    jPiece
};
