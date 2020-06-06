import React, { useCallback } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import styles from "./style.module.css";
import { Link } from "react-router-dom";
const Register = ({ history }) => {
  const handleRegister = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;

      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <div className={styles.logincontainer}>
      <h1>REGISTER</h1>
      <div className={styles.user}>
        <i className="fas fa-user-plus"></i>
      </div>
      <form onSubmit={handleRegister}>
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
          REGISTER
        </button>
        <p>
          Already Registered..?{" "}
          <span className={styles.linkstyle}>
            <Link to="/login">LOGIN</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default withRouter(Register);
