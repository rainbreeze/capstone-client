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
        const tileset = map.addTilesetImage('forestTown');
        const bridge = map.addTilesetImage('snowExpansion');
        const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    }

    update() {

    }
}