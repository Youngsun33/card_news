import { useState, useEffect } from "react";
import News from "./News";
import "./NewsList.css";
import { fetchWithAuth } from "../common/fetchWithAuth";

export default function NewsList({
  articles,
  onTranslateToggle,
  isLoading,
  translated,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likes, setLikes] = useState(Array(articles.length).fill(0));
  const [bookmarked, setBookmarked] = useState(
    Array(articles.length).fill(false)
  );

  // articles가 바뀔 때마다 bookmarked 배열 초기화
  useEffect(() => {
    setBookmarked(Array(articles.length).fill(false));
    setLikes(Array(articles.length).fill(0));
  }, [articles]);

  if (!articles || articles.length === 0) {
    return <div>뉴스가 없습니다.</div>;
  }

  const showLeft = currentIndex > 0;
  const showRight = currentIndex < articles.length - 1;
  const currentArticle = articles[currentIndex];
  const isTranslated = translated[currentIndex];

  // 버튼 텍스트
  let buttonText = "한글 번역";
  if (isLoading) buttonText = "번역중...";
  else if (isTranslated) buttonText = "원문 보기";

  // 버튼 비활성화 조건
  const isButtonDisabled = isLoading;

  // 표시할 기사 데이터
  const displayArticle = {
    ...currentArticle,
    title:
      isTranslated && currentArticle.title_ko
        ? currentArticle.title_ko
        : currentArticle.title,
    description:
      isTranslated && currentArticle.description_ko
        ? currentArticle.description_ko
        : currentArticle.description,
  };

  //좋아요 기능(프론트 상태만)
  const handleLike = (index) => {
    setLikes((prevLike) => {
      const newLike = [...prevLike];
      if (typeof index === "number" && index >= 0) {
        newLike[index] = (newLike[index] || 0) + 1;
      }
      return newLike;
    });
  };

  const handleBookmark = async (index) => {
    const newsId = articles[index]?.id;
    if (!newsId) return;
    try {
      const res = await fetchWithAuth(
        `http://localhost:5000/bookmark/${newsId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        setBookmarked((prev) => {
          const newBookmark = [...prev];
          if (typeof index === "number" && index >= 0) {
            newBookmark[index] = !prev[index];
          }
          return newBookmark;
        });
      } else {
        alert("북마크 실패: " + (data?.message || "서버 오류"));
      }
    } catch (err) {
      console.error("북마크 오류:", err);
      alert("서버 통신 실패");
    }
  };

  return (
    <div>
      <button
        className="translate-btn"
        onClick={() => onTranslateToggle(currentIndex)}
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>

      <div className="card-wrapper">
        <div className="card-left">
          {showRight && (
            <div onClick={() => setCurrentIndex(currentIndex + 1)}>
              <News
                article={articles[currentIndex + 1]}
                like={likes[currentIndex + 1]}
                onLike={() => handleLike(currentIndex + 1)}
                onBookmark={() => {
                  handleBookmark(currentIndex + 1);
                }}
                Bookmarked={bookmarked[currentIndex + 1]}
              />
            </div>
          )}
        </div>

        <div className="card-center">
          <News
            article={displayArticle}
            like={likes[currentIndex]}
            onLike={() => {
              handleLike(currentIndex);
            }}
            onBookmark={() => {
              handleBookmark(currentIndex);
            }}
            Bookmarked={bookmarked[currentIndex]}
          />
        </div>

        <div className="card-right">
          {showLeft && (
            <div onClick={() => setCurrentIndex(currentIndex - 1)}>
              <News
                article={articles[currentIndex - 1]}
                like={likes[currentIndex - 1]}
                onLike={() => {
                  handleLike(currentIndex - 1);
                }}
                onBookmark={() => {
                  handleBookmark(currentIndex - 1);
                }}
                Bookmarked={bookmarked[currentIndex - 1]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
