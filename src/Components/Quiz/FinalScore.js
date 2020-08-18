import React from "react";

const FinalScore = (props) => {
  // console.log(props.userDetails.email[props.userIndex]);

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
