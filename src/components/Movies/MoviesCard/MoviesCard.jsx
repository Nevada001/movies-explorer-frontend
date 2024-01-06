import { useLocation } from "react-router";
import { BASE_URL } from "../../../utils/MoviesApi";
import "./MoviesCard.css";
import { BASE_URL_MAIN } from "../../../utils/MainApi";

export default function MoviesCard({ card, isLike }) {
  const location = useLocation();
  const cardButtonClassName = (`card__button ${isLike && 'card__button_active'}`);
  return (
    <li className="card">
      <img className="card__image" src={location.pathname === '/saved-movies'? `${BASE_URL_MAIN}${card.image}` :`${BASE_URL}${card.image.url}`} alt="Изображение фильма" />
      <div className="card__container">
        <p className="card__name">{card.nameRU}</p>
        <button className={cardButtonClassName}></button>
      </div>
      <p className="card__duration">{card.duration}</p>
    </li>
  );
}
