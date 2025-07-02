import React, { useEffect, useState } from "react";
import "./BoardPreview.css";
import { useNavigate } from "react-router-dom";

export default function BoardPreview() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/posts")
      .then(res => res.json())
      .then(data => setPosts(data.data?.slice(0, 10) || []));
  }, []);

  const handleClick = (id) => {
    navigate(`/board/${id}`);
  };

  const handleMore = () => {
    navigate("/board");
  };

  return (
    <aside className="board-preview">
      <div className="board-header">
        <h3>게시판 미리보기</h3>
        <button className="more-btn" onClick={handleMore}>더보기</button>
      </div>
      <ul style={{padding:0, margin:0}}>
        {posts.length === 0 && <li style={{ color: '#888', padding: 12 }}>게시글이 없습니다.</li>}
        {posts.map((post, idx) => (
          <li key={post.id} onClick={() => handleClick(post.id)} className="preview-item" style={{borderBottom: idx !== posts.length-1 ? '1px solid #e0e0e0' : 'none', padding: '1rem 0', cursor: 'pointer'}}>
            <div style={{fontWeight:600, fontSize:'1.08rem', marginBottom:4, color:'#1E3A8A'}}>{post.title}</div>
            <div style={{fontSize:'0.98rem', color:'#444', marginBottom:4}}>
              {post.content?.length > 40 ? post.content.slice(0, 40) + '...' : post.content}
            </div>
            <div style={{fontSize:'0.93rem', color:'#888'}}>
              {post.authorNickname} | {post.createdAt?.slice(0, 16)}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
