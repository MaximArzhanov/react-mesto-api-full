import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_image
                  ${Object.keys(props.card).length !== 0 && "popup_opened"}`}
    >
      <div className="popup__container">
        <figure className="popup__container-image">
          <img
            className="popup__image"
            src={props.card.link}
            alt={props.card.title}
          />
          <figcaption className="popup__image-title">
            {props.card.name}
          </figcaption>
        </figure>
        <button
          className="popup__icon-close"
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
