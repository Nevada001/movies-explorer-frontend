import Preloader from "../../Preloader/Preloader";
import "./MoviesCardList.css";

export default function MoviesCardList({ cards, isLoading, isMoreMovies, isCaption, isButtonMovie }) {

  function handleLoadMovies() {
    isMoreMovies();
  }

  return (
    <div className="movies__container">
      <ul className="cards">{cards}</ul>
      {isCaption && <p>Ничего не найдено</p>}
      {isLoading && <Preloader />}
      {isButtonMovie && <button onClick={handleLoadMovies} className="movies__button">Ещё</button>}
    </div>
  );
}
