import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map_test.json');
        this.load.image('forestTown', 'assets/tilesets/tiles_packed.png');
        this.load.image('snowExpansion', 'assets/tilesets/snow-expansion.png');
    }

    create() {
        console.log('create start');

        const map = this.make.tilemap({ key: "map" });

        // 타일셋을 사용하여 맵의 레이어 생성
        const tileset = map.addTilesetImage('forestTown');
        //  const bridge = map.addTilesetImage('snowExpansion');
        // 더 이상 layer를 사용하지 않음
        map.createLayer('Tile Layer 1', tileset, 0, 0);
    }

    update() {
    }
}
