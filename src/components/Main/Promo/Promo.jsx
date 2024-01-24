//import { Link } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import logoLanding from "../../../images/landing-logo.svg";
import "./Promo.css";
export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <img
          className="promo__image"
          src={logoLanding}
          alt="Изображение лэндинга"
        />
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__caption">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link
            activeClass="active"
            smooth={true}
            duration={500}
            className="promo__button-link links"
            to="description"
          >
            Узнать больше
          </Link>
        </div>
      </div>
    </section>
  );
}
