import { useRef } from "react";
import "./SearchBar.css";

// 뉴스/게시글 검색바 컴포넌트
// 검색어 입력 및 검색 기능을 제공합니다.
export default function SearchBar({ setQuery }) {
  const inputElement = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(inputElement.current.value);
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input type="text" ref={inputElement} />
      <button type="submit">검색 🔍</button>
    </form>
  );
}
