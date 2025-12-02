import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InfoCardSection = () => {
    const cards = [
        {
            title: '내 음악',
            sentence1: '나만의 플레이리스트를',
            sentence2: '언제 어디서나 감상하세요.',
            to: '/playlist',
        },
        {
            title: '감상평',
            sentence1: '다양한 사람들의 솔직한',
            sentence2: '음악 감상평을 만나보세요.',
            to: '/viewreview',
        },
    ];

    return (
        <SectionWrapper>
            {/* 배경 애니메이션 원 */}
            <BackgroundShape3 />
            <BackgroundShape4 />

            {cards.map(({ title, sentence1, sentence2, to }, index) => (
                <StyledLink key={index} to={to}>
                    <Card
                        whileHover={{
                            scale: 1.03,
                            y: -5,
                            boxShadow: "0px 10px 10px rgba(29, 185, 84, 0.4)"
                        }}
                        initial="rest"
                        animate="rest"
                    >
                        <CardContent>
                            <CardTitle>{title}</CardTitle>
                            <div className="text-group">
                                <CardSentence>{sentence1}</CardSentence>
                                <CardSentence>{sentence2}</CardSentence>
                            </div>
                        </CardContent>
                    </Card>
                </StyledLink>
            ))}
        </SectionWrapper>
    );
};

export default InfoCardSection;

// ========== Keyframes ==========

const float = keyframes`
  0% { transform: translate(0, 0); }
  50% { transform: translate(-20px, 10px); }
  100% { transform: translate(0, 0); }
`;

// ========== Styled Components ==========

const SectionWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 2rem;
  /* 상단 패딩을 1.5vh로 설정하여 호버 시 잘림 방지 (너무 멀어지지 않도록 최소한으로 설정) */
  padding: 1.5vh 4vw 6vh 4vw;
  background-color: #191414;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    align-items: center;
    padding-top: 2vh;
  }
`;

/* 공통 Shape 스타일 */
const Shape = styled.div`
  position: absolute;
  border-radius: 50%;
  opacity: 0.5;
  animation: ${float} 14s infinite ease-in-out;
  pointer-events: none;
  z-index: 0;
`;

const BackgroundShape3 = styled(Shape)`
  width: 400px;
  height: 400px;
  top: 10%;
  left: 40%;
  background: radial-gradient(circle, rgba(100, 200, 100, 0.15) 0%, rgba(0,0,0,0) 70%);
  animation-duration: 20s;
`;

const BackgroundShape4 = styled(Shape)`
  width: 250px;
  height: 250px;
  bottom: -50px;
  left: 5%;
  background: radial-gradient(circle, rgba(150, 100, 255, 0.15) 0%, rgba(0,0,0,0) 70%);
  animation-duration: 16s;
  animation-delay: 2s;
`;

const StyledLink = styled(Link)`
  width: 40%;
  text-decoration: none;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 18vh;
  background-color: #1DB954; /* Spotify Green */
  border-radius: 10px;
  overflow: hidden;
  border: none;

  @media (max-width: 768px) {
    height: 20vh;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5vw;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 800; /* 제목 강조 */
  margin: 0; /* 마진 제거 (flex gap으로 간격 조절) */
  color: #191414;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const CardSentence = styled.p`
  font-size: 0.9vw;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  line-height: 1.4; /* 줄 간격 확보 */
  color: #191414;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0; /* 내부 패딩 제거 (필요 시 미세 조정) */
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center;     /* 수평 중앙 정렬 */
  height: 100%;
  text-align: center;
  gap: 1rem; /* 제목과 설명글 사이의 간격 */

  .text-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px; /* 설명글 두 줄 사이의 간격 */
  }

  &:hover {
    ${CardTitle} {
      /* 호버 효과 (필요하면 추가) */
    }

    ${CardSentence} {
      font-weight: 700;
      transition: 0.3s ease;
    }
  }
`;