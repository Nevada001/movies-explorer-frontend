import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({cards}) {
  return(
    <section className='movies'>
      <SearchForm />
      <MoviesCardList
      cards={cards} />
    </section>
  )
}