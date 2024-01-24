import React, { useEffect, useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUser";
import useFormValidation from "../hooks/FormValidation";
export default function Profile({ onUpdate, updateMess, onLogOut }) {
  const currentUser = React.useContext(CurrentUserContext);

  const { values, errors, formValid, handleInputChange, resetFormValues } =
    useFormValidation();

  const isDataSame = values.name  === currentUser.name && values.email === currentUser.email;

  useEffect(() => {
    resetFormValues(
      {
        name: currentUser.name,
        email: currentUser.email,
      },
      {},
      false
    );
  }, [currentUser, resetFormValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({ name: values.name, email: values.email });
  }

  function handleInputChangeFromHook(e) {
    handleInputChange(e);
  }

  function handleLogOut() {
    onLogOut();
  }

  return (
    <main className="profile">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <div className="profile__inputs-container">
          <p className="profile__caption">Имя</p>
          <input
            required
            className="profile__input"
            name="name"
            type="text"
            value={values.name}
            onChange={handleInputChangeFromHook}
          />
        </div>
        <span className= "input-error input-error_active">
          {errors.name || ""}
        </span>
        <div className="profile__inputs-container">
          <p className="profile__caption">E-mail</p>
          <input
            required
            className="profile__input"
            name="email"
            type="text"
            value={values.email}
            onChange={handleInputChangeFromHook}
          />
        </div>
        <span className={`input-error ${errors && "input-error_active"}`}>
          {errors.email || ""}
        </span>
        <div className="profile__button-container">
          <span className="message">{updateMess}</span>
          <button className={`profile__button links ${(!formValid || isDataSame) && 'profile__button_inactive'}`} disabled={!formValid || isDataSame} type="submit">
            Редактировать
          </button>
          <button
            onClick={handleLogOut}
            
            className="profile__linkAuth links"
            to="../signup"
          >
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
