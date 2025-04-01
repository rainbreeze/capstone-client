import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  // Switch 대신 Routes 사용
import HomePage from './components/homepage/HomePage';
import PlayListPage from './components/PlayListPage';
import RankingPage from './components/RankingPage';
import LoginPage from './components/LoginPage';
import MyInfoPage from './components/MyInfoPage';
import GamePage from './components/GamePage/GamePage';
import ReviewsPage from './components/ReviewsPage';
import GameContainer from './components/homepage/GameContainer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* 홈 페이지 */}
        <Route path="/playlist" element={<PlayListPage />} />  {/* 플레이리스트 페이지 */}
        <Route path="/ranking" element={<RankingPage />} />  {/* 랭킹 페이지 */}
        <Route path="/login" element={<LoginPage />} />  {/* 로그인/회원가입 페이지 */}
        <Route path="/myinfo" element={<MyInfoPage />} />  {/* 내 정보 페이지 */}
        <Route path="/game" element={<GamePage />} />  {/* 게임 페이지 */}
        <Route path="/reviews" element={<ReviewsPage />} />  {/* 감상평 페이지 */}
        <Route path="/testGame" element={<GameContainer />} /> { /*게임 컨ㅔㅣ너 */}
      </Routes>
    </Router>
  );
}


export default App;
