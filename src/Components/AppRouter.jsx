import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./common/MainPage";
import Bookmark from "./Bookmark.jsx";
import NotFound from "./common/NotFound";
import AuthPage from "./AuthPage";
import BoardList from "./BoardList";
import BoardDetail from "./BoardDetail";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:id" element={<BoardDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
