import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";
const Quiz = () => {
  const [qdata, setQdata] = useState([]);

  const [questions, setQuestions] = useState({ quiz: "" });
  console.log("data from database", qdata);
  //   console.log("each", questions[0].quiz);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("questions_db").get();
      // setQuestions(
      //   data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      // );
      setQdata(data.docs.map((doc) => doc.data()));
      //   setQuestions(qdata.map((questions) => questions.quiz()));
    };
    fetchData();
  }, []);

  // setQuestions(qdata.map((questions) => questions.quiz));

  //const question = questions[0].quiz;

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

      <Progress total="3" current="1" />
      <Questions question={"What is react"} />
      <Answers />
    </div>
  );
};
export default Quiz;
