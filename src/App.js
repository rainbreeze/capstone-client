import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import PlayListPage from './components/playlistpage/PlayListPage';
import LoginPage from './components/loginpage/LoginPage';
import TestPage from './components/testpage/TestPage';
import TestResultPage from './components/testpage/TestResultPage';
import RegisterPage from './components/registerpage/RegisterPage'
import GameContainer from './components/homepage/GameContainer';
import ViewReviewPage from './components/reviewpage/ViewReviewPage';
import MyPage from "./components/mypage/MyPage";
import TestPage2 from './components/testpage2/TestPage2';
import axios from 'axios';


function App() {
    // useEffect 훅을 사용하여 페이지 로드 시 로그인 상태를 확인합니다.
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/me`);
                const userData = response.data;

                if (userData) {
                    // 사용자 정보가 있다면 localStorage에 저장
                    localStorage.setItem('userId', userData.userId);
                    localStorage.setItem('userName', userData.userName);
                    localStorage.setItem('profileImage', userData.profileImage);
                } else {
                    // 사용자 정보가 없다면 localStorage를 초기화
                    localStorage.removeItem('userId');
                    localStorage.removeItem('userName');
                    localStorage.removeItem('profileImage');
                }
            } catch (error) {
                console.error("로그인 상태 확인 실패:", error);
                // 오류 발생 시 localStorage 초기화
                localStorage.clear();
            }
        };

        checkLoginStatus();
    }, []);

  return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />  {/* 홈 페이지 */}
          <Route path="/playlist" element={<PlayListPage />} />  {/* 플레이리스트 페이지 */}
          <Route path="/login" element={<LoginPage />} />  {/* 로그인/회원가입 페이지 */}
          <Route path="/mypage" element={<MyPage />} />  {/* 내 정보 페이지 */}
          <Route path="/test" element={<TestPage />} />  {/* 테스트 페이지 */}
          <Route path="/testresult" element={<TestResultPage />} />  {/* 테스트 결과 페이지 추가 */}
          <Route path="/signup" element={<RegisterPage />} />  {/* 회원가입입 페이지 */}
          <Route path="/game" element={<GameContainer />} /> { /*게임 페이지 */}
          <Route path="/viewreview" element={<ViewReviewPage />} /> { /*감상평 보기 페이지 */}
          <Route path="/test2" element={<TestPage2 />} />  {/* 테스트 페이지 2*/}
        </Routes>
      </Router>
  );
}


export default App;