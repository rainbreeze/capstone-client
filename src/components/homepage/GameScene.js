import Phaser from "phaser";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.tilemapTiledJSON("map", "assets/tilemaps/Dungeon Tileset.json");

        this.load.image("tileset", "assets/tilesets/Tileset.png");
        this.load.image("objects", "assets/tilesets/Objects.png");
        this.load.image("details", "assets/tilesets/Objects_small_details.png");
        this.load.image("animated", "assets/tilesets/Animated_objects.png");

        this.load.spritesheet("player", "assets/sprites/Characters.png", {
            frameWidth: 48,
            frameHeight: 48,
        });
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("Tileset", "tileset");
        const objects = map.addTilesetImage("Objects", "objects");
        const details = map.addTilesetImage("Objects_small_details", "details");
        const animated = map.addTilesetImage("Animated_objects", "animated");


        // 레이어 생성
        map.createLayer("Tiles", tileset, 0, 0).setScrollFactor(1);
        map.createLayer("Animated_objects", animated, 0, 0).setScrollFactor(1);
        map.createLayer("Objects1", objects, 0, 0).setScrollFactor(1);
        map.createLayer("Objects2", objects, 0, 0).setScrollFactor(1);
        map.createLayer("Objects3", objects, 0, 0).setScrollFactor(1);
        map.createLayer("Small_objects1", details, 0, 0).setScrollFactor(1);
        map.createLayer("Small_objects2", details, 0, 0).setScrollFactor(1);
        map.createLayer("Small_objects3", details, 0, 0).setScrollFactor(1);
        map.createLayer("Small_objects4", details, 0, 0).setScrollFactor(1);


        // 플레이어 생성
        this.player = this.physics.add.sprite(100, 100, "player", 13);
        this.add.rectangle(100, 100, 4, 4, 0xff0000); // 빨간 점 찍기

        this.player.setDepth(10);
        this.player.setScale(0.5);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 10 }),
            frameRate: 6,
            repeat: -1,
        });
        this.player.anims.play('idle');

        // 충돌 설정 예시
        const groundLayer = map.getLayer("Tiles").tilemapLayer;
        // groundLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.player, groundLayer);

        // 입력 키 세팅
        this.cursors = this.input.keyboard.createCursorKeys();


        const mapWidth = map.widthInPixels;
        const mapHeight = map.heightInPixels;

        // 캔버스 크기 기준으로 맵을 꽉 채우는 줌 비율 계산
        const zoomX = this.scale.width / mapWidth;
        const zoomY = this.scale.height / mapHeight;

        // 더 작은 쪽으로 줌해서 여백 없이 꽉 채우기
        const zoom = Math.min(zoomX, zoomY)

        this.cameras.main.setZoom(zoom);
        this.cameras.main.setBounds(0, 0, mapWidth, mapHeight);
        this.cameras.main.startFollow(this.player);

        // 배경만 보여주려면 centerOn으로 맵 중심 정렬
        this.cameras.main.centerOn(mapWidth / 2, mapHeight / 2);

        this.physics.world.createDebugGraphic();

        const centerX = this.scale.width / 2;
        const centerY = this.scale.height / 2;

        const buttonStyle = {
            font: "12px Arial",
            fill: "#ffffff",
            backgroundColor: "#333",
            padding: { x: 20, y: 10 },
            align: "center"
        };
        const warriorBtn = this.add.text(centerX, centerY - 40, "선택지 1", buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.chooseClass("choice 1"));

        // 선택지 2
        const mageBtn = this.add.text(centerX, centerY + 40, "선택지 2", buttonStyle)
            .setOrigin(0.5)
            .setInteractive({ useHandCursor: true })
            .on("pointerdown", () => this.chooseClass("choice 2"));


    }

    chooseClass(choice) {
        this.playerClass = choice;
        console.log("선택된 클래스:", this.playerClass);

        // TODO: 이후 게임 로직 시작하거나 다음 씬으로 이동
        // 예: this.scene.start("MainGameScene", { playerClass: this.playerClass });
    }

    update() {
        const speed = 100;
        this.player.setVelocity(0);

        if (this.cursors.left.isDown) {
            console.log("왼쪽!");
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown) {
            console.log("오른쪽!");
            this.player.setVelocityX(speed);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed);
        }

        console.log("position:", this.player.x, this.player.y); // 매 프레임 위치 확인
    }

}