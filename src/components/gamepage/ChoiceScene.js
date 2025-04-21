import Phaser from "phaser";

class ChoiceScene extends Phaser.Scene {
    constructor() {
        super('ChoiceScene');
    }

    preaload() {
        this.load.image('Char1', 'assets/images/Character2.png');
    }


    create() {
        //임시 캐릭터 역할 (캐릭터 이미지 찾으면 이미지로 변경)
        const char1 = this.add.image(150, 500, 'Char1').setInteractive();
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
            this.scene.start('MainScene', { 'selectedCharacter': selectedChar })
        })

        char2.on('pointerdown', () => {
            selectedChar = 'char2';
            console.log('char2 selected');
            this.scene.start('MainScene', { 'selectedCharacter': selectedChar })
        })
        char3.on('pointerdown', () => {
            selectedChar = 'char3';
            console.log('char3 selected');
            this.scene.start('MainScene', { 'selectedCharacter': selectedChar })
        })
    }

}

export default ChoiceScene