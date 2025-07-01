import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./common/MainPage";
import Bookmark from "../Components/Bookmark";
import NotFound from "./common/NotFound";
import AuthPage from "./AuthPage";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
