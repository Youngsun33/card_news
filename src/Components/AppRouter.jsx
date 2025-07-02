import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./common/MainPage";
import Bookmark from "./Bookmark.jsx";
import NotFound from "./common/NotFound";
import AuthPage from "./AuthPage";
import BoardList from "./BoardList";
import BoardDetail from "./BoardDetail";
import BoardWrite from "./BoardWrite";
import { UserContext } from "./common/UserContext";

export default function AppRouter() {
  // 로그인 상태에 따라 라우팅 제어 가능 (예시)
  // const { user } = useContext(UserContext);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/new" element={<BoardWrite />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
