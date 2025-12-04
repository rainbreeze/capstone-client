import Phaser from "phaser";
import axios from "axios";
import WebFont from "webfontloader";

//빈 choice 배열
let choice = [];


//질문 리스트 -> 랜덤으로 각 스테이지 말미에 등장
const randomQuestions = [{
        // tempo
        question: "지금 눈앞에 꽃잎이 흩날린다면, 어떤 속도로 흘러가고 있을까",
        options: [
            { text: "천천히, 바람결 따라 부드럽게.", effect: { tempo: -5 } },
            { text: "빠르게, 휘몰아치듯 활기차게.", effect: { tempo: +5 } },
        ],
    },
    {
        //energy
        question: "한여름 오후, 너는 어떤 풍경 속에 있어?",
        options: [
            { text: "잔잔한 호숫가 앞에.", effect: { energy: -0.1 } },
            { text: "태양 아래 뛰어노는 축제 속에.", effect: { energy: +0.1 } },
        ],
    },
    {
        //danceability
        question: "바람이 분다. 너는 어떻게 하고싶어?",
        options: [{
                text: "빠르게 집에 들어가 휴식을 취한다.",
                effect: { danceability: -0.1 },
            },
            {
                text: "바람을 느끼며 러닝을 뛰고싶다.",
                effect: { danceability: +0.1 },
            },
        ],
    },
    {
        //key
        question: "하늘을 물들이는 색깔을 고른다면?",
        options: [
            { text: "흐릿한 보라빛 저녁하늘", effect: { key: -1 } },
            { text: "밝은 노을빛 오렌지 하늘", effect: { key: +1 } },
        ],
    },
    {
        //loudness
        question: "숲속에서 들리는 소리는 어떤 크기로 울리고 있을까?",
        options: [
            { text: "잔잔하고 속삭이듯 들려온다.", effect: { loudness: -5 } },
            { text: "커다랗게 울려 퍼져 나를 휘감는다.", effect: { loudness: +5 } },
        ],
    },
    {
        //mode
        question: "오늘의 하루를 한 장면으로 표현한다면?",
        options: [
            { text: "어두운·감성적인 분위기", effect: { mode: 0 } },
            { text: "밝고 따뜻한 분위기", effect: { mode: 1 } },
        ],
    },
    {
        //speechiness
        question: "책장 속에서 한 권을 뽑는다면?",
        options: [
            { text: "그림이 가득한 화보집.", effect: { speechiness: -0.1 } },
            { text: "대화가 빼곡한 소설책.", effect: { speechiness: +0.1 } },
        ],
    },
    {
        //instrumentalness
        question: "너에게 위로가 필요한 날, 어떤 소리가 위로가 될까?",
        options: [
            { text: "잔잔한 말과 목소리", effect: { instrumentalness: -0.1 } },
            { text: "말 없이 울려퍼지는 피아노 소리", effect: { instrumentalness: +0.1 } },
        ],
    },
    {
        //liveness
        question: "좋아하는 영화를 다시 볼 수 있다면 어디서?",
        options: [
            { text: "집에서 넷플릭스로", effect: { liveness: -0.1 } },
            { text: "영화는 영화관에서!", effect: { liveness: +0.1 } },
        ],
    },
    {
        //valence
        question: "오늘 너의 마음을 비유한다면?",
        options: [
            { text: "슬프고 어두움", effect: { valence: -0.1 } },
            { text: "밝고 즐거움", effect: { valence: +0.1 } },
        ],
    },
];





//스코어에 따라서 추천 곡 수가 달라져야함 -> 이거 확인
let score = 0;
let lives = 3;
let totalStages = 5;
let totaljumpCount = 0;
let stepCount = 0;
let sprintCount = 0;
let playTime = null;
let stageStartTime = Date.now();
//질문 섞기
let questionsPool = Phaser.Utils.Array.Shuffle([...randomQuestions]);
console.log(stageStartTime);

export default class GameScene extends Phaser.Scene {


    constructor() {
        super("GameScene");
        this.fontsReady = false;
    }

    preload() {
        // 맵 생성에 필요한 이미지
        this.load.image(
            "clean_16x16_tileset",
            "assets/tilesets/clean_16x16_tileset.png"
        );
        this.load.image(
            "clean_tileset_ver2",
            "assets/tilesets/clean_tileset_ver2.png"
        );
        this.load.image("music_box_64x64", "assets/tilesets/music_box_64x64.png");
        this.load.image("noteImage", "assets/images/note.png");
        this.load.image("spikeImage", "assets/images/spike.png");
        this.load.image("noteImage2", "assets/images/note_2.png");
        this.load.image("spikeImage2", "assets/images/spike_2.png");
        this.load.image("ground_night", "assets/images/ground_night.png");
        this.load.image("heart", "assets/images/heart.png");
        this.load.image("heart_w", "assets/images/heart_white.png");
        this.load.image("bullet", "assets/images/bullet.png");

        this.load.tilemapTiledJSON("map1", "assets/tilemaps/section01.json");
        this.load.tilemapTiledJSON("map2", "assets/tilemaps/section02.json");
        this.load.tilemapTiledJSON("map3", "assets/tilemaps/section03.json");
        this.load.tilemapTiledJSON("map4", "assets/tilemaps/section04.json");
        this.load.tilemapTiledJSON("map5", "assets/tilemaps/section05.json");

        //캐릭터 스프라이트 시트
        this.load.spritesheet("char1", "assets/images/sprite_char1.png", {
            frameWidth: 165,
            frameHeight: 249,
            spacing: 1,
        });
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
        this.stageIndex = data.stageIndex || 0;
        this.score = data.score || 0;
        this.lives = lives;
        this.userId = this.sys.game.config.sceneConfig.userId;
    }

    create(data) {
        //폰트 로드
        if (WebFont.load) {
            this.fontsReady = true;
        } else {
            // 폰트가 아직 로드되지 않았다면, 타이머를 설정하여 기다립니다.
            this.time.addEvent({
                delay: 100, // 0.1초마다 확인
                callback: this.checkFonts,
                callbackScope: this,
                loop: true,
                name: "fontCheckTimer", // 타이머에 이름을 주면 관리하기 편합니다.
            });
        }

        // 로그인 해야지 이용 가능

        const mapKey = `map${this.stageIndex + 1}`;
        console.log(this.stageIndex + 1);
        const map = this.make.tilemap({ key: mapKey });


        let tileset;
        // 공통 코드

        //스테이지 4,5는 맵 바뀜
        if (this.stageIndex + 1 > 3) {
            tileset = map.addTilesetImage("clean_tileset_ver2", "clean_tileset_ver2");
        } else {
            tileset = map.addTilesetImage(
                "clean_16x16_tileset",
                "clean_16x16_tileset"
            );
        }

        this.isInvincible = false;
        this.isGameOver = false;

        this.shiftKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SHIFT
        );

        //맵과 관련된 셋, 설정들 -> 맵이 추가되었기 때문에 이부분 확인해서 수정 필요 -> 타일셋 이름이나 맵 이름이 다르다면 스테이지 따라서 맞출것

        // 맵 레이어
        map.createLayer("Tile Layer 1", tileset, 0, 0);
        this.mapColliders = {};
        //충돌레이어 구분 필요
        const objectLayer = map.getObjectLayer("Collision Layer");
        console.log("objectLayer", objectLayer);

        this.scoreText = this.add
            .text(16, 16, `Score: ${score}`, {
                fontSize: "18px",
                color: "#fff",
                fontFamily: "Galmuri7",
                fontStyle: 700,
            })
            .setScrollFactor(0);

        //캐릭터 더 추가할건지에 대한 고민이 필요함
        this.player = this.physics.add.sprite(10, 300, "char1").setScale(0.3);

        this.player.body.setSize(48, 120);
        this.player.body.setOffset(55, 110);

        this.player.body.setCollideWorldBounds(true);

        //만약 캐릭터가 늘어난다면 이 부분을 어떻게 수정할건지?
        this.anims.create({
            key: "char1_walk",
            frames: this.anims.generateFrameNumbers("char1", { start: 0, end: 2 }),
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: "char1_jump",
            frames: this.anims.generateFrameNumbers("char1", { start: 3, end: 5 }),
            frameRate: 4,
            repeat: 0,
        });

        //걸음수 계산을 위한 위치저장
        this.lastX = this.player.x;
        console.log(this.lastX);

        this.jumpCount = 0;
        this.maxJump = 2;

        this.hearts = [];
        for (let i = 0; i < lives; i++) {
            let heart;
            if (this.stageIndex + 1 > 3) {
                heart = this.add.image(700 + i * 30, 30, "heart_w");
            } else {
                heart = this.add.image(700 + i * 30, 30, "heart");
            }
            heart
                .setScrollFactor(0)
                .setScale(0.5)
                .setDisplaySize(32, 32)
                .setSize(32, 32);
            this.hearts.push(heart);
        }

        // 오브젝트 레이어 -> 맵 추가를 위해서 반드시 봐야 할 부분
        objectLayer.objects.forEach((obj) => {
            const { x, y, width, height, type: cls } = obj;
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            if (cls === "Collision") {
                const zone = this.add.zone(centerX, centerY, width, height);
                this.physics.add.existing(zone, true);
                this.physics.add.collider(this.player, zone);
            }

            //불렛 없음, 빼고 bomb을 넣을 것
            if (this.stageIndex === 2 && cls === "bullet") {
                this.bullet = this.physics.add
                    .image(centerX, centerY, "bullet")
                    .setScale(0.2)
                    .setVisible(false)
                    .setActive(false);

                this.bullet.refreshBody();
                this.bullet.bulletActivated = false;

                this.physics.add.overlap(this.player, this.bullet, () => {
                    if (!this.isInvincible) {
                        console.log("bullet touch!");
                        lives -= 1;
                        this.updateLivesUI();
                        this.isInvincible = true;

                        this.tweens.add({
                            targets: this.player,
                            alpha: 0.3,
                            duration: 100,
                            yoyo: true,
                            repeat: 5,
                            onComplete: () => this.player.setAlpha(1),
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

            if (cls === "spike") {
                let spike;
                if (this.stageIndex + 1 > 3) {
                    spike = this.physics.add.staticImage(centerX, centerY, "spikeImage2");
                } else {
                    spike = this.physics.add.staticImage(centerX, centerY, "spikeImage");
                }
                spike.setDisplaySize(32, 32).setSize(32, 32).setVisible(false);
                spike.refreshBody();

                this.physics.add.overlap(this.player, spike, () => {
                    if (!this.isInvincible) {
                        console.log("스파이크 데미지!");

                        lives -= 1;
                        this.updateLivesUI();

                        this.isInvincible = true;

                        this.tweens.add({
                            targets: this.player,
                            alpha: 0.3,
                            duration: 100,
                            ease: "Linear",
                            yoyo: true,
                            repeat: 5,
                            onComplete: () => {
                                this.player.setAlpha(1);
                            },
                        });

                        this.time.delayedCall(1000, () => {
                            this.isInvincible = false;
                        });

                        if (lives <= 0) {
                            this.gameOver();
                        }
                    }
                });

                this.events.on("update", () => {
                    const distance = Phaser.Math.Distance.Between(
                        this.player.x,
                        this.player.y,
                        spike.x,
                        spike.y
                    );
                    if (distance < 150) spike.setVisible(true);
                });
            }

            if (cls === "note") {
                let note;
                if (this.stageIndex + 1 > 3) {
                    note = this.physics.add.staticImage(centerX, centerY, "noteImage2");
                } else {
                    note = this.physics.add.staticImage(centerX, centerY, "noteImage");
                }
                note.setDisplaySize(32, 32).setSize(32, 32).setVisible(true);
                note.refreshBody();
                this.physics.add.overlap(this.player, note, () => {
                    note.destroy();
                    score += 100;
                    this.scoreText.setText(`Score: ${score}`);
                });
            }

            // 뮤직박스
            if (cls === "ending") {
                const musicBox = this.physics.add
                    .staticImage(centerX, centerY, "music_box_64x64")
                    .setDisplaySize(48, 48);
                this.physics.add.overlap(this.player, musicBox, () => {
                    if (!this.choiceShown && lives > 0) {
                        this.choiceShown = true;
                        score += 1000;
                        this.scoreText.setText(`Score: ${score}`);
                        this.showChoiceButtons();
                    }

                    if (lives <= 0) {
                        this.gameOver();
                    }
                });
            }
        });

        // 키보드 입력
        this.cursors = this.input.keyboard.createCursorKeys();

        this.spaceKey = this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );


        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.controlsEnabled = true;

        this.choiceShown = false;

        console.log("this.bullet:", this.bullet);



    }

    update() {
        if (!this.controlsEnabled) return;

        let speed = 200;
        const jumpPower = 400;
        const body = this.player.body;

        const moved = Math.abs(this.player.x - this.lastX);

        if (moved >= 10) {
            // 10px 움직일 때마다 1 step으로 간주
            stepCount += 1;
            this.lastX = this.player.x; // 기준점 갱신
        }

        if (Phaser.Input.Keyboard.JustDown(this.shiftKey)) {
            sprintCount += 1;
            console.log("sprintCount: ", sprintCount);
        }
        if (this.shiftKey.isDown) {
            speed = 350;
        }

        // 좌우 이동
        body.setVelocityX(0);
        if (this.cursors.left.isDown) {
            body.setVelocityX(-speed);
            this.player.setFlipX(true);
            this.player.anims.play("char1_walk", true);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(speed);
            this.player.setFlipX(false);
            this.player.anims.play("char1_walk", true);
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
            console.log("totaljumpCount", totaljumpCount);
            if (this.jumpCount < this.maxJump) {
                this.player.setVelocityY(-jumpPower);
                this.jumpCount += 1;
                this.player.anims.play("char1_jump", true);
            }
        }

        //이 부분도 지울것
        if (this.bullet) {
            if (!this.bullet.bulletActivated) {
                const distance = Phaser.Math.Distance.Between(
                    this.player.x,
                    this.player.y,
                    this.bullet.x,
                    this.bullet.y
                );
                if (distance < 150) {
                    console.log("bullet 활성화!");
                    this.bullet.bulletActivated = true;
                    this.bullet.setVisible(true).setActive(true);
                }
            } else {
                this.physics.moveToObject(this.bullet, this.player, 80);
            }
        }
    }

    checkFonts() {
        // WebFontLoader의 active 콜백이 실행되어 window.WebFontLoaded가 true가 됐는지 확인
        if (window.WebFontLoaded) {
            // 더 이상 확인할 필요가 없으므로 타이머를 제거합니다.
            this.time.removeEvent(this.time.getEventWithName("fontCheckTimer"));
        }
    }

    updateLivesUI() {
        if (this.hearts) {
            this.hearts.forEach((heart, index) => {
                heart.setVisible(index < lives);
            });
        }
    }

    // 랜덤 질문
    getRandomQuestion() {
        return questionsPool.pop();
    }

    showChoiceButtons() {
        this.controlsEnabled = false;
        const mapKey = `map${this.stageIndex + 1}`;
        const map = this.make.tilemap({ key: mapKey });

        let questionObj;
        questionObj = this.getRandomQuestion();

        const { question, options } = questionObj;

        //버튼 크기 조절좀 할것
        const centerX = map.widthInPixels / 2;
        const centerY = map.heightInPixels / 2;

        //텍스트 스타일 정리 및 조정 필요
        const questionText = this.add
            .text(centerX, centerY - 60, question, {
                fontSize: "12px",
                fontFamily: "Galmuri7",
                fontStyle: 700,
                color: "#fff",
                backgroundColor: "#333",
                padding: { x: 20, y: 8 },
            })
            .setOrigin(0.5);

        this.choiceGroup = this.add.group([questionText]);

        const total = options.length;

        // 각 버튼 간 간격 계산 (space-around 느낌)
        const spacing = 250; // 원하는 간격값 직접 조절 가능
        const startX = centerX - ((total - 1) * spacing) / 2; // 중앙 기준 좌우 분배

        options.forEach((opt, idx) => {
            const btn = this.add
                .text(0, 0, opt.text, this.getTextStyle())
                .setInteractive();

            // flex처럼 좌우 균등하게 배치
            btn.setPosition(startX + idx * spacing, centerY).setOrigin(0.5);

            this.choiceGroup.add(btn);
            this.setButtonEvents(btn, opt);
        });
    }

    //텍스트 스타일 수정 필요
    getTextStyle() {
        return {
            fontFamily: "Galmuri7",
            fontStyle: 700,
            fontSize: "14px",
            color: "#000",
            backgroundColor: "#fff",
            padding: { x: 15, y: 15 },
        };
    }

    //옵션에 대한 avg 카운트 조정
    applyOptEvent(effect) {
        choice.push(effect);
    }

    setButtonEvents(btn, opt) {
        btn.on("pointerdown", async() => {
            this.choiceGroup.clear(true, true);
            this.controlsEnabled = true;

            if (opt.effect) {
                this.applyOptEvent(opt.effect);
            }



            if (this.stageIndex < totalStages - 1) {

                this.scene.restart({
                    selectedCharacter: this.selectedCharacter,
                    stageIndex: this.stageIndex + 1,
                });
            } else {
                const stageEndTime = Date.now();
                playTime = Math.floor((stageEndTime - stageStartTime) / 1000);

                await this.sendStageStatData(
                    choice,
                    score,
                    stepCount,
                    totaljumpCount,
                    sprintCount,
                    playTime,
                    true
                );
            }
        });
    }


    showResultPopup(result) {
        this.controlsEnabled = false;
        if (window.showGamePopup) {
            window.showGamePopup(result); // 배열 전체 넘김
        }
    }


    //매 스테이지 끝나고가 아니라 전체 스테이지 끝나고 -> 로직 수정 확인하기
    //1차 api 호출
    async sendStageStatData(choice, score, steps, jumps, sprints, playTime, cleared) {
        //choice 배열 출력
        console.log(choice);

        const gameStats = {
            userId: this.userId,
            answer: choice,
            score: score,
            steps: steps,
            jumps: jumps,
            sprints: sprints,
            playTime: playTime, //시간
            cleared: cleared, //boolean
        };

        console.log("게임 스테이지 스텟 데이터:", gameStats);

        try {
            //res의 결과 값은 장르 이름으로 저장
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/saveStat/saveGameStats`, gameStats);
            console.log('게임 스테이지 스탯 데이터 저장 성공', res.data);
            console.log(res.data.formData);
            console.log('예측장르: ', res.data.predictedGenre);
            console.log('플레이리스트: ', res.data.playlist);

            this.showResultPopup(res.data.playlist);
        } catch (err) {
            console.log('데이터 전송 실패', err);
        }


    }

    async gameOver() {
        if (this.isGameOver) return;
        this.isGameOver = true;

        this.controlsEnabled = false;
        this.player.setTint(0xff0000);
        this.player.anims.stop();

        const stageEndTime = Date.now();
        playTime = Math.floor((stageEndTime - stageStartTime) / 1000);



        this.add
            .text(400, 200, "Game Over", {
                fontSize: "28px",
                fontFamily: "Galmuri7",
                fontStyle: 700,
                color: "#fff",
            })
            .setOrigin(0.5);


        await this.sendStageStatData(
            choice,
            score,
            stepCount,
            totaljumpCount,
            sprintCount,
            playTime,
            false
        );
    }
}