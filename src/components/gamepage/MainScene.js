import Phaser from "phaser";

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('playButton', 'assets/images/play_button.png');
        this.load.image('characterButton', 'assets/images/character_btn.png');
        this.load.image('settingButton', 'assets/images/setting_btn.png');

    }

    init(data) {
        // 기본값 설정
        this.selectedChar = 'char1';

        // 만약 ChoiceScene에서 선택 값이 넘어왔다면 덮어쓰기
        if (data.selectedChar) {
            this.selectedChar = data.selectedChar;
        }

        console.log('[MainScene] 최종 캐릭터 선택:', this.selectedChar);
    }

    create() {

        this.cameras.main.setBackgroundColor('#ffffff');

        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        console.log('char: ', this.selectedChar)



        //캐릭터 선택창

        const characterSceneBtn = this.add.image(100, centerY + 100, 'characterButton').setInteractive();
        characterSceneBtn.setDisplaySize(100, 100)
        characterSceneBtn.on('pointerdown', () => {
            console.log('choice CharacterScene');
            this.scene.start('ChoiceScene');
            console.log('choice scene 실행됨..')
        })


        //임시 설정창
        const settingBtn = this.add.image(700, centerY + 100, 'settingButton').setInteractive();
        settingBtn.setDisplaySize(100, 100)


        //임시 버튼 스타일

        const playBtn = this.add.image(centerX, centerY - 40, 'playButton').setInteractive();
        this.add.text(centerX - 60, centerY + 40, 'PLAY BEATS!', {
            fontSize: '20px',
            fill: '#000000',
            fontFamily: 'noto-sans'
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
}

export default MainScene