import "./Profile.css";
export default function Profile() {
  return (
    <main className="profile">
      <form className="form">
        <h2 className="profile__title">Привет, Владислав!</h2>
        <div className="profile__inputs-container">
          <p className="profile__caption">Имя</p>
          <input className="profile__input" value="Владислав" />
        </div>
        <div className="profile__inputs-container">
          <p className="profile__caption">E-mail</p>
          <input className="profile__input" value="olis0001@yandex.ru" />
        </div>
        <div className="profile__button-container">
          <button className="profile__button links" type="submit">
            Редактировать
          </button>
          <button className="profile__linkAuth links" to="../signup">
            Выйти из аккаунта
          </button>
        </div>
      </form>
    </main>
  );
}
