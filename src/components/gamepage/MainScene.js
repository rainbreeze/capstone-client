import Phaser from "phaser";

class MainScene extends Phaser.Scene {
    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image('playButton', 'assets/images/play-button.png');
        this.load.image('characterButton', 'assets/images/character_btn.png');
    }

    init(data) {
        this.selectedCharacter = data.selectedCharacter;
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;



        //캐릭터 선택창

        const characterSceneBtn = this.add.image(100, centerY + 200, 'characterButton').setInteractive();
        characterSceneBtn.setDisplaySize(100, 100)
        characterSceneBtn.on('pointerdown', () => {
            console.log('choice CharacterScene');
            this.scene.start('ChoiceScene');
        })


        //임시 버튼 스타일

        const playBtn = this.add.image(centerX, centerY - 40, 'playButton').setInteractive();
        this.add.text(centerX - 50, centerY + 40, 'PLAY BEATS!');
        playBtn.setDisplaySize(100, 100);
        playBtn.on('pointerdown', () => {
            if (this.selectedChar) {
                console.log(this.selectedChar);
                this.scene.start('GameScene', { 'selectedCharacter': this.selectedChar });

            } else {
                console.log('캐릭터가 선택되지 않았습니다');
            }
        })
    }
}

export default MainScene