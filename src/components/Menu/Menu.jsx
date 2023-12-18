import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu({onClose, isOpen}) {
  return (
    <section className={`menu ${isOpen && 'menu_opened'}`}>
      <button onClick={onClose} className={`menu__close-button links ${isOpen && 'menu__close-button_opened'}`}></button>
      <div className="menu__links">
        <Link className="menu__link" to="/">
          Главная
        </Link>
        <Link className="menu__link" to="/movies">
          Фильмы
        </Link>
        <Link className="menu__link" to="/saved-movies">
          Сохранённые
        </Link>
        <Link className="menu__logo" to="/profile"></Link>
      </div>
    </section>
  );
}
