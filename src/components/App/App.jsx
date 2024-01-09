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
} from "../../constants/const-localStorage";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const { amountOfMovies, setAmountOfMovies } = useResize();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
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
          setCurrentUser(user);
          setSavedCards(movies.reverse());
          localStorage.setItem('savedMovies', JSON.stringify(movies))
        }
      );
    }

    if (isLogin) {
      const moviesFromStorage = JSON.parse(localStorage.getItem(movies));
      const inputMovieText = localStorage.getItem(movieQueryText);
      if (!moviesFromStorage || !inputMovieText) {
        return;
      }
      setMovie(inputMovieText);
      setCards(moviesFromStorage);
      if (cards.length > amountOfMovies.totalAmount) {
        setIsButtonMore(true);
      } else {
        setIsButtonMore(false);
      }
    }
  }, [amountOfMovies, isLogin]);

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

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    mainApi
      .updateUser(currentUser.name, currentUser.email)
      .then((userData) => {
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
  const result =  savedCards.some((card) => card.movieId === movie.id);
  return result;
  }

  function handleMovieDelete(selectedCard) {
    console.log(selectedCard)
    const checkIsSaved = savedCards.some((el) => el._id === selectedCard._id);
    console.log(checkIsSaved)
    console.log(savedCards);
    console.log(selectedCard)
    if (checkIsSaved) {
      mainApi
        .deleteMovieFromSaved(selectedCard)
        .then(() => {  
          setSavedCards((state) => (state.filter((el) => (el._id !== selectedCard._id))));
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return
  }

  function handleMovieAdd(card) {
    const checkIsSaved = savedCards.some((movie) => movie.movieId === card.id);
    if (!checkIsSaved) {
      mainApi
        .addMovieToSaved({
          _id: card._id,
          country: card.country.slice(0,29),
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
          console.log(card);
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
      .authorize(email, password)
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
      .register(name, email, password)
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
    setCards(result);

    if (result.length === 0) {
      setCaption("Ничего не найдено");
    } else {
      setCaption("");
    }
  }

  function handleSearchMovies(apiMethod) {
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

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLogin(false);
    navigate("/");
  }

  function searchMovies() {
    handleSearchMovies(moviesApi.getMovies);
  }

  function searchSavedMovies() {
    handleSearchMovies(mainApi.getSavedMovies);
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
                isButtonMovie={isButtonMore}
                onChange={handleChangeMovie}
                caption={caption}
                onShowSavedMovies={searchSavedMovies}
                savedCards={savedCards.map((savedCard) => (
                  <SavedMoviesCard 
                  key={savedCard._id}
                  savedCards={savedCards}
                  isAdded={isAdded(savedCard)}
                  onMovieDelete={handleMovieDelete}
                  savedCard={savedCard} />
                ))}
              />
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
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
