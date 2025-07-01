import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardPreview.css";

// 임시 데이터
const dummyPosts = [
  { id: 1, title: "첫 번째 게시글", content: "첫 번째 게시글의 본문입니다.", userId: 1, createdAt: "2025-07-01 10:00", likesCount: 2, commentCount: 1 },
  { id: 2, title: "두 번째 게시글", content: "두 번째 게시글의 본문입니다.", userId: 2, createdAt: "2025-07-01 11:00", likesCount: 0, commentCount: 0 },
  { id: 3, title: "세 번째 게시글", content: "세 번째 게시글의 본문입니다.", userId: 1, createdAt: "2025-07-01 12:00", likesCount: 5, commentCount: 3 },
];

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = dummyPosts.find((p) => p.id === Number(id));

  if (!post) return <main style={{ padding: 40, textAlign: "center" }}>게시글을 찾을 수 없습니다.</main>;

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "2rem 1.5rem" }}>
      <button style={{ marginBottom: 20, color: "#1E3A8A", background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate(-1)}>&larr; 목록으로</button>
      <h2 style={{ color: "#1E3A8A" }}>{post.title}</h2>
      <div style={{ color: "#666", fontSize: "0.98rem", marginBottom: 8 }}>
        작성자: {post.userId} | {post.createdAt}
      </div>
      <div style={{ color: "#888", fontSize: "0.95rem", marginBottom: 16 }}>
        좋아요 {post.likesCount} · 댓글 {post.commentCount}
      </div>
      <div style={{ fontSize: "1.05rem", marginBottom: 32 }}>{post.content}</div>
      {/* 댓글, 좋아요 등 추가 UI 가능 */}
    </main>
  );
}
