import React from "react";
import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene")
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map_test.json');
        this.load.image('forestTown', 'assets/tilesets/tiles_packed.png');
        this.load.image('snowExpansion', 'assets/tilesets/snow-expansion.png');
    }

    create() {
        console.log('create start')
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage('ForestTownMap', 'forestTown');
        const bridge = map.addTilesetImage('SnowTown', 'snowExpansion');
        map.createLayer('Tile Layer 1', tileset, 0, 0).setScrollFactor(1);
        map.createLayer('Bridge', bridge, 0, 0).setScrollFactor(1);


        console.log("tilesets: ", map.tilesets);
        // 임시 플레이어 역할
        this.player = this.add.rectangle(100, 100, 16, 16, 0x00ff00);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        //맵 줌 설정
        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        console.log(mapWidth, mapHeight)

        const zoomX = this.scale.width / mapWidth;
        const zoomY = this.scale.height / mapHeight;

        const zoom = 2
        this.cameras.main.setZoom(zoom);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(
            0,
            0,
            mapWidth - (this.scale.width / zoom) + 1,
            mapHeight - (this.scale.height / zoom) + 1
        );

        console.log("Camera bounds:", this.cameras.main._bounds);




        this.physics.world.createDebugGraphic();

    }

    update() {
        const speed = 100;
        const body = this.player.body;
        body.setVelocity(0);

        if (this.cursors.left.isDown) {
            body.setVelocityX(-speed);
            console.log("position: ", this.player.x, this.player.y);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(speed);
            console.log("position: ", this.player.x, this.player.y);
        }

        if (this.cursors.up.isDown) {
            body.setVelocityY(-speed);
            console.log("position: ", this.player.x, this.player.y);
        } else if (this.cursors.down.isDown) {
            body.setVelocityY(speed);
            console.log("position: ", this.player.x, this.player.y);
        }
    }
}