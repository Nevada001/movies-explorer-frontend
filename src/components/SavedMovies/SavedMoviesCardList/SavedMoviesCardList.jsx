import "./SavedMoviesCardList.css";

export default function MoviesCardList({ savedCards }) {
  return (
    <div className="movies__container">
      <ul className="cards cards_saved">{savedCards}</ul>
    </div>
  );
}