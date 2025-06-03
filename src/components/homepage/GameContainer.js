import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import IntroScene from "../gamepage/IntroScene";
import MainScene from "../gamepage/MainScene";
import GameScene from "../gamepage/GameScene";
import ChoiceScene from "../gamepage/ChoiceScene";

const GameContainer = () => {
  const gameRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // GameContainer.jsx 내부
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    window.showGamePopup = (recommendationList) => {
      setPopupData(recommendationList);  // 배열 저장
      setShowPopup(true);
    };
  }, []);


  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: { debug: false, gravity: { y: 1000 } }
      },
      scene: [IntroScene, MainScene, ChoiceScene, GameScene]
    };

    const game = new Phaser.Game(config);
    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <>
      <div
        ref={gameRef}
        id="gameContainer"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          margin: "0 auto",
          textAlign: "center"
        }}
      />
     {showPopup && popupData && (
        <div className="popup-container">
          <div className="popup" id="gameResultPopup">
            <h3>🎵 추천 음악 리스트</h3>
            <ul>
              {popupData.map((track, idx) => (
                <li key={track.id || idx}>
                  <strong>{track.name}</strong> - {track.artists.map(a => a.name).join(', ')}
                  <br />
                  <a href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    ▶ Spotify 바로가기
                  </a>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowPopup(false)}>닫기</button>
          </div>
        </div>
      )}

    </>
  );
};

export default GameContainer;
