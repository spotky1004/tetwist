import RepeatingBackground from "./class/util/RepeatingBackground.js";
import imagePaths from "./data/imagePaths.js";

const background = new RepeatingBackground({
  element: document.getElementById("background") as HTMLDivElement,
  size: {
    value: 25,
    unit: "vmin"
  },
  imageUrl: imagePaths.bgNormal
});
background.startMove({
  duration: 25,
  xSpeed: 1,
  ySpeed: 1
});

import useRelativePath from "./util/path/useRelativePath.js";
import Sprite from "./class/util/Sprite.js";
const sprite = new Sprite({
  imageUrl: useRelativePath("../assets/images/tetris_tileset.png"),
  itemWidth: 64,
  itemHeight: 64
});
console.log(sprite);
