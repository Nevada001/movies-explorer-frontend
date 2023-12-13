import { Link, Routes, Route } from "react-router-dom";
import "./Header.css";
import logoHeader from "../../images/logo.svg";

export default function Header({ isLogin}) {
  return (
    <div className="header">
      <div className="header__container">
        {" "}
        <img src={logoHeader} alt="Логотип шапки" />
        <div className={`header__links ${isLogin && `header__links_visible`}`}>
          <Link to='/movies' className="header__link links">Фильмы</Link>
          <Link to='/saved-movies' className="header__link links">Сохранённые фильмы</Link>
        </div>
        <div className="header__authLinks">
          <p className="header__register links">{!isLogin && "Регистрация"}</p>
          <Link to='/profile'
            className={`links header__button ${isLogin && "header__button_isLogin"}`}
            alt="Кнопка авторизации"
          >
            {!isLogin && "Войти"}
          </Link>
        </div>
      </div>
    </div>
  );
}
