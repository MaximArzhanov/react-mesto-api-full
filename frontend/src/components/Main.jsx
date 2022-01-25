import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  /** Записывает имя и адрес ссылки в стейт-переменные */
  React.useEffect(() => {
    props.onPage("Выйти", "/sign-in");
  }, []);

  /** Подписка на контекст CurrentUserContext */
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка пользователя."
          />
          <button
            className="profile__edit-avatar"
            onClick={props.onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="places content__places">
        <ul className="cards">
          {props.cards.map(({ ...card }) => (
            <Card
              onCardClick={props.onCardClick}
              key={card._id}
              card={{ ...card }}
              onConfirmation={props.onConfirmation}
              onCardLike={props.onCardLike}
            ></Card>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
