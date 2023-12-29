import "./SearchForm.css";
import { useState } from "react";
export default function SearchForm() {

  const [turnOn, setTurnOn] = useState(true);

  function buttonTurnOnToggle() {
    turnOn ? setTurnOn(false) : setTurnOn(true)
  }
  return (
    <section className="search">
      <form className="search__container">
        <input className="search__input" type="text" placeholder="Фильм" />
        <button className="search__button" type="submit">
          Найти
        </button>
      </form>
      <div className="search__captions">
      <article onClick={buttonTurnOnToggle} className={`search__element ${turnOn && 'search__element_inactive'}`}></article>
      <p className="search__caption">Короткометражки</p>
      </div>
      
    </section>
  );
}
