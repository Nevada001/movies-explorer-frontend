import { Link, } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {

  return (
    <section className="notFound">
      <h2 className="notFound__title">404</h2>
      <p className="notFound__text">Страница не найдена</p>
      <Link className="notFound__link" to={-4}>Назад</Link>
    </section>
  );
}
