import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InfoCardSection = () => {
    // 아이콘 SVG 컴포넌트 정의
    const MusicIcon = (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18V5L21 3V16" stroke="#191414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="#191414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18 19C19.6569 19 21 17.6569 21 16C21 14.3431 19.6569 13 18 13C16.3431 13 15 14.3431 15 16C15 17.6569 16.3431 19 18 19Z" stroke="#191414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const ReviewIcon = (
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="#191414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="#191414" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );

    const cards = [
        {
            icon: MusicIcon,
            title: '내 음악',
            sentence1: '나만의 플레이리스트를 언제 어디서나 감상하세요.',
            to: '/playlist',
        },
        {
            icon: ReviewIcon,
            title: '감상평',
            sentence1: '다양한 사람들의 솔직한 음악 감상평을 만나보세요.',
            to: '/viewreview',
        },
    ];

    return (
        <SectionWrapper>
            {/* 배경 애니메이션 원 */}
            <BackgroundShape3 />
            <BackgroundShape4 />

            {cards.map(({ icon, title, sentence1, sentence2, to }, index) => (
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
                            {/* 왼쪽: SVG 아이콘 영역 */}
                            <IconBox>
                                {icon}
                            </IconBox>

                            {/* 오른쪽: 텍스트 영역 */}
                            <TextBox>
                                <CardTitle>{title}</CardTitle>
                                <div className="text-group">
                                    <CardSentence>{sentence1}</CardSentence>
                                    <CardSentence>{sentence2}</CardSentence>
                                </div>
                            </TextBox>
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
  gap: 2.5rem;
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
  width: 38%;
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
  height: 17vh;
  background-color: #1DB954; /* Spotify Green */
  border-radius: 10px;
  overflow: hidden;
  border: none;

  @media (max-width: 768px) {
    height: 20vh;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  padding: 0 20px;
  display: flex;
  flex-direction: row; /* 가로 배치로 변경 */
  justify-content: center; /* 전체 덩어리를 중앙 정렬 */
  align-items: center;     /* 수직 중앙 정렬 */
  height: 100%;
  gap: 2rem; /* 아이콘과 텍스트 사이 간격 */

  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: flex-start; /* 모바일에서는 왼쪽 정렬이 나을 수 있음 */
    padding-left: 30px;
  }
`;

const IconBox = styled.div`
  width: 4vw;
  height: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 아이콘 크기 제한 (너무 커지지 않도록) */
  min-width: 40px;
  min-height: 40px;
  max-width: 60px;
  max-height: 60px;

  svg {
    width: 100%;
    height: 100%;
    /* 스트로크 색상은 SVG 내부 props 또는 여기서 설정 가능 */
  }

  @media (max-width: 768px) {
    width: 12vw;
    height: 12vw;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start; /* 텍스트는 왼쪽 정렬 */
  gap: 0.5rem;

  .text-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start; /* 설명글 왼쪽 정렬 */
    gap: 2px;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.5vw;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 800;
  margin: 0;
  color: #191414;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const CardSentence = styled.p`
  font-size: 0.9vw;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  line-height: 1.4;
  color: #191414;
  font-weight: 500;
  text-align: left; /* 텍스트 강제 왼쪽 정렬 */

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;