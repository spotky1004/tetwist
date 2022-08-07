import RepeatingBackground from "./class/util/RepeatingBackground.js";
import imagePaths from "./data/imagePaths.js";
import TetwistField from "./class/game/core/TetwistField.js";
import tilesEnum from "./data/tilesEnum.js";
const background = new RepeatingBackground({
    element: document.getElementById("background"),
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
    canvasWrapper: document.getElementById("game__tetwist-field-wrapper"),
    canvas: document.getElementById("game__tetwist-field"),
});
for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 20; y++) {
        const t = Math.floor(Math.random() * 3);
        let tileId = -1;
        if (t === 0) {
            tileId = tilesEnum.L;
        }
        else if (t === 1) {
            tileId = tilesEnum.O;
        }
        else if (t === 2) {
            tileId = tilesEnum.T;
        }
        field.setTile(x, y, tileId, t);
    }
}
function tick(t) {
    if (t > 500)
        return;
    render();
    // requestAnimationFrame(tick);
}
function render() {
    field.render();
}
setTimeout(() => {
    tick(0);
}, 500);
