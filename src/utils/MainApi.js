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

export const register = (name, email, password) => {
  return fetch(`${BASE_URL_MAIN}/signup`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    }, 
    body: JSON.stringify({name, email, password})
  })
  .then(getResponse)
}