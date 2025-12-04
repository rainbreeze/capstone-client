import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import PlayListPage from './components/playlistpage/PlayListPage';
import LoginPage from './components/loginpage/LoginPage';
import TestPage from './components/testpage/TestPage';
import TestResultPage from './components/testpage/TestResultPage';
import RegisterPage from './components/registerpage/RegisterPage';
import GameContainer from './components/homepage/GameContainer';
import ViewReviewPage from './components/reviewpage/ViewReviewPage';
import MyPage from "./components/mypage/MyPage";
import TestPage2 from './components/testpage2/TestPage2';
import LandingPage from './components/landingpage/LandingPage';
import KakaoCallbackHandler from './components/loginpage/KakaoCallbackHandler';

function App() {
    // 앱 실행 시 로그인 상태 관리 및 카카오 로그인 후처리
    useEffect(() => {


        // 1. 쿠키 값을 읽어오는 함수
        // const getCookie = (name) => {
        //     const value = `; ${document.cookie}`;
        //     const parts = value.split(`; ${name}=`);
        //     if (parts.length === 2) return parts.pop().split(';').shift();
        // };

        // // 2. 서버에서 설정한 쿠키 확인 (카카오 로그인 직후)
        // const tokenFromCookie = getCookie('token');
        // const userIdFromCookie = getCookie('userId');

        // if (tokenFromCookie && userIdFromCookie) {
        //     // 쿠키에 정보가 있다면 로컬 스토리지로 옮김
        //     localStorage.setItem('token', tokenFromCookie);
        //     localStorage.setItem('userId', userIdFromCookie);

        //     const userName = getCookie('userName');
        //     if (userName) {
        //         // 서버에서 인코딩해서 보냈으므로 디코딩
        //         localStorage.setItem('userName', decodeURIComponent(userName));
        //     }

        //     const profileImage = getCookie('profileImage');
        //     if (profileImage) {
        //         localStorage.setItem('profileImage', profileImage);
        //     }

        //     // 3. 처리가 끝난 쿠키는 삭제 (충돌 방지 및 보안)
        //     document.cookie = "token=; path=/; max-age=0";
        //     document.cookie = "userId=; path=/; max-age=0";
        //     document.cookie = "userName=; path=/; max-age=0";
        //     document.cookie = "profileImage=; path=/; max-age=0";

        //     // [중요] Header 등 다른 컴포넌트에게 로그인 상태가 변경되었음을 알림
        //     window.dispatchEvent(new Event('auth-change'));
        // }

        // // 4. 기존 토큰 유효성 체크 로직 (토큰 없으면 정보 삭제)
        // const token = localStorage.getItem('token');
        // if (!token) {
        //     localStorage.removeItem('userId');
        //     localStorage.removeItem('userName');
        //     localStorage.removeItem('profileImage');
        //     // 로그아웃 상태 알림 (혹시 모를 동기화)
        //     window.dispatchEvent(new Event('auth-change'));
        // }
    }, []);

    return (
        <Router>
            <Routes>
                {/* 1. 사이트 접속 시 가장 먼저 보이는 랜딩(시작) 페이지 */}
                <Route path="/" element={<LandingPage />} />

                {/* 2. 로그인 후 이동할 메인 홈페이지 */}
                <Route path="/home" element={<HomePage />} />

                <Route path="/playlist" element={<PlayListPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/mypage" element={<MyPage />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/testresult" element={<TestResultPage />} />
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/game" element={<GameContainer />} />
                <Route path="/viewreview" element={<ViewReviewPage />} />
                <Route path="/test2" element={<TestPage2 />} />
                <Route path="/login/kakao/callback" element={<KakaoCallbackHandler />} />
            </Routes>
        </Router>
    );
}

export default App;