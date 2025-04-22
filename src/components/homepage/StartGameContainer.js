import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StartGameContainer = () => (
    <ImageContainer1>
        <LeftContainer>
            <TextBoxWrapper>
                <TextLine1>게임 속에서 새로운 음악을 발견하고,</TextLine1>
                <TextLine2>그 리듬에 맞춰 여정을 떠나보세요!</TextLine2>
                <GameButton as={Link} to="/game">게임하러 가기</GameButton>
            </TextBoxWrapper>
        </LeftContainer>
        <RightContainer>
            <YouTubeContainer>
                <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/oPLNNx8pp4s?start=80&autoplay=1&mute=1"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </YouTubeContainer>
        </RightContainer>
    </ImageContainer1>
);

export default StartGameContainer;

// ========== Styled Components ==========

const ImageContainer1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60vh;
  margin-top: 8vh;
  background-image: url('/images/homepage/ex2.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const LeftContainer = styled.div`
  width: 50%;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    width: 100%;
    padding: 5%;
    align-items: center;
  }
`;

const TextBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  animation: slideInWrapper 0.5s ease forwards;
  animation-delay: 0.3s;
  opacity: 0;

  @keyframes slideInWrapper {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  transform: translateX(-20%);
`;

const TextLine1 = styled.div`
  font-family: 'Jua', sans-serif;
  font-size: 2.5vw;
  color: #1ED760;

  @media (max-width: 768px) {
    font-size: 5vw;
    text-align: center;
  }
`;

const TextLine2 = styled.div`
  font-family: 'Jua', sans-serif;
  font-size: 2vw;
  color: white;
  margin-top: 0.5rem;

  @media (max-width: 768px) {
    font-size: 4.5vw;
    text-align: center;
  }
`;

const GameButton = styled(Link)`
  margin-top: 1rem;
  text-decoration: none;
  background-color: transparent;
  border: 2px solid white;
  color: white;
  font-size: 1.7vw;
  font-family: 'Jua', sans-serif;
  padding: 0.6em 1.2em;
  border-radius: 10px;
  transition: background-color 0.3s ease, color 0.3s ease;

  display: inline-block; /* 텍스트에 맞는 너비 */
  align-self: flex-start; /* 왼쪽 정렬 */

  animation: fadeSlideUp 0.5s ease forwards;
  animation-delay: 1s;
  opacity: 0;
  transform: translateY(20px);

  @keyframes fadeSlideUp {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  &:hover {
    background-color: #FFFFFF;
    color: #1ED760;
  }

  @media (max-width: 768px) {
    font-size: 3.5vw;
    padding: 0.8em 1.5em;
    align-self: center; /* 모바일에서 중앙 정렬 */
  }
`;

const RightContainer = styled.div`
  width: 50%;
  height: 90%;
  padding: 2%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    height: 50%;
  }
`;

const YouTubeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
`;
