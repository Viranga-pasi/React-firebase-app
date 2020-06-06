import React from "react";
import firebase from "../firebase";

const Homepage = () => {
  return (
    <div>
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
      <h1>Quiz Page</h1>
    </div>
  );
};
export default Homepage;
