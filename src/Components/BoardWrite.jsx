import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./common/fetchWithAuth";
import { UserContext } from "./common/UserContext";
import "./BoardWrite.css";

// 게시글 작성 페이지 컴포넌트
// 사용자가 게시글을 작성할 수 있는 폼을 제공합니다.

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user)
    return (
      <main style={{ padding: 40, textAlign: "center" }}>
        로그인 후 글쓰기가 가능합니다.
      </main>
    );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim())
      return alert("제목과 내용을 입력하세요");
    setLoading(true);
    try {
      const res = await fetchWithAuth("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("글이 등록되었습니다!");
        navigate(`/board/${data.data.id}`);
      } else {
        alert(data.message || "글 등록 실패");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="postWrite">
      <h2 className="header">글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용"
          rows={8}
          className="content"
        />
        <button type="submit" disabled={loading}>
          등록
        </button>
      </form>
    </main>
  );
}
