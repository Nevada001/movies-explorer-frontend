import "./Techs.css";

export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__content">
        <h2 className="techs__header-title">Технологии</h2>
        <h2 className="techs__title">7 технологий</h2>
        <p className="techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="techs__container">
          <li className="techs__element">
            <p className="techs__name">HTML</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">CSS</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">JS</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">React</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">Git</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">Express.js</p>
          </li>
          <li className="techs__element">
            <p className="techs__name">mongoDB</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
