// 뉴스/게시글 필터 및 댓글 입력 컴포넌트
// 국가, 카테고리 필터와 댓글 입력 기능을 제공합니다.

import React, { useState, useContext } from "react";
import "./Filter.css";
import { UserContext } from "./common/UserContext";
import { fetchWithAuth } from "./common/fetchWithAuth";

export default function Filter({
  country,
  setCountry,
  category,
  setCategory,
  disabled,
  comment,
  setComment,
  commentInput,
  setCommentInput,
}) {
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { user } = useContext(UserContext);

  // 댓글은 로그인 안 해도 볼 수 있게, 작성만 막음
  const comments = comment;

  // 엔터 입력 시 댓글 추가
  const handleCommentKeyDown = async (e) => {
    if (!user) {
      alert("로그인해야 글을 쓸 수 있습니다.");
      return;
    }
    if (e.key === "Enter" && commentInput.trim()) {
      setComment((prev) => [...prev, commentInput.trim()]);
      setCommentInput("");
      setLoading(true);
      try {
        const res = await fetchWithAuth("http://localhost:5000/chat", {
          method: "POST",
          body: JSON.stringify({ content: commentInput.trim() }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (!res.ok) {
          alert("실패: " + (data?.message || "알 수 없는 오류"));
        }
      } catch (err) {
        console.error("에러:", err);
        alert("서버 오류 발생");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="filter-container">
      <label>
        국가:
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          disabled={disabled}
        >
          <option value="us">미국</option>
          <option value="kr">한국</option>
          <option value="jp">일본</option>
          <option value="gb">영국</option>
          <option value="fr">프랑스</option>
        </select>
      </label>
      <label>
        카테고리:
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          disabled={disabled}
        >
          <option value="">전체</option>
          <option value="business">비즈니스</option>
          <option value="entertainment">엔터테인먼트</option>
          <option value="general">일반</option>
          <option value="health">건강</option>
          <option value="science">과학</option>
          <option value="sports">스포츠</option>
          <option value="technology">기술</option>
        </select>
      </label>
      <input
        className="comment-input"
        type="text"
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
        onKeyUp={handleCommentKeyDown}
        placeholder="댓글을 입력하세요"
      />

      {/* 댓글 목록 */}
      <div className="comment-list">
        {comments.map((c, i) => (
          <div className="comment" key={i}>
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}
