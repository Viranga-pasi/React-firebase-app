import React from "react";

function Progress(props) {
  return (
    <h4>
      Question {props.current} of {props.total}
    </h4>
  );
}
export default Progress;
