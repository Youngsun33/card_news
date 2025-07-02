import React, { useEffect, useState } from "react";

export default function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleLike = async () => {
    const res = await fetch(`/api/likes/posts/${postId}/like`, { method: "POST", credentials: "include" });
    const data = await res.json();
    if (res.ok) {
      setLiked(data.liked);
      setCount(c => data.liked ? c + 1 : c - 1);
    }
  };

  useEffect(() => {
    setLiked(initialLiked);
    setCount(initialCount);
  }, [initialLiked, initialCount]);

  return (
    <button onClick={handleLike} style={{ background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
      <img src={liked ? "/Bookmarked.png" : "/Bookmark.png"} alt={liked ? "좋아요됨" : "좋아요"} style={{ width: 22, marginRight: 4 }} />
      <span style={{ color: liked ? "#e11d48" : "#888", fontWeight: 500 }}>{count}</span>
    </button>
  );
}
