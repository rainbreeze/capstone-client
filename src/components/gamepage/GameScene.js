import Phaser from "phaser"
import axios from 'axios';

let genres = [
    { name: 'rock', count: 0 },
    { name: 'rap', count: 0 },
    { name: 'edm', count: 0 },
    { name: 'latin', count: 0 },
    { name: 'pop', count: 0 },
    { name: 'hiphop', count: 0 },
    { name: 'R&B', count: 0 },
];

// let year = 0;

const storedUserId = localStorage.getItem('userId');
if (!storedUserId) {
    //alert('로그인 후 다시 시도해주세요.');
}

// let stageIndex = 0;
let score = 0;
let totalStages = 3;

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        // 맵 생성에 필요한 이미지
        this.load.image('clean_16x16_tileset', 'assets/tilesets/clean_16x16_tileset.png');
        this.load.image('music_box_64x64', 'assets/tilesets/music_box_64x64.png');
        this.load.image('noteImage', 'assets/images/note.png');
        this.load.image('spikeImage', 'assets/images/spike.png');


        this.load.tilemapTiledJSON('map1', 'assets/tilemaps/section01.json');
        this.load.tilemapTiledJSON('map2', 'assets/tilemaps/section02.json');
        this.load.tilemapTiledJSON('map3', 'assets/tilemaps/section03.json');


        this.load.spritesheet('char1', 'assets/images/sprite_char1.png', {
            frameWidth: 165,
            frameHeight: 249,
            spacing: 2
        });
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
        this.stageIndex = data.stageIndex || 0

        this.score = data.score || 0;
    }


    create(data) {

        const mapKey = `map${this.stageIndex + 1}`;

        const map = this.make.tilemap({ key: mapKey });


        // 공통 코드

        const tileset = map.addTilesetImage('clean_16x16_tileset', 'clean_16x16_tileset');

        // 맵 레이어
        map.createLayer('Tile Layer 1', tileset, 0, 0);
        this.mapColliders = {};
        const objectLayer = map.getObjectLayer('Collision Layer');
        console.log('objectLayer', objectLayer);

        // 스코어



        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'noto-sans'
        }).setScrollFactor(0);

        // 캐릭터 선택 이미지
        let imageName = {
            char1: 'Char1',
            char2: 'Char2',
            char3: 'Char3'
        }[this.selectedCharacter];



        this.player = this.physics.add.sprite(10, 300, imageName).setScale(0.3);

        this.player.body.setSize(48, 120);
        this.player.body.setOffset(55, 110);

        this.player.body.setCollideWorldBounds(true);

        this.anims.create({
            key: 'char1_walk',
            frames: this.anims.generateFrameNumbers('char1', { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'char1_jump',
            frames: this.anims.generateFrameNumbers('char1', { start: 3, end: 5 }),
            frameRate: 4,
            repeat: 0
        });

        this.jumpCount = 0;
        this.maxJump = 2;




        // 오브젝트 레이어
        objectLayer.objects.forEach(obj => {
            const { x, y, width, height, type: cls } = obj;
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            if (cls === 'Collision') {
                if (cls === 'Collision') {
                    const zone = this.add.zone(centerX, centerY, width, height);
                    this.physics.add.existing(zone, true); // true: static body
                    this.physics.add.collider(this.player, zone);
                }
            }

            if (cls === 'spike') {
                const spike = this.physics.add.staticImage(centerX, centerY, 'spikeImage')
                    .setDisplaySize(32, 32)
                    .setSize(32, 32)
                    .setVisible(false);
                spike.refreshBody();

                this.physics.add.overlap(this.player, spike, () => {
                    console.log('스파이크 데미지!');
                });

                this.events.on('update', () => {
                    const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, spike.x, spike.y);
                    if (distance < 150) spike.setVisible(true);
                });
            }

            if (cls === 'note') {
                const note = this.physics.add.staticImage(centerX, centerY, 'noteImage').setDisplaySize(32, 32).setSize(32, 32).setVisible(true);
                note.refreshBody();
                this.physics.add.overlap(this.player, note, () => {
                    note.destroy();
                    score += 100;
                    this.scoreText.setText(`Score: ${score}`);

                });
            }

            // 뮤직박스
            if (cls === 'ending') {
                const musicBox = this.physics.add.staticImage(centerX, centerY, 'music_box_64x64').setDisplaySize(48, 48);
                this.physics.add.overlap(this.player, musicBox, () => {
                    if (!this.choiceShown) {
                        this.choiceShown = true;
                        score += 1000
                        this.scoreText.setText(`Score: ${score}`);
                        this.showChoiceButtons();
                    }
                });
            }
        });

        // 키보드 입력
        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.controlsEnabled = true;

        this.choiceShown = false;

    }

    update() {
        if (!this.controlsEnabled) return;

        const speed = 300;
        const jumpPower = 400;
        const body = this.player.body;

        // 좌우 이동
        body.setVelocityX(0);
        if (this.cursors.left.isDown) {
            body.setVelocityX(-speed);
            this.player.setFlipX(true);
            this.player.anims.play('char1_walk', true);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(speed);
            this.player.setFlipX(false);
            this.player.anims.play('char1_walk', true);
        } else {
            this.player.anims.stop();
        }

        // 바닥에 닿았을 때 점프 카운트 초기화
        if (body.blocked.down || body.onFloor()) {
            this.jumpCount = 0;
        }

        if (
            Phaser.Input.Keyboard.JustDown(this.spaceKey) ||
            Phaser.Input.Keyboard.JustDown(this.cursors.up)
        ) {
            if (this.jumpCount < this.maxJump) {
                this.player.setVelocityY(-jumpPower);
                this.jumpCount += 1;
                this.player.anims.play('char1_jump', true);
            }
        }
    }


    getRandomGenres(n) {
        const shuffled = [...genres].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    showChoiceButtons() {
        this.controlsEnabled = false;

        const choices = this.getRandomGenres(2);

        const centerX = this.player.x;
        const centerY = this.player.y;

        const option1 = this.add.text(centerX - 50, centerY, choices[0].name, this.getTextStyle()).setOrigin(0.5).setInteractive();
        const option2 = this.add.text(centerX + 50, centerY, choices[1].name, this.getTextStyle()).setOrigin(0.5).setInteractive();

        this.choiceGroup = this.add.group([option1, option2]);
        this.setButtonEvents(option1, choices[0].name);
        this.setButtonEvents(option2, choices[1].name);
    }

    getTextStyle() {
        return {
            fontFamily: 'noto-sans',
            fontSize: '12px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 10 }
        };
    }

    setButtonEvents(btn, value) {
        btn.on('pointerdown', () => {
            this.choiceGroup.clear(true, true);
            this.controlsEnabled = true;
            console.log('choice genre: ', value);

            genres.find(g => g.name === value).count += 1;

            if (this.stageIndex < totalStages - 1) {
                this.scene.restart({
                    selectedCharacter: this.selectedCharacter,
                    stageIndex: this.stageIndex + 1
                });
            } else {
                const result = genres.reduce((prev, curr) => curr.count > prev.count ? curr : prev);
                console.log('가장 많이 선택된 장르:', result.name);
                this.showSearchResult(result.name);
            }
        });
    }

    showResultPopup(result) {
        this.controlsEnabled = false;
        if (window.showGamePopup) {
            window.showGamePopup(result); // 배열 전체 넘김
        }

    }


    async showSearchResult(genre) {
        const gameData = {
            userId: storedUserId,
            score: score,
            genre: genre,
            year: 2005,
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/game/savegamedata`, gameData);
            this.showResultPopup(res.data.musicRecommendation);
        } catch (err) {
            console.error('Spotify API 호출 실패:', err);
        }
    }
}