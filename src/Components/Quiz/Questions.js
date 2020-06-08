import React from "react";

function Questions(props) {
  return <h2>{props.questionSet.question[props.currentQuestion]}</h2>;
}
export default Questions;
