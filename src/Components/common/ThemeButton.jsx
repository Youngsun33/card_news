// 다크/라이트 테마 전환 버튼 컴포넌트
// 테마 상태에 따라 버튼 UI와 동작을 제공합니다.

import { useContext } from "react";
import { ThemeContext } from "./ThemeContext"; // ✅ {} 반드시!

export default function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="theme-button">
      {theme === "light" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
    </button>
  );
}
