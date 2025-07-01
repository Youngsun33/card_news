import React from "react";
import { useNavigate } from "react-router-dom";
import "./BoardPreview.css";

// 임시 데이터
const dummyPosts = [
  { id: 1, title: "첫 번째 게시글", userId: 1, createdAt: "2025-07-01 10:00", likesCount: 2, commentCount: 1 },
  { id: 2, title: "두 번째 게시글", userId: 2, createdAt: "2025-07-01 11:00", likesCount: 0, commentCount: 0 },
  { id: 3, title: "세 번째 게시글", userId: 1, createdAt: "2025-07-01 12:00", likesCount: 5, commentCount: 3 },
];

export default function BoardList({ posts = dummyPosts }) {
  const navigate = useNavigate();

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "2rem 1.5rem" }}>
      <h2 style={{ color: "#1E3A8A", marginBottom: 24 }}>게시판</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {posts.map((post) => (
          <li key={post.id} style={{ borderBottom: "1px solid #eee", padding: "1rem 0", cursor: "pointer" }} onClick={() => navigate(`/board/${post.id}`)}>
            <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>{post.title}</div>
            <div style={{ fontSize: "0.95rem", color: "#666", marginTop: 4 }}>
              작성자: {post.userId} | {post.createdAt}
            </div>
            <div style={{ fontSize: "0.9rem", color: "#888", marginTop: 2 }}>
              좋아요 {post.likesCount} · 댓글 {post.commentCount}
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
