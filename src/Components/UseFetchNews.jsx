import { useState, useCallback, useEffect } from "react";
import NewsList from "./NewsCard/NewsList";
import SearchBar from "./common/SearchBar";
import TranslateText from "./Translate";
import Filter from "./Filter";

export default function UseFetchNews() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [translated, setTranslated] = useState({}); //번역
  const [sortBy, setSortBy] = useState("popularity"); //정렬방법
  const [country, setCountry] = useState("us"); //국가
  const [category, setCategory] = useState(""); // 카테고리/주제

  const [comment, setComment] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const [error, setError] = useState("");

  const findDocuments = useCallback(async () => {
    setArticles([]);
    setTranslated({});
    setError("");
    setIsLoading(true);
    try {
      const encodedQuery = encodeURIComponent(query.trim());
      // 1. DB에서 먼저 검색
      let dbUrl = query.trim()
        ? `http://localhost:5000/api/news/search?query=${encodedQuery}`
        : `http://localhost:5000/api/news/headlines?country=${country}${category ? `&category=${category}` : ""}`;
      const dbRes = await fetch(dbUrl);
      const dbData = await dbRes.json();
      if (dbData.data && dbData.data.length > 0) {
        setArticles(dbData.data);
      } else {
        // 2. DB에 없으면 외부 API에서 받아와서 저장
        const key = "6701aa49b08249b4831737b6abdc6825";
        const endpoint = query.trim()
          ? `https://newsapi.org/v2/everything?q=${encodedQuery}&sortBy=${sortBy}&apiKey=${key}`
          : `https://newsapi.org/v2/top-headlines?country=${country}${category ? `&category=${category}` : ""}&apiKey=${key}`;
        const response = await fetch(endpoint, { method: "GET" });
        if (!response.ok) throw new Error(`뉴스 API 오류: ${response.status}`);
        const data = await response.json();
        // 외부 API에서 받아온 뉴스 DB에 저장
        const saveRes = await fetch("http://localhost:5000/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ articles: data.articles }),
        });
        const saveData = await saveRes.json();
        // 저장 후 다시 DB에서 검색
        const reDbRes = await fetch(dbUrl);
        const reDbData = await reDbRes.json();
        setArticles(reDbData.data || []);
      }
    } catch (err) {
      setError(err.message || "뉴스 로딩 중 오류 발생");
      console.log("뉴스 로딩 중 오류 발생:", err, err?.response, err?.stack);
    } finally {
      setIsLoading(false);
    }
  }, [query, sortBy, category, country]);

  useEffect(() => {
    findDocuments();
  }, [findDocuments]);

  // 번역/원문 토글
  const handleTranslateToggle = async (index) => {
    if (!articles[index] || isLoading) return;

    // 이미 번역된 상태라면 -> 원문으로
    if (translated[index]) {
      setTranslated((prev) => ({ ...prev, [index]: false }));
      return;
    }

    // 번역된 데이터가 없으면 번역 요청
    const article = articles[index];
    if (!article.title_ko || (!article.description_ko && article.description)) {
      setIsLoading(true);
      try {
        let translatedTitle = article.title_ko || null;
        let translatedDesc = article.description_ko || null;

        if (!translatedTitle) {
          translatedTitle = await TranslateText(article.title);
        }
        if (article.description && !translatedDesc) {
          translatedDesc = await TranslateText(article.description);
        }

        const newArticles = [...articles];
        newArticles[index] = {
          ...article,
          title_ko: translatedTitle,
          description_ko: translatedDesc,
        };
        setArticles(newArticles);
      } catch (error) {
        console.error("번역 실패:", error);
      } finally {
        setIsLoading(false);
      }
    }
    // 번역 상태로 토글
    setTranslated((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="main-layout">
      <aside className="sidebar">
        <Filter
          country={country}
          setCountry={setCountry}
          category={category}
          setCategory={setCategory}
          disabled={!!query.trim()}
          comment={comment}
          setComment={setComment}
          commentInput={commentInput}
          setCommentInput={setCommentInput}
        />
      </aside>

      <section className="main-right">
        <SearchBar setQuery={setQuery} />

        <div className="sort-by">
          <label htmlFor="sortBy">검색 정렬 기준:</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="publishedAt">최신순</option>
            <option value="popularity">인기순</option>
            <option value="relevancy">관련도순</option>
          </select>
        </div>

        {isLoading ? (
          <div>뉴스 로딩 중...</div>
        ) : error ? (
          <div style={{ color: "red" }}>뉴스 로딩 오류: {error}</div>
        ) : (
          <NewsList
            articles={articles}
            onTranslateToggle={handleTranslateToggle}
            isLoading={isLoading}
            translated={translated}
          />
        )}
      </section>
    </div>
  );
}
