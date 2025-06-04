import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';  // jwt-decode 패키지에서 named import로 수정
import Header from '../common/Header';  // Header 컴포넌트 추가
import Footer from '../common/Footer';  // Footer 컴포넌트 추가
import { useNavigate } from 'react-router-dom';  // 리디렉션을 위한 useNavigate 추가

const LoginPage = () => {
    // 상태 설정
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();  // 페이지 리디렉션을 위한 navigate

    // 로그인 폼 제출 함수
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const loginData = { userId, password };

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, loginData);

            if (response.data.message === '로그인 성공!') {  // 여기서 응답 메시지 확인
                const token = response.data.token;  // 서버에서 받은 토큰
                localStorage.setItem('token', token);  // 토큰을 localStorage에 저장

                // JWT 토큰 디코딩하여 사용자 ID 추출
                const decodedToken = jwtDecode(token);  // 토큰 디코딩
                const userIdFromToken = decodedToken.userId;  // 디코딩한 토큰에서 userId 추출
                const userNameFromToken = decodedToken.userName;  // 가능
                console.log(decodedToken);  // userId, userName, profileImage 다 잘 나오나요?

                // 사용자 ID를 localStorage에 저장
                localStorage.setItem('userId', userIdFromToken);
                localStorage.setItem('userName', userNameFromToken);
                alert(response.data.message);  // 로그인 성공 시 메시지 표시

                // 로그인 후 홈 페이지로 리디렉션
                navigate('/');  // 또는 다른 리디렉션 경로로 이동
            } else {
                alert('로그인 실패: 아이디나 비밀번호를 확인하세요.');
            }
        } catch (error) {
            console.error('로그인 실패:', error);  // 오류를 콘솔에 출력
            alert('로그인 실패: 서버 오류');
        }
    };

    return (
        <div>
            <Header />  {/* Header 컴포넌트 추가 */}
            <div style={styles.container}>
                <h1 style={styles.h1}>로그인</h1>
                <form onSubmit={handleLoginSubmit}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>아 이 디</label>
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
                    <button type="submit" style={styles.submitButton}>로그인</button>
                </form>
            </div>
            <Footer />  {/* Footer 컴포넌트 추가 */}
        </div>
    );
};

const styles = {
    h1: {
        fontSize: '4vw',
        fontFamily: 'Jua',
    },
    container: {
        padding: '20px',
        textAlign: 'center',
    },
    inputGroup: {
        marginBottom: '10px',
    },
    label: {
        fontFamily: 'Jua',
        fontSize: '2vw',
        display: 'block',
        marginBottom: '1vh',
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
    submitButton: {
        backgroundColor: '#1ED760',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: '5px',
        fontFamily: 'Jua'
    },
};

export default LoginPage;
