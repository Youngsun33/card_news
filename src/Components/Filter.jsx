import { useState } from 'react';
import './Filter.css'

export default function Filter({ country, setCountry, category, setCategory, disabled, comment, setComment, commentInput, setCommentInput  }) {


    const comments = comment;

      // 엔터 입력 시 댓글 추가
    const handleCommentKeyDown = (e) => {
        if (e.key === 'Enter' && commentInput.trim()) {
        setComment(prev => [...prev, commentInput.trim()]);
        setCommentInput('');
        }
    };


    return (
        <div className="filter-container">
            <label>
                국가:
                <select value={country} onChange={e => setCountry(e.target.value)} disabled={disabled}>
                    <option value="us">미국</option>
                    <option value="kr">한국</option>
                    <option value="jp">일본</option>
                    <option value="gb">영국</option>
                    <option value="fr">프랑스</option>
                </select>
            </label>
            <label>
                카테고리:
                <select value={category} onChange={e => setCategory(e.target.value)} disabled={disabled}>
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
                onChange={e => setCommentInput(e.target.value)}
                onKeyUp={handleCommentKeyDown}
                placeholder="댓글을 입력하세요"
            />

            {/* 댓글 목록 */}
            <div className="comment-list">
                {comments.map((c, i) => (
                <div className="comment" key={i}>{c}</div>
                ))}
            </div>
        </div>
    );
}