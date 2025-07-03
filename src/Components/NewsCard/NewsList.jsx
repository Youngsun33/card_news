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

  // 북마크 상태 서버에서 받아오기 (404 예외처리 및 없는 뉴스id 자동 필터)
  useEffect(() => {
    async function fetchBookmarks() {
      const arr = await Promise.all(
        articles.map(async (a) => {
          if (!a?.id) return false;
          try {
            const res = await fetchWithAuth(`http://localhost:5000/news/${a.id}`);
            if (res.status === 404) return false; // 없는 뉴스는 북마크 false
            const data = await res.json();
            return !!data.data?.bookmarked;
          } catch {
            return false;
          }
        })
      );
      setBookmarked(arr);
    }
    if (articles.length > 0) fetchBookmarks();
  }, [articles, currentIndex]);

  // articles에서 id가 없는 뉴스 자동 필터링
  const filteredArticles = articles.filter((a) => !!a?.id);
  if (!filteredArticles || filteredArticles.length === 0) {
    return <div>뉴스가 없습니다.</div>;
  }

  // currentIndex가 filteredArticles 범위 내에 있도록 보정
  const safeIndex = Math.max(0, Math.min(currentIndex, filteredArticles.length - 1));
  const showLeft = safeIndex > 0;
  const showRight = safeIndex < filteredArticles.length - 1;
  const currentArticle = filteredArticles[safeIndex];
  const isTranslated = translated[safeIndex];

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
      if (typeof index === "number" && index >= 0 && index < filteredArticles.length) {
        newLike[index] = (newLike[index] || 0) + 1;
      }
      return newLike;
    });
  };

  const handleBookmark = async (index) => {
    const newsId = filteredArticles[index]?.id;
    if (!newsId) return;
    try {
      const res = await fetchWithAuth(
        `http://localhost:5000/bookmark/toggle/${newsId}`,
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
          if (typeof index === "number" && index >= 0 && index < filteredArticles.length) {
            newBookmark[index] = !!data.bookmarked;
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

  // News 컴포넌트에 filteredArticles, safeIndex 적용
  return (
    <div>
      <button
        className="translate-btn"
        onClick={() => onTranslateToggle(safeIndex)}
        disabled={isButtonDisabled}
      >
        {buttonText}
      </button>

      <div className="card-wrapper">
        <div className="card-left">
          {showRight && (
            <div onClick={() => setCurrentIndex(safeIndex + 1)}>
              <News
                article={filteredArticles[safeIndex + 1]}
                like={likes[safeIndex + 1]}
                onLike={() => handleLike(safeIndex + 1)}
                onBookmark={() => {
                  handleBookmark(safeIndex + 1);
                }}
                Bookmarked={bookmarked[safeIndex + 1]}
              />
            </div>
          )}
        </div>

        <div className="card-center">
          <News
            article={displayArticle}
            like={likes[safeIndex]}
            onLike={() => {
              handleLike(safeIndex);
            }}
            onBookmark={() => {
              handleBookmark(safeIndex);
            }}
            Bookmarked={bookmarked[safeIndex]}
          />
        </div>

        <div className="card-right">
          {showLeft && (
            <div onClick={() => setCurrentIndex(safeIndex - 1)}>
              <News
                article={filteredArticles[safeIndex - 1]}
                like={likes[safeIndex - 1]}
                onLike={() => {
                  handleLike(safeIndex - 1);
                }}
                onBookmark={() => {
                  handleBookmark(safeIndex - 1);
                }}
                Bookmarked={bookmarked[safeIndex - 1]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
