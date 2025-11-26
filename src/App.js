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
import LandingPage from './components/landingpage/LandingPage'; // 랜딩 페이지 컴포넌트

function App() {
    // 앱 실행 시 로그인 상태 관리
    useEffect(() => {
        // 현재 백엔드에 토큰 검증 전용 API(/api/user/me)가 없으므로,
        // 로컬 스토리지에 토큰이 존재하는지로만 로그인 유지 여부를 판단합니다.
        const token = localStorage.getItem('token');

        if (!token) {
            // 토큰이 없으면 로그인 관련 정보 깨끗이 삭제
            localStorage.removeItem('userId');
            localStorage.removeItem('userName');
            localStorage.removeItem('profileImage');
        }
        // 추후 백엔드에 토큰 검증 API가 개발되면 여기서 axios 호출을 추가하세요.
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
            </Routes>
        </Router>
    );
}

export default App;