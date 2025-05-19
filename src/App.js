import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/homepage/HomePage';
import PlayListPage from './components/playlistpage/PlayListPage';
import RankingPage from './components/RankingPage';
import LoginPage from './components/loginpage/LoginPage';
import TestPage from './components/testpage/TestPage';
import TestResultPage from './components/testpage/TestResultPage';
import RegisterPage from './components/registerpage/RegisterPage'
import GameContainer from './components/homepage/GameContainer';
import WriteReviewsPage from './components/reviewpage/WriteReviewPage';
import ViewReviewPage from './components/reviewpage/ViewReviewPage';
import WriteReviewCommentPage from './components/reviewpage/WriteReviewCommentPage';
import ViewReviewCommentPage from './components/reviewpage/ViewReviewCommentPage';
import MyPage from "./components/mypage/MyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />  {/* 홈 페이지 */}
        <Route path="/playlist" element={<PlayListPage />} />  {/* 플레이리스트 페이지 */}
        <Route path="/ranking" element={<RankingPage />} />  {/* 랭킹 페이지 */}
        <Route path="/login" element={<LoginPage />} />  {/* 로그인/회원가입 페이지 */}
        <Route path="/mypage" element={<MyPage />} />  {/* 내 정보 페이지 */}
        <Route path="/test" element={<TestPage />} />  {/* 테스트 페이지 */}
        <Route path="/testresult" element={<TestResultPage />} />  {/* 테스트 결과 페이지 추가 */}
        <Route path="/signup" element={<RegisterPage />} />  {/* ??? 페이지 */}
        <Route path="/game" element={<GameContainer />} /> { /*게임 페이지 */}
        <Route path="/write" element={<WriteReviewsPage />} /> { /*감상평 쓰기 페이지 */}
        <Route path="/viewreview" element={<ViewReviewPage />} /> { /*감상평 보기 페이지 */}
        <Route path="/viewreviewcomment" element={<ViewReviewCommentPage />} /> { /*감상평 댓글 보기 페이지 */}
        <Route path="/writereviewcomment" element={<WriteReviewCommentPage />} /> { /*감상평 댓글 쓰기 페이지 */}

      </Routes>
    </Router>
  );
}


export default App;
