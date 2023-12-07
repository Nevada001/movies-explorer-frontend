import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className="footer__captions">
        <p className="footer__caption">© 2020</p>
        <a className="footer__link links" href="#">Яндекс.Практикум</a>
        <a className="footer__link links" href="#">Github</a>
      </div>
    </footer>
  );
}
