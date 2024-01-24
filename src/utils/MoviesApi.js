export const BASE_URL = 'https://api.nomoreparties.co';

function getResponse(res) {
  if(!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getMovies = () => {
  return fetch(`${BASE_URL}/beatfilm-movies`)
  .then(getResponse)
}