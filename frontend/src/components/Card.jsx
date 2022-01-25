import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

//const Card = React.memo(({ onCardClick, onCardLike, card, onConfirmation }) => {
function Card({ onCardClick, onCardLike, card, onConfirmation }) {
  /** Подписка на контекст CurrentUserContext */
  const currentUser = React.useContext(CurrentUserContext);

  /** Определяет, является ли пользователь владельцем текущей карточки */
  const isOwn = card.owner._id === currentUser._id;

  /** Содержит классы для кнопки удаления карточки  */
  const cardDeleteButtonClassName = `card__trash ${
    isOwn ? "" : "card__trash_disable"
  }`;

  /** Определяет, ставил ли пользователь лайк для текущей карточки */
  const isLiked = card.likes.some((i) => i === currentUser._id);

  /** Содержит классы для кнопки лайк */
  const cardLikeButtonClassName = `card__icon-like ${
    isLiked ? "card__icon-like_active" : ""
  }`;

  /** Событие при клике на изображение карточки */
  function handleClick() {
    onCardClick(card);
  }

  /** Событие при клике на кнопку "лайк" */
  function handleLikeClick() {
    onCardLike(card);
  }

  /** Событие при клике на кнопку "удалить" (Открывает окно подтверждения) */
  function handleDeleteClick() {
    onConfirmation(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <h2 className="card__name">{card.name}</h2>
      <div className="card__like-container">
        <button
          className={cardLikeButtonClassName}
          type="button"
          onClick={handleLikeClick}
        ></button>
        <span className="card__like-counter">{card.likes.length}</span>
      </div>
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      ></button>
    </li>
  );
//}); 
}

export default Card;