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
          <a className="promo__button-link links" href="#description">Узнать больше</a>
        </div>
      </div>
    </section>
  );
}
