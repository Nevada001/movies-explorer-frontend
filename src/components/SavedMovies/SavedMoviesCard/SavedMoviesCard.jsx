import "./SavedMoviesCard.css";

export default function MoviesCard({ savedCard, isLike }) {

  const cardButtonClassName = (`card__button ${isLike && 'card__button_active'}`);
  return (
    <li className="card">
      <img className="card__image" src={savedCard.image} alt="Изображение фильма" />
      <div className="card__container">
        <p className="card__name">{savedCard.nameRU}</p>
        <button className={cardButtonClassName}></button>
      </div>
      <p className="card__duration">{savedCard.duration}</p>
    </li>
  );
}
