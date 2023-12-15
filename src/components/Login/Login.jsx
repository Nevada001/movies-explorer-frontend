import "./Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <section className="login">
      <img className="login__logo" src={logo} alt="Логотип" />
      <form className="form">
        <h2 className="login__title">Рады видеть!</h2>
        <p className="login__caption">Имя</p>
        <input className="login__input" />
        <p className="login__caption">E-mail</p>
        <input className="login__input" />
        <button className="login__button links" type="submit">
          Войти
        </button>
        <div className="login__container">
          <p className="login__caption-bottom">Ещё не зарегистрированы?</p>
          <Link className="login__linkAuth links" to="../signup">Регистрация</Link>
        </div>
      </form>
    </section>
  );
}
