import React from "react";

// 404 Not Found 페이지 컴포넌트
// 존재하지 않는 경로 접근 시 안내 화면을 보여줍니다.

function NotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>404 - 페이지를 찾을 수 없습니다.</h2>
    </div>
  );
}

export default NotFound;
