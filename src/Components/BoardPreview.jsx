import React from "react";
import "./BoardPreview.css";
import { useNavigate } from "react-router-dom";

// 임시 데이터 (실제 데이터는 props로 받아오거나 fetch로 대체)
const dummyPosts = [
  { id: 1, title: "첫 번째 게시글", preview: "이것은 첫 번째 게시글의 미리보기입니다." },
  { id: 2, title: "두 번째 게시글", preview: "두 번째 게시글 내용 일부가 여기에..." },
  { id: 3, title: "세 번째 게시글", preview: "세 번째 게시글 미리보기 텍스트입니다." },
];

export default function BoardPreview({ posts = dummyPosts }) {
  const navigate = useNavigate();

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
      <ul>
        {posts.map((post) => (
          <li key={post.id} onClick={() => handleClick(post.id)} className="preview-item">
            <strong>{post.title}</strong>
            <p>{post.preview}</p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
