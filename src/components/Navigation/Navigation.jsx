import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Navigation.module.scss";

const Navigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.token);

  return (
    <nav className={styles.nav}>
      <Link to="/contacts">Contacts</Link>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
