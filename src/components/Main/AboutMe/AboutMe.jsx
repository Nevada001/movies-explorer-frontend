import "./AboutMe.css";
import avatar from "../../../images/аватар.jpg";
import { Link } from "react-router-dom";
export default function aboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__header-title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__container">
          <h2 className="about-me__title">Владислав</h2>
          <h3 className="about-me__subtitle">Фронтенд-разработчик, 26 лет</h3>
          <p className="about-me__text">la la la</p>
          <a target="_blank" rel="noreferrer" href="https://github.com/Nevada001" className="about-me__git-caption links">Github</a>
        </div>
        <img className="about-me__image" src={avatar} alt="Фото студента" />
      </div>
    </section>
  );
}
