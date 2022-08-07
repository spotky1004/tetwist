interface SpriteOptions {
  imageUrl: string;
  rows: number;
  cols: number;
}

export default class Sprite {
  private _imageUrl: string;
  private image: HTMLImageElement | null;
  readonly rows: number;
  readonly cols: number;

  constructor(options: SpriteOptions) {
    this._imageUrl = "";
    this.rows = options.rows;
    this.cols = options.cols;
    
    this.image = null;
    this.imageUrl = options.imageUrl;
  }

  get imageUrl() {
    return this._imageUrl;
  }
  set imageUrl(url: string) {
    const image = new Image();
    image.addEventListener("load", () => {
      // If src isn't matched, return to avoid interrupt
      if (image.src !== this._imageUrl) return;
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

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number, dx: number, dy: number, dWidth: number, dHeight: number) {
    const { image, rows, cols } = this;
    if (!image) return;

    ctx.drawImage(
      image,
      image.width*(x/rows), image.height*(y/cols), image.width/rows, image.height/cols,
      dx, dy, dWidth, dHeight
    );
  }
}
