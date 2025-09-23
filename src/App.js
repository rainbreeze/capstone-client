import React, { useEffect } from 'react'; // ✅ useEffect를 import에 추가
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './components/homepage/HomePage';
import LoginPage from './components/loginpage/LoginPage';
import RegisterPage from './components/registerpage/RegisterPage';
import PlayListPage from './components/playlistpage/PlayListPage';
import ViewReviewPage from './components/reviewpage/ViewReviewPage';
import GameScene from './components/gamepage/GameScene';
import MyPage from './components/mypage/MyPage';
import axios from 'axios';

const App = () => {

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
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/playlist" element={<PlayListPage />} />
            <Route path="/viewreview" element={<ViewReviewPage />} />
            <Route path="/game" element={<GameScene />} />
            <Route path="/mypage" element={<MyPage />} />
          </Routes>
          <Footer />
        </div>
      </Router>
  );
};

export default App;