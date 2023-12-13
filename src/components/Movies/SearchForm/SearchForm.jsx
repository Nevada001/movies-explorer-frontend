import "./SearchForm.css";

export default function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <input className="search__input" type="text" placeholder="Фильм" />
        <button className="search__button" type="submit">
          Найти
        </button>
      </div>
      <div className="search__captions">
      <article className="search__element"></article>
      <p className="search__caption">Короткометражки</p>
      </div>
      
    </section>
  );
}
