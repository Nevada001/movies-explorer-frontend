import React, { useState } from "react";
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUser";
export default function Profile({onUpdate, onLogOut}) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate({name, email})
  }

  function handleLogOut() {
    onLogOut()
  }

  return (
    <main className="profile">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="profile__title">Привет, {currentUser.name}</h2>
        <div className="profile__inputs-container">
          <p className="profile__caption">Имя</p>
          <input className="profile__input" type="text" value={name} onChange={({target: {value}}) => setName(value)}  />
        </div>
        <div className="profile__inputs-container">
          <p className="profile__caption">E-mail</p>
          <input className="profile__input" type="text" value={email} onChange={({target: {value}}) => setEmail(value)} />
        </div>
        <div className="profile__button-container">
          <button className="profile__button links" type="submit">
            Редактировать
          </button>
          <button onClick={handleLogOut} className="profile__linkAuth links" to="../signup">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
