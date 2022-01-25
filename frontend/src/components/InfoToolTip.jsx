import React from "react";

function InfoToolTip(props) {
  const { isRegistrationSuccsses } = props;

  const popupImageClassName = isRegistrationSuccsses
    ? "popup__image_type_success"
    : "popup__image_type_error";

  return (
    <div
      className={`popup popup_type_${props.name}
                  ${props.isOpen && "popup_opened"}`}
    >
      <div className="popup__container popup__container_type_form">
        <div className={popupImageClassName}></div>
        <p className="popup__title popup__title_type_center">
          {isRegistrationSuccsses
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
        <button
          className="popup__icon-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
