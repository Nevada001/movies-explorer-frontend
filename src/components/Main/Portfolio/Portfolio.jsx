import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__name">Портфолио</p>
      <ul className="portfolio__links">
        <li className="portfolio__link">
          <button  className="portfolio__link-name links">
            Статичный сайт
          </button>
          <p className="portfolio__link-element links">↗</p>
        </li>
        <li className="portfolio__link ">
          <button  className="portfolio__link-name links">
            Адаптивный сайт
          </button>
          <p className="portfolio__link-element links">↗</p>
        </li>
        <li className="portfolio__link">
          <button  className="portfolio__link-name links">
            Одностраничное приложение
          </button>
          <p className="portfolio__link-element links">↗</p>
        </li>
      </ul>
    </section>
  );
}
