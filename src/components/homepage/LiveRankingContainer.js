import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LiveRankingContainer = () => {
  const gameRankings = [
    { rank: 1, name: 'PlayerOne', score: 9800 },
    { rank: 2, name: 'GamerTwo', score: 9200 },
    { rank: 3, name: 'Champion3', score: 9000 },
    { rank: 4, name: 'ProGamer4', score: 8600 },
    { rank: 5, name: 'Rookie5', score: 8300 },
  ];

  const musicRankings = [
    { rank: 1, title: 'Hit Song 1', artist: 'Artist A' },
    { rank: 2, title: 'Top Track 2', artist: 'Artist B' },
    { rank: 3, title: 'Popular Tune 3', artist: 'Artist C' },
    { rank: 4, title: 'Melody 4', artist: 'Artist D' },
    { rank: 5, title: 'Rhythm 5', artist: 'Artist E' },
  ];

  return (
    <Wrapper>
      <RankingSection>
        <SectionTitle>실시간 게임 랭킹</SectionTitle>
        {gameRankings.slice(0, 5).map(({ rank, name, score }) => (
          <RankingCard key={rank} as={motion.div} whileHover={{ scale: 1.05 }}>
            <Rank>{rank}</Rank>
            <Name>{name}</Name>
            <Score>{score} 점</Score>
          </RankingCard>
        ))}
      </RankingSection>

      <RankingSection>
        <SectionTitle>실시간 음악 랭킹</SectionTitle>
        {musicRankings.slice(0, 5).map(({ rank, title, artist }) => (
          <RankingCard key={rank} as={motion.div} whileHover={{ scale: 1.05 }}>
            <Rank>{rank}</Rank>
            <Name>{title}</Name>
            <Score>{artist}</Score>
          </RankingCard>
        ))}
      </RankingSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 4vh 4vw;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const RankingSection = styled.div`
  flex: 1;
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem 1.2rem;
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #222;
  font-family: 'Noto Sans KR', sans-serif;
`;

const RankingCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f9f9f9;
  border-radius: 6px;
  padding: 0.8rem 1rem;
  margin-bottom: 0.8rem;
  font-family: 'Noto Sans KR', sans-serif;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 10px rgba(0,0,0,0.12);
  }
`;

const Rank = styled.span`
  font-weight: 700;
  font-size: 1.3rem;
  width: 2rem;
  text-align: center;
  color: #ff4d4f;
`;

const Name = styled.span`
  flex: 1;
  margin-left: 1rem;
  font-size: 1.1rem;
  color: #333;
`;

const Score = styled.span`
  font-size: 1rem;
  color: #666;
`;

export default LiveRankingContainer;
