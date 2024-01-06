import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import * as moviesApi from "../../utils/MoviesApi";
import * as MainApi from "../../utils/MainApi";
import "./App.css";
import Footer from "../Footer/Footer";
import { Routes, Route } from "react-router-dom";
import Movies from "../Movies/Movies";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import SavedMovies from "../SavedMovies/SavedMovies";
import SavedMoviesCard from "../SavedMovies/SavedMoviesCard/SavedMoviesCard";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import {
  SCREEN_L,
  SCREEN_M,
  SCREEN_XS,
} from "../../constants/const-breakpoints";
import { useResize } from "../hooks/resize";

function App() {
  const [isMoreMovies, setIsMoreMovies] = useState(false)
  const [screen, setScreen] = useState();
  const [isLogin, setIsLogin] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [movie, setMovie] = useState("");
  const [isButtonMore, setIsButtonMore] = useState(false);

  const width = useResize();
  function handleChangeMovie(movie) {
    setMovie(movie);
  }

  function handleShowMoreMovies() {
    setIsMoreMovies(true)
  }
  useEffect(() => {
    setScreen(width);
    console.log(width)
    searchMovies();
    setIsMoreMovies(false)
  }, [width, isMoreMovies]);


  function manageNumberOfMovies(arr, newArr, x, y) {
    for (let i = x; i < arr.length && i < y; i++) {
      newArr.push(arr[i]);
    }
  }

  function filterMovies(arr, name) {
    const word = name[0].toUpperCase() + name.slice(1);
    const result = arr.filter((el) => {
      if (el.nameRU.startsWith(word) || el.nameEN.startsWith(word)) {
        return el;
      }
    });
    if (result.length > 16) {
      setIsButtonMore(true);
    } else {
      setIsButtonMore(false);
    }
    let moviesReturned = [];
    if (width >= SCREEN_L) {
      manageNumberOfMovies(result, moviesReturned, 0, 16);
      setCards(moviesReturned);
    } else if (width >= SCREEN_M) {
      manageNumberOfMovies(result, moviesReturned, 0, 8);
      setCards(moviesReturned);
    } else if (width >= SCREEN_XS && width < SCREEN_M) {
      manageNumberOfMovies(result, moviesReturned, 0, 5);
      setCards(moviesReturned);
    }
    if (result.length === 0) {
      setCaption("Ничего не найдено");
    } else {
      setCaption("");
    }
  }

  function handleSearchMovies(apiMethod) {
    setIsLoading(true);
    setCards([]);
    apiMethod()
      .then((cards) => {
        filterMovies(cards, movie);
      })
      .catch(() => {
        setCaption(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function searchMovies() {
    handleSearchMovies(moviesApi.getMovies);
  }

  function searchSavedMovies() {
    handleSearchMovies(MainApi.getSavedMovies);
  }

  function openMenu() {
    setMenuIsOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    setMenuIsOpen(false);
    document.body.style.overflow = "auto";
  }
  return (
    <div className="page">
      <Header isLogin={isLogin} isMenuOpen={openMenu} />
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
              isMoreMovies={handleShowMoreMovies}
              isButtonMovie={isButtonMore}
              onChange={handleChangeMovie}
              caption={caption}
              isLoading={isLoading}
              onShowMovies={searchMovies}
              cards={cards.map((card) => (
                <MoviesCard card={card} key={card.id} />
              ))}
            />
          }
        />
        <Route
          path="/saved-movies"
          element={
            <SavedMovies
              isButtonMovie={isButtonMore}
              onChange={handleChangeMovie}
              caption={caption}
              onShowSavedMovies={searchSavedMovies}
              savedCards={cards.map((savedCard) => (
                <SavedMoviesCard savedCard={savedCard} />
              ))}
            />
          }
        />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Menu isOpen={menuIsOpen} onClose={closeMenu} />
    </div>
  );
}

export default App;
