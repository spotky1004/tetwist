export default class Sprite {
    constructor(options) {
        this._imageUrl = "";
        this.itemWidth = options.itemWidth;
        this.itemHeight = options.itemHeight;
        this.image = null;
        this.imageUrl = options.imageUrl;
    }
    get imageUrl() {
        return this._imageUrl;
    }
    set imageUrl(url) {
        const image = new Image();
        image.src = url;
        this._imageUrl = url;
        image.addEventListener("load", () => {
            // If src isn't matched, return to avoid interrupt
            if (image.src !== this._imageUrl)
                return;
            this.image = image;
        });
    }
    drawImage(ctx, x, y, dx, dy, dWidth, dHeight) {
        const { image, itemWidth, itemHeight } = this;
        if (!image)
            return;
        ctx.drawImage(image, x * itemWidth, y * itemHeight, itemWidth, itemHeight, dx, dy, dWidth, dHeight);
    }
}
