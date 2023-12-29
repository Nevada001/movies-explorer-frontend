import { Link } from "react-router-dom";
import "./Menu.css";

export default function Menu({onClose, isOpen}) {
  return (
    <div className={`menu ${isOpen && 'menu_opened'}`}>
      <button onClick={onClose} className={`menu__close-button links ${isOpen && 'menu__close-button_opened'}`}></button>
      <div className="menu__links">
        <Link onClick={onClose} className="menu__link" to="/">
          Главная
        </Link>
        <Link onClick={onClose} className="menu__link" to="/movies">
          Фильмы
        </Link>
        <Link onClick={onClose} className="menu__link" to="/saved-movies">
          Сохранённые
        </Link>
        <Link className="menu__logo" to="/profile"></Link>
      </div>
    </div>
  );
}
