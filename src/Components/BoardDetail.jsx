import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardDetail.css";
import { UserContext } from "./common/UserContext";

// 게시글 상세 페이지 컴포넌트
// 게시글의 상세 내용과 댓글을 보여줍니다.

export default function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, accessToken } = useContext(UserContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data.data))
      .finally(() => setLoading(false));
    fetch(`http://localhost:5000/posts/${id}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data.data || []));
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setCommentLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;
      const res = await fetch(`http://localhost:5000/posts/${id}/comments`, {
        method: "POST",
        headers,
        body: JSON.stringify({ content: comment }),
      });
      const data = await res.json();
      if (res.ok) {
        setComments([data.data, ...comments]);
        setComment("");
      } else {
        alert(data.message || "댓글 등록 실패");
      }
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading)
    return <main style={{ padding: 40, textAlign: "center" }}>로딩중...</main>;
  if (!post)
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        게시글을 찾을 수 없습니다.
      </main>
    );

  return (
    <main className="board-detail-container">
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <button
          style={{
            color: "#1E3A8A",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => navigate("/board")}
        >
          &larr; 게시판 목록
        </button>
        <button
          style={{
            color: "#2563eb",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
          }}
          onClick={() => navigate("/")}
        >
          메인홈
        </button>
      </div>
      <div className="board-detail-title">{post.title}</div>
      <div className="board-detail-meta">
        작성자: {post.authorNickname} | {post.createdAt?.slice(0, 16)}
        <br />
        좋아요 {post.likesCount} · 댓글 {post.commentCount}
      </div>
      <div className="board-detail-content">{post.content}</div>
      <section style={{ marginTop: 40 }}>
        <div className="board-detail-comment-title">댓글</div>
        {user && (
          <form className="board-detail-comment-form" onSubmit={handleComment}>
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="댓글을 입력하세요"
              disabled={commentLoading}
            />
            <button type="submit" disabled={commentLoading}>
              등록
            </button>
          </form>
        )}
        <ul className="board-detail-comment-list">
          {comments.length === 0 && (
            <li style={{ color: "#888" }}>아직 댓글이 없습니다.</li>
          )}
          {comments.map((c) => (
            <li key={c.id} className="board-detail-comment-item">
              <div style={{ fontWeight: 500 }}>{c.nickname}</div>
              <div style={{ fontSize: "1.02rem", marginTop: 2 }}>
                {c.content}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
