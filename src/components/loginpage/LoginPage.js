import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    // 이메일 형식 제한 없이 아이디를 받기 위해 변수명 userId 사용
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // 카카오 로그인 설정
    const KAKAO_REST_API_KEY = 'b0abcbdd05b3cc529063683c1a4e5003';
    const KAKAO_REDIRECT_URI = `${process.env.REACT_APP_API_URL}/login/kakao/callback`;

    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // 에러 메시지 초기화

        try {
            // 서버로 로그인 요청 (포트 3001 가정)
            const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userId,
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 성공: 토큰을 로컬 스토리지에 저장
                localStorage.setItem('token', data.token);

                // [수정됨] 사용자 정보를 로컬 스토리지에 저장 (Header.js에서 사용)
                if (data.user) {
                    localStorage.setItem('userId', data.user.userId);
                    localStorage.setItem('userName', data.user.userName);
                    localStorage.setItem('profileImage', data.user.profileImage || '');
                }

                // [중요] 로그인 성공 시 Header 업데이트를 위한 이벤트 발생
                window.dispatchEvent(new Event('auth-change'));

                // 로그인 성공 시 홈페이지(/home)로 이동
                navigate('/home');
            } else {
                // 실패: 서버에서 보낸 에러 메시지 표시
                setErrorMessage(data.error || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage('서버와의 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="login-container">
            {/* 배경 애니메이션 */}
            <div className="background-shapes">
                <div className="shape"></div>
                <div className="shape"></div>
                <div className="shape"></div>
            </div>

            <div className="login-content">
                <h2 className="login-title">LOGIN</h2>

                <form className="login-form" onSubmit={handleLogin}>
                    <div className="input-group">
                        <label htmlFor="userId">ID</label>
                        {/* type="text"로 설정하여 이메일 형식이 아니어도 입력 가능 */}
                        <input
                            type="text"
                            id="userId"
                            placeholder="Enter your ID"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {/* 에러 메시지 표시 영역 */}
                    {errorMessage && <div className="error-message">{errorMessage}</div>}

                    <button type="submit" className="login-button">
                        로그인
                    </button>
                </form>

                {/* 구분선 */}
                <div className="divider">
                    <span>OR</span>
                </div>

                {/* 카카오 로그인 버튼 */}
                <a href={KAKAO_AUTH_URL} className="kakao-button">
                    <svg viewBox="0 0 32 32" width="20" height="20" fill="#3C1E1E">
                        <path d="M16 4C9.925 4 5 8.04 5 13.025c0 3.235 2.096 6.075 5.253 7.64-.176.626-1.141 4.145-1.176 4.296-.06.24.088.468.307.468.12 0 .227-.054.348-.135 3.77-2.586 5.432-3.805 5.56-3.886.67.098 1.344.15 2.016.15 6.075 0 11-4.04 11-9.025S22.075 4 16 4z"/>
                    </svg>
                    카카오로 로그인
                </a>

                <div className="login-footer">
                    <span>계정이 없으신가요?</span>
                    <a href="/signup" onClick={(e) => { e.preventDefault(); navigate('/signup'); }}>
                        회원가입 하러가기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;