import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  /** Отправляет запрос к api. Добавляет новую карточку */
  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name,
      link,
    });
  }

  /** Очищает поля ввода формы добавления новой карточки */
  React.useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  /** Записывает название карточки в стейт-переменную */
  function handleChangeName(e) {
    setName(e.target.value);
  }

  /** Записывает ссылку на карточку в стейт-переменную */
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      title="Новое место"
      name="add-new-place"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Создать"
    >
      <input
        id="name-picture-input"
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        required
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={name || ""}
        onChange={handleChangeName}
      />
      <span className="popup__input-error name-picture-input-error"></span>
      <input
        id="url-input-place"
        className="popup__input popup__input_type_link"
        type="url"
        name="link"
        required
        placeholder="Ссылка на картинку"
        value={link || ""}
        onChange={handleChangeLink}
      />
      <span className="popup__input-error url-input-place-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
