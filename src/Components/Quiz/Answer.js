import React from "react";

function Answer(props) {
  return (
    <button value={props.letter} className="answer">
      <span className="letter"> {props.letter}.</span> {props.answer}
    </button>
  );
}
export default Answer;
