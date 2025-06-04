import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
    }

    preload() {
        this.load.image('logo', '/assets/images/logo_image.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        this.cameras.main.setBackgroundColor('#ffffff');

        const logo = this.add.image(centerX, centerY, 'logo');
        logo.setScale(1);

        // 첫 번째 트윈: 0 → 2
        this.tweens.add({
            targets: logo,
            scale: 2,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.time.delayedCall(300, () => {
                    this.scene.start('MainScene');
                });
            }
        });
    }

}

export default IntroScene;