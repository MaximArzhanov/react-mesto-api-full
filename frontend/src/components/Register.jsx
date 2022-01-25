import React from "react";
import { Link } from "react-router-dom";
import AuthPage from "./AuthPage";

function Register(props) {
  /** Записывает имя и адрес ссылки в стейт-переменные */
  React.useEffect(() => {
    props.onPage("Войти", "/sign-in");
  }, []);

  return (
    <AuthPage
      title="Регистрация"
      textButton="Зарегистрироваться"
      onSubmit={props.onSubmit}
    >
      <Link to="/sign-in" className="link link_type_small">
        Уже зарегистрированы? Войти
      </Link>
    </AuthPage>
  );
}

export default Register;
