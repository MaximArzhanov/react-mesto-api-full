import React from "react";
import AuthPage from "./AuthPage";

function Login(props) {

  /** Записывает имя и адрес ссылки в стейт-переменные */
  React.useEffect(() => {
    props.onPage("Регистрация", "/sign-up");
  }, []);

  return (
    <AuthPage
      title="Вход"
      textButton="Войти"
      onSubmit={props.onSubmit}
    />
  );
}

export default Login;
