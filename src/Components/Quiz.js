import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";
const Quiz = () => {
  const [qdata, setQdata] = useState([]);
  // console.log(qdata.length);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("questions_db").get();

      setQdata(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  const [currentQuestion, serCurrentQuestion] = useState(0);
  const [currentAnswer, serCurrentAnswer] = useState(" ");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState(" ");

  //get database to an object
  const questionArray = {
    question: qdata.map((q) => q.quiz),
    a: qdata.map((q) => q.ans1),
    b: qdata.map((q) => q.ans2),
    c: qdata.map((q) => q.ans3),
    d: qdata.map((q) => q.ans4),
  };

  // console.log(questionArray.question[currentQuestion]);

  const handleClick = (e) => {
    serCurrentAnswer(e.target.value);
  };

  //create  next function
  const next = () => {
    const answer = {
      questionId: currentQuestion,
      answer: currentAnswer,
    };
    answers.push(answer);
    setAnswers(answers);

    console.log(answer);

    if (!currentAnswer) {
      setError("Please Select an Answer");
      return;
    }

    serCurrentAnswer(" ");
    if (currentQuestion + 1 < qdata.length) {
      serCurrentQuestion(currentQuestion + 1);
      return;
    }
  };

  //check user response
  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  return (
    <div className="container">
      <Progress total={qdata.length} current={currentQuestion + 1} />
      <hr />
      <Questions
        questionSet={questionArray}
        currentQuestion={currentQuestion}
      />

      <Answers
        currentQuestion={currentQuestion}
        question={questionArray}
        currentAnswer={currentAnswer}
        handleClick={handleClick}
      />

      {renderError()}
      <button className="btn btn-primary" onClick={next}>
        Next Question
      </button>
    </div>
  );
};
export default Quiz;
