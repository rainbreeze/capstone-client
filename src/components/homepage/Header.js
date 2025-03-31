import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // 햄버거 아이콘

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // 사이드바 상태 관리
    const handleSidebarItemClick = () => {
        setIsSidebarOpen(false);
    };

    // 스크롤 이벤트 리스너 추가
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) { // 10px 이상 스크롤 했을 때
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // 컴포넌트가 unmount될 때 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // 사이드바 열고 닫기
    };

    return (
        <HeaderWrapper scrolled={scrolled}>
            <Logo src="/images/logo.png" alt="Logo" />

            {/* 모바일에서 햄버거 메뉴 버튼 */}
            <HamburgerMenu onClick={toggleSidebar}>
                <FaBars size={18} color="#fff" />
            </HamburgerMenu>

            {/* 모바일에서 메뉴는 숨기기 */}
            <NavLeft>
                <NavList>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/game">게임</NavLink></NavItem>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/reviews">감상평</NavLink></NavItem>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/ranking">랭킹</NavLink></NavItem>
                </NavList>
            </NavLeft>

            <NavRight>
                <NavList>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/playlist">Play List</NavLink></NavItem>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/myinfo">내 정보</NavLink></NavItem>
                    <NavItem scrolled={scrolled}><NavLink as={Link} to="/login">로그인/회원가입</NavLink></NavItem>
                </NavList>
            </NavRight>

            {/* 사이드바 */}
            {isSidebarOpen && (
                <Sidebar>
                    <SidebarList>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/game">게임</NavLink>
                        </SidebarItem>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/reviews">감상평</NavLink>
                        </SidebarItem>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/ranking">랭킹</NavLink>
                        </SidebarItem>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/playlist">Play List</NavLink>
                        </SidebarItem>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/myinfo">내 정보</NavLink>
                        </SidebarItem>
                        <SidebarItem onClick={handleSidebarItemClick}>
                            <NavLink as={Link} to="/login">로그인/회원가입</NavLink>
                        </SidebarItem>                    </SidebarList>
                </Sidebar>
            )}
        </HeaderWrapper>
    );
};

export default Header;

const HeaderWrapper = styled.header`
    background-color: hsl(0, 0.00%, 7.10%);
    position: fixed;
    top: 0;
    z-index: 99;
    width: 100%;
    height: 8vh;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: border-bottom 0.3s ease;
    padding: 0 2%;

    /* 스크롤 시 border-bottom 추가 */
    ${props => props.scrolled && `
        border-bottom: 1px solid #808080;
    `}

    @media (max-width: 768px) {
        justify-content: space-between; /* 모바일에서는 좌측 메뉴를 숨김 */
    }
`;

const Logo = styled.img`
    height: 80%;
    width: auto;
    display: flex;
    margin-left: 5%;
`;

const HamburgerMenu = styled.div`
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block; /* 모바일에서는 햄버거 메뉴 보이기 */
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 10vw;
    }
`;

const NavLeft = styled.nav`
    display: flex;
    justify-content: flex-start;
    margin-left: 3%;

    @media (max-width: 768px) {
        display: none; /* 모바일에서는 메뉴 숨기기 */
    }
`;

const NavRight = styled.nav`
    display: flex;
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 3%;

    @media (max-width: 768px) {
        display: none; /* 모바일에서는 메뉴 숨기기 */
    }
`;

const NavList = styled.ul`
    list-style-type: none;
    display: flex;
    height: 8vh;
    padding: 0;
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
        font-size: 3vw;
    }
`;

const NavItem = styled.li`
    padding: 0 2vw;
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 10px;
    transition: 0.7s ease;
    position: relative;

    &:hover {
        background-color: #FFFFFF;
    }

    @media (max-width: 768px) {
        padding: 0 5vw;
    }
`;


// 사이드바 스타일
const Sidebar = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 30vw;
    height: 100%;
    background-color: #121212;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1vw;
    z-index: 100;
`;

const SidebarList = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
    width: 100%;
`;

const SidebarItem = styled.li`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 2.5vh 0;
    text-align: left;
    color: #fff;
    border-bottom: 1px solid #333;
`;

