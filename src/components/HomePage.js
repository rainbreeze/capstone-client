import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const images = [
    '/images/homepage/homepage_nav02.png',
    '/images/homepage/homepage_nav03.png',
    '/images/homepage/homepage_nav04.png',
    '/images/homepage/homepage_nav05.png'
];

function HomePage() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // 5초마다 이미지 변경

        return () => clearInterval(interval);
    }, []);

    const goToNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const goToImage = (index) => {
        setCurrentImageIndex(index);
    };

    return (
        <div>
            <Header>
                <Logo src="/images/logo.png" alt="Logo" />
                <NavLeft>
                    <NavList>
                        <NavItem><NavLink as={Link} to="/game">게임</NavLink></NavItem>
                        <NavItem><NavLink as={Link} to="/reviews">감상평</NavLink></NavItem>
                        <NavItem><NavLink as={Link} to="/ranking">랭킹</NavLink></NavItem>
                    </NavList>
                </NavLeft>
                <NavRight>
                    <NavList>
                        <NavItem><NavLink as={Link} to="/playlist">Play List</NavLink></NavItem>
                        <NavItem><NavLink as={Link} to="/myinfo">내 정보</NavLink></NavItem>
                        <NavItem><NavLink as={Link} to="/login">로그인/회원가입</NavLink></NavItem>
                    </NavList>
                </NavRight>
            </Header>

            <ImageContainer1>
                <GameButton as={Link} to="/game">게임하러 가기</GameButton>
                <FloatingImage src="/images/homepage/float_01.png" alt="떠다니는 이미지" />
                <FloatingImage02 src="/images/homepage/float_02.png" alt="떠다니는 이미지" />
            </ImageContainer1>

            <ImageContainer2 backgroundImage={images[currentImageIndex]}>
                <NavButtons>
                    <NavButton onClick={goToPreviousImage}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </NavButton>
                    <NavButton onClick={goToNextImage}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </NavButton>
                </NavButtons>

                <Pagination>
                    {images.map((_, index) => (
                        <Dot
                            key={index}
                            isActive={index === currentImageIndex}
                            onClick={() => goToImage(index)}
                        />
                    ))}
                </Pagination>
            </ImageContainer2>

            <Footer>
                <CopyrightText>© 2025 Capstone Group 6 All rights reserved.</CopyrightText>
            </Footer>
        </div>
    );
}

export default HomePage;

// 스타일링
const FloatingImage = styled.img`
    position: absolute;
    z-index: 10;
    bottom: -15%;
    left: 18%;
    transform: translateY(-50%);
    width: 5%;
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(-50%) translateX(0);
        }
        25% {
            transform: translateY(-70%) translateX(20px);
        }
        50% {
            transform: translateY(-90%) translateX(-20px);
        }
        75% {
            transform: translateY(-70%) translateX(20px);
        }
        100% {
            transform: translateY(-50%) translateX(0);
        }
    }

    @media (max-width: 768px) {
        width: 10%; /* 모바일에서 크기 증가 */
        left: 10%;  /* 위치 조정 */
    }
`;

const FloatingImage02 = styled.img`
    position: absolute;
    z-index: 10;
    bottom: 5%;
    left: 0%;
    transform: translateY(-50%);
    width: 5%;
    animation: float02 4s ease-in-out infinite;

    @keyframes float02 {
        0% {
            transform: translateY(-50%) translateX(0) rotate(0deg);
        }
        25% {
            transform: translateY(-50%) translateX(30px) rotate(45deg);
        }
        50% {
            transform: translateY(-50%) translateX(-30px) rotate(90deg);
        }
        75% {
            transform: translateY(-50%) translateX(30px) rotate(135deg);
        }
        100% {
            transform: translateY(-50%) translateX(0) rotate(180deg);
        }
    }

    @media (max-width: 768px) {
        width: 12%; /* 모바일에서 크기 증가 */
        left: 5%;  /* 위치 조정 */
    }
`;

const Logo = styled.img`
    height: 50px;
    width: auto;
    display: flex;
    margin-left: 5%;

    @media (max-width: 768px) {
        height: 40px; /* 모바일에서 로고 크기 줄이기 */
        margin-left: 3%;
    }
`;

const Header = styled.header`
    background-color:hsl(0, 0.00%, 7.10%);
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 768px) {
        height: 60px; /* 모바일에서 높이 조정 */
    }
`;

const NavLeft = styled.nav`
    display: flex;
    justify-content: flex-start;
    margin-left: 5%;
`;

const NavRight = styled.nav`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 5%;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    height: 80px;
    padding: 0;

    @media (max-width: 768px) {
        height: 60px; /* 모바일에서 높이 조정 */
    }
`;

const NavLink = styled.a`
    text-decoration: none;
    color: #FFFFFF;
    font-size: 1.5vw;
    font-family: 'Jua', sans-serif;
    transition: 0.7s ease;

    &:hover {
        color: #1ED760;
    }

    @media (max-width: 768px) {
        font-size: 4vw; /* 모바일에서 폰트 크기 증가 */
    }
`;

const NavItem = styled.li`
    padding: 0 2vw;
    height: 100%;
    display: flex;
    align-items: center;

    &:has(${NavLink}:hover) {
        background-color: #FFFFFF;
    }

    border-radius: 10px;
    transition: 0.7s ease;

    @media (max-width: 768px) {
        padding: 0 5vw; /* 모바일에서 간격 증가 */
    }
`;

const ImageContainer1 = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    background-image: url('/images/homepage/homepage_nav01.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        height: 400px; /* 모바일에서 높이 조정 */
    }
`;

const ImageContainer2 = styled.div`
    position: relative;
    width: 100%;
    height: 450px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;

    @media (max-width: 768px) {
        height: 350px; /* 모바일에서 높이 조정 */
    }
`;

const GameButton = styled.a`
    position: absolute;
    bottom: 20%;
    left: 6%;
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
        font-size: 5vw; /* 모바일에서 버튼 글자 크기 */
        padding: 4% 10%; /* 모바일에서 버튼 크기 조정 */
    }
`;

const NavButtons = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 10%;
    align-items: center;

    @media (max-width: 768px) {
        padding: 0 5%; /* 모바일에서 버튼 간격 줄이기 */
    }
`;

const NavButton = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 3vw;
    border: none;
    padding: 2%;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }

    .fa-chevron-left, .fa-chevron-right {
        font-size: 2.5vw;
    }

    @media (max-width: 768px) {
        font-size: 6vw; /* 모바일에서 버튼 크기 키우기 */
    }
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 2%;

    @media (max-width: 768px) {
        gap: 5%; /* 모바일에서 간격 늘리기 */
    }
`;

const Dot = styled.div`
    width: 2vw;
    height: 1.5vw;
    background-color: ${(props) => (props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
    }

    @media (max-width: 768px) {
        width: 6vw; /* 모바일에서 크기 키우기 */
        height: 4vw; /* 모바일에서 크기 키우기 */
    }
`;

const Footer = styled.footer`
    background-color: #1d1d1d;
    color: #ffffff;
    text-align: center;
    padding: 3% 0;
    position: relative;
    bottom: 0;
    width: 100%;

    @media (max-width: 768px) {
        padding: 5% 0; /* 모바일에서 패딩 조정 */
    }
`;

const CopyrightText = styled.p`
    font-size: 1vw;
    margin: 0;

    @media (max-width: 768px) {
        font-size: 3vw; /* 모바일에서 폰트 크기 키우기 */
    }
`;

