import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import Progress from "./Quiz/Progress";
import Questions from "./Quiz/Questions";
import Answers from "./Quiz/Answers";
import "./assets.css";

import FinalScore from "./Quiz/FinalScore";

const Quiz = (props) => {
  const [qdata, setQdata] = useState([]);
  const [user, setUser] = useState([]);
  const [userId, setUserId] = useState([]);

  // console.log("questions", qdata);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("questions_db").get();

      setQdata(data.docs.map((doc) => doc.data()));
      const userData = await db.collection("user_details").get();

      setUser(userData.docs.map((doc) => doc.data()));
      setUserId(userData.docs.map((doc) => doc.id));
    };
    fetchData();
  }, []);

  //get user details from uerDatabase

  console.log("questions", qdata);

  // const [userEmail, setUserEmail] = useState([]);
  const currentUser = firebase.auth().currentUser;
  // const [userIndex, setUserIndex] = useState(null);
  // console.log("User", currentUser);
  const userDetails = {
    email: user.map((u) => u.email),
    attempt1: user.map((u) => u.attempt1),
    attempt2: user.map((u) => u.attempt2),
    attempt3: user.map((u) => u.attempt3),
    uid: user.map((u) => u.uid),
  };
  let userIndex = null;
  for (let i = 0; i < user.length; i++) {
    if (userDetails.uid[i] === currentUser.uid) {
      userIndex = i;
    }
  }
  // console.log(userIndex);

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
  console.log("question", questionArray);
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

  // console.log(userId[userIndex]);
  // console.log(userIndex);
  // setScore(count);
  //create  next function
  const next = () => {
    const answer = {
      questionId: currentQuestion,
      answer: currentAnswer,
    };
    answers.push(answer);
    setAnswers(answers);

    countResult(questionArray.correct_answer[currentQuestion], currentAnswer);

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

    if (userDetails.attempt1[userIndex] === "") {
      const db = firebase.firestore();
      db.collection("user_details")
        .doc(userId[userIndex])
        .update({ attempt1: score });

      console.log("attempt1 : ", score);
    } else {
      if (userDetails.attempt2[userIndex] === "") {
        const db = firebase.firestore();
        db.collection("user_details")
          .doc(userId[userIndex])
          .update({ attempt2: score });

        console.log("attempt2 : ", score);
      } else {
        if (userDetails.attempt3[userIndex] === "") {
          const db = firebase.firestore();
          db.collection("user_details")
            .doc(userId[userIndex])
            .update({ attempt3: score });

          console.log("attempt3 : ", score);
        }
      }
    }

    const fetchData = async () => {
      const db = firebase.firestore();

      const userData = await db.collection("user_details").get();

      setUser(userData.docs.map((doc) => doc.data()));
    };
    fetchData();
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
        <h3>Current Attempt : {score}</h3>
        <h4>Previous Score</h4>
        <ul>
          {attempt.map((atmpt) => (
            <li key={atmpt.attemptId}>
              Attempt {atmpt.attemptId} : {atmpt.attemptScore}
            </li>
          ))}
        </ul>

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
        <h3>Sorry {userDetails.email[userIndex]}</h3>
        <h2>Your Chances are over</h2>
        <h4>Attempt 1 : {userDetails.attempt1[userIndex]}</h4>
        <h4>Attempt 2 : {userDetails.attempt2[userIndex]}</h4>
        <h4>Attempt 3 : {userDetails.attempt3[userIndex]}</h4>
      </div>
    );
  }
  if (attempt.length === 3) {
    return (
      <div className="container">
        <h3>Sorry {props.currentUser}</h3>
        <h2>Your Attempts exceds</h2>
        <FinalScore
          attempt={attempt}
          userIndex={userIndex}
          userDetails={userDetails}
          user={user}
        />
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
