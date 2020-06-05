import React from "react";
import firebase from "../firebase";

const Homepage = () => {
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
    </div>
  );
};
export default Homepage;
