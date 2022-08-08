import RepeatingBackground from "./class/util/RepeatingBackground.js";
import imagePaths from "./data/imagePaths.js";
import TetwistField from "./class/game/core/TetwistField.js";
import tilesEnum from "./data/tilesEnum.js";

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

const field = new TetwistField({
  width: 10,
  height: 20,
  canvasWrapper: document.getElementById("game__tetwist-field-wrapper") as HTMLElement,
  canvas: document.getElementById("game__tetwist-field") as HTMLCanvasElement,
});
for (let x = 0; x < 10; x++) {
  for (let y = 0; y < 20; y++) {
    if (Math.random() > 0.5) continue;
    const timestamp = Math.floor(Math.random()*2);
    const tileId = tilesEnum.normalBlock;
    const isGrey = 0;
    field.setCell(x, y, {
      tileId,
      timestemp: timestamp,
      hslAdjust: {
        hue: Math.random()*360,
        lightness: isGrey ? 0 : 160,
        saturation: isGrey ? -50 : 0
      }
    });
  }
}

function tick() {
  render();
  requestAnimationFrame(tick);
}
function render() {
  field.render();
}
tick();
