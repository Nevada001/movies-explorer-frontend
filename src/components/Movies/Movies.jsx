import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({cards, isMoreMovies, onShowMovies, isButtonMovie, loadMovies, onChange, onShowSavedMovies, caption, isLoading}) {
  return(
    <main className='movies'>
      <SearchForm caption={caption} onChange={onChange} onShowMovies={onShowMovies} onShowSavedMovies={onShowSavedMovies} />
      <MoviesCardList
      isMoreMovies={isMoreMovies}
      loadMovies={loadMovies}
      isButtonMovie={isButtonMovie}
      isLoading={isLoading}
      cards={cards} />
      
    </main>
  )
}