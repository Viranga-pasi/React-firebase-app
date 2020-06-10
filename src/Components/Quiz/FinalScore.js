import React, { useContext } from "react";
import firebase from "../../firebase";
import { AuthContext } from "../Auth.js";

const FinalScore = (props) => {
  console.log(props);
  const quizDetails = {
    id: props.map((q) => q.attemptId),
    score: props.map((q) => q.attempScore),
  };
  return <div></div>;
};
export default FinalScore;
