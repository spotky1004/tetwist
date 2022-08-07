import RepeatingBackground from "./class/util/RepeatingBackground.js";
import imagePaths from "./data/imagePaths.js";
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
