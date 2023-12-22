import "./Portfolio.css";

export default function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__name">Портфолио</p>
      <div className="portfolio__links">
        <a
          href="https://nevada001.github.io/how-to-learn"
          target="_blank"
          rel="noreferrer"
          className="portfolio__link links"
        >
          <p className="portfolio__link-name">Статичный сайт</p>
          <p className="portfolio__link-element">↗</p>
        </a>
        <a
          target="_blank"
          href="https://nevada001.github.io/russian-travel"
          rel="noreferrer"
          className="portfolio__link links"
        >
          <p className="portfolio__link-name">Адаптивный сайт</p>
          <p className="portfolio__link-element">↗</p>
        </a>
        <a
          className="portfolio__link links"
          target="_blank"
          rel="noreferrer"
          href="https://nevada001.github.io/react-mesto-api-full-gha"
        >
          <p className="portfolio__link-name">Одностраничное приложение</p>
          <p className="portfolio__link-element">↗</p>
        </a>
      </div>
    </section>
  );
}
