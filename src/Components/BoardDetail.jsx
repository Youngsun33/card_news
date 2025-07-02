import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./BoardPreview.css";
import { UserContext } from "./common/UserContext";

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
      .then(res => res.json())
      .then(data => setPost(data.data))
      .finally(() => setLoading(false));
    fetch(`http://localhost:5000/posts/${id}/comments`)
      .then(res => res.json())
      .then(data => setComments(data.data || []));
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
        body: JSON.stringify({ content: comment })
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

  if (loading) return <main style={{ padding: 40, textAlign: "center" }}>로딩중...</main>;
  if (!post) return <main style={{ padding: 40, textAlign: "center" }}>게시글을 찾을 수 없습니다.</main>;

  return (
    <main style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "2rem 1.5rem" }}>
      <button style={{ marginBottom: 20, color: "#1E3A8A", background: "none", border: "none", cursor: "pointer" }} onClick={() => navigate(-1)}>&larr; 목록으로</button>
      <h2 style={{ color: "#1E3A8A" }}>{post.title}</h2>
      <div style={{ color: "#666", fontSize: "0.98rem", marginBottom: 8 }}>
        작성자: {post.authorNickname} | {post.createdAt?.slice(0, 16)}
      </div>
      <div style={{ color: "#888", fontSize: "0.95rem", marginBottom: 16 }}>
        좋아요 {post.likesCount} · 댓글 {post.commentCount}
      </div>
      <div style={{ fontSize: "1.05rem", marginBottom: 32 }}>{post.content}</div>
      <section style={{ marginTop: 40 }}>
        <h3 style={{ fontSize: "1.1rem", marginBottom: 12 }}>댓글</h3>
        {user && (
          <form onSubmit={handleComment} style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            <input value={comment} onChange={e => setComment(e.target.value)} placeholder="댓글을 입력하세요" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <button type="submit" disabled={commentLoading} style={{ background: '#1E3A8A', color: '#fff', border: 'none', borderRadius: 6, padding: '0.5rem 1.2rem', cursor: 'pointer' }}>등록</button>
          </form>
        )}
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {comments.length === 0 && <li style={{ color: '#888' }}>아직 댓글이 없습니다.</li>}
          {comments.map(c => (
            <li key={c.id} style={{ borderBottom: '1px solid #eee', padding: '0.7rem 0' }}>
              <div style={{ fontWeight: 500 }}>{c.nickname}</div>
              <div style={{ fontSize: '1.02rem', marginTop: 2 }}>{c.content}</div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
