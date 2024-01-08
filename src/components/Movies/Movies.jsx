import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({cards, isTurnOn, onShowMovies, showMoreMovies, isButtonMovie, loadMovies, onChange, onShowSavedMovies, caption, isLoading}) {
  return(
    <main className='movies'>
      <SearchForm  caption={caption} isTurnOn={isTurnOn} onChange={onChange} onShowMovies={onShowMovies} onShowSavedMovies={onShowSavedMovies} />
      <MoviesCardList
      showMoreMovies={showMoreMovies}
      loadMovies={loadMovies}
      isButtonMovie={isButtonMovie}
      isLoading={isLoading}
      cards={cards} />
      
    </main>
  )
}