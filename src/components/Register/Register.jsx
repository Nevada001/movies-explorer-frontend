import "./Register.css";
import logo from "../../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFormValidation from "../hooks/FormValidation";
export default function Register({ isLogin, onRegister }) {
  const navigate = useNavigate();
  const { values, errors, formValid, handleInputChange, resetFormValues } =
    useFormValidation();

  useEffect(() => {
    isLogin && navigate("/profile");
  }, [isLogin, resetFormValues]);

  function handleInputChangeFromHook(e) {
    handleInputChange(e);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  }
  return (
    <main className="register">
      <img className="register__logo" src={logo} alt="Логотип" />
      <form onSubmit={handleSubmit} className="form">
        <h2 className="register__title">Добро пожаловать!</h2>
        <p className="register__caption">Имя</p>
        <input
          name="name"
          value={values.name}
          onChange={handleInputChangeFromHook}
          className="register__input"
        />
        <span className="input-error input-error_active">
          {errors.name || ""}
        </span>
        <p className="register__caption">E-mail</p>
        <input
          name="email"
          value={values.email}
          onChange={handleInputChangeFromHook}
          className="register__input"
        />
        <span className="input-error input-error_active">
          {errors.email || ""}
        </span>
        <p className="register__caption">Пароль</p>
        <input
          name="password"
          value={values.password}
          onChange={handleInputChangeFromHook}
          type="password"
          className="register__input"
        />
        <span className="input-error input-error_active">
          {errors.password || ""}
        </span>
        <button
          disabled={!formValid}
          className={`register__button links ${
            !formValid && "register__button_inactive"
          }`}
          type="submit"
        >
          Зарегистрироваться
        </button>
        <div className="register__container">
          <p className="register__caption-bottom">Уже зарегистрированы?</p>
          <Link className="register__linkAuth links" to="../signin">
            Войти
          </Link>
        </div>
      </form>
    </main>
  );
}
