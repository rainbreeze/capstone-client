import Phaser from 'phaser';

class IntroScene extends Phaser.Scene {
    constructor() {
        super('IntroScene');
    }

    preload() {
        this.load.image('logo', '/assets/logo.png');
    }

    create() {
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        const logo = this.add.image(centerX, centerY, 'logo');
        logo.setScale(0);

        // 첫 번째 트윈: 0 → 2
        this.tweens.add({
            targets: logo,
            scale: 1,
            duration: 800,
            ease: 'Power2',
            onComplete: () => {
                this.tweens.add({
                    targets: logo,
                    scale: 0.5,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        this.time.delayedCall(300, () => {
                            this.scene.start('GameScene');
                        });
                    }
                });
            }
        });
    }

}

export default IntroScene;