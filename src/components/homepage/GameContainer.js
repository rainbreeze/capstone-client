import React, { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import IntroScene from "../gamepage/IntroScene";
import MainScene from "../gamepage/MainScene";
import GameScene from "../gamepage/GameScene";
import ChoiceScene from "../gamepage/ChoiceScene";
import Header from "../common/Header";
import Footer from "../common/Footer"

const GameContainer = () => {
  const gameRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [userId,setUserId] = useState(false);

  useState(() => {
      const storedUserId = localStorage.getItem('userId');
      if (storedUserId) {
          setUserId(storedUserId); 
      }
  }, []);


  // GameContainer.jsx 내부
  const [popupData, setPopupData] = useState(null);

  useEffect(() => {
    window.showGamePopup = (recommendationList) => {
      setPopupData(recommendationList);
      setShowPopup(true);
    };
  }, []);


  useEffect(() => {
    if (!userId) {
      alert("로그인 후 다시 시도해주세요.");
      window.location.href = "/";
    } 
    const config = {
      type: Phaser.AUTO,
      width: 800,
     height: 400,
      parent: gameRef.current,
      physics: {
        default: "arcade",
        arcade: { debug: false, gravity: { y: 1000 } }
      },
      sceneConfig: {
          userId: userId,
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
      <Header />

      <div
        ref={gameRef}
        id="gameContainer"
        style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          margin: "0 auto",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      />
     {showPopup && popupData && (
        <div className="popup-container">
          <div className="popup" id="gameResultPopup">
            <div className="playlist-title-box">
              <h3>🎵 오늘의 Playlist</h3>
            </div>
            
            <ul>
              {popupData.map((track, idx) => (
                <li key={track.id || idx}>
                  <img src={track.album.images[0]?.url || ''} alt={track.name} />
                  <strong>{track.name}</strong> - {track.artists.map(a => a.name).join(', ')}
                </li>
              ))}
            </ul>
            <a href="../playlist">내 플레이리스트로 가기</a>
            <button onClick={() => setShowPopup(false)}>X</button>
          </div>
        </div>
      )}
      <Footer />

    </>
  );
};

export default GameContainer;
