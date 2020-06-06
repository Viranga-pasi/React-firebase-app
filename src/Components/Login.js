import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "./Auth.js";
import styles from "./style.module.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className={styles.logincontainer}>
      <h1>LOGIN</h1>
      <div className={styles.user}>
        <i className="fas fa-user"></i>
      </div>
      <form onSubmit={handleLogin}>
        <div className={styles.inputfields}>
          <label>
            <i className="fas fa-envelope"></i>
            <input name="email" type="email" placeholder="Enter Email" />
          </label>
        </div>

        <div className={styles.inputfields}>
          <label>
            <i className="fas fa-lock"></i>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </label>
        </div>

        <button type="submit" className={styles.regbtn}>
          LOGIN
        </button>

        <p>
          Don't you have an acoount..?{" "}
          <span className={styles.linkstyle}>
            <Link to="/register">REGISTER</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default withRouter(Login);
