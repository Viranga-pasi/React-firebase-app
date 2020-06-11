import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const FinalScore = (props) => {
  console.log(props.userDetails.email[props.userIndex]);
  let cue = props.userDetails.email[props.userIndex];
  const userScoreDetails = {
    attempt: props.attempt.map((score) => score.attemptId),
    score: props.attempt.map((score) => score.attemptScore),
  };

  let chance1 = null,
    chance2 = null,
    chance3 = null;
  for (let i = 0; i < userScoreDetails.attempt.length; i++) {
    if (i === 0) {
      chance1 = userScoreDetails.score[i];
    }
    if (i === 1) {
      chance2 = userScoreDetails.score[i];
    }
    if (i === 2) {
      chance3 = userScoreDetails.score[i];
    }
  }
  // console.log(userScoreDetails);
  // console.log(chance1, chance2, chance3);
  // console.log(user);
  return <div></div>;
};
export default FinalScore;
