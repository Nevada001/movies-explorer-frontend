import { Route, Routes } from "react-router";
import "./Footer.css";

export default function Footer() {
  const footer = (     <footer className="footer">
  <p className="footer__text">
    Учебный проект Яндекс.Практикум х BeatFilm.
  </p>
  <div className="footer__captions">
    <p className="footer__caption">© 2020</p>
    <a className="footer__link links" target="_blank" rel="noreferrer" href="https://practicum.yandex.ru">Яндекс.Практикум</a>
    <a className="footer__link links" target="_blank" rel="noreferrer" href="https://github.com/Nevada001">Github</a>
  </div>
</footer> );

  return (
  <Routes>
    <Route path="/" element={footer}/>;
    <Route path="/saved-movies" element={footer}/>;
    <Route path="/movies" element={footer}/>
  </Routes>
  );
}
