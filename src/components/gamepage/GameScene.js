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

// const storedUserId = localStorage.getItem('userId');
// if (!storedUserId) {
//     alert('로그인 후 다시 시도해주세요.');
// }

let stageIndex = 0;
let totalStages = 5;

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/section01.json');
        this.load.image('clean_16x16_tileset', 'assets/tilesets/clean_16x16_tileset.png');
        this.load.image('music_box_64x64', 'assets/tilesets/music_box_64x64.png');
        this.load.image('noteImage', 'assets/images/note.png');
        this.load.image('spikeImage', 'assets/images/spike.png');
        this.load.image('tree', 'assets/images/tree.png');

        this.load.image('Char1', 'assets/images/Character1.png');
        this.load.image('Char2', 'assets/images/Character2.png');
        this.load.image('Char3', 'assets/images/Character3.png');

        this.load.spritesheet('char1', 'assets/images/test_sprite_1.png', {
            frameWidth: 165,
            frameHeight: 249,
            spacing: 2
        });
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
    }

    create() {
        // this.showStage(this.stageIndex);

        const map = this.make.tilemap({ key: "map" });

        console.log(map.getObjectLayer('Collision Layer'));

        const tileset = map.addTilesetImage('clean_16x16_tileset', 'clean_16x16_tileset');

        map.createLayer('Tile Layer 1', tileset, 0, 0);


        let imageName = {
            char1: 'Char1',
            char2: 'Char2',
            char3: 'Char3'
        }[this.selectedCharacter];

        this.player = this.physics.add.sprite(10, 352, 'char1').setScale(0.3);
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

        this.mapColliders = {};
        const objectLayer = map.getObjectLayer('Collision Layer');

        this.score = 0;

        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'Jua'
        }).setScrollFactor(0);


        objectLayer.objects.forEach(obj => {
            const { x, y, width, height, name, type: cls } = obj;
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            if (cls === 'Collision') {
                if (cls === 'Collision') {
                    const box = this.physics.add.staticImage(centerX, centerY)
                        .setSize(width, height)
                        .setOrigin(0.5)
                        .setVisible(false);

                    this.physics.add.collider(this.player, box);
                }
            }

            if (cls === 'troll_section') {
                const zone = this.add.zone(centerX, centerY, width, height);
                this.physics.add.existing(zone);
                zone.body.setAllowGravity(false);
                zone.body.moves = false;
                this.physics.add.overlap(this.player, zone, () => {
                    const target = this.mapColliders['ground_collision'];
                    if (target) {
                        this.tweens.add({
                            targets: target,
                            y: target.y + 100,
                            duration: 600,
                            ease: 'Power2',
                            onComplete: () => target.destroy()
                        });
                    }
                });
            }
            if (cls === 'spike') {
                const spike = this.physics.add.staticImage(centerX, centerY, 'spikeImage')
                    .setDisplaySize(32, 32)
                    .setSize(32, 32)
                    .setVisible(false);

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
                this.physics.add.overlap(this.player, note, () => {
                    console.log('노트 획득!');
                    note.destroy();
                    this.score += 100;
                    this.scoreText.setText(`Score: ${this.score}`);

                });
            }

            if (cls === 'ending') {
                const musicBox = this.physics.add.staticImage(centerX, centerY, 'music_box_64x64').setDisplaySize(48, 48);
                this.physics.add.overlap(this.player, musicBox, () => {
                    if (!this.choiceShown) {
                        this.choiceShown = true;
                        this.score += 1000
                        this.scoreText.setText(`Score: ${this.score}`);
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
    }

    update() {
        const speed = 300;
        const jumpPower = 450;
        const body = this.player.body;
        if (!this.controlsEnabled) return;

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

        if (Phaser.Input.Keyboard.JustDown(this.spaceKey) && body.onFloor()) {
            body.setVelocityY(-jumpPower);
            this.player.anims.play('char1_jump', true);
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
            fontFamily: 'Jua',
            fontSize: '12px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 10, y: 10 }
        };
    }

    setButtonEvents(btn, value) {
        btn.on('pointerover', () => btn.setStyle({ backgroundColor: '#ccc' }));
        btn.on('pointerout', () => btn.setStyle({ backgroundColor: '#fff' }));
        btn.on('pointerdown', () => {
            this.choiceGroup.clear(true, true);
            this.controlsEnabled = true;
            console.log('choice genre: ', value);
            this.showSearchResult(value);
        });
    }

    async showSearchResult(genre) {
        const gameData = {
            userId: 111,
            score: 999,
            genre: genre,
            year: 2005,
            hipster: "no"
        };

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/game/savegamedata`, gameData);
            console.log('추천 결과:', res.data.musicRecommendation);
        } catch (err) {
            console.error('Spotify API 호출 실패:', err);
        }
    }
}