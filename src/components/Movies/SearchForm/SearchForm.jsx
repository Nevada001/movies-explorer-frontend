import { useForm } from "react-hook-form";
import "./SearchForm.css";
import { useLocation } from "react-router";
import { useEffect, useState } from "react";
import { checkBoxState } from "../../../constants/const-localStorage";
export default function SearchForm({
  isTurnOn,
  onShowMovies,
  onChange,
  caption,
  onShowSavedMovies,
}) {
  const [turnState, setTurnState] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const location = useLocation();

  useEffect(() => {
    localStorage.getItem(checkBoxState) === "true"
      ? setTurnState(false)
      : setTurnState(true);
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
    localStorage.setItem(checkBoxState, turnState);
  }

  function handleChangeMovie(e) {
    onChange(e.target.value);
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
        {errors?.movies && <p>{errors?.movies?.message || "error"}</p>}
      </div>
      <p className="search__error-text">{caption}</p>
      <div className="search__captions">
        <article
          onClick={shortFilmsToggle}
          className={`search__element ${
            turnState && "search__element_inactive"
          }`}
        ></article>
        <p className="search__caption">Короткометражки</p>
      </div>
    </section>
  );
}
