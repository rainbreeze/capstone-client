import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import GameScene from "./GameScene";

const GameContainer = () => {
    const gameRef = useRef(null);

    useEffect(() => {
        const config = {
            type: Phaser.AUTO,
            width: 800, // 너가 원하는 기본 해상도
            height: 600,
            parent: gameRef.current,
            physics: {
                default: "arcade",
                arcade: { debug: false }
            },
            scene: [GameScene]
        };

        const game = new Phaser.Game(config);
        return () => {
            game.destroy(true);
        };
    }, []);

    return <div ref = { gameRef }
    style = {
        { width: "100%", height: "100%", overflow: "hidden" }
    }
    />;
};

export default GameContainer;