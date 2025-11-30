import Phaser from "phaser";
import WebFont from 'webfontloader';


class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
        this.fontsReady = false;
    }

    preload() {
        this.load.image('playButton', 'assets/images/play_button.png');
        this.load.image('popupImage', 'assets/images/help_popup.png');
    }

    init(data) {
        // 기본값 설정
        this.selectedChar = 'char1';

        console.log('[MainScene] 최종 캐릭터 선택:', this.selectedChar);
    }

    create() {

        if (WebFont.load) {
            this.fontsReady = true;
        } else {
            // 폰트가 아직 로드되지 않았다면, 타이머를 설정하여 기다립니다.
            this.time.addEvent({
                delay: 100, // 0.1초마다 확인
                callback: this.checkFonts,
                callbackScope: this,
                loop: true,
                name: 'fontCheckTimer' // 타이머에 이름을 주면 관리하기 편합니다.
            });
        }

        console.log('fontReady: ', this.fontsReady);
        this.cameras.main.setBackgroundColor('#ffffff');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        console.log('char: ', this.selectedChar);


        //설명칸 추가
        //기본이 Open 되어 있는 상태
        this.openHelpPopup();

        this.helpBtn = this.add.text(750, 20, '?', {
            fontSize: '24px',
            color: '#666',
            fontStyle: 700,
            fontFamily: 'Galmuri7',
            padding: { x: 10, y: 5 },
        }).setOrigin(1, 0).setInteractive().on("pointerdown", () => {
            this.openHelpPopup();
        });




        //임시 버튼 스타일

        const playBtn = this.add.image(centerX, centerY - 40, 'playButton').setInteractive();
        this.add.text(centerX - 60, centerY + 40, 'PLAY BEATS!', {
            fontSize: '24px',
            color: '#000000',
            fontStyle: 700,
            fontFamily: 'Galmuri7'
        });

        playBtn.setDisplaySize(100, 100);
        playBtn.on('pointerdown', () => {
            if (this.selectedChar) {
                console.log(this.selectedChar);
                this.scene.start('GameScene', { 'selectedCharacter': this.selectedChar });

            } else {
                alert('error / 캐릭터 undefined');
            }
        })
    }

    checkFonts() {
        // WebFontLoader의 active 콜백이 실행되어 window.WebFontLoaded가 true가 됐는지 확인
        if (window.WebFontLoaded) {


            // 더 이상 확인할 필요가 없으므로 타이머를 제거합니다.
            this.time.removeEvent(this.time.getEventWithName('fontCheckTimer'));
        }
    }


    openHelpPopup() {
        console.log('openHelpPopup 작동')
        this.showHelpPopup = true;

        this.input.keyboard.enabled = false;

        this.modalBlocker = this.add.rectangle(0, 0, 800, 400, 0x000000, 0.001)
            .setOrigin(0)
            .setInteractive();

        this.modalBlocker.setDepth(90);

        // 팝업 컨테이너
        this.helpPopupContainer = this.add.container(400, 200);
        this.helpPopupContainer.setDepth(100);

        // 배경(반투명)
        const bg = this.add.rectangle(0, 0, 600, 300, 0x000000, 0.6)
            .setStrokeStyle(2, 0xffffff);

        // 텍스트
        const helpText = this.add.image(0, 0, 'popupImage').setDisplaySize(600, 340);

        const closeBtn = this.add.text(240, -130, "X", {
                fontSize: "18px",
                color: "#ffaaaa",
                fontFamily: "Galmuri7",
                backgroundColor: "#330000",
                padding: { x: 8, y: 4 }
            })
            .setInteractive()
            .on("pointerdown", () => {
                this.closeHelpPopup();
            });

        this.helpPopupContainer.add([bg, helpText, closeBtn]);
    }


    closeHelpPopup() {
        if (!this.showHelpPopup) return;

        this.showHelpPopup = false;
        this.modalBlocker.destroy();
        this.helpPopupContainer.destroy();

        this.input.keyboard.enabled = true;
    }

}

export default MainScene