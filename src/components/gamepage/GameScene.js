import Phaser from "phaser"

export default class GameScene extends Phaser.Scene {

    constructor() {
        super("GameScene");
    }

    preload() {
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/section01.json');
        this.load.image('clean_16x16_tileset', 'assets/tilesets/clean_16x16_tileset.png');
        this.load.image('music_box_64x64', 'assets/tilesets/music_box_64x64.png');

        this.load.image('Char1', 'assets/images/Character1.png');
        this.load.image('Char2', 'assets/images/Character2.png');
        this.load.image('Char3', 'assets/images/Character3.png');

        this.load.spritesheet('char1', 'assets/images/test_sprite_1.png', {
            frameWidth: 125,
            frameHeight: 250,
            spacing: 2
        });



    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
    }

    create() {
        const map = this.make.tilemap({ key: "map" });

        console.log(map.getObjectLayer('Collision Layer'));



        const tileset = map.addTilesetImage('clean_16x16_tileset', 'clean_16x16_tileset');
        const musicBoxTileset = map.addTilesetImage('music_box_64x64', 'music_box_64x64');

        if (!tileset) console.warn('clean_16x16_tileset 연결 실패');
        if (!musicBoxTileset) console.warn('music_box_64x64 연결 실패');


        if (!tileset || !musicBoxTileset) {
            console.error('Tileset 연결 실패!');
            return;
        }

        map.createLayer('Tile Layer 1', tileset, 0, 0);
        map.createLayer('Mini Layer 1', [tileset, musicBoxTileset], 0, 0);


        let imageName = {
            char1: 'Char1',
            char2: 'Char2',
            char3: 'Char3'
        }[this.selectedCharacter];

        this.player = this.physics.add.sprite(10, 352, 'char1').setScale(0.3);
        this.player.body.setCollideWorldBounds(true);

        this.anims.create({
            key: 'char1_walk',
            frames: this.anims.generateFrameNumbers('char1', { start: 0, end: 3 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'char1_jump',
            frames: this.anims.generateFrameNumbers('char1', { start: 4, end: 5 }),
            frameRate: 4,
            repeat: 0
        });


        this.mapColliders = {};
        const objectLayer = map.getObjectLayer('Collision Layer');


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

            // if (cls === 'troll_section') {
            //     const zone = this.add.zone(centerX, centerY, width, height);
            //     this.physics.add.existing(zone);
            //     zone.body.setAllowGravity(false);
            //     zone.body.moves = false;
            //     this.physics.add.overlap(this.player, zone, () => {
            //         const target = this.mapColliders['ground_collision'];
            //         if (target) {
            //             this.tweens.add({
            //                 targets: target,
            //                 y: target.y + 100,
            //                 duration: 600,
            //                 ease: 'Power2',
            //                 onComplete: () => target.destroy()
            //             });
            //         }
            //     });
            // }

            if (cls === 'spike') {
                const spike = this.physics.add.staticImage(centerX, centerY, null).setSize(width, height).setOrigin(0.5).setVisible(false);
                this.physics.add.overlap(this.player, spike, () => {
                    console.log('스파이크 데미지!');

                });
            }

            if (cls === 'note') {
                const note = this.physics.add.staticImage(centerX, centerY, null).setSize(width, height).setOrigin(0.5).setVisible(false);
                this.physics.add.overlap(this.player, note, () => {
                    console.log('노트 획득!');
                    note.destroy();

                });
            }

            if (cls === 'ending') {
                const musicBox = this.physics.add.staticImage(centerX, centerY, 'music_box').setDisplaySize(48, 48);
                this.physics.add.overlap(this.player, musicBox, () => {
                    if (!this.choiceShown) {
                        this.choiceShown = true;
                        this.showChoiceButtons();
                    }
                });
            }
        });

        // 키보드 입력
        this.cursors = this.input.keyboard.createCursorKeys();
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
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

    showChoiceButtons() {
        this.controlsEnabled = false;
        const centerX = this.player.x;
        const centerY = this.player.y;

        const option1 = this.add.text(centerX - 50, centerY, 'classic', this.getTextStyle()).setOrigin(0.5).setInteractive();
        const option2 = this.add.text(centerX + 50, centerY, 'rock', this.getTextStyle()).setOrigin(0.5).setInteractive();

        this.choiceGroup = this.add.group([option1, option2]);
        this.setButtonEvents(option1, 'classic');
        this.setButtonEvents(option2, 'rock');
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
            alert(`${value} 선택됨`);
        });
    }



    // async showSearchResult(value) {
    //     const gameData = {
    //         userId,
    //         score,
    //         genre,
    //         year,
    //         hipster
    //     };
    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_API_URL}/game/savegamedata`, gameData);

    //         // 추천된 곡을 GameResultPage로 전달
    //         navigate('/testResult', { state: { musicRecommendation: response.data.musicRecommendation } });
    //     } catch (error) {
    //         alert('데이터 저장에 실패했습니다.');
    //     }
    // }
}