interface SpriteOptions {
  imageUrl: string;
  itemWidth: number;
  itemHeight: number;
}

export default class Sprite {
  private _imageUrl: string;
  private image: HTMLImageElement | null;
  readonly itemWidth: number;
  readonly itemHeight: number;

  constructor(options: SpriteOptions) {
    this._imageUrl = "";
    this.itemWidth = options.itemWidth;
    this.itemHeight = options.itemHeight;
    
    this.image = null;
    this.imageUrl = options.imageUrl;
  }

  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(url: string) {
    const image = new Image();
    image.src = url;
    this._imageUrl = url;

    image.addEventListener("load", () => {
      // If src isn't matched, return to avoid interrupt
      if (image.src !== this._imageUrl) return;
      this.image = image;
    });
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, dWidth: number, dHeight: number) {
    const { image, itemWidth, itemHeight } = this;
    if (!image) return;

    ctx.drawImage(
      image,
      x*itemWidth, y*itemHeight, itemWidth, itemHeight,
      dx, dy, dWidth, dHeight
    );
  }
}
