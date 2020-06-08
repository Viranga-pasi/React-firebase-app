import React from "react";

function Progress(props) {
  return (
    <h4>
      QUESTION {props.current} OF {props.total}
    </h4>
  );
}
export default Progress;
