import React, { useContext } from "react";
import firebase from "../firebase";
import Quiz from "./Quiz";
import "./HomePage.css";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth.js";
const Homepage = () => {
  function logout() {
    firebase.auth().signOut();
    //console.log("logout");
  }
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    // console.log(currentUser.email);
  }
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div className="navbar">
        <h1 className="heading">Question App with react + Firebase</h1>

        <button onClick={() => logout()} className="hbtn">
          Sign Out
        </button>
      </div>
      <Quiz currentUser={currentUser.email} />
    </div>
  );
};
export default Homepage;
