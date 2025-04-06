import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import IntroScene from "../gamepage/IntroScene"
import GameScene from "../gamepage/GameScene"

const GameContainer = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800,
            height: 800,
            parent: gameRef.current,
            physics: {
                default: "arcade",
                arcade: { debug: false }
            },
            scene: [IntroScene, GameScene]
        };

        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref = { gameRef }
    id = "gameContainer"
    style = {
        { width: "100%", height: "100%", overflow: "hidden", margin: "0 auto", textAlign: "center" }
    }
    />;
};

export default GameContainer;