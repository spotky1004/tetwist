import RepeatingBackground from "./class/util/RepeatingBackground.js";
import imagePaths from "./data/imagePaths.js";
import Game from "./class/game/Game.js";
import bags from "./data/bags.js";
const game = new Game({
    field: {
        width: 10,
        height: 20,
        canvasWrapper: document.getElementById("game__tetwist-field-wrapper"),
        canvas: document.getElementById("game__tetwist-field"),
        bag: bags.bag7
    }
});
// create background
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
function tick() {
    render();
    requestAnimationFrame(tick);
}
function render() {
    game.render();
}
tick();
