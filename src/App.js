import React from 'react';
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
import TempPage from "./components/temppage/TempPage";

function App() {
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
        <Route path="/temp" element={<TempPage />} /> { /*임시 페이지 */}
      </Routes>
    </Router>
  );
}


export default App;
