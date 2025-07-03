import { useState } from "react";
import "./News.css";

export default function News({
  article,
  like = 0,
  onLike,
  onBookmark,
  Bookmarked,
}) {
  const { author, title, description, url, image, publishedAt } = article;
  const [expanded, setExpanded] = useState(false);

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const publishedDate = publishedAt?.split("T")[0];
  const formatDate = (date) => date.toISOString().split("T")[0];
  const isNew =
    publishedDate === formatDate(today) ||
    publishedDate === formatDate(yesterday);

  const isLong = description && description.length > 250;
  const shortDesc = isLong ? description.slice(0, 100) + "..." : description;

  return (
    <div className="news-item">
      <div className="headliner">
        <h2>
          {title}
          {isNew && <span className="new-badge">NEW!</span>}
        </h2>
        <p className="author">{author ? author : "작성자 미상"}</p>
        <p className="publishedAt">{publishedAt?.split("T")[0]}</p>
      </div>
      <img
        src={image ? image : process.env.PUBLIC_URL + "/no-photo.png"}
        alt="기사 사진을 제공하지 않습니다"
      />
      <p>
        {expanded || !isLong ? description : shortDesc}
        {isLong && (
          <button className="more-btn" onClick={() => setExpanded(!expanded)}>
            {expanded ? "접기" : "더보기"}
          </button>
        )}
      </p>
      <a href={url} target="_blank" className="link" rel="noopener noreferrer">
        상세보기
      </a>
      <section className="button">
        <button className="bookmark-btn" onClick={onBookmark}>
          <img
            src={Bookmarked ? "/Bookmarked.png" : "/Bookmark.png"}
            alt={Bookmarked ? "북마크됨" : "북마크 추가"}
          />
        </button>
        <button className="like-btn" onClick={onLike}>
          <img src="/heart.svg" alt="좋아요" className="like-img" />
          {like}
        </button>
      </section>
    </div>
  );
}
