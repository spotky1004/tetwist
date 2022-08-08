export default class Sprite {
    constructor(options) {
        this._imageUrl = "";
        this.rows = options.rows;
        this.cols = options.cols;
        this.image = null;
        this.imageUrl = options.imageUrl;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(url) {
        const image = new Image();
        image.addEventListener("load", () => {
            // If src isn't matched, return to avoid interrupt
            if (image.src !== this._imageUrl)
                return;
            this.image = image;
        });
        image.src = url;
        this._imageUrl = url;
    }
    get width() {
        return this.image?.width ?? 0;
    }
    get height() {
        return this.image?.height ?? 0;
    }
    drawImage(ctx, x, y, dx, dy, dWidth, dHeight, hslAdjustOptions) {
        const { image, rows, cols } = this;
        if (!image)
            return;
        ctx.drawImage(image, image.width * (x / rows), image.height * (y / cols), image.width / rows, image.height / cols, dx, dy, dWidth, dHeight);
        // https://stackoverflow.com/a/45201094/13817471
        if (hslAdjustOptions) {
            let { hue, saturation, lightness } = hslAdjustOptions;
            ctx.save();
            ctx.beginPath();
            ctx.rect(dx, dy, dWidth, dHeight);
            ctx.clip();
            if (lightness) {
                ctx.globalCompositeOperation = lightness < 100 ? "color-burn" : "color-dodge";
                lightness = lightness >= 100 ? lightness - 100 : 100 - (100 - lightness);
                ctx.fillStyle = "hsl(0, 50%, " + lightness + "%)";
                ctx.fillRect(dx, dy, dWidth, dHeight);
            }
            if (saturation) {
                ctx.globalCompositeOperation = "saturation";
                ctx.fillStyle = "hsl(0," + saturation + "%, 50%)";
                ctx.fillRect(dx, dy, dWidth, dHeight);
            }
            if (hue) {
                ctx.globalCompositeOperation = "hue";
                ctx.fillStyle = "hsl(" + hue + ",1%, 50%)";
                ctx.fillRect(dx, dy, dWidth, dHeight);
            }
            ctx.globalCompositeOperation = "destination-in";
            ctx.drawImage(image, image.width * (x / rows), image.height * (y / cols), image.width / rows, image.height / cols, dx, dy, dWidth, dHeight);
            ctx.restore();
        }
    }
}
