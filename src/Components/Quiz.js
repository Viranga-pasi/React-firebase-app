import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";
const Quiz = () => {
  const [qdata, setQdata] = useState([]);

  //   const [questions, setQuestions] = useState({ quiz: "" });
  console.log(qdata);
  //   console.log("each", questions[0].quiz);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("questions_db").get();

      setQdata(data.docs.map((doc) => doc.data()));
      //   setQuestions(qdata.map((questions) => questions.quiz()));
    };
    fetchData();
  }, []);

  // setQuestions(qdata.map((questions) => questions.quiz));

  let question = [];
  question.map((qdata) => qdata.quiz);
  console.log(question[0]);

  return (
    <div className="container">
      <div>
        {/* <ol>
        {questions.map((question) => (
          <li key={question.quiz}>
            {question.quiz}
            <ol key={question.ans}>
              <li>{question.ans1}</li>
              <li>{question.ans2}</li>
              <li>{question.ans3}</li>
              <li>{question.ans4}</li>
              <input
                value={answer}
                onChange={(e) => {
                  setAnswer(e.target.value);
                }}
                placeholder="Enter Answer"
              />
            </ol>
          </li>
        ))}
      </ol>
      <button onClick={load}>Next</button> */}
      </div>

      <Progress total={qdata.length} current="1" />
      <Questions question={"What is react"} />
      <Answers />
    </div>
  );
};
export default Quiz;
