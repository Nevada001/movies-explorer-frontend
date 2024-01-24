import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({cards, turnOn, savedCards, onMovieAdd, isShowShortMovies, onShowMovies, showMoreMovies, isButtonMovie, loadMovies, onChange, onShowSavedMovies, caption, isLoading}) {
  return(
    <main className='movies'>
      <SearchForm turnOn={turnOn}  caption={caption} isShowShortMovies={isShowShortMovies}  onChange={onChange} onShowMovies={onShowMovies} onShowSavedMovies={onShowSavedMovies} />
      <MoviesCardList
    
      savedCards={savedCards}
      showMoreMovies={showMoreMovies}
      loadMovies={loadMovies}
      isButtonMovie={isButtonMovie}
      isLoading={isLoading}
      cards={cards}
      onMovieAdd={onMovieAdd} />
      
    </main>
  )
}