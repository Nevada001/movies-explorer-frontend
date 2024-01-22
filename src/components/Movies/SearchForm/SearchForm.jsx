import { useForm } from "react-hook-form";
import "./SearchForm.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { checkBoxState } from "../../../constants/const-localStorage";
export default function SearchForm({
  isShowShortMovies,
  onShowMovies,
  onChange,
  caption,
  onShowSavedMovies,
}) {
  const [isError, setIsError] = useState(false);
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
    const submitOnKeyEnter = (e) => {
      if (e.keyCode === 13) {
        location.pathname === "/movies" ? onShowMovies() : onShowSavedMovies();
      }
    };
    document.addEventListener("keydown", submitOnKeyEnter);
    // удаляем событие при размонтировании компонента
    return () => {
      document.removeEventListener("keydown", submitOnKeyEnter);
    };
  }, [handleChangeMovie]);

  useEffect(() => {
    localStorage.getItem(checkBoxState) === "true"
      ? setTurnState(true)
      : setTurnState(false);
  }, [turnState]);

  function onSubmitMovies(data, e) {
    e.preventDefault();
    onShowMovies();
  }

  function onSubmitSavedMovies(data, e) {
    e.preventDefault();
    onShowSavedMovies();
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

  function handleChangeMovie(e) {
    onChange(e.target.value);
    e.target.value === "" ? setIsError(true) : setIsError(false);
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
          onChange={handleChangeMovie}
          className="search__input"
          type="text"
          placeholder="Фильм"
        />
        <button className="search__button" type="submit">
          Найти
        </button>
      </form>
      <div className="search__input-caption">
        {isError && errors?.movies && (
          <p>{errors?.movies?.message || "error"}</p>
        )}
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
