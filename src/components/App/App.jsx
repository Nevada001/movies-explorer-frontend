import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import * as moviesApi from "../../utils/MoviesApi";
import * as mainApi from "../../utils/MainApi";
import "./App.css";
import Footer from "../Footer/Footer";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Movies from "../Movies/Movies";
import MoviesCard from "../Movies/MoviesCard/MoviesCard";
import SavedMovies from "../SavedMovies/SavedMovies";
import SavedMoviesCard from "../SavedMovies/SavedMoviesCard/SavedMoviesCard";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import Menu from "../Menu/Menu";
import { SCREEN_L, SCREEN_M } from "../../constants/const-breakpoints";
import { useResize } from "../hooks/resize";
import {
  checkBoxState,
  jwt,
  movieQueryText,
  movies,
  savedMovies,
} from "../../constants/const-localStorage";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const { amountOfMovies, setAmountOfMovies } = useResize();
  const [isCheckBox, setIsCheckBox] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [savedCaption, setSavedCaption] = useState("");
  const [turnOn, setTurnOn] = useState(false);
  const [movie, setMovie] = useState("");
  const [isButtonMore, setIsButtonMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkToken();
  }, [isLogin]);

  useEffect(() => {
    if (isLogin) {
      Promise.all([mainApi.getSavedMovies(), mainApi.getUserData()]).then(
        ([movies, user]) => {
          if (movies.length === 0) {
            setSavedCaption("Ничего не найдено");
          } else {
            setSavedCaption("");
          }
          setCurrentUser(user);
          setSavedCards(movies.reverse());
          localStorage.setItem(savedMovies, JSON.stringify(movies));
        }
      );
    }

    if (isLogin) {
      const moviesFromStorage = JSON.parse(localStorage.getItem(movies));
      const inputMovieText = localStorage.getItem(movieQueryText);
      if (!moviesFromStorage || !inputMovieText) {
        setCards([]);
      }
      else {
      setMovie(inputMovieText);
      setCards(moviesFromStorage);
      if (moviesFromStorage.length === 0) {
        setCaption("Ничего не найдено");
      } else {
        setCaption("");
      }
      if (cards.length > amountOfMovies.totalAmount) {
        setIsButtonMore(true);
      } else {
        setIsButtonMore(false);
      }
    }
  }
    if (cards > 0) {
      setCaption('')
    }
  }, [amountOfMovies, isLogin, location]);

  function checkToken() {
    if (localStorage.getItem(jwt)) {
      const jwtFromStorage = localStorage.getItem(jwt);
      mainApi.getContent(jwtFromStorage).then((userData) => {
        if (userData) {
          setIsLogin(true);
          setCurrentUser(userData);
          navigate(location.pathname);
        }
      });
    }
  }

  function handleTurnOn() {
    turnOn ? setTurnOn(false) : setTurnOn(true);
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUser({ name, email })
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleChangeMovie(movie) {
    setMovie(movie);
  }
  function handleShowMoreMovies() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= SCREEN_L) {
      setAmountOfMovies({
        ...amountOfMovies,
        totalAmount: amountOfMovies.totalAmount + 4,
      });
    } else if (windowWidth >= SCREEN_M) {
      setAmountOfMovies({
        ...amountOfMovies,
        totalAmount: amountOfMovies.totalAmount + 2,
      });
    } else if (windowWidth < SCREEN_M) {
      setAmountOfMovies({
        ...amountOfMovies,
        totalAmount: amountOfMovies.totalAmount + 2,
      });
    }
  }

  const isAdded = (movie) => {
    const result = savedCards.some((card) => card.movieId === movie.id);
    return result;
  };

  function handleMovieDelete(selectedCard) {
    const checkIsSaved = savedCards.some((el) => el._id === selectedCard._id);
    if (checkIsSaved) {
      mainApi
        .deleteMovieFromSaved(selectedCard)
        .then(() => {
          setSavedCards((state) =>
            state.filter((el) => el._id !== selectedCard._id)
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return;
  }

  function handleMovieAdd(card) {
    const checkIsSaved = savedCards.some((movie) => movie.movieId === card.id);
    if (!checkIsSaved) {
      mainApi
        .addMovieToSaved({
          _id: card._id,
          country: card.country.slice(0, 29),
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: `${moviesApi.BASE_URL}${card.image.url}`,
          trailerLink: card.trailerLink,
          movieId: card.id,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          thumbNail: `${moviesApi.BASE_URL}${card.image.formats.thumbnail.url}`,
        })
        .then((card) => {
          setSavedCards([card, ...savedCards]);
          savedCards.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleLogin({ email, password }) {
    mainApi
      .authorize({email, password})
      .then((res) => {
        if (res.token) {
          setIsLogin(true);
          localStorage.setItem(jwt, res.token);
          navigate("/movies");
        }
      })
      .catch((err) => {
        console.log(`Ошибка авторизации: ${err}`);
      });
  }

  function handleRegister({ name, email, password }) {
    mainApi
      .register({name, email, password})
      .then((res) => {
        if (res) {
          handleLogin({ email, password });
        }
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function filterMovies(arr, name) {
    const word = name[0].toUpperCase() + name.slice(1);
    const result = arr.filter((el) => {
      if (
        localStorage.getItem(checkBoxState) === "true"
          ? (el.nameRU.startsWith(word) || el.nameEN.startsWith(word)) &&
            el.duration < 40
          : el.nameRU.startsWith(word) || el.nameEN.startsWith(word)
      ) {
        return el;
      }
    });

    localStorage.setItem(movieQueryText, name);
    localStorage.setItem(movies, JSON.stringify(result));
    location.pathname === "/movies" ? setCards(result) : setSavedCards(result);

    if (result.length === 0 || movies.length === 0) {
      setCaption("Ничего не найдено");
    } else {
      setCaption("");
    }
  }

  function handleSearchMovies(apiMethod) {
    if(movie === '') {
      setCaption("Ничего не найдено")
    } 
    else {
    setIsLoading(true);
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
  }

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLogin(false);
    setMovie('')
    navigate("/");
  }

  function searchMovies() {
    handleSearchMovies(moviesApi.getMovies);
  }

  function searchShortSavedMovies() {
    const savedMov = JSON.parse(localStorage.getItem(savedMovies));
    if (!savedMov) {
      return;
    }
    if (localStorage.getItem(checkBoxState) === "true") {
      const shortSavedCards = savedMov.filter((el) => {
        if (el.duration < 40) {
          return el;
        }
      });
      setSavedCards(shortSavedCards);
    } else {
      setSavedCards(savedMov);
    }
  }

  function searchSavedMovies() {
    const savedMov = JSON.parse(localStorage.getItem(savedMovies));
    filterMovies(savedMov, movie);
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
    <CurrentUserContext.Provider value={currentUser}>
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
              <ProtectedRouteElement
                element={Movies}
                isLogin={isLogin}
                isShowShortMovies={searchMovies}
                isTurnOn={handleTurnOn}
                showMoreMovies={handleShowMoreMovies}
                isButtonMovie={isButtonMore}
                onChange={handleChangeMovie}
                caption={caption}
                isLoading={isLoading}
                onShowMovies={searchMovies}
                cards={cards
                  .slice(0, amountOfMovies.totalAmount)
                  .map((movie) => (
                    <MoviesCard
                      onMovieDelete={handleMovieDelete}
                      isAdded={isAdded(movie)}
                      savedCards={savedCards}
                      onMovieAdd={handleMovieAdd}
                      card={movie}
                      key={movie.id}
                    />
                  ))}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement
                element={SavedMovies}
                isLogin={isLogin}
                isShowShortMovies={searchShortSavedMovies}
                isButtonMovie={isButtonMore}
                onChange={handleChangeMovie}
                caption={savedCaption}
                onShowSavedMovies={searchSavedMovies}
                savedCards={savedCards.map((savedCard) => (
                  <SavedMoviesCard
                    key={savedCard._id}
                    savedCards={savedCards}
                    isAdded={isAdded(savedCard)}
                    onMovieDelete={handleMovieDelete}
                    savedCard={savedCard}
                  />
                ))}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register isLogin={isLogin} onRegister={handleRegister} />}
          />
          <Route
            path="/signin"
            element={<Login isLogin={isLogin} onLogin={handleLogin} />}
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                isLogin={isLogin}
                onLogOut={handleLogOut}
                onUpdate={handleUpdateUser}
              />
            }
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Menu isOpen={menuIsOpen} onClose={closeMenu} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
