import { Link, Routes, Route } from "react-router-dom";
import "./Header.css";
export default function Header({ isLogin, isMenuOpen }) {
  const logoLink = <Link to="/" className="header__logo" />;
  const linksBlack = (
    <>
      <Link
        to="/movies"
        className="header__link header__link_color_black  links"
      >
        Фильмы
      </Link>
      <Link
        to="/saved-movies"
        className="header__link header__link_color_black links"
      >
        Сохранённые фильмы
      </Link>
    </>
  );

  const linksWhite = (
    <>
      <Link
        to="/movies"
        className="header__link header__link_color_white  links"
      >
        Фильмы
      </Link>
      <Link
        to="/saved-movies"
        className="header__link header__link_color_white links"
      >
        Сохранённые фильмы
      </Link>
    </>
  );
  const header = (
    <div className="header header_color_white">
      <div className="header__container">
        {logoLink}
        <div className="header__links">{isLogin && linksBlack}</div>
        <div className="header__authLinks">
          <Link
            to="../signup"
            className="header__register header__register_color_black links"
          >
            {!isLogin && "Регистрация"}
          </Link>
          <button
            onClick={isMenuOpen}
            className={`links header__button ${
              isLogin && "header__button_color_white"
            }`}
            alt="Кнопка авторизации"
          >
            {!isLogin && "Войти"}
          </button>
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
              <div className="header__links"> {isLogin && linksWhite}</div>
              <div className="header__authLinks">
                <Link to="/signup" className="header__register links">
                  {!isLogin && "Регистрация"}
                </Link>
                <button
                  onClick={isMenuOpen}
                  className={`links header__button  ${
                    isLogin && "header__button_color_green"
                  }`}
                  alt="Кнопка авторизации"
                >
                  {!isLogin && "Войти"}
                </button>
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
