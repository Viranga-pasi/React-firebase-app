import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";
import FinalScore from "./Quiz/FinalScore";
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
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [error, setError] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [score, setScore] = useState(0);

  //get database to an object
  const questionArray = {
    question: qdata.map((q) => q.quiz),
    a: qdata.map((q) => q.answer_a),
    b: qdata.map((q) => q.answer_b),
    c: qdata.map((q) => q.answer_c),
    d: qdata.map((q) => q.answer_d),
    id: qdata.map((q) => q.id),
    correct_answer: qdata.map((q) => q.correct_answer),
  };

  const question = questionArray.question[currentQuestion];
  // console.log(questionArray.correct_answer);
  //answer click event
  const handleClick = (e) => {
    setCurrentAnswer(e.target.value);
    setError("");
  };

  //result check
  let count = 1;
  const countResult = (dbAnswer, userAnswer) => {
    if (dbAnswer === userAnswer) {
      // console.log("array: ", dbAnswer);
      // console.log("user :", userAnswer);
      count = +1;

      // console.log("count : ", count);
    }
    setScore(count);
    // console.log("score : ", score);
  };
  //create  next function
  const next = () => {
    const answer = {
      questionId: currentQuestion,
      answer: currentAnswer,
    };
    answers.push(answer);
    setAnswers(answers);
    {
      countResult(questionArray.correct_answer[currentQuestion], currentAnswer);
    }
    if (!currentAnswer) {
      setError("Please Select an Answer");
      return;
    }

    setCurrentAnswer("");
    if (currentQuestion + 1 < qdata.length) {
      serCurrentQuestion(currentQuestion + 1);
      return;
    }

    setShowResult(true);
  };

  //restart function
  const restart = () => {
    setAnswers([]);
    setCurrentAnswer([]);
    serCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
  };

  // check user response
  const renderError = () => {
    if (!error) {
      return;
    }
    return <div className="error">{error}</div>;
  };

  //end screen
  if (showResult) {
    return (
      <div className="container result">
        <h2>Results</h2>
        <hr />
        <FinalScore score={score} />
        <button className="btn btn-primary" onClick={restart}>
          Restart
        </button>
      </div>
    );
  } else {
    return (
      <div className="container">
        <Progress total={qdata.length} current={currentQuestion + 1} />
        <hr />
        <Questions question={question} />

        <Answers
          currentQuestion={currentQuestion}
          question={questionArray}
          currentAnswer={currentAnswer}
          handleClick={handleClick}
        />
        <br />
        {renderError()}

        <br />
        <button
          className="btn btn-primary"
          onClick={next}
          // disabled={!currentAnswer}
        >
          Next Question
        </button>
      </div>
    );
  }
};
export default Quiz;
