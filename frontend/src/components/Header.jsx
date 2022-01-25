import React from "react";
import { Link } from "react-router-dom";

function Header(props) {
  const { linkName, linkRoute } = props;

  function signOut() {
    props.signOut();
  }

  return (
    <header className="header">
      <Link to="/" className="header__logo"></Link>
      <div className="header__container">
        <p className="header__email">{props.isLoggedIn && props.userEmail}</p>
        <Link to={linkRoute} className="link header__link" onClick={signOut}>
          {linkName}
        </Link>
      </div>
    </header>
  );
}

export default Header;
