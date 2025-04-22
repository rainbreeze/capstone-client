import Phaser from "phaser";

class ChoiceScene extends Phaser.Scene {
    constructor() {
        super('ChoiceScene');
    }

    preload() {
        this.load.image('Char1', 'assets/images/Character1.png');
        this.load.image('Char2', 'assets/images/Character2.png');
        this.load.image('Char3', 'assets/images/Character3.png');
    }


    create() {

        const centerY = this.cameras.main.height / 2;


        const char1 = this.add.image(150, centerY, 'Char1').setInteractive();
        const char2 = this.add.image(400, centerY, 'Char2').setInteractive();
        const char3 = this.add.image(650, centerY, 'Char3').setInteractive();

        char1.setDisplaySize(100, 100);
        char2.setDisplaySize(100, 100);
        char3.setDisplaySize(100, 100);


        //기본값
        let selectedChar;

        char1.on('pointerdown', () => {
            selectedChar = 'char1';
            console.log('char1 selected');
            this.scene.start('MainScene', { 'selectedChar': selectedChar })
        })

        char2.on('pointerdown', () => {
            selectedChar = 'char2';
            console.log('char2 selected');
            this.scene.start('MainScene', { 'selectedChar': selectedChar })
        })
        char3.on('pointerdown', () => {
            selectedChar = 'char3';
            console.log('char3 selected');
            this.scene.start('MainScene', { 'selectedChar': selectedChar })
        })
    }

}

export default ChoiceScene