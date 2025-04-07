import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        // 타일맵과 타일셋 로딩
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map_test.json');
        this.load.image('forestTown', 'assets/tilesets/tiles_packed.png');
        this.load.image('snowExpansion', 'assets/tilesets/snow-expansion.png');
    }

    create() {
        console.log('create start');
        
        // 타일맵 생성
        const map = this.make.tilemap({ key: "map" });

        // 타일셋을 사용하여 맵의 레이어 생성
        const tileset = map.addTilesetImage('forestTown');
        const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    }

    update() {
        // 게임 씬에서 매 프레임마다 업데이트할 내용이 없다면 빈 함수로 둡니다.
    }
}
