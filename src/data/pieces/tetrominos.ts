import Piece from "../../class/game/piece/Piece.js";
import Kicktable from "../../class/game/piece/Kicktable.js";

// https://tetris.wiki/Super_Rotation_System

const jlstzKicktable = new Kicktable({
  "0": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  "R": [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
  "2": [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  "L": [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]]
});
const iKicktable = new Kicktable({
  "0": [[0, 0], [-1, 0], [2, 0], [-1, 0], [2, 0]],
  "R": [[-1, 0], [0, 0], [0, 0], [0, 1], [0, -2]],
  "2": [[-1, 1], [1, 1], [-2, 1], [1, 0], [-2, 0]],
  "L": [[0, 1], [0, 1], [0, 1], [0, -1], [0, 2]]
});
const oKicktable = new Kicktable({
  "0": [[0, 0]],
  "R": [[0, -1]],
  "2": [[-1, -1]],
  "L": [[-1, 0]]
});

const jPiece = new Piece({
  shape: `o..\nooo`,
  centerMode:"normal",
  kicktable: jlstzKicktable,
  hslAdjust: {
    hue: 215,
    lightness: 100,
    saturation: 100
  }
});
const lPiece = new Piece({
  shape: `..o\nooo`,
  centerMode:"normal",
  kicktable: jlstzKicktable,
  hslAdjust: {
    hue: 40,
    lightness: 100,
    saturation: 100
  }
});
const sPiece = new Piece({
  shape: `.oo\noo.`,
  centerMode:"normal",
  kicktable: jlstzKicktable,
  hslAdjust: {
    hue: 120,
    lightness: 100,
    saturation: 100
  }
});
const tPiece = new Piece({
  shape: `.o.\nooo`,
  centerMode:"normal",
  kicktable: jlstzKicktable,
  hslAdjust: {
    hue: 285,
    lightness: 100,
    saturation: 100
  }
});
const zPiece = new Piece({
  shape: `oo.\n.oo`,
  centerMode:"normal",
  kicktable: jlstzKicktable,
  hslAdjust: {
    hue: 0,
    lightness: 100,
    saturation: 100
  }
});
const iPiece = new Piece({
  shape: `oooo`,
  centerMode:"normal",
  kicktable: iKicktable,
  hslAdjust: {
    hue: 165,
    lightness: 100,
    saturation: 100
  }
});
const oPiece = new Piece({
  shape: `oo\noo`,
  centerMode:"normal",
  kicktable: oKicktable,
  hslAdjust: {
    hue: 55,
    lightness: 150,
    saturation: 130
  }
});

export default {
  jPiece,
  sPiece,
  lPiece,
  tPiece,
  zPiece,
  iPiece,
  oPiece
};
