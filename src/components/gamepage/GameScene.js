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

const randomQuestions = [{
        // tempo
        question: "어떤 색의 장미로 꽃다발을 만들래?",
        options: [
            { text: "파란 장미", genres: ["hiphop", "R&B", "pop", "rap"] },
            { text: "빨간 장미", genres: ["rock", "edm", "latin"] }
        ]
    },
    // valence
    {
        question: "12시 vs 00시",
        options: [
            { text: "12시", genres: ["rock", "rap", "latin", "hiphop", "R&B"] },
            { text: "00시", genres: ["edm", "pop"] }
        ]
    },
    // danceablity
    {
        question: "나를 나타내는 단어는?",
        options: [
            { text: "Calm", genres: ["rock", "edm", "pop", "R&B"] },
            { text: "Hype", genres: ["rap", "hiphop", "latin"] }
        ]
    },
    // liveness
    {
        question: "어떤 상황에서 더 음악이 듣고싶은가요?",
        options: [
            { text: "집에서 혼자 편안히 쉴 때", genres: ["rock", "R&B", "pop", "latin"] },
            { text: "친구들과 함께 놀고있을 때", genres: ["rap", "edm", "hiphop"] }
        ]
    }
];

const fixedQuestion = {
    question: "지금 하나를 고른다면?",
    options: [
        { text: "LP 판", year: '1950-1980', },
        { text: "카세트 플레이어", year: '1981-2005' },
        { text: "에어팟 맥스", year: '2006-2025', }
    ]
};

const storedUserId = localStorage.getItem('userId');


let score = 0;
let lives = 3;
let totalStages = 3;
let totaljumpCount = 0;
let stepCount = 0;
let sprintCount = 0;
let playTime = null;


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
        this.load.image('heart', 'assets/images/heart.png');
        this.load.image('bullet', 'assets/images/bullet.png');



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
        this.stageStartTime = null;
        this.score = data.score || 0;
        this.lives = lives;
        this.selectedYear = data.selectedYear || 2025
    }


    create(data) {

        // 로그인 해야지 이용 가능
        if (!storedUserId) {
            alert('로그인 후 다시 시도해주세요.');
            window.location.href = '/';
        }

        const mapKey = `map${this.stageIndex + 1}`;

        console.log(this.stageIndex);

        const map = this.make.tilemap({ key: mapKey });
        // 공통 코드

        const tileset = map.addTilesetImage('clean_16x16_tileset', 'clean_16x16_tileset');

        this.isInvincible = false;
        this.isGameOver = false;


        this.stageStartTime = Date.now();
        console.log(this.stageStartTime);

        this.shiftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT);


        // 맵 레이어
        map.createLayer('Tile Layer 1', tileset, 0, 0);
        this.mapColliders = {};
        const objectLayer = map.getObjectLayer('Collision Layer');
        console.log('objectLayer', objectLayer);



        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            fontFamily: 'noto-sans'
        }).setScrollFactor(0);


        this.player = this.physics.add.sprite(10, 300, 'char1').setScale(0.3);

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

        //걸음수 계산을 위한 위치저장
        this.lastX = this.player.x;
        console.log(this.lastX);

        this.jumpCount = 0;
        this.maxJump = 2;

        this.hearts = [];
        for (let i = 0; i < lives; i++) {
            const heart = this.add.image(700 + i * 30, 30, 'heart')
                .setScrollFactor(0)
                .setScale(0.5)
                .setDisplaySize(32, 32)
                .setSize(32, 32)
            this.hearts.push(heart);
        }


        // 오브젝트 레이어
        objectLayer.objects.forEach(obj => {
            const { x, y, width, height, type: cls } = obj;
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            if (cls === 'Collision') {
                const zone = this.add.zone(centerX, centerY, width, height);
                this.physics.add.existing(zone, true);
                this.physics.add.collider(this.player, zone);
            }

            if (this.stageIndex === 2 && cls === 'bullet') {
                this.bullet = this.physics.add.image(centerX, centerY, 'bullet')
                    .setScale(0.2)
                    .setVisible(false)
                    .setActive(false);

                this.bullet.refreshBody();
                this.bullet.bulletActivated = false;

                this.physics.add.overlap(this.player, this.bullet, () => {
                    if (!this.isInvincible) {
                        console.log('bullet touch!');
                        lives -= 1;
                        this.updateLivesUI();
                        this.isInvincible = true;

                        this.tweens.add({
                            targets: this.player,
                            alpha: 0.3,
                            duration: 100,
                            yoyo: true,
                            repeat: 5,
                            onComplete: () => this.player.setAlpha(1)
                        });

                        this.time.delayedCall(1000, () => {
                            this.isInvincible = false;
                        });

                        if (lives <= 0) {
                            this.gameOver();
                        }
                    }
                });
            }


            if (cls === 'spike') {
                const spike = this.physics.add.staticImage(centerX, centerY, 'spikeImage')
                    .setDisplaySize(32, 32)
                    .setSize(32, 32)
                    .setVisible(false);
                spike.refreshBody();

                this.physics.add.overlap(this.player, spike, () => {
                    if (!this.isInvincible) {
                        console.log('스파이크 데미지!');

                        lives -= 1;
                        this.updateLivesUI();


                        this.isInvincible = true;

                        this.tweens.add({
                            targets: this.player,
                            alpha: 0.3,
                            duration: 100,
                            ease: 'Linear',
                            yoyo: true,
                            repeat: 5,
                            onComplete: () => {
                                this.player.setAlpha(1);
                            }
                        });

                        this.time.delayedCall(1000, () => {
                            this.isInvincible = false;
                        });

                        if (lives <= 0) {
                            this.gameOver();
                        }
                    }
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

        console.log('this.bullet:', this.bullet);

    }

    update() {
        if (!this.controlsEnabled) return;

        let speed = 200;
        const jumpPower = 400;
        const body = this.player.body;

        const moved = Math.abs(this.player.x - this.lastX);

        if (moved >= 10) { // 10px 움직일 때마다 1 step으로 간주
            stepCount += 1;
            this.lastX = this.player.x; // 기준점 갱신
        }

        if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
            sprintCount += 1;
            console.log('sprintCount: ', sprintCount)
        }
        if (this.shiftKey.isDown) {
            speed = 350;
        }

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
            totaljumpCount += 1;
            console.log('totaljumpCount', totaljumpCount);
            if (this.jumpCount < this.maxJump) {
                this.player.setVelocityY(-jumpPower);
                this.jumpCount += 1;
                this.player.anims.play('char1_jump', true);
            }
        }

        if (this.bullet) {
            if (!this.bullet.bulletActivated) {
                const distance = Phaser.Math.Distance.Between(this.player.x, this.player.y, this.bullet.x, this.bullet.y);
                if (distance < 150) {
                    console.log('bullet 활성화!');
                    this.bullet.bulletActivated = true;
                    this.bullet.setVisible(true).setActive(true);
                }
            } else {
                this.physics.moveToObject(this.bullet, this.player, 80);
            }
        }

    }

    updateLivesUI() {
        if (this.hearts) {
            this.hearts.forEach((heart, index) => {
                heart.setVisible(index < lives);
            });
        }
    }

    getRandomGenres(n) {
        const shuffled = [...genres].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
    }

    // 랜덤 질문
    getRandomQuestion() {
        const q = Phaser.Utils.Array.GetRandom(randomQuestions);
        return q;
    }


    showChoiceButtons() {
        this.controlsEnabled = false;
        const mapKey = `map${this.stageIndex + 1}`;
        const map = this.make.tilemap({ key: mapKey });

        let questionObj;
        if (this.stageIndex === 2) {
            questionObj = fixedQuestion;
        } else {
            questionObj = Phaser.Utils.Array.GetRandom(randomQuestions);
        }

        const { question, options } = questionObj;

        const centerX = map.widthInPixels / 2;
        const centerY = map.heightInPixels / 2;

        const questionText = this.add.text(centerX, centerY - 60, question, {
            fontSize: '16px',
            fontFamily: 'noto-sans',
            fill: '#fff',
            backgroundColor: '#333',
            padding: { x: 20, y: 8 }
        }).setOrigin(0.5);

        this.choiceGroup = this.add.group([questionText]);

        const totalOptions = options.length;
        const spacing = 160; // 버튼 간 간격

        options.forEach((opt, idx) => {
            const btn = this.add.text(0, 0, opt.text, this.getTextStyle()).setInteractive();
            const offset = (idx - (totalOptions - 1) / 2) * spacing;
            btn.setPosition(centerX + offset, centerY).setOrigin(0.5);

            this.choiceGroup.add(btn);
            this.setButtonEvents(btn, opt);
        });
    }




    getTextStyle() {
        return {
            fontFamily: 'noto-sans',
            fontSize: '14px',
            fill: '#000',
            backgroundColor: '#fff',
            padding: { x: 15, y: 15 }
        };
    }

    setButtonEvents(btn, genreObj) {
        btn.on('pointerdown', () => {

            const stageEndTime = Date.now();
            playTime = Math.floor((stageEndTime - this.stageStartTime) / 1000);


            this.choiceGroup.clear(true, true);
            this.controlsEnabled = true;

            if (genreObj.genres) {
                genreObj.genres.forEach(name => {
                    const g = genres.find(g => g.name === name);
                    if (g) g.count += 1;
                });
            } else if (genreObj.year) {
                this.selectedYear = genreObj.year;
            }

            this.sendStageStatData(genreObj.genre, stepCount, totaljumpCount, sprintCount, playTime, true)

            if (this.stageIndex < totalStages - 1) {
                this.scene.restart({
                    selectedCharacter: this.selectedCharacter,
                    stageIndex: this.stageIndex + 1
                });
            } else {
                const result = genres.reduce((prev, curr) => curr.count > prev.count ? curr : prev);
                console.log('가장 많이 선택된 장르:', result.name);
                console.log('년도: ', this.selectedYear);
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

    async sendStageStatData(genre, steps, jumps, sprints, playTime, cleared) {
        const gameStats = {
            userId: storedUserId,
            stage: this.stageIndex,
            answer: genre,
            steps: steps,
            jumps: jumps,
            sprints: sprints,
            playTime: playTime,
            cleared: cleared
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/game/saveStageStats`, gameStats);
            console.log('게임 스테이지 스탯 데이터 저장 성공', res.data);
        } catch (err) {
            console.log('데이터 전송 실패', err);
        }
    }


    async showSearchResult(genre) {
        const gameData = {
            userId: storedUserId,
            score: score,
            genre: genre,
            year: this.selectedYear,
        };

        try {
            console.log(gameData.userId);
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/game/savegamedata`, gameData);
            this.showResultPopup(res.data.musicRecommendation);
        } catch (err) {
            console.error('Spotify API 호출 실패:', err);
        }
    }

    gameOver(genreObj) {
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.controlsEnabled = false;
        this.player.setTint(0xff0000);
        this.player.anims.stop();

        const result = genres.reduce((prev, curr) => curr.count > prev.count ? curr : prev);
        console.log('가장 많이 선택된 장르:', result.name);

        const stageEndTime = Date.now();
        playTime = Math.floor((stageEndTime - this.stageStartTime) / 1000);

        this.sendStageStatData(genreObj.genre, stepCount, totaljumpCount, sprintCount, playTime, false)

        this.add.text(400, 200, 'Game Over', {
            fontSize: '32px',
            fontFamily: 'noto-sans',
            fill: '#fff'
        }).setOrigin(0.5);

        this.time.delayedCall(1000, () => {
            this.showSearchResult(result.name);
        });
    }


}