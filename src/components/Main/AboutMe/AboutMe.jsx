import "./AboutMe.css";
import avatar from "../../../images/аватар.jpg";
export default function aboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header-title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__container">
          <h2 className="about-me__title">Владислав</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 26 лет</h3>
          <p className="about-me__text">la la la</p>
          <p className="about-me__git-caption">Github</p>
          <p className="about-me__portfolio">Портфолио</p>
        </div>
        <img className="about-me__image" src={avatar} alt="Фото студента" />
      </div>
      <ul className="about-me__links">
        <li className="about-me__link">
          <a href="#" className="about-me__link-name links">
            Статичный сайт
          </a>
          <p className="about-me__link-element links">↗</p>
        </li>
        <li className="about-me__link ">
          <a href="#" className="about-me__link-name links">
            Адаптивный сайт
          </a>
          <p className="about-me__link-element links">↗</p>
        </li>
        <li className="about-me__link">
          <a href="#" className="about-me__link-name links">
            Одностраничное приложение
          </a>
          <p className="about-me__link-element links">↗</p>
        </li>
      </ul>
    </section>
  );
}
