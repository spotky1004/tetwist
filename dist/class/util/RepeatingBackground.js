export default class RepeatingBackground {
    constructor(options) {
        this.element = options.element;
        this.sizeValue = options.size.value;
        this.sizeUnit = options.size.unit;
        this.imageUrl = options.imageUrl;
        this.size = this.sizeValue;
        this.isMoving = false;
        this.prevTimestemp = 0;
        this.backgroundPosition = [0, 0];
        this.moveOptions = {
            duration: 0,
            xSpeed: 0,
            ySpeed: 0
        };
    }
    set imageUrl(url) {
        this.element.style.backgroundImage = `url(${url})`;
    }
    get imageUrl() {
        return this.element.style.backgroundImage;
    }
    set size(value) {
        this.sizeValue = value;
        this.element.style.backgroundSize = `${value}${this.sizeUnit}`;
    }
    get size() {
        return this.sizeValue;
    }
    set x(value) {
        this.backgroundPosition[0] = value % 1;
        this.element.style.backgroundPositionX = `${this.backgroundPosition[0] * this.sizeValue}${this.sizeUnit}`;
    }
    get x() {
        return this.backgroundPosition[0];
    }
    set y(value) {
        this.backgroundPosition[1] = value % 1;
        this.element.style.backgroundPositionY = `${this.backgroundPosition[1] * this.sizeValue}${this.sizeUnit}`;
    }
    get y() {
        return this.backgroundPosition[1];
    }
    startMove(options) {
        this.prevTimestemp = window.performance.now();
        this.moveOptions = { ...this.moveOptions, ...options };
        if (!this.isMoving)
            window.requestAnimationFrame(this.move.bind(this));
        this.isMoving = true;
    }
    move(currentTime) {
        if (!this.isMoving)
            return;
        const { duration, xSpeed, ySpeed } = this.moveOptions;
        const dt = currentTime - this.prevTimestemp;
        this.x += dt / 1000 / duration * xSpeed;
        this.y += dt / 1000 / duration * ySpeed;
        this.prevTimestemp = currentTime;
        window.requestAnimationFrame(this.move.bind(this));
    }
    stopMove() {
        this.isMoving = false;
    }
}
