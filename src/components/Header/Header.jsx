import {Link, Routes, Route } from 'react-router-dom'
import './Header.css';
import logoHeader from "../../images/logo.svg"


export default function Header({isLogin, headerButttonText}) {
  return (
    <div className="header">
      <img src={logoHeader} alt="Логотип шапки" />
      <div className={`header__links ${isLogin && `header__links_visible`}`}>
        <p className="header__link">Фильмы</p>
        <p className="header__link">Сохранённые фильмы</p>
      </div>
      <div className='header__authLinks'>
      <p className='header__register'>{!isLogin && "Регистрация"}</p>
      <button className={`header__button ${isLogin && 'header__button_isLogin'}`}  alt="Кнопка авторизации">{!isLogin && "Войти"}</button>
      </div>
    </div>
  )

}
