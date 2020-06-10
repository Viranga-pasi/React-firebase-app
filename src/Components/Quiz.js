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
  const [attempt, setAttempt] = useState([]);
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
  let count = 0;
  const countResult = (dbAnswer, userAnswer) => {
    if (dbAnswer === userAnswer) {
      // console.log("array: ", dbAnswer);
      // console.log("user :", userAnswer);
      setScore((count) => count + 1);
    }

    // console.log("score : ", score);
  };
  useEffect(() => {
    // console.log("count : ", count);
  }, [count]);

  // setScore(count);
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
  const [i, setI] = useState(0);
  const checkAttempt = () => {
    const attempCount = {
      attemptId: i + 1,
      attempScore: score,
    };
    attempt.push(attempCount);
    setAttempt(attempt);
    setI((i) => i + 1);
  };
  useEffect(() => {
    // console.log("count : ", count);
  }, [i]);
  //restart function
  const restart = () => {
    if (attempt.length === 3) {
      console.log("Chances are over");
    }
    setAnswers([]);
    setCurrentAnswer([]);
    serCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    checkAttempt();
    console.log(attempt);
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
        <h3>Score : {score}</h3>

        <button
          className="btn btn-primary"
          onClick={restart}
          disabled={attempt.length === 3}
        >
          Restart
        </button>
      </div>
    );
  }
  if (attempt.length === 3) {
    return (
      <div className="container">
        <h2>Chances are over</h2>
        <FinalScore attempt={attempt} />
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
          disabled={!currentAnswer}
        >
          Next Question
        </button>
      </div>
    );
  }
};
export default Quiz;
