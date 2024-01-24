import './SavedMovies.css';
import MoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

export default function SavedMovies({savedCards, caption, isShowShortMovies, onChange, isCaption, isButtonMovie, onShowSavedMovies}) {
  return(
    <main className='movies'>
      <SearchForm isCaption={isCaption} caption={caption} isShowShortMovies={isShowShortMovies} onChange={onChange} onShowSavedMovies={onShowSavedMovies} />
      <MoviesCardList
      isButtonMovie={isButtonMovie}
      savedCards={savedCards} />
    </main>
  )
}