export default class TileManager {
    constructor() {
        this.items = [];
    }
    registerTile(tile) {
        this.items.push(tile);
        const tileId = this.items.length - 1;
        return tileId;
    }
}
