import { useLocation } from "react-router";
import { BASE_URL } from "../../../utils/MoviesApi";
import "./MoviesCard.css";
import { BASE_URL_MAIN } from "../../../utils/MainApi";

export default function MoviesCard({ card, savedCards, onMovieDelete, isAdded, onMovieAdd }) {
  function getTimeInMin() {
    let hours = Math.trunc(card.duration / 60);
    let minutes = card.duration % 60;
    if (hours < 1) {
      return minutes + "m";
    } else {
      return hours + " h " + minutes + " m";
    }
  }

  function handleAddClick() { 
    onMovieAdd(card);
  }

  function handleDeleteClick() { 
    const selectedCard = savedCards.find((movie) => (movie.movieId === card.id))
    console.log(selectedCard)
    onMovieDelete(selectedCard);
  }

  const location = useLocation();
  const cardButtonClassName = `card__button ${
    isAdded && "card__button_active"
  }`;
  return (
    <li className="card">
      <a
        className="links"
        target="_blank"
        rel="noreferrer"
        href={card.trailerLink}
      >
        <img
          className="card__image"
          src={
            location.pathname === "/saved-movies"
              ? `${BASE_URL_MAIN}${card.image}`
              : `${BASE_URL}${card.image.url}`
          }
          alt="Изображение фильма"
        />
      </a>
      <div className="card__container">
        <p className="card__name">{card.nameRU}</p>
        <button
          onClick={isAdded ? handleDeleteClick : handleAddClick}
          className={cardButtonClassName}
        ></button>
      </div>
      <p className="card__duration">{getTimeInMin()}</p>
    </li>
  );
}
