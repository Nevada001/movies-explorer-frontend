import "./MoviesCardList.css";

export default function MoviesCardList({ cards }) {
  return (
    <>
      <ul className="cards">{cards}</ul>
      <button className="movies__button">Ещё</button>
    </>
  );
}
