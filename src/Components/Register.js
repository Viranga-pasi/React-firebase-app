import React, { useCallback, useEffect, useState } from "react";
// import React, { useCallback, useState, useEffect } from "react";
import { withRouter } from "react-router";
import firebase from "../firebase";
import "./style.css";
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

  const [user, setUser] = useState([]);
  const [newUser, setNewUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userdb = firebase.firestore();
      const data = await userdb.collection("user_details").get();
      setUser(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  // console.log(user);
  // const userEmail = user.map((q) => q.email);
  console.log(user);
  function onCreate() {
    const db = firebase.firestore();
    db.collection("user_details").add({ email: newUser });
    db.collection("user_details")
      .doc(user.id)
      .add({ ...user, attempt1: null, attempt2: null, attmpt3: null });
  }

  return (
    <div className="logincontainer">
      <h1>REGISTER</h1>
      <div className="user">
        <i className="fas fa-user-plus"></i>
      </div>
      <form onSubmit={handleRegister}>
        {/* <form onSubmit={handleRegister}> */}
        <div className="inputfields">
          <label>
            <i className="fas fa-envelope"></i>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setNewUser(e.target.value)}
            />
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

        <button type="submit" className="regbtn" onClick={onCreate}>
          REGISTER
        </button>
        <p>
          Already Registered..?{" "}
          <span className="linkstyle">
            <Link to="/login">LOGIN</Link>
          </span>
        </p>
      </form>
    </div>
  );
};
export default withRouter(Register);
