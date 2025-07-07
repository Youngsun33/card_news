// 북마크 페이지 컴포넌트
// 사용자가 북마크한 뉴스 목록을 보여줍니다.

import React from "react";
import "./Bookmark.css";

function Bookmark() {
  // 북마크된 뉴스 목록을 불러오는 로직은 추후 추가
  return (
    <div className="bookmark-container">
      <h2>내 북마크</h2>
      <p>북마크한 뉴스가 여기에 표시됩니다.</p>
    </div>
  );
}

export default Bookmark;
