import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // 로그인 상태 확인
    useEffect(() => {
        const userId = localStorage.getItem('userId');  // userId로 변경
        if (userId) {
            setIsLoggedIn(true);  // 로그인된 상태로 설정
        }
    }, []);

    // 로그아웃 처리 함수
    const handleLogout = () => {
        localStorage.removeItem('userId');  // userId를 localStorage에서 삭제
        setIsLoggedIn(false);  // 로그인 상태를 false로 설정
        navigate('/login');  // 로그인 페이지로 이동
    };

    return (
        <header style={styles.header}>
            <div style={styles.left}>
                <button style={styles.backButton} onClick={() => window.history.back()}>
                    &#8592;
                </button>
            </div>
            <div style={styles.right}>
                {isLoggedIn ? (
                    <button style={styles.logoutButton} onClick={handleLogout}>
                        로그아웃
                    </button>
                ) : (
                    <>
                        <Link to="/login">
                            <button style={styles.authButton}>로그인</button>
                        </Link>
                        <Link to="/signup">
                            <button style={styles.authButton}>회원가입</button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2vh 2vw',
        backgroundColor: '#121212',
        color: '#fff',
        height: '6vh',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
    },
    right: {
        display: 'flex',
        alignItems: 'center',
    },
    backButton: {
        background: 'none',
        border: 'none',
        color: '#fff',
        fontSize: '2vw',
        padding: '1vh 2vw',
        cursor: 'pointer',
    },
    authButton: {
        background: '#1ED760',
        color: '#fff',
        border: 'none',
        fontSize: '1.5vw',
        padding: '1.7vh 1.7vw',
        marginLeft: '2vw',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua',
    },
    logoutButton: {
        background: '#FF4F4F',  // 빨간색으로 변경
        color: '#fff',
        border: 'none',
        fontSize: '1.5vw',
        padding: '1.7vh 1.7vw',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua',
        marginLeft: '2vw',
    },
};

export default Header;
