import React, { useContext } from "react";
import firebase from "../../firebase";
import { AuthContext } from "../Auth.js";

const FinalScore = (props) => {
  return (
    <div>
      {props.score}
      {""}
    </div>
  );
};
export default FinalScore;
