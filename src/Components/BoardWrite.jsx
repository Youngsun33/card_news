import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from "./common/fetchWithAuth";
import { UserContext } from "./common/UserContext";

export default function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  if (!user) return <main style={{ padding: 40, textAlign: "center" }}>로그인 후 글쓰기가 가능합니다.</main>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return alert("제목과 내용을 입력하세요");
    setLoading(true);
    try {
      const res = await fetchWithAuth("http://localhost:5000/posts", {
        method: "POST",
        body: JSON.stringify({ title, content })
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
    <main style={{ maxWidth: 700, margin: "40px auto", background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", padding: "2rem 1.5rem" }}>
      <h2 style={{ color: "#1E3A8A", marginBottom: 24 }}>글쓰기</h2>
      <form onSubmit={handleSubmit}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="제목" style={{ width: '100%', marginBottom: 16, padding: 10, fontSize: '1.1rem', borderRadius: 6, border: '1px solid #ccc' }} />
        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="내용" rows={8} style={{ width: '100%', marginBottom: 16, padding: 10, fontSize: '1.05rem', borderRadius: 6, border: '1px solid #ccc' }} />
        <button type="submit" disabled={loading} style={{ background: '#1E3A8A', color: '#fff', border: 'none', borderRadius: 6, padding: '0.7rem 1.5rem', fontSize: '1.1rem', cursor: 'pointer' }}>등록</button>
      </form>
    </main>
  );
}
