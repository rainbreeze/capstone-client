import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }



    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/map_tiled.json');
        this.load.image('forestTown', 'assets/tilesets/tiles_packed.png');
        this.load.image('snowExpansion', 'assets/tilesets/snow-expansion.png');

        //캐릭터 이미지셋
        this.load.image('Char1', 'assets/images/Character1.png');
        this.load.image('Char2', 'assets/images/Character2.png');
        this.load.image('Char3', 'assets/images/Character3.png');

        //장애물 이미지셋
        this.load.image('musicbox', 'assets/images/musicbox.png');
        this.load.image('brokenMusicBox', 'assets/images/musicbox_off.png');
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


        //맵 충돌 셋팅 
        const collisionObjects = map.getObjectLayer('Collision').objects;


        console.log('selectedCharacter: ', this.selectedCharacter);
        // 플레이어 역할
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

        //맵 충돌 관련
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

        // this.physics.world.createDebugGraphic();

        this.controlsEnabled = true;
        // 개별 장애물
        this.obstacles = this.physics.add.staticGroup();

        // 장애물을 그룹에 추가
        this.obstacles.create(300, 100, 'musicbox')
            .setDisplaySize(20, 20)
            .refreshBody(); // 필수: staticGroup일 경우

        this.attackKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.input.keyboard.on('keydown-SPACE', () => {
            const attackBox = this.physics.add.sprite(this.player.x + 32, this.player.y, null);
            attackBox.body.setSize(32, 32); // 히트박스 크기

            // 충돌 체크
            this.physics.add.overlap(attackBox, this.obstacles, (hitBox, obstacle) => {
                console.log('장애물 부서짐!');
                obstacle.setTexture('brokenMusicBox');
                if (this.choiceShown) return;
                this.choiceShown = true;
                this.showChoiceButtons();


            });

            // 히트박스는 잠깐만 유지하고 제거
            this.time.delayedCall(200, () => {
                attackBox.destroy();
            });
        });

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

        if (!this.controlsEnabled) return;

    }


    //장애물 부서질 때 선택지 등장
    showChoiceButtons() {
        this.controlsEnabled = false;
        if (this.choiceGroup) {
            this.choiceGroup.clear(true, true);
        }

        const centerX = this.player.x;
        const centerY = this.player.y;


        const option1 = this.add.text(centerX - 50, centerY, 'classic', {
            fontFamily: 'Jua',
            fontSize: '12px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 10 },
            border: '1px solid #000',

        }).setOrigin(0.5).setInteractive();
        const option2 = this.add.text(centerX + 50, centerY, 'rock', {
            fontSize: '12px',
            fontFamily: 'Jua',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 10 },
            border: '1px solid #000',
        }).setOrigin(0.5).setInteractive();

        this.choiceGroup = this.add.group();
        this.choiceGroup.addMultiple([option1, option2]);

        option1.on('pointerover', () => option1.setStyle({ backgroundColor: '#ccc' }));
        option1.on('pointerout', () => option1.setStyle({ backgroundColor: '#fff' }));
        option2.on('pointerover', () => option2.setStyle({ backgroundColor: '#ccc' }));
        option2.on('pointerout', () => option2.setStyle({ backgroundColor: '#fff' }));

        console.log(this.children.list.filter(obj => obj instanceof Phaser.GameObjects.Text));


        option1.on('pointerdown', () => {
            console.log(option1);
            console.log(typeof option1.destroy);
            // 여기에 원하는 행동 추가
            this.choiceGroup.clear(true, true);
            console.log('destroy 완료?', !this.children.list.includes(option1));
            this.controlsEnabled = true;
            console.log('classic 선택됨');
        });

        option2.on('pointerdown', () => {
            console.log(option2);
            console.log(typeof option2.destroy);
            // 여기에 원하는 행동 추가
            this.choiceGroup.clear(true, true);
            console.log('destroy 완료?', !this.children.list.includes(option2));
            this.controlsEnabled = true;
            console.log('rock 선택됨');
        });
    }

}