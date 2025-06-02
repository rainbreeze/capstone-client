import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StartGameContainer = () => (
  <ImageContainer>
    <ContentWrapper>
      <Title>게임을 통해 음악을 추천 받으세요</Title>
      <Subtitle>게임과 음악을 통해, 나 자신을 알아가고 공유할 수 있는 공간</Subtitle>
      <StartButton to="/game">게임 하러가기</StartButton>
    </ContentWrapper>
  </ImageContainer>
);

export default StartGameContainer;

// ========== Styled Components ==========

const ImageContainer = styled.div`
  position: relative;
  margin-top: 8vh;
  display: flex;
  justify-content: center;  /* 중앙 정렬 */
  align-items: center;
  width: 100%;
  height: 70vh;
  background-image: url('/images/homepage/game_bg.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.6);
    z-index: 1;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: 100vh;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 20px;
  z-index: 2;
`;

const Title = styled.h1`
  font-size: 3.5vw;
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 7vw;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5vw;
  margin-bottom: 2.5rem;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 4vw;
  }
`;

const StartButton = styled(Link)`
  display: inline-block;
  background-color: transparent;
  color: rgba(255,255,255,0.9);
  font-weight: 500;
  font-size: 1.3vw;
  font-family: "Noto Sans KR", sans-serif;
  border: 2px solid rgba(255, 255, 255, 1);
  padding: 0.8rem 2.5rem;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color:rgba(0, 0, 0,0.5);
      color: rgba(255,255,255,1);
      font-weight: 700;
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 1rem 3rem;
  }
`;
