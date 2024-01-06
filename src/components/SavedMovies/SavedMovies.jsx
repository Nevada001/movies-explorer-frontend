import './SavedMovies.css';
import MoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

export default function SavedMovies({savedCards, isCaption, isButtonMovie, onShowSavedMovies}) {
  return(
    <main className='movies'>
      <SearchForm isCaption={isCaption} onShowSavedMovies={onShowSavedMovies} />
      <MoviesCardList
      isButtonMovie={isButtonMovie}
      savedCards={savedCards} />
    </main>
  )
}