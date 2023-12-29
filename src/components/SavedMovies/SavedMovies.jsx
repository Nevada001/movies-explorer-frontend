import './SavedMovies.css';
import MoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

export default function SavedMovies({savedCards}) {
  return(
    <main className='movies'>
      <SearchForm />
      <MoviesCardList
      savedCards={savedCards} />
    </main>
  )
}