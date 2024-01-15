import "./Login.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useFormValidation from "../hooks/FormValidation";
export default function Login({ isLogin, onLogin}) {


  const navigate = useNavigate();
  const { values, errors, formValid, handleInputChange, resetFormValues } =
    useFormValidation();

  useEffect(() => {
    isLogin && navigate("/profile");
    resetFormValues(
      {
        password: '',
        email: '',
      },
      {},
      false
    );

  }, [isLogin, resetFormValues]);
  
  function handleInputChangeFromHook(e) {
    handleInputChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({email: values.email, password: values.password})
  }
  return (
    <main className="login">
      <img className="login__logo" src={logo} alt="Логотип" />
      <form onSubmit={handleSubmit} className="form">
        <h2 className="login__title">Рады видеть!</h2>
        <p className="login__caption">E-mail</p>
        <input name="email" value={values.email} onChange={handleInputChangeFromHook} className="login__input" />
        <span className={`input-error ${errors && "input-error_active"}`}>
          {errors.email || ""}
        </span>
        <p className="login__caption">Пароль</p>
        <input name="password" value={values.password} onChange={handleInputChangeFromHook} className="login__input" />
        <span className={`input-error ${errors && "input-error_active"}`}>
          {errors.password || ""}
        </span>
        <button disabled={!formValid} className={`login__button links ${!formValid && "login__button_inactive"}`} type="submit">
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
