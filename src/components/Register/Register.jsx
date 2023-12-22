import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
export default function Register() {
  return (
    <main className="register">
      <img className="register__logo" src={logo} alt="Логотип" />
      <form className="form">
        <h2 className="register__title">Добро пожаловать!</h2>
        <p className="register__caption">Имя</p>
        <input className="register__input" />
        <p className="register__caption">E-mail</p>
        <input className="register__input" />
        <p className="register__caption">Пароль</p>
        <input type="password" className="register__input" />
        <button className="register__button links" type="submit">
          Зарегистрироваться
        </button>
        <div className="register__container">
          <p className="register__caption-bottom">Уже зарегистрированы?</p>
          <Link className="register__linkAuth links" to="../signin">Войти</Link>
        </div>
      </form>
    </main>
  );
}
