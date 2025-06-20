import { ThemeProvider } from "./ThemeContext";
import ThemeButton from "./ThemeButton";
import UseFetchNews from "../UseFetchNews";
import './MainPage.css'
import Header from "../Header";
import Footer from "../Footer";



export default function MainPage() {



  return (
    <ThemeProvider>
      <Header></Header>
      <ThemeButton />
      <UseFetchNews/>
      <Footer></Footer>
    </ThemeProvider>
  );
}