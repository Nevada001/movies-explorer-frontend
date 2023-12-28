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
    <header className="header header_color_white">
      <div className="header__container">
        {logoLink}
        <div className="header__links">{isLogin && linksBlack}</div>
        <div className="header__authLinks">
          {isLogin && (
            <Link
              to="../profile"
              className={`links header__button ${
                isLogin && "header__button_color_white"
              }`}
              alt="Кнопка авторизации"
            ></Link>
          )}
          {isLogin && (
            <div onClick={isMenuOpen} className="header__burger links"></div>
          )}
        </div>
      </div>
    </header>
  );

  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="header">
            <div className="header__container">
              {logoLink}
              <div className="header__links"> {isLogin && linksWhite}</div>
              <div className="header__authLinks">
                {!isLogin && (
                  <>
                    <Link to="../signup" className="header__register links">
                      Регистрация
                    </Link>
                    <Link to="../signin" className="header__login  links">
                      Войти
                    </Link>
                  </>
                )}

                {isLogin && (
                  <Link
                    to="../profile"
                    className={`links header__button  ${
                      isLogin && "header__button_color_green"
                    }`}
                    alt="Кнопка авторизации"
                  ></Link>
                )}
                {isLogin && (
                  <div
                    onClick={isMenuOpen}
                    className="header__burger links header__burger_color_white"
                  ></div>
                )}
              </div>
            </div>
          </header>
        }
      />
      <Route path="/movies" element={header} />
      <Route path="/saved-movies" element={header} />
      <Route path="/profile" element={header} />
    </Routes>
  );
}
