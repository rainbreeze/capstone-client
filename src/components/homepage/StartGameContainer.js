import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StartGameContainer = () => (
    <ImageContainer1>
        <GameButton as={Link} to="/game">게임하러 가기</GameButton>
        <FloatingImage src="/images/homepage/float_01.png" alt="떠다니는 이미지" />
        <FloatingImage02 src="/images/homepage/float_02.png" alt="떠다니는 이미지" />
    </ImageContainer1>
);

export default StartGameContainer;

const FloatingImage = styled.img`
    position: absolute;
    z-index: 10;
    bottom: 20%;
    left: 60%;
    transform: translateX(-50%);
    width: 4%;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(-50%) translateX(0);
        }
        50% {
            transform: translateY(-90%) translateX(-20px);
        }
        100% {
            transform: translateY(-50%) translateX(0);
        }
    }

    @media (max-width: 768px) {
        left: 65%;
        bottom: 25%;
    }
`;

const FloatingImage02 = styled.img`
    position: absolute;
    z-index: 10;
    bottom: 10%;
    left: 40%;
    transform: translateX(-50%);
    width: 5%;
    animation: float02 4s ease-in-out infinite;

    @keyframes float02 {
        0% {
            transform: translateY(-50%) translateX(0);
        }
        50% {
            transform: translateY(-50%) translateX(-90%);
        }
        100% {
            transform: translateY(-50%) translateX(0);
        }
    }

    @media (max-width: 768px) {
        left: 35%;
    }
`;

const ImageContainer1 = styled.div`
    position: relative;
    width: 100%;
    height: 60vh;
    margin-top: 8vh;  /* 헤더의 높이를 고려하여 여백 추가 */
    background-image: url('/images/homepage/homepage_nav01.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        height: 35vh;
    }
`;

const GameButton = styled.a`
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translateX(-50%);
    text-decoration: none;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    font-size: 2vw;
    font-family: 'Jua', sans-serif;
    padding: 1.5% 4%;
    border-radius: 10px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
        color: #1ED760;
    }

    @media (max-width: 768px) {
        font-size: 3vw;
        padding: 2% 5%;
    }
`;
