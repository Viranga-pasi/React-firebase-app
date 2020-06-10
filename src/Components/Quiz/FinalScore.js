import React, { useContext, useEffect, useState } from "react";
import firebase from "../../firebase";
import { AuthContext } from "../Auth.js";

const FinalScore = (props) => {
  // console.log(props);
  const { currentUser } = useContext(AuthContext);

  const userScoreDetails = {
    attempt: props.attempt.map((score) => score.attemptId),
    score: props.attempt.map((score) => score.attemptScore),
  };

  // console.log(checkUser);
  // console.log("User details : ", userDetails.email[0]);
  // console.log("Current user : ", currentUser.email);

  return <div></div>;
};
export default FinalScore;
