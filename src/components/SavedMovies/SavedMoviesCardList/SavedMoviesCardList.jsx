import "./SavedMoviesCardList.css";

export default function MoviesCardList({ savedCards, isButtonMovie }) {
  return (
    <div className="movies__container">
      <ul className="cards cards_saved">{savedCards}</ul>
      {isButtonMovie && <button className="movies__button">Ещё</button>}
    </div>
    
  );
}