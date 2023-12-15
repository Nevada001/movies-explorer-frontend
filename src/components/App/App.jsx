import { useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import "./App.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import { cards, savedCards } from "../../constants/constants";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import SavedMovies from "../SavedMovies/SavedMovies";
import SavedMoviesCard from "../SavedMovies/SavedMoviesCard/SavedMoviesCard";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

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
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              savedCards={savedCards.map((savedCard) => (
                <SavedMoviesCard savedCard={savedCard} />
              ))}
            />
          }
        />
        <Route path="/signup" element={<Register/>} />
        <Route path="/signin" element={<Login/>} />
        <Route path="/profile" element={<Profile/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
