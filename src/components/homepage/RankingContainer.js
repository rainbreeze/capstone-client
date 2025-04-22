import React from "react";
import styled from "styled-components";

const gameRanking = [
    { name: "test01", score: 980 },
    { name: "test02", score: 920 },
    { name: "test03", score: 870 },
    { name: "test04", score: 850 },
    { name: "test05", score: 820 },
];

const musicRanking = [
    { name: "Kendrick Lamar & SZA – Luther", recommendations: 150 },
    { name: "Lady Gaga & Bruno Mars – Die With A Smile", recommendations: 145 },
    { name: "Shaboozey – A Bar Song (Tipsy)", recommendations: 140 },
    { name: "ROSÉ & Bruno Mars – APT.", recommendations: 135 },
    { name: "Billie Eilish – Birds Of A Feather", recommendations: 130 },
];

const RankingContainer = () => {
    return (
        <Container>
            <BoxesWrapper>
                <ContentBox>
                    <Title>🎮 게임 점수 랭킹</Title>
                    <RankingList>
                        {gameRanking.map((user, index) => (
                            <RankingItem key={index}>
                                {index + 1}위. {user.name} - {user.score}점
                            </RankingItem>
                        ))}
                    </RankingList>
                </ContentBox>

                <ContentBox>
                    <Title>🎵 음악 추천 랭킹</Title>
                    <RankingList>
                        {musicRanking.map((user, index) => (
                            <RankingItem key={index}>
                                {index + 1}위. {user.name} - {user.recommendations}추천
                            </RankingItem>
                        ))}
                    </RankingList>
                </ContentBox>
            </BoxesWrapper>
        </Container>
    );
};

export default RankingContainer;

// Styled Components

const Container = styled.div`
    width: 100vw;
    height: 65vh;
    background-image: url('images/homepage/ed2.png');
    background-size: cover;
    background-position: center;
    padding: 2vw 2vw;
    box-sizing: border-box;

    @media (max-width: 768px) {
        padding: 5vh 3vw;
    }
`;

const BoxesWrapper = styled.div`
    display: flex;
    gap: 2vw;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        gap: 5vw;
    }
`;

const ContentBox = styled.div`
    background: rgba(255, 255, 255, 0.7);
    padding: 2vw 2vw;
    border-radius: 1vw;
    box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.2);
    min-width: 20vw;
    max-width: 30vw;
    width: 100%;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 80vw;
        padding: 5vw 6vw;
    }
`;

const Title = styled.h3`
    font-size: 1.5vw;
    font-weight: bold;
    margin-bottom: 1vh;
    text-align: center;
    font-family: Jua;
`;

const RankingList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`;

const RankingItem = styled.li`
    font-size: 1vw;
    font-weight: 500;
    text-align: center;
    font-family: Jua;

    @media (max-width: 768px) {
        font-size: 1.5vw;
    }
`;
