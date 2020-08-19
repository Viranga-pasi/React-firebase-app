import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const FinalScore = (props) => {
  // console.log(props.userDetails.email[props.userIndex]);

  const userScore = {
    attempt: props.attempt.map((score) => score.attemptId),
    score: props.attempt.map((score) => score.attemptScore),
  };

  return (
    <div>
      <ul>
        {props.attempt.map((atmpt) => (
          <li key={atmpt.attemptId}>
            Attempt {atmpt.attemptId} : {atmpt.attemptScore}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FinalScore;
