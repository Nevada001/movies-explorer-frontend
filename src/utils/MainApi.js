import { jwt } from "../constants/const-localStorage";

export const BASE_URL_MAIN = "https://api.nevadamovies.nomoredomainsmonster.ru";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export const getUserData = () => {
  const token = localStorage.getItem(jwt);
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  }).then(getResponse);
};

export const updateUser = (formValues) => {
  const token = localStorage.getItem(jwt);
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: formValues.name, email: formValues.email }),
  }).then(getResponse);
};

export const authorize = (formValues) => {
  return fetch(`${BASE_URL_MAIN}/signin`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: formValues.email, password: formValues.password }),
  }).then(getResponse);
};

export const getSavedMovies = () => {
  const token = localStorage.getItem(jwt);
  return fetch(`${BASE_URL_MAIN}/movies`, {
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  }).then(getResponse);
};

export const register = (formValues) => {
  return fetch(`${BASE_URL_MAIN}/signup`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name: formValues.name, email: formValues.email, password: formValues.password }),
  }).then(getResponse);
};

export const deleteMovieFromSaved = (cardItem) => {
  const token = localStorage.getItem(jwt);
  return fetch(`${BASE_URL_MAIN}/movies/${cardItem._id}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  });
};

export const addMovieToSaved = ({
  country,
  _id,
  director,
  duration,
  year,
  description,
  image,
  trailerLink,
  movieId,
  nameRU,
  nameEN,
  thumbNail,
}) => {
  const token = localStorage.getItem(jwt);
  return fetch(`${BASE_URL_MAIN}/movies`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      country,
      _id,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      movieId,
      nameRU,
      nameEN,
      thumbNail,
    }),
  }).then(getResponse);
};

export const getContent = (token) => {
  return fetch(`${BASE_URL_MAIN}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResponse);
};
