import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import { cards } from "../../constants/constants";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="page">
      <Header isLogin={isLogin} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Main />
            </>
          }
        />
        <Route
          path="/movies"
          element={
            <Movies
              cards={cards.map((card) => (
                <MoviesCard card={card} />
              ))}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
