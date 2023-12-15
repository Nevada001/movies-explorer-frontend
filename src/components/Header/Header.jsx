import { Link, Routes, Route } from "react-router-dom";
import "./Header.css";
export default function Header({ isLogin }) {
  const logoLink = <Link to="/" className="header__logo" />;
  const header = (
    <div className="header header_color_white">
      <div className="header__container">
        {logoLink}
        <div className={`header__links ${isLogin && `header__links_visible`}`}>
          <Link to="/movies" className="header__link header__link_active links">
            Фильмы
          </Link>
          <Link to="/saved-movies" className="header__link links">
            Сохранённые фильмы
          </Link>
        </div>
        <div className="header__authLinks">
          <Link
            to="../signup"
            className="header__register header__register_color_black links"
          >
            {!isLogin && "Регистрация"}
          </Link>
          <Link
            to="../profile"
            className={`links header__button ${
              isLogin && "header__button_auth_active"
            }`}
            alt="Кнопка авторизации"
          >
            {!isLogin && "Войти"}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="header">
            <div className="header__container">
              {logoLink}
              <div
                className={`header__links ${
                  isLogin && `header__links_visible`
                }`}
              >
                <Link
                  to="/movies"
                  className="header__link header__link_color_white links"
                >
                  Фильмы
                </Link>
                <Link
                  to="/saved-movies"
                  className="header__link header__link_color_white links"
                >
                  Сохранённые фильмы
                </Link>
              </div>
              <div className="header__authLinks">
                <p className="header__register links">
                  {!isLogin && "Регистрация"}
                </p>
                <Link
                  to="/profile"
                  className={`links header__button header__button_color_white ${
                    isLogin && "header__button_auth_active"
                  }`}
                  alt="Кнопка авторизации"
                >
                  {!isLogin && "Войти"}
                </Link>
              </div>
            </div>
          </div>
        }
      />
      <Route path="/movies" element={header} />
      <Route path="/saved-movies" element={header} />
      <Route path="/profile" element={header} />
    </Routes>
  );
}
