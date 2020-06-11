import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const FinalScore = (props) => {
  // console.log(props.userDetails.email[props.userIndex]);
  let cue = props.userDetails.email[props.userIndex];
  const userScoreDetails = {
    attempt: props.attempt.map((score) => score.attemptId),
    score: props.attempt.map((score) => score.attemptScore),
  };
  const [user, setUser] = useState([]);
  // console.log(userScoreDetails);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("user_details").get();

      setUser(data.docs.map((doc) => doc.id));
    };
    fetchData();
  }, []);

  console.log(user[props.userIndex]);

  let chance1 = null,
    chance2 = null,
    chance3 = null;
  for (let i = 0; i < userScoreDetails.attempt.length; i++) {
    if (i === 0) {
      chance1 = userScoreDetails.score[i];
      props.userDetails.attempt1[props.userIndex] = chance1;
    }
    if (i === 1) {
      chance2 = userScoreDetails.score[i];
      props.userDetails.attempt2[props.userIndex] = chance1;
    }
    if (i === 2) {
      chance3 = userScoreDetails.score[i];
      props.userDetails.attempt3[props.userIndex] = chance1;
    }
  }

  const db = firebase.firestore();
  // db.collection("user_details")
  //   .doc(user[props.userIndex])
  //   .set(
  //     ...props.userDetails,
  //     props.userDetails.attempt1[props.userIndex],
  //     props.userDetails.attempt2[props.userIndex],
  //     props.userDetails.attempt3[props.userIndex]
  //   );

  // console.log(userScoreDetails);
  // console.log(chance1, chance2, chance3);
  // console.log(user);
  return <div></div>;
};
export default FinalScore;
