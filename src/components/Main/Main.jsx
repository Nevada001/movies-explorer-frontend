import "./Main.css";
import NavTab from "./NavTab/NavTab";
import Promo from "./Promo/Promo";


export default function Main() {
  return (
    <main className="content">
      <Promo />
      <NavTab />
      <section className="info">
        <h2 className="info__title">О проекте</h2>
        <article className="info__about-project">
          <div className="info-container">
            <h3 className="info__article">Дипломный проект включал 5 этапов</h3>
            <p className="info__caption">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="info__container">
            <h3 className="info__article">
              На выполнение диплома ушло 5 недель
            </h3>

            <p className="info__caption">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </article>
        <div className="info__duration-line">
          <p className="info__week-backend">1 неделя</p>
          <p className="info__week-frontend">4 недели</p>
        </div>
        <div className="info__duration-line">
        <p className="info__duration-caption">Back-end</p>
        <p className="info__duration-caption">Front-end</p>
        </div>
        
      </section>
    </main>
  );
}
