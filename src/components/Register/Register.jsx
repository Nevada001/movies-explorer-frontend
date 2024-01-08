import "./Register.css";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
export default function Register({onRegister}) {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    onRegister({name, email, password})
  }
  return (
    <main className="register">
      <img className="register__logo" src={logo} alt="Логотип" />
      <form onSubmit={handleSubmit} className="form">
        <h2 className="register__title">Добро пожаловать!</h2>
        <p className="register__caption">Имя</p>
        <input value={name} onChange={({target:{value}}) => setName(value)} className="register__input" />
        <p className="register__caption">E-mail</p>
        <input value={email} onChange={({target:{value}}) => setEmail(value)} className="register__input" />
        <p className="register__caption">Пароль</p>
        <input value={password} onChange={({target:{value}})=> setPassword(value)} type="password" className="register__input" />
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
