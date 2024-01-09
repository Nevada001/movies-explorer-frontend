import "./SavedMoviesCard.css";

export default function MoviesCard({ savedCard, isAdded, onMovieDelete, savedCards, isLike }) {

  function handleDeleteClick() { 
    const selectedCard = savedCards.find((movie) => (movie._id === savedCard._id))
    console.log(selectedCard)
    onMovieDelete(selectedCard);
  }

  const cardButtonClassName = 'card__button  card__button_active';
  return (
    <li className="card">
      <img className="card__image" src={savedCard.image} alt="Изображение фильма" />
      <div className="card__container">
        <p className="card__name">{savedCard.nameRU}</p>
        <button onClick={handleDeleteClick} className={cardButtonClassName}></button>
      </div>
      <p className="card__duration">{savedCard.duration}</p>
    </li>
  );
}
