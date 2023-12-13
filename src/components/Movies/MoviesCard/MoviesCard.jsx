import "./MoviesCard.css";

export default function MoviesCard({ card, isLike }) {

  const cardButtonClassName = (`card__button ${isLike && 'card__button_active'}`);
  return (
    <li className="card">
      <img className="card__image" src={card.image} alt="Изображение фильма" />
      <div className="card__container">
        <p className="card__name">{card.nameRU}</p>
        <button className={cardButtonClassName}></button>
      </div>
      <p className="card__duration">{card.duration}</p>
    </li>
  );
}
