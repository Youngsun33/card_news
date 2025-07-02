import { ThemeProvider } from "./ThemeContext";
import ThemeButton from "./ThemeButton";
import UseFetchNews from "../UseFetchNews";
import "./MainPage.css";
import Header from "../Header";
import Footer from "../Footer";
import BoardPreview from "../BoardPreview";

export default function MainPage() {
  return (
    <ThemeProvider>
      <Header />
      <div className="main-layout">
        <div style={{ maxWidth: 900, margin: "0 auto", paddingRight: 0 }}>
          <ThemeButton />
          <UseFetchNews />
        </div>
        <div className="post">
          <BoardPreview />
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}
