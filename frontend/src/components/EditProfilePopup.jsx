import React from "react";
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  /** Текущий пользователь */
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  /** Записывает информацию о пользователе в стейт-переменные */
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  /** Отправляет запрос к api. Обновляет информацию о пользователе */
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  /** Записывает имя пользователя в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  /** Записывает описание пользователя в стейт-переменную */
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="edit-profile"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
    >
      <input
        id="name-user-input"
        className="form__input popup__input_type_name"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="40"
        placeholder="Имя пользователя"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="form__input-error name-user-input-error"></span>
      <input
        id="description-input"
        className="form__input popup__input_type_description"
        type="text"
        name="description"
        required
        minLength="2"
        maxLength="200"
        placeholder="Информация о пользователе"
        value={description || ""}
        onChange={handleChangeDescription}
      />
      <span className="form__input-error description-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;