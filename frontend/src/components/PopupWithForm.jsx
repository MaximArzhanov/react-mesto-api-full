import React from "react";

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name}
                  ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container_type_form">
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="form"
          name={`form-${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button className="form__button" type="submit">
            {props.isLoading ? `${props.buttonText}...` : `${props.buttonText}`}
          </button>
        </form>
        <button
          className="popup__icon-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
