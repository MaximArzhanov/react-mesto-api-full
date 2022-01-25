import React from "react";
import PopupWithForm from './PopupWithForm'

function EditAvatarPopup(props) {

  const inputAvatarRef = React.useRef();

  /** Отправляет запрос к api. Обновляет аватар пользователя */
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({ avatar: inputAvatarRef.current.value });
  }

  /** Очищает поле ввода формы обновления аватарки пользователя */
  React.useEffect(() => {
    inputAvatarRef.current.value = "";
  }, [props.isOpen]); 

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="update-avatar"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
    >
      <input
        id="url-input-avatar"
        className="form__input popup__input_type_link"
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        ref={inputAvatarRef}
      />
      <span className="form__input-error url-input-avatar-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;