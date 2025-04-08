import Phaser from "phaser";

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('playButton', 'assets/images/play-button.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;


        //임시 캐릭터 역할 (캐릭터 이미지 찾으면 이미지로 변경)
        const char1 = this.add.rectangle(150, 500, 50, 50, 0x00ff00);
        const char2 = this.add.rectangle(400, 500, 50, 50, 0xffffff);
        const char3 = this.add.rectangle(650, 500, 50, 50, 0x558BCF);

        char1.setInteractive();
        char2.setInteractive();
        char3.setInteractive();

        //기본값
        let selectedChar = char1;

        char1.on('pointerdown', () => {
            selectedChar = 'char1';
            console.log('char1 selected');
        })

        char2.on('pointerdown', () => {
            selectedChar = 'char2';
            console.log('char2 selected');
        })
        char3.on('pointerdown', () => {
            selectedChar = 'char3';
            console.log('char3 selected');
        })


        //임시 버튼 스타일

        const playBtn = this.add.image(centerX, centerY - 40, 'playButton').setInteractive();
        playBtn.setDisplaySize(100, 100);
        playBtn.on('pointerdown', () => {
            if (selectedChar) {
                console.log(selectedChar);
                this.scene.start('GameScene', { 'selectedCharacter': selectedChar });

            } else {
                console.log('캐릭터가 선택되지 않았습니다');
            }
        })
    }
}

export default MainScene