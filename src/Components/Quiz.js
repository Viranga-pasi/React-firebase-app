import React, { useState, useEffect, useContext } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";
import { AuthContext } from "./Auth.js";
import FinalScore from "./Quiz/FinalScore";
import { functions } from "firebase";

const Quiz = (props) => {
  const [qdata, setQdata] = useState([]);
  // console.log("questions", qdata);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("questions_db").get();

      setQdata(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  //get user details from uerDatabase

  const [user, setUser] = useState([]);
  // console.log("User", user);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("user_details").get();

      setUser(data.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  const [userEmail, setUserEmail] = useState([]);

  const userDetails = {
    email: user.map((u) => u.email),
    attempt1: user.map((u) => u.attempt1),
    attempt2: user.map((u) => u.attempt2),
    attempt3: user.map((u) => u.attempt3),
  };

  // console.log(userDetails);
  const { currentUser } = useContext(AuthContext);
  // const [userIndex, setUserIndex] = useState(null);
  let userIndex = null;
  for (let i = 0; i < user.length; i++) {
    if (userDetails.email[i] === currentUser.email) {
      userIndex = i;
    }
  }

  // console.log(userDetails.attempt3[userIndex]);

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
  // console.log(questionArray);
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
      attemptScore: score,
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
    setAnswers([]);
    setCurrentAnswer([]);
    serCurrentQuestion(0);
    setShowResult(false);
    setScore(0);
    checkAttempt();
    // console.log(attempt);
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
          // disabled={attempt.length === 3}
        >
          Restart
        </button>
      </div>
    );
  }
  //limit the user attempt
  if (userDetails.attempt3[userIndex]) {
    return (
      <div className="container">
        <h2>Chances are over</h2>
        <FinalScore attempt={attempt} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <h3>Welcome {props.currentUser}</h3>
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
