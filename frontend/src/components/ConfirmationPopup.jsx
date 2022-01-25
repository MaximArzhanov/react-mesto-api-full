import React from "react";
import PopupWithForm from './PopupWithForm'

function ConfirmationPopup(props) {

  /** Отправляет запрос к api. Удаляет карточку */
  function handleSubmit(e) {
    e.preventDefault();
    props.onConfirmation(props.card);
  }

  return (
    <PopupWithForm
      title="Вы уверены?"
      name="confirmation"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Да"
    ></PopupWithForm>
  );
}

export default ConfirmationPopup;