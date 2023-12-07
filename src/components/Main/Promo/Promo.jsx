import logoLanding from "../../../images/landing-logo.svg";
import "./Promo.css";
export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__content">
        <div className="promo__container">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб-разработки.
          </h1>
          <p className="promo__caption">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <button className="promo__button-info">Узнать больше</button>
        </div>
        <img
          className="promo__image"
          src={logoLanding}
          alt="Изображение лэндинга"
        />
      </div>
    </section>
  );
}
