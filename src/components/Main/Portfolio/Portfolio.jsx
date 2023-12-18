import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__name">Портфолио</p>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <a href="https://github.com/Nevada001/how-to-learn" target="_blank" rel="noreferrer"  className="portfolio__link-name links">
            Статичный сайт
          </a>
          <p className="portfolio__link-element links">↗</p>
        </li>
        <li className="portfolio__link ">
          <a target="_blank" href="https://github.com/Nevada001/russian-travel" rel="noreferrer" className="portfolio__link-name links">
            Адаптивный сайт
          </a>
          <p className="portfolio__link-element links">↗</p>
        </li>
        <li className="portfolio__link">
          <a target="_blank" rel="noreferrer" href="https://github.com/Nevada001/react-mesto-api-full-gha" className="portfolio__link-name links">
            Одностраничное приложение
          </a>
          <p className="portfolio__link-element links">↗</p>
        </li>
      </ul>
    </section>
  );
}
