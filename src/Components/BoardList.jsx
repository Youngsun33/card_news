import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardPreview.css";
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
    <main
      style={{
        maxWidth: 700,
        margin: "40px auto",
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        padding: "2rem 1.5rem",
      }}
    >
      <h2 style={{ color: "#1E3A8A", marginBottom: 24 }}>게시판</h2>
      {user && (
        <button
          style={{
            float: "right",
            marginBottom: 16,
            background: "#1E3A8A",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            padding: "0.5rem 1.2rem",
            cursor: "pointer",
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
                borderBottom: "1px solid #eee",
                padding: "1rem 0",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/board/${post.id}`)}
            >
              <div style={{ fontWeight: 600, fontSize: "1.1rem" }}>
                {post.title}
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "#666",
                  marginTop: 4,
                }}
              >
                작성자: {post.authorNickname} |{" "}
                {post.createdAt?.slice(0, 16)}
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
