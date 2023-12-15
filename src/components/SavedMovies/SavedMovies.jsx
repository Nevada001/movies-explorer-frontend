import './SavedMovies.css';
import MoviesCardList from './SavedMoviesCardList/SavedMoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';

export default function SavedMovies({savedCards}) {
  return(
    <section className='movies'>
      <SearchForm />
      <MoviesCardList
      savedCards={savedCards} />
    </section>
  )
}