import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmationPopup from "./ConfirmationPopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import api from "../utils/Api";
import auth from "../utils/Auth";
import ProtectedRoute from "./ProtectedRoute";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import "../index.css";

function App() {

  /** Email пользователя */
  const [userEmail, setUserEmail] = React.useState("");

  const navigate = useNavigate();

  /** Имя ссылки (для Header) */
  const [linkName, setLinkName] = React.useState("");
  /** Адрес ссылки (для Header) */
  const [linkRoute, setLinkRoute] = React.useState("");

  /** Записывает имя и адрес ссылки в стейт-переменные */
  function onPage(name, route) {
    setLinkName(name);
    setLinkRoute(route);
  }

  /** Текущий пользователь */
  const [currentUser, setCurrentUser] = React.useState({});

  /** Состояние загрузки */
  const [isLoading, setIsLoading] = React.useState(false);

  /** Состояние регистрации */
  const [isRegistrationSuccsses, setIsRegistrationSuccsses] =
    React.useState(false);

  /** Состояние авторизации */
  const [loggedIn, setLoggedIn] = React.useState(false);

  /** Карточка (Для удаления) */
  const [card, setCard] = React.useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] =
    React.useState(false);
  const [isRegistationResultPopupOpen, setIsRegistationResultPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState({});

  /** Массив загруженных карточек */
  const [cards, setCards] = React.useState([]);

  function handleSetUserEmail(email) {
    setUserEmail(email);
  }

  /** Проверяет наличие токена */
  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth.checkToken(jwt)
        .then((data) => {
          setLoggedIn(true);
          handleSetUserEmail(data.data.email);
          navigate("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  /** Эффект при загрузке приложения */
  React.useEffect(() => {
    tokenCheck();
  }, []);

  /** Выходит из аккаунта. Удаляет токен */
  function handleSignOutClick() {
    navigate("/sign-in");
    localStorage.removeItem("jwt");
    setLoggedIn(false);
  }

  /** Открывает окно редактирования профиля */
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  /** Открывает окно добавления новой карточки */
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  /** Открывает окно обновления аватарки */
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  /** Открывает окно подтверждения */
  function handleConfirmationClick(card) {
    setCard(card);
    setIsConfirmationPopupOpen(true);
  }

  /** Открывает окно с увеличенным изображением */
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  /** Открывает окно с результатом регистрации */
  function handleRegistration(isSuccsses) {
    setIsRegistrationSuccsses(isSuccsses);
    setIsRegistationResultPopupOpen(true);
  }

  /** Закрывает все модальные окна */
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmationPopupOpen(false);
    setIsRegistationResultPopupOpen(false);
    setSelectedCard({});
  }

  /** Запрашивает карточки и информацию о пользователе */
  function getData() {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    Promise.all(
      [
        api.getUserInformation(jwt),
        api.getCards(jwt)
      ])
      .then((data) => {
        setCurrentUser(data[0].data);
        setCards(data[1].data.reverse());
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /** Запрашивает карточки и информацию о пользователе при загрузке страницы */
  React.useEffect(() => {
    getData();
  }, []);

  /** Обновляет информацию о пользователе */
  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api.updateUserInformation(name, about, jwt)
      .then((userInfo) => {
        setCurrentUser(userInfo.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /** Обновляет аватарку пользователя */
  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api.updateUserAvatar(avatar, jwt)
      .then((userAvatar) => {
        setCurrentUser(userAvatar.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /** Добавляет новую карточку */
  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api.addCard(name, link, jwt)
      .then((newCard) => {
        setCards([newCard.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /** Удаляет карточку  */
  function handleCardDeleteSubmit(card) {
    setIsLoading(true);
    const jwt = localStorage.getItem("jwt");
    api.deleteCard(card._id, jwt)
      .then((data) => {
        setCards((state) =>
          state.filter((c) => {
            return c._id !== card._id; //Возвращает все карточки кроме той которую удалили
          })
        );
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  /** Определяет, ставил ли пользователь лайк для текущей карточки
   *   Ставит/удаляет лайк   */
  function handleCardLike(card) {
    const jwt = localStorage.getItem("jwt");
    const isLiked = card.likes.some((id) => id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard.data : c))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  /** Закрывает модальное окно при нажатии кнопки Escape */
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, [])

  /** Обработчик регистрации пользователя */
  function handleUserRegister(password, email) {
    auth.register(password, email)
      .then((data) => {
        navigate('/sign-in');
        handleRegistration(true);
      })
      .catch((err) => {
        console.error(err);
        handleRegistration(false);
      })
  }

  /** Обработчик авторизации пользователя */
  function handleUserAuthorization(password, email) {
    auth.authorization(password, email)
      .then((data) => {
        setUserEmail(email);
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        navigate("/");
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="root">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page root__page">
          <Header
            linkName={linkName}
            linkRoute={linkRoute}
            signOut={handleSignOutClick}
            isLoggedIn={loggedIn}
            userEmail={userEmail}
          />
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Login
                  onPage={onPage}
                  onSubmit={handleUserAuthorization}
                  setUserEmail={setUserEmail}
                />
              }
            />
            <Route
              path="/sign-up"
              element={
                <Register 
                  onPage={onPage} 
                  onSubmit={handleUserRegister}
                />
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  loggedIn={loggedIn}
                  component={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onConfirmation={handleConfirmationClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  isLoading={isLoading}
                  onPage={onPage}
                />
              }
            />
          </Routes>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ConfirmationPopup
          isOpen={isConfirmationPopupOpen}
          onClose={closeAllPopups}
          onConfirmation={handleCardDeleteSubmit}
          isLoading={isLoading}
          card={card}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoToolTip
          isOpen={isRegistationResultPopupOpen}
          name="info-tool-tip"
          onClose={closeAllPopups}
          onUpdateAvatar={handleRegistration}
          isRegistrationSuccsses={isRegistrationSuccsses}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
