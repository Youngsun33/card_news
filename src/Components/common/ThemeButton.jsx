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