import { ThemeProvider } from "./ThemeContext";
import ThemeButton from "./ThemeButton";
import UseFetchNews from "../UseFetchNews";
import './MainPage.css'
import Header from "../Header";
import Footer from "../Footer";
import BoardPreview from "../BoardPreview";



export default function MainPage() {



  return (
    <ThemeProvider>
      <Header />
      <div style={{ position: "relative", minHeight: "70vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", paddingRight: 0 }}>
          <ThemeButton />
          <UseFetchNews />
        </div>
        <div style={{ position: "fixed", right: 40, bottom: 40, zIndex: 1000 }}>
          <BoardPreview />
        </div>
      </div>
      <Footer />
    </ThemeProvider>
  );
}