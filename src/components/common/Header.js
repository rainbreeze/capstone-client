import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [profileImage, setProfileImage] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const transparentPaths = ['/playlist', '/viewreview'];
    const isTransparentPage = transparentPaths.includes(location.pathname);

    useEffect(() => {
        const loggedUserId = localStorage.getItem('userId');
        const loggedUserName = localStorage.getItem('userName');
        const loggedProfileImage = localStorage.getItem('profileImage');

        if (loggedUserId) {
            setUser({ userId: loggedUserId });
            setUserName(loggedUserName);

            if (loggedProfileImage) {
                const fullImageUrl = loggedProfileImage.startsWith('http')
                    ? loggedProfileImage
                    : `${process.env.REACT_APP_API_URL}${loggedProfileImage}`;
                setProfileImage(fullImageUrl);
            } else {
                setProfileImage(null);
            }
        } else {
            setUser(null);
            setUserName(null);
            setProfileImage(null);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleLogout = () => {
        localStorage.clear();
        setUser(null);
        setUserName(null);
        setProfileImage(null);
        navigate('/');
    };

    return (
        <HeaderWrapper scrolled={scrolled} transparent={isTransparentPage && !scrolled}>
            <Logo src="/assets/images/logo_image.png" alt="Logo" />

            <HamburgerMenu onClick={toggleSidebar}>
                <FaBars size={24} color="#FFFFFF" />
            </HamburgerMenu>

            <NavLeft>
                <NavList>
                    <NavItem scrolled={scrolled}>
                        {/* ▼▼▼ [수정됨] 로그인 여부에 따라 링크 경로 변경 (/home or /) ▼▼▼ */}
                        <NavLink as={Link} to={user ? "/home" : "/"} isFirst>
                            홈
                        </NavLink>
                    </NavItem>
                    <NavItem scrolled={scrolled}>
                        <NavLink as={Link} to="/game">
                            게임
                        </NavLink>
                    </NavItem>
                    <NavItem scrolled={scrolled}>
                        <NavLink as={Link} to="/playlist">
                            음악
                        </NavLink>
                    </NavItem>
                    <NavItem scrolled={scrolled}>
                        <NavLink as={Link} to="/viewreview">
                            감상평
                        </NavLink>
                    </NavItem>
                    {/* 테스트 항목 주석 처리 유지 */}
                    {/*
                    <NavItem scrolled={scrolled}>
                        <NavLink as={Link} to="/test">
                            테스트
                        </NavLink>
                    </NavItem>
                    */}
                    <NavItem scrolled={scrolled}>
                        <NavLink as={Link} to="/test2">
                            ML TEST
                        </NavLink>
                    </NavItem>
                </NavList>
            </NavLeft>

            <NavRight>
                <SearchContainer>
                    <SearchIcon />
                    <SearchInput type="text" placeholder="검색어를 입력해주세요." />
                </SearchContainer>
                <NavList>
                    {user && (
                        <NavItem scrolled={scrolled}>
                            <NavLink as={Link} to="/mypage">
                                내 정보
                            </NavLink>
                        </NavItem>
                    )}
                    {user ? (
                        <NavItem scrolled={scrolled} onClick={handleLogout}>
                            <NavLink as={Link} to="/" isLogout={true}>
                                로그아웃
                            </NavLink>
                        </NavItem>
                    ) : (
                        <>
                            <NavItem scrolled={scrolled}>
                                <NavLink as={Link} to="/login">
                                    로그인
                                </NavLink>
                            </NavItem>
                            <NavItem scrolled={scrolled}>
                                <NavLink as={Link} to="/signup" isSignup>
                                    회원가입
                                </NavLink>
                            </NavItem>
                        </>
                    )}
                </NavList>
            </NavRight>

            <Overlay open={isSidebarOpen} onClick={() => setIsSidebarOpen(false)} />
            <Sidebar open={isSidebarOpen} onClick={(e) => e.stopPropagation()}>
                <SidebarBanner>
                    <ProfileImage
                        src={profileImage ? profileImage : "/images/header/profile.png"}
                        alt="Profile"
                    />
                    <TextBox>
                        <UserName>{userName ? `안녕하세요, ${userName}님` : '게스트'}</UserName>
                        <WelcomeText>음악과 게임을 즐겨보세요.</WelcomeText>
                    </TextBox>
                </SidebarBanner>
                <SidebarList>
                    <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                        <NavLink as={Link} to="/game">
                            게임
                        </NavLink>
                    </SidebarItem>
                    <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                        <NavLink as={Link} to="/viewreview">
                            감상평
                        </NavLink>
                    </SidebarItem>
                    <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                        <NavLink as={Link} to="/ranking">
                            랭킹
                        </NavLink>
                    </SidebarItem>

                    {/* 사이드바 테스트 항목 주석 처리 유지 */}
                    {/*
                    <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                        <NavLink as={Link} to="/test">
                            테스트
                        </NavLink>
                    </SidebarItem>
                    */}

                    <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                        <NavLink as={Link} to="/playlist">
                            음악
                        </NavLink>
                    </SidebarItem>

                    {user && (
                        <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                            <NavLink as={Link} to="/mypage">
                                내 정보
                            </NavLink>
                        </SidebarItem>
                    )}

                    {user ? (
                        <SidebarItem
                            onClick={() => {
                                handleLogout();
                                setIsSidebarOpen(false);
                            }}
                        >
                            <NavLink as={Link} to="/" isLogout={true}>
                                로그아웃
                            </NavLink>
                        </SidebarItem>
                    ) : (
                        <>
                            <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                                <NavLink as={Link} to="/login">
                                    로그인
                                </NavLink>
                            </SidebarItem>
                            <SidebarItem onClick={() => setIsSidebarOpen(false)}>
                                <NavLink as={Link} to="/signup" isSignup={true}>
                                    회원가입
                                </NavLink>
                            </SidebarItem>
                        </>
                    )}
                </SidebarList>
            </Sidebar>
        </HeaderWrapper>
    );
};

export default Header;

// 스타일 컴포넌트

const WelcomeText = styled.div`
  font-size: 1.5vw;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
  margin-top: 0.3vw;
`;

const SidebarBanner = styled.div`
  width: 100%;
  height: 18vh;
  background-image: url('/images/header/banner_bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: 0 4vw;
  box-sizing: border-box;
  color: white;
  border-top-left-radius: 10px;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileImage = styled.img`
  width: 10vh;
  height: 10vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
  margin-right: 1.5vw;
  border: 2px solid white;
  display: block;
`;

const UserName = styled.div`
  font-size: 2.5vw;
  font-weight: bold;
`;


const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 98;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  padding: 0.4vh 0.8vw;
  height: 4.5vh;
`;

const SearchInput = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: #FFFFFF;
  font-size: 0.9vw;
  font-family: 'Noto Sans KR', sans-serif;
  margin-left: 0.5vw;
  ::placeholder {
    color: #B3B3B3;
  }
`;

const SearchIcon = styled(FiSearch)`
  color: #B3B3B3;
  font-size: 1.3vw;
`;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  z-index: 99;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: background-color 0.3s ease;

  background-color: ${({ transparent, scrolled }) =>
          transparent ? 'transparent' : '#191414'};
`;

const Logo = styled.img`
  height: 300px;
  width: auto;
  display: flex;
  margin-left: 5%;
  object-fit: contain;
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
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
    display: none;
  }
`;

const NavRight = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-left: auto;
  margin-right: 3%;

  @media (max-width: 768px) {
    display: none;
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
  color: rgba(255, 255, 255, 0.7);
  font-size: 1vw;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 700;
  transition: 0.3s ease;

  ${props => (props.isLogout || props.isFirst || props.isSignup) && `
    color: rgba(255, 255, 255, 0.9) !important;
  `}

  @media (max-width: 768px) {
  font-size: 2.5vw;
}
`;

const NavItem = styled.li`
  padding: 1.5vw;
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  transition: 0.7s ease;
  position: relative;

  &:hover {
    a {
      color: #FFFFFF;
    }
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 45vw;
  height: 100%;
  background-color: #191414;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 100;
  transform: translateX(${props => (props.open ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
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
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background-color: #2a2a2a;
    a {
      color: #1DB954;
      font-weight: 900;
    }
  }

  &:first-child {
    border-top: 1.5px solid rgba(255, 255, 255, 0.1);
  }
`;