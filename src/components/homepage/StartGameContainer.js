import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';

const StartGameContainer = () => (
    <ImageContainer>
        {/* 배경 애니메이션 원 */}
        <BackgroundShape1 />
        <BackgroundShape2 />

        <ContentWrapper>
            <Title>게임을 통해 음악을 추천 받으세요</Title>
            <Subtitle>게임과 음악을 통해, 나 자신을 알아가고 공유할 수 있는 공간</Subtitle>
            <StartButton to="/game">게임 하러가기</StartButton>
        </ContentWrapper>
    </ImageContainer>
);

export default StartGameContainer;

// ========== Keyframes ==========

const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(20px, -20px); }
  100% { transform: translate(0, 0); }
`;

// ========== Styled Components ==========

const ImageContainer = styled.div`
  position: relative;
  margin-top: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70vh;
  background-color: #191414;
  overflow: hidden; /* 원이 컨테이너 밖으로 나가지 않게 함 */

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
  z-index: 10; /* 배경 원보다 위에 오도록 설정 */
`;

/* 공통 Shape 스타일 */
const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: ${float} 10s infinite ease-in-out;
  pointer-events: none; /* 마우스 이벤트 방해 금지 */
`;

const BackgroundShape1 = styled(Shape)`
  width: 500px;
  height: 500px;
  top: -150px;
  left: -100px;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(0,0,0,0) 70%);
  animation-duration: 12s;
`;

const BackgroundShape2 = styled(Shape)`
  width: 300px;
  height: 300px;
  bottom: 50px;
  right: -50px;
  background: radial-gradient(circle, rgba(29, 185, 84, 0.3) 0%, rgba(0,0,0,0) 70%);
  animation-duration: 15s;
  animation-delay: 1s;
`;

const Title = styled.h1`
  font-size: 3.5vw;
  font-weight: 800;
  margin-bottom: 1rem;
  font-family: "Noto Sans KR", sans-serif;
  white-space: nowrap;

  @media (max-width: 768px) {
    font-size: 6vw;
  }
`;

const Subtitle = styled.p`
  font-size: 1.5vw;
  margin-bottom: 2.5rem;
  font-weight: 500;
  font-family: "Noto Sans KR", sans-serif;

  @media (max-width: 768px) {
    font-size: 3vw;
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
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    font-weight: 700;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 4vw;
    padding: 1rem 3rem;
  }
`;