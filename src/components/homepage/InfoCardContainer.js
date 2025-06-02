import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const InfoCardSection = () => {
const cards = [
    {
        title: '내 음악',
        sentence1: '나만의 플레이리스트를',
        sentence2: '언제 어디서나 감상하세요.',
        image: '/images/homepage/card_1.png',
        to: '/playlist',
    },
    {
        title: '감상평',
        sentence1: '다양한 사람들의 솔직한',
        sentence2: '음악 감상평을 만나보세요.',
        image: '/images/homepage/card_2.png',
        to: '/viewreview',
    },
    {
        title: '랭킹',
        sentence1: '가장 인기 있는 음악과',
        sentence2: '사용자 랭킹을 확인해보세요.',
        image: '/images/homepage/card_3.png',
        to: '/ranking',
    },
];

    return (
        <SectionWrapper>
            {cards.map(({ title, sentence1, sentence2, image, to }, index) => (
                <Link key={index} to={to} style={{ width: '30%', textDecoration: 'none' }}>
                    <Card
                        backgroundImage={image}
                        whileHover={{
                            scale: 1.03,
                            y: -5,
                            boxShadow: "0px 15px 15px rgba(0, 0, 0, 0.2)"
                        }}
                        initial="rest"
                        animate="rest"
                    >
                        <CardContent>
                            <CardTitle>{title}</CardTitle>
                            <CardSentence>{sentence1}</CardSentence>
                            <CardSentence>{sentence2}</CardSentence>
                        </CardContent>
                    </Card>
                </Link>
            ))}
        </SectionWrapper>
    );
};

const SectionWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 6vh 4vw;
  background-color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 28vh;
  background-image: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardTitle = styled.h2`
  font-size: 1.8vw;
  font-family: 'Noto Sans KR', sans-serif;

  @media (max-width: 768px) {
    font-size: 5vw;
  }
`;

const CardSentence = styled.p`
  font-size: 1vw;
  font-family: 'Noto Sans KR', sans-serif;
  margin: 0;
  margin-bottom: 3px;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 2;
  color: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;

  &:hover {
    ${CardTitle} {
        font-weight: 800;
        transition: 0.3s ease;
    }
    
    ${CardSentence} {
        font-weight: 600;
        transition: 0.3s ease;
    }
  }
`;

export default InfoCardSection;
