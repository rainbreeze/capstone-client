// common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header style={styles.header}>
            <div style={styles.left}>
                <button style={styles.backButton} onClick={() => window.history.back()}>
                    &#8592;
                </button>
            </div>
            <div style={styles.right}>
                <Link to="/login">
                    <button style={styles.authButton}>로그인</button>
                </Link>
                <Link to="/signup">
                    <button style={styles.authButton}>회원가입</button>
                </Link>
            </div>
        </header>
    );
};

const styles = {
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '2vh 2vw',  // 상하 패딩은 vh, 좌우는 vw로 설정
        backgroundColor: '#121212',
        color: '#fff',
        height: '6vh',  // 헤더 높이를 8vh로 설정
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
        fontSize: '2vw', // 버튼의 글자 크기를 화면 너비의 4%로 설정
        padding: '1vh 2vw', // 버튼의 패딩을 vh와 vw로 설정
        cursor: 'pointer',
    },
    authButton: {
        background: '#1ED760',
        color: '#fff',
        border: 'none',
        fontSize: '1.5vw', // 글자 크기를 화면 너비의 3%로 설정
        padding: '1.7vh 1.7vw', // 버튼의 패딩을 vh와 vw로 설정
        marginLeft: '2vw',  // 버튼들 간의 간격을 vw로 설정
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua'
    },
};

export default Header;
