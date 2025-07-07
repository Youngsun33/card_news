import { createContext, useState, useEffect } from "react";

// 다크/라이트 테마 전역 관리 Context
// 테마 상태와 토글 함수를 제공합니다.
// 전역에서 Context 객체 생성
export const ThemeContext = createContext();

// Provider 컴포넌트
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
