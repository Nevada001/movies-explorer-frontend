import "./Login.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Login({onLogin}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email, password})
  }
  return (
    <main className="login">
      <img className="login__logo" src={logo} alt="Логотип" />
      <form onSubmit={handleSubmit} className="form">
        <h2 className="login__title">Рады видеть!</h2>
        <p className="login__caption">E-mail</p>
        <input onChange={({target: {value}}) => setEmail(value)} className="login__input" />
        <p className="login__caption">Пароль</p>
        <input onChange={({target: {value}}) => setPassword(value)} className="login__input" />
        <button className="login__button links" type="submit">
          Войти
        </button>
        <div className="login__container">
          <p className="login__caption-bottom">Ещё не зарегистрированы?</p>
          <Link className="login__linkAuth links" to="../signup">Регистрация</Link>
        </div>
      </form>
    </main>
  );
}
