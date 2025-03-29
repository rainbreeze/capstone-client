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
                        <NavItem><NavLink as={Link} to="/game">게임</NavLink></NavItem>  {/* 링크 수정 */}
                        <NavItem><NavLink as={Link} to="/reviews">감상평</NavLink></NavItem>  {/* 링크 수정 */}
                        <NavItem><NavLink as={Link} to="/ranking">랭킹</NavLink></NavItem>  {/* 링크 수정 */}
                    </NavList>
                </NavLeft>
                <NavRight>
                    <NavList>
                        <NavItem><NavLink as={Link} to="/playlist">Play List</NavLink></NavItem>
                        <NavItem><NavLink as={Link} to="/myinfo">내 정보</NavLink></NavItem>  {/* 링크 수정 */}
                        <NavItem><NavLink as={Link} to="/login">로그인/회원가입</NavLink></NavItem>  {/* 링크 수정 */}
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

            {/* Footer Section */}
            <Footer>
                <CopyrightText>© 2025 Capstone Group 6 All rights reserved.</CopyrightText>
            </Footer>
        </div>
    );
}

export default HomePage;

// 떠다니는 이미지 스타일링
const FloatingImage = styled.img`
    position: absolute;
    z-index: 10;
    bottom: -15%;
    left: 18%;
    transform: translateY(-50%);
    width: 100px;  /* 이미지 크기는 조정 가능합니다 */
    animation: float 3s ease-in-out infinite;

    @keyframes float {
        0% {
            transform: translateY(-50%) translateX(0);
        }
        25% {
            transform: translateY(-70%) translateX(20px); /* 더 넓은 범위로 이동 */
        }
        50% {
            transform: translateY(-90%) translateX(-20px); /* 더 넓은 범위로 이동 */
        }
        75% {
            transform: translateY(-70%) translateX(20px); /* 반대 방향으로 이동 */
        }
        100% {
            transform: translateY(-50%) translateX(0);
        }
    }
`;

const FloatingImage02 = styled.img`
    position: absolute;
    z-index: 10;
    bottom: 5%; /* 위치는 동일하게 설정 */
    left: 0%;  /* 동일한 위치 */
    transform: translateY(-50%);
    width: 80px;  /* 크기는 다르게 설정 */
    animation: float02 4s ease-in-out infinite;  /* 다른 애니메이션 설정 */

    @keyframes float02 {
        0% {
            transform: translateY(-50%) translateX(0) rotate(0deg);
        }
        25% {
            transform: translateY(-50%) translateX(30px) rotate(45deg); /* 이동하면서 회전 */
        }
        50% {
            transform: translateY(-50%) translateX(-30px) rotate(90deg); /* 반대 방향으로 이동하며 회전 */
        }
        75% {
            transform: translateY(-50%) translateX(30px) rotate(135deg); /* 다시 돌아오면서 회전 */
        }
        100% {
            transform: translateY(-50%) translateX(0) rotate(180deg); /* 마지막 회전 */
        }
    }
`;


const Logo = styled.img`
    height: 50px;
    width: auto;
    display: flex;
    margin-left: 10px;
`;

const Header = styled.header`
    background-color:hsl(0, 0.00%, 7.10%);
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const NavLeft = styled.nav`
    display: flex;
    justify-content: flex-start;
    margin-left: 30px;
`;

const NavRight = styled.nav`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 30px;
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    height: 80px;
    padding: 0;
    margin: 0;
`;

const NavLink = styled.a`
    text-decoration: none;
    color: #FFFFFF;
    font-size: 22px;
    font-family: 'Jua', sans-serif;
    transition: 0.7s ease;
    &:hover {
        color: #1ED760;
    }
`;

const NavItem = styled.li`
    padding: 0 30px;
    height: 100%;
    display: flex;
    align-items: center;
    &:has(${NavLink}:hover) {
        background-color: #FFFFFF;
    }
    border-radius: 10px;
    transition: 0.7s ease;
`;

const ImageContainer1 = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
    background-image: url('/images/homepage/homepage_nav01.png');
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
`;

const ImageContainer2 = styled.div`
    position: relative;
    width: 100%;
    height: 450px;
    background-image: url(${(props) => props.backgroundImage});
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
`;

const GameButton = styled.a`
    position: absolute;
    bottom: 150px;
    left: 90px;
    text-decoration: none;
    background-color: transparent;
    border: 2px solid white;
    color: white;
    font-size: 32px;
    font-family: 'Jua', sans-serif;
    padding: 15px 30px;
    border-radius: 10px;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
        color: #1ED760;
    }
`;

const NavButtons = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: space-between;
    width: 80%;
    padding: 0 20px;
`;

const NavButton = styled.button`
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 32px;
    border: none;
    padding: 10px;
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: rgba(0, 0, 0, 0.8);
    }
        /* FontAwesomeIcon 사이즈 조정 */
        .fa-chevron-left, .fa-chevron-right {
        font-size: 32px;
    }
`;

const Pagination = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
`;

const Dot = styled.div`
    width: 15px;
    height: 15px;
    background-color: ${(props) => (props.isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)')};
    border-radius: 50%;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #FFFFFF;
    }
`;

// Footer Section for Copyright
const Footer = styled.footer`
    background-color: #1d1d1d;  /* Dark color for footer */
    color: #ffffff;
    text-align: center;
    padding: 20px 0;
    position: relative;
    bottom: 0;
    width: 100%;
`;

const CopyrightText = styled.p`
    font-size: 14px;
    margin: 0;
`;
