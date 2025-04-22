import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene")
    }



    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map_tiled.json');
        this.load.image('forestTown', 'assets/tilesets/tiles_packed.png');
        this.load.image('snowExpansion', 'assets/tilesets/snow-expansion.png');

        //캐릭터 이미지셋
        this.load.image('Char1', 'assets/images/Character1.png');
        this.load.image('Char2', 'assets/images/Character2.png');
        this.load.image('Char3', 'assets/images/Character3.png');
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
    }


    create() {
        console.log('create start')
        const map = this.make.tilemap({ key: "map" });
        const tileset = map.addTilesetImage('ForestTownMap', 'forestTown');
        const bridge = map.addTilesetImage('SnowTown', 'snowExpansion');
        map.createLayer('Tile Layer 1', tileset, 0, 0).setScrollFactor(1);
        map.createLayer('Bridge', [tileset, bridge], 0, 0).setScrollFactor(1);
        map.createLayer('Object', [tileset, bridge], 0, 0).setScrollFactor(1);


        //맵 충돌 셋팅 
        const collisionObjects = map.getObjectLayer('Collision').objects;


        console.log('selectedCharacter: ', this.selectedCharacter);
        // 임시 플레이어 역할
        let imageName = undefined;

        if (this.selectedCharacter === 'char1') {
            imageName = 'Char1'
        } else if (this.selectedCharacter === 'char2') {
            imageName = 'Char2'
        } else if (this.selectedCharacter === 'char3') {
            imageName = 'Char3'
        }

        this.player = this.physics.add.image(100, 100, imageName);
        this.player.setDisplaySize(24, 24);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);

        collisionObjects.forEach(obj => {
            const box = this.physics.add.staticImage(obj.x + obj.width / 2, obj.y + obj.height / 2)
                .setSize(obj.width, obj.height)
                .setOrigin(0.5)
                .setVisible(false); //안보이도록 설정

            this.physics.add.collider(this.player, box);
        });




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
        const speed = 300;
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