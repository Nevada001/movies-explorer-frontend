import { useForm } from "react-hook-form";
import "./SearchForm.css";
import { useState } from "react";
import { useLocation } from "react-router";
export default function SearchForm({
  onShowMovies,
  onChange,
  caption,
  onShowSavedMovies,
}) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [turnOn, setTurnOn] = useState(true);
  const location = useLocation();

  function onSubmitMovies(data, e) {
    e.preventDefault();
    onShowMovies();
  }

  function onSubmitSavedMovies(data, e) {
    e.preventDefault();
    onShowSavedMovies();
  }



  function handleChangeMovie(e) {
    onChange(e.target.value);
  }

  function buttonTurnOnToggle() {
    turnOn ? setTurnOn(false) : setTurnOn(true);
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
              message: "Нужно ввести ключевое слово" 
            }
          }
          )}
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
          onClick={buttonTurnOnToggle}
          className={`search__element ${turnOn && "search__element_inactive"}`}
        ></article>
        <p className="search__caption">Короткометражки</p>
      </div>
    </section>
  );
}
