import { useForm } from "react-hook-form";
import "./SearchForm.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import {
  checkBoxState,
  movieQueryText,
  savedMovieQueryText,
} from "../../../constants/const-localStorage";
export default function SearchForm({
  isShowShortMovies,
  onShowMovies,
  caption,
  onShowSavedMovies,
}) {
  const [isError, setIsError] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [savedTurnState, setSavedTurnState] = useState(false);
  const [turnState, setTurnState] = useState(
    localStorage.getItem(checkBoxState)
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();

  useEffect(() => {
    const inputMovie = localStorage.getItem(movieQueryText);
    (location.pathname === "/movies" && localStorage.getItem(movieQueryText)) &&
      setMovieQuery(inputMovie);
  }, [location.pathname]);

  useEffect(() => {
    const submitOnKeyEnter = (e) => {
      if (e.keyCode === 13) {
        location.pathname === "/movies" ? handleSubmit(onSubmitMovies) : handleSubmit(onSubmitSavedMovies);
      }
    };
    document.addEventListener("keydown", submitOnKeyEnter);
    // удаляем событие при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", submitOnKeyEnter);
    };
  }, [movieQuery]);

  useEffect(() => {
    localStorage.getItem(checkBoxState) === "true"
      ? setTurnState(true)
      : setTurnState(false);
  }, [turnState]);

  function onSubmitMovies(data, e) {
    e.preventDefault();
    e.target.value === "" ? setIsError(true) : setIsError(false);
    localStorage.setItem(movieQueryText, movieQuery)
    onShowMovies(movieQuery);
    console.log(movieQuery)
  }

  function onSubmitSavedMovies(data, e) {
    e.preventDefault();
   // e.target.value === "" ? setIsError(true) : setIsError(false);
    localStorage.setItem(savedMovieQueryText, movieQuery)
    onShowSavedMovies(movieQuery);
  }

  function shortFilmsToggle() {
    turnState ? setTurnState(false) : setTurnState(true);
    localStorage.setItem(checkBoxState, !turnState);
    isShowShortMovies();
  }

  function shortSavedFilmsToggle() {
    savedTurnState ? setSavedTurnState(false) : setSavedTurnState(true);
    isShowShortMovies(savedTurnState);
  }
  return (
    <section className="search">
      <form
        onSubmit={
          location.pathname === "/saved-movies"
            ? handleSubmit(onSubmitSavedMovies)
            : handleSubmit(onSubmitMovies)
        }
        className="search__container"
      >
        <input
          {...register("movies", {
            required: "Нужно ввести ключевое слово",
            pattern: {
              value: /^[\S].*$/,
              message: "Нужно ввести ключевое слово",
            },
          })}
          onChange={(e) => setMovieQuery(e.target.value)}
          value={movieQuery}
          className="search__input"
          type="text"
          placeholder="Фильм"
        />
        <button className="search__button" type="submit">
          Найти
        </button>
      </form>
      <div className="search__input-caption">
        {(isError || errors?.movies) && <p>{errors?.movies?.message}</p>}
      </div>
      <p className="search__error-text">{caption}</p>
      <div className="search__captions">
        <article
          onClick={
            location.pathname === "/movies"
              ? shortFilmsToggle
              : shortSavedFilmsToggle
          }
          className={`search__element ${
            location.pathname === "/movies"
              ? !turnState && "search__element_inactive"
              : !savedTurnState && "search__element_inactive"
          }`}
        ></article>
        <p className="search__caption">Короткометражки</p>
      </div>
    </section>
  );
}
