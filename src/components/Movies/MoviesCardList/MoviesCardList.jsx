import "./MoviesCardList.css";

export default function MoviesCardList({ cards }) {
  return (
    <div className="movies__container">
      <ul className="cards">{cards}</ul>
      <button className="movies__button">Ещё</button>
    </div>
  );
}
