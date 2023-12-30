import {  useForm } from "react-hook-form";
import "./SearchForm.css";
import { useState } from "react";
export default function SearchForm() {

  const { register, formState: { errors }, handleSubmit } = useForm();
  const [turnOn, setTurnOn] = useState(true);
  const [movie, setMovie] = useState('');
  
  function onSubmit(data, e) {
   e.preventDefault();
  }

  function handleChangeMovie(e) {
    setMovie(e.target.value)
  }

  function buttonTurnOnToggle() { 
    turnOn ? setTurnOn(false) : setTurnOn(true)
  }
  return (
    <section className="search">
      <form noValidate onSubmit={handleSubmit(onSubmit)}   className="search__container">
        <input  {...register('movies',{ required: "Нужно ввести ключевое слово"
        })} value={movie} onChange={handleChangeMovie}  className="search__input" required type="text" placeholder="Фильм" />
        <button className="search__button" type="submit">
          Найти
        </button>
      </form>
      <div>{errors?.movies && <p>{errors?.movies?.message || "error"}</p>}</div>
      <div className="search__captions">
      <article onClick={buttonTurnOnToggle} className={`search__element ${turnOn && 'search__element_inactive'}`}></article>
      <p className="search__caption">Короткометражки</p>
      </div>
      
    </section>
  );
}
