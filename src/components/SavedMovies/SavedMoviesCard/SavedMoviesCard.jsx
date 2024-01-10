import "./SavedMoviesCard.css";

export default function MoviesCard({ savedCard, onMovieDelete, savedCards }) {

  function getTimeInMin() {
    let hours = Math.trunc(savedCard.duration / 60);
    let minutes = savedCard.duration % 60;
    if (hours < 1) {
      return minutes + "m";
    } else {
      return hours + " h " + minutes + " m";
    }
  }

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
      <p className="card__duration">{getTimeInMin()}</p>
    </li>
  );
}
