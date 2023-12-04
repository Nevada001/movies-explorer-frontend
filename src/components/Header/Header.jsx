import {Link, Routes, Route } from 'react-router-dom'
import logoHeader from "../../images/logo.svg";
import logoAuth from '../../images/profile.svg';
import './Header.css'
export default function Header({isLogin}) {
  return (
    <div className="header">
    <img src={logoHeader} alt="Логотип шапки" />
    <div className={`header__links ${isLogin && `header__links_visible`}`}>
      <p className="header__link">Фильмы</p>
      <p className="header__link">Сохранённые фильмы</p>
    </div>
   <img src={logoAuth} alt="Логотип авторизации"/>
  </div>
  )

}
