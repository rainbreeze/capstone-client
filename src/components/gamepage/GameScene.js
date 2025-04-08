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

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
    }


    create() {
        console.log('create start');

        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage('ForestTownMap', 'forestTown');
        const bridge = map.addTilesetImage('SnowTown', 'snowExpansion');
        map.createLayer('Tile Layer 1', tileset, 0, 0).setScrollFactor(1);
        map.createLayer('Bridge', [tileset, bridge], 0, 0).setScrollFactor(1);
        map.createLayer('Object', [tileset, bridge], 0, 0).setScrollFactor(1);


        console.log("tilesets: ", map.tilesets);

        console.log('selectedCharacter: ', this.selectedCharacter);
        // 임시 플레이어 역할
        let color = undefined;

        if (this.selectedCharacter == 'char1') {
            color = 0x00ff00;
        } else if (this.selectedCharacter == 'char2') {
            color = 0xffffff;
        } else if (this.selectedCharacter == 'char3') {
            color = 0x558BCF;
        }

        this.player = this.add.rectangle(100, 100, 16, 16, color);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);




        this.cursors = this.input.keyboard.createCursorKeys();

        //맵 줌 설정
        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        console.log(mapWidth, mapHeight)
        const zoom = 2
        this.cameras.main.setZoom(zoom);
        this.cameras.main.startFollow(this.player);


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);



        this.physics.world.createDebugGraphic();

    }

    update() {
        const speed = 100;
        const body = this.player.body;
        body.setVelocity(0);

        if (this.cursors.left.isDown) {
            body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            body.setVelocityY(-speed);

        } else if (this.cursors.down.isDown) {
            body.setVelocityY(speed);

        }
    }
}