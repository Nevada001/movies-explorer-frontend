export const BASE_URL_MAIN = 'https://api.nevadamovies.nomoredomainsmonster.ru';

function getResponse(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getSavedMovies = () => {
  return fetch(`${BASE_URL_MAIN}/movies`)
  .then(getResponse)
}