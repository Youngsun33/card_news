// 게시글 목록 페이지 컴포넌트
// 게시판의 모든 게시글을 리스트로 보여줍니다.

import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardList.css";
import { fetchWithAuth } from "./common/fetchWithAuth";
import { UserContext } from "./common/UserContext";

export default function BoardList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="board-list-container">
      <div
        className="board-list-title"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span>게시판</span>
        <div>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              marginRight: 8,
              cursor: "pointer",
            }}
            onClick={() => navigate(-1)}
          >
            &larr; 뒤로가기
          </button>
          <button
            style={{
              background: "#1e3a8a",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              padding: "0.5rem 1.2rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            메인홈
          </button>
        </div>
      </div>
      {user && (
        <button
          style={{
            float: "right",
            marginBottom: 16,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => navigate("/board/new")}
        >
          글쓰기
        </button>
      )}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {loading ? (
          <li>로딩중...</li>
        ) : (
          posts.map((post) => (
            <li
              key={post.id}
              style={{
                borderBottom: "1px solid #e0e7ef",
                padding: "1rem 0",
                cursor: "pointer",
                color: "#1e3a8a",
              }}
              onClick={() => navigate(`/board/${post.id}`)}
            >
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {post.title}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#2563eb",
                  marginTop: 4,
                }}
              >
                작성자: {post.authorNickname} | {post.createdAt?.slice(0, 16)}
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  color: "#888",
                  marginTop: 2,
                }}
              >
                좋아요 {post.likesCount} · 댓글 {post.commentCount}
              </div>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
