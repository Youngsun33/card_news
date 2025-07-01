import { useState, useCallback, useEffect } from "react";
import NewsList from "./NewsCard/NewsList";
import SearchBar from "./common/SearchBar";
import TranslateText from "./Translate";
import Filter from "./Filter";

export default function UseFetchNews() {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [translated, setTranslated] = useState({}); //번역
    const [sortBy,setSortBy] = useState('popularity');//정렬방법
    const [country, setCountry] = useState('us'); //국가
    const [category, setCategory] = useState(''); // 카테고리/주제

    const [comment, setComment] = useState([]);
    const [commentInput, setCommentInput] = useState('');


    const key = '6701aa49b08249b4831737b6abdc6825';

    const findDocuments = useCallback(async () => {
        setArticles([]);
        setTranslated({});
        try {
            const encodedQuery = encodeURIComponent(query.trim());
            const endpoint = query.trim()
                ? `https://newsapi.org/v2/everything?q=${encodedQuery}&sortBy=${sortBy}&apiKey=${key}`
                : `https://newsapi.org/v2/top-headlines?country=${country}${category ? `&category=${category}` : ''}&apiKey=${key}`;

            const response = await fetch(endpoint, { method: 'GET' });
            if (!response.ok) throw new Error(`HTTP error! status : ${response.status}`);
            const data = await response.json();
            setArticles(data.articles);
        } catch (err) {
            console.log('뉴스 로딩 중 오류 발생:', err);
        }
    }, [query, sortBy, category, country]);

    useEffect(() => { findDocuments(); }, [findDocuments]);

    // 번역/원문 토글
    const handleTranslateToggle = async (index) => {
        if (!articles[index] || isLoading) return;

        // 이미 번역된 상태라면 -> 원문으로
        if (translated[index]) {
            setTranslated(prev => ({ ...prev, [index]: false }));
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
                    description_ko: translatedDesc
                };
                setArticles(newArticles);
            } catch (error) {
                console.error('번역 실패:', error);
            } finally {
                setIsLoading(false);
            }
        }
        // 번역 상태로 토글
        setTranslated(prev => ({ ...prev, [index]: true }));
    };

    useEffect(() => {
        if (articles.length > 0) {
            fetch('http://localhost:5000/api/news', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ articles }),
            })
            .then(res => res.json())
            .then(data => {
                console.log('뉴스 DB 저장 결과:', data);
            })
            .catch(err => {
                console.error('뉴스 DB 저장 실패:', err);
            });
        }
    }, [articles]);

  
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
            <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="publishedAt">최신순</option>
              <option value="popularity">인기순</option>
              <option value="relevancy">관련도순</option>
            </select>
          </div>
    
          <NewsList
            articles={articles}
            onTranslateToggle={handleTranslateToggle}
            isLoading={isLoading}
            translated={translated}
          />
        </section>
      </div>
    );
}