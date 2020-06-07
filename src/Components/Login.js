import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import firebase from "../firebase";
import { AuthContext } from "./Auth.js";
import "./style.css";

const Login = ({ history }) => {
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      //console.log(email.value);

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
    return (
      <>
        {" "}
        <Redirect to="/" />
      </>
    );
  }

  return (
    <div className="logincontainer">
      <h1>LOGIN</h1>
      <div className="user">
        <i className="fas fa-user"></i>
      </div>
      <form onSubmit={handleLogin}>
        <div className="inputfields">
          <label>
            <i className="fas fa-envelope"></i>
            <input name="email" type="email" placeholder="Enter Email" />
          </label>
        </div>

        <div className="inputfields">
          <label>
            <i className="fas fa-lock"></i>
            <input
              name="password"
              type="password"
              placeholder="Enter Password"
            />
          </label>
        </div>

        <button type="submit" className="regbtn">
          LOGIN
        </button>

        <p>
          Don't you have an acoount..?{" "}
          <span className="linkstyle">
            <Link to="/register">REGISTER</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default withRouter(Login);
