import "./AboutProject.css";

export default function AboutProject() {
  return (
    <section id="description" className="about">
      <div className="about__content">
        <h2 className="about__title">О проекте</h2>
        <article className="about__about-project">
          <div className="about__container">
            <h3 className="about__article">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__container">
            <h3 className="about__article">
              На выполнение диплома ушло 5 недель
            </h3>

            <p className="about__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </article>
        <div className="about__duration-line">
          <p className="about__week-backend">1 неделя</p>
          <p className="about__week-frontend">4 недели</p>
        </div>
        <div className="about__duration-line">
          <p className="about__duration-caption">Back-end</p>
          <p className="about__duration-caption">Front-end</p>
        </div>
      </div>
    </section>
  );
}
