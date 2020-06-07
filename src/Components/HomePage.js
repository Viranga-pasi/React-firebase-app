import React from "react";
import firebase from "../firebase";
import Quiz from "./Quiz";
const Homepage = () => {
  function logout() {
    firebase.auth().signOut();
    console.log("logout");
  }

  return (
    <div>
      <button onClick={() => logout()}>Sign Out</button>
      <h1>Question App</h1>
      <Quiz />
    </div>
  );
};
export default Homepage;
