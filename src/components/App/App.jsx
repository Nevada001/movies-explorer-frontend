import React, { Component, useEffect, useState } from "react";
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
  allMovies,
  checkBoxState,
  jwt,
  movieQueryText,
  movies,
  savedMovieQueryText,
  savedMovies,
} from "../../constants/const-localStorage";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import ProtectedRouteElement from "../ProtectedRouteElement/ProtectedRouteElement";

function App() {
  const [regErrMess, setRegErrMess] = useState("");
  const [logErrMess, setLogErrMess] = useState("");
  const [updateMess, setUpdateMess] = useState("");
  const [regErrorMes, setRegErrorMes] = useState("");
  const { amountOfMovies, setAmountOfMovies } = useResize();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [savedCards, setSavedCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [savedCaption, setSavedCaption] = useState("");
  const [movie, setMovie] = useState("");
  const [savedMovie, setSavedMovie] = useState("");
  const [isButtonMore, setIsButtonMore] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log();
    if (document.body.getElementsByClassName("notFound").length < 1) {
      checkToken();
    }
  }, [isLogin]);

  useEffect(() => {
    cards.length > amountOfMovies.totalAmount
      ? setIsButtonMore(true)
      : setIsButtonMore(false);
  }, [amountOfMovies, handleSearchMovies, loadShortMovies]);

  useEffect(() => {
    if (document.body.getElementsByClassName("notFound").length < 1) {
      Promise.all([mainApi.getSavedMovies(), mainApi.getUserData()])
        .then(([movies, user]) => {
          setSavedCards(movies);
          localStorage.setItem(savedMovies, JSON.stringify(movies));
          if (movies.length === 0) {
            setSavedCaption("Ничего не найдено");
            setSavedCards([]);
          } else {
            setSavedCaption("");
          }
          setCurrentUser(user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLogin, location]);

  useEffect(() => {
    const moviesFromStorage = JSON.parse(localStorage.getItem(movies));
    const inputMovieText = localStorage.getItem(movieQueryText);

    if (!moviesFromStorage || !inputMovieText) {
      setCards([]);
      setIsButtonMore(false);
    } else {
      localStorage.getItem(checkBoxState) === "true"
        ? loadShortMovies()
        : setCards(moviesFromStorage);
      if (moviesFromStorage.length === 0) {
        setCaption("Ничего не найдено");
      } else {
        setCaption("");
      }
    }

    if (cards > 0) {
      setCaption("");
    }
  }, [isLogin, location]);

  function checkToken() {
    if (localStorage.getItem(jwt)) {
      const jwtFromStorage = localStorage.getItem(jwt);
      mainApi.getContent(jwtFromStorage).then((userData) => {
        if (userData) {
          setIsLogin(true);
          navigate(location.pathname);
        }
      });
    }
  }

  function handleUpdateUser({ name, email }) {
    setIsLoading(true);
    mainApi
      .updateUser({ name, email })
      .then((userData) => {
        console.log(userData);
        setCurrentUser(userData);
        setIsLoading(false);
        setUpdateMess("Данные пользователя изменены успешно");
      })
      .catch((err) => {
        setIsLoading(false);
        setUpdateMess("При обновлении профиля произошла ошибка");
        console.log(err);
      })
      .finally(() => {
        setTimeout(() => setUpdateMess(""), 4000);
        setIsLoading(false);
      });
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
    mainApi
      .deleteMovieFromSaved(selectedCard)
      .then(() => {
        const savedMoviesAfterDeleting = savedCards.filter(
          (el) => el._id !== selectedCard._id
        );
        localStorage.setItem(
          savedMovies,
          JSON.stringify(savedMoviesAfterDeleting)
        );
        setSavedCards(savedMoviesAfterDeleting);
      })
      .catch((err) => {
        console.log(err);
      });

    return localStorage.setItem(savedMovies, JSON.stringify(savedCards));
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
      .authorize({ email, password })
      .then((res) => {
        if (res.token) {
          setIsLogin(true);
          localStorage.setItem(jwt, res.token);
          navigate("/movies");
          setLogErrMess("");
        }
      })
      .catch((err) => {
        setLogErrMess("Вы ввели неправильный логин или пароль.");
        console.log(`Ошибка авторизации: ${err}`);
      });
  }

  function handleRegister({ name, email, password }) {
    mainApi
      .register({ name, email, password })
      .then((res) => {
        if (res) {
          setRegErrorMes("");
          handleLogin({ email, password });
        }
        return;
      })
      .catch((err) => {
        console.log(err);
        setRegErrorMes(
          "Пожалуйста введите корректные данные или убедитесь, что регистрируетесь впервые"
        );
      })
      .finally(() => {});
  }

  function loadShortMovies() {
    if (!JSON.parse(localStorage.getItem(movies))) {
      return;
    }
    const result = JSON.parse(localStorage.getItem(movies)).filter((el) => {
      if (
        localStorage.getItem(checkBoxState) === "true" ? el.duration < 40 : el
      ) {
        return el;
      }
    });
    setCards(result);
    if (result.length === 0 || movies.length === 0) {
      setCaption("Ничего не найдено");
    } else {
      setCaption("");
    }
  }

  function filterMovies(arr, name, savedTurnState) {
    if (name === "" || undefined) {
      return;
    }
    const word = name.toLowerCase();
    const result = arr.filter((el) => {
      if (
        el.nameRU.toLowerCase().includes(word) ||
        el.nameEN.toLowerCase().includes(word)
      ) {
        return el;
      }
    });
    if (
      localStorage.getItem(checkBoxState) === "true" &&
      location.pathname === "/movies"
    ) {
      const shortResult = result.filter((el) => {
        if (el.duration < 40) {
          return el;
        }
      });
      setCards(shortResult);
      localStorage.setItem(movies, JSON.stringify(result));
      if (shortResult > amountOfMovies.totalAmount) {
        setIsButtonMore(true);
      } else {
        setIsButtonMore(false);
      }
    } else {
      if (location.pathname === "/movies") {
        setCards(result);
        localStorage.setItem(movies, JSON.stringify(result));
      }
    }

    if (location.pathname === "/saved-movies") {
      if (savedTurnState) {
        const shortResult = result.filter((el) => {
          if (el.duration < 40) {
            return el;
          }
        });
        setSavedCards(shortResult);
      } else {
        setSavedCards(result);
      }
    }
    if (result.length === 0 || movies.length === 0) {
      setCaption("Ничего не найдено");
    } else {
      setCaption("");
    }
    if (result > amountOfMovies.totalAmount) {
      setIsButtonMore(true);
    } else {
      setIsButtonMore(false);
    }
  }

  function handleSearchMovies(apiMethod, movieQuery) {
    setIsLoading(true);
    const moviesList = JSON.parse(localStorage.getItem(allMovies));
    if (!moviesList) {
      apiMethod()
        .then((cards) => {
          localStorage.setItem(allMovies, JSON.stringify(cards));
          filterMovies(cards, movieQuery);
        })
        .catch(() => {
          setCaption(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        })
        .finally(() => {
          setIsLoading(false);
          setCaption("");
        });
    } else {
      filterMovies(moviesList, movieQuery);
      setIsLoading(false);
    }
  }

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser({});
    setIsLogin(false);
    setMovie("");
    navigate("/");
    setSavedCards([]);
    setCards([]);
  }

  function searchMovies(movieQuery) {
    handleSearchMovies(moviesApi.getMovies, movieQuery);
  }

  function searchShortSavedMovies(savedTurnState, movieQuery) {
    const savedFromStor = JSON.parse(localStorage.getItem(savedMovies));
    if (movieQuery === "" || movieQuery === undefined) {
      !savedTurnState
        ? setSavedCards(savedCards.filter((el) => el.duration < 40))
        : setSavedCards(savedFromStor || []);
    } else {
      filterMovies(savedFromStor, movieQuery, !savedTurnState);
    }
  }
  function searchSavedMovies(movieQuery, savedTurnState) {
    const savedMov = JSON.parse(localStorage.getItem(savedMovies));
    filterMovies(savedMov, movieQuery, savedTurnState);
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
                isShowShortMovies={loadShortMovies}
                showMoreMovies={handleShowMoreMovies}
                isButtonMovie={isButtonMore}
                //onChange={handleChangeMovie}
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
                //onChange={handleChangeSavedMovie}
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
            element={
              <Register
                regErr={regErrorMes}
                isLogin={isLogin}
                onRegister={handleRegister}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Login
                logErrMess={logErrMess}
                isLogin={isLogin}
                onLogin={handleLogin}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouteElement
                element={Profile}
                updateMess={updateMess}
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
