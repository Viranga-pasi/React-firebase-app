import React from "react";
import Answer from "./Answer";
function Answers(props) {
  return (
    <>
      <Answer letter="A" answer="Framework" />
      <Answer letter="B" answer="Angular" />
      <Answer letter="C" answer="Javascript" />
      <Answer letter="D" answer="HTML" />

      <button className="btn btn-primary">Comfirm and Continue</button>
    </>
  );
}
export default Answers;
