import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    // 상태 설정
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleKakaoLogin = () => {
        const REST_API_KEY = 'b0abcbdd05b3cc529063683c1a4e5003';
        const REDIRECT_URI = 'http://localhost:3001/login/kakao/callback';
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
        window.location.href = kakaoAuthUrl;
    };

    // 로그인 폼 제출 함수
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const loginData = { userId, password };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);

            if (response.data.message === '로그인 성공!') {
                const token = response.data.token;
                localStorage.setItem('token', token);

                const decodedToken = jwtDecode(token);
                const userIdFromToken = decodedToken.userId;
                const userNameFromToken = decodedToken.userName;
                console.log(decodedToken);

                localStorage.setItem('userId', userIdFromToken);
                localStorage.setItem('userName', userNameFromToken);
                alert(response.data.message);

                navigate('/');
            } else {
                alert('로그인 실패: 아이디나 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패: 서버 오류');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.h1}>로그인</h1>
            <form onSubmit={handleLoginSubmit}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>아이디</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        style={styles.input}
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                </div>
                {/* 폼 제출 버튼과 카카오 로그인 버튼을 감싸는 컨테이너 추가 */}
                <div style={styles.buttonContainer}>
                    <button type="submit" style={styles.submitButton}>로그인</button>
                    <button type="button" onClick={handleKakaoLogin} style={styles.kakaoLoginButton}>카카오 로그인</button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    h1: {
        fontSize: '3vw',
        fontFamily: 'Noto Sans KR',
        marginTop: '22vh',
        marginBottom: '4vh'
    },
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '10px',
    },
    label: {
        fontFamily: 'Noto Sans KR',
        fontSize: '2vw',
        display: 'block',
        marginBottom: '1vh',
        fontWeight: '600',
        margin: '2vh'
    },
    input: {
        padding: '10px',
        marginTop: '5px',
        width: '300px',
        fontSize: '16px',
        fontFamily: 'Jua',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    // Flexbox를 사용하여 버튼들을 가로로 정렬
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '4vh',
        marginBottom: '16vh',
    },
    submitButton: {
        backgroundColor: 'black',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Noto Sans KR',
        marginRight: '1vh', // 버튼 사이 간격 추가
    },
    kakaoLoginButton: {
        backgroundColor: '#FEE500',
        color: '#000',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Noto Sans KR',
        marginLeft: '1vh', // 버튼 사이 간격 추가
    },
};

export default LoginPage;
