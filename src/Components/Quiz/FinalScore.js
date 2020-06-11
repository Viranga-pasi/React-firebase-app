import React, { useEffect, useState } from "react";
import firebase from "../../firebase";

const FinalScore = (props) => {
  // console.log(props.userDetails.email[props.userIndex]);
  let cue = props.userDetails.email[props.userIndex];
  const userScore = {
    attempt: props.attempt.map((score) => score.attemptId),
    score: props.attempt.map((score) => score.attemptScore),
  };
  const [userId, setUserId] = useState([]);
  // console.log(userScore);
  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("user_details").get();

      setUserId(data.docs.map((doc) => doc.id)[props.userIndex]);
    };
    fetchData();
  }, []);

  // console.log("current user id", userId);

  var cUser = firebase.auth().currentUser;
  const updateData = async () => {
    const db = firebase.firestore();
    let usersRef = await db.collection("user_details");
    let { docs } = await usersRef.where("uid", "==", cUser.uid).limit(1).get();
    const { attempts } = docs[0].data();
    await db.collection("user_details").doc(docs[0].id).update({
      attempts: userScore.score,
    });
  };

  updateData();
  return (
    <div>
      <ul>
        {props.attempt.map((atmpt) => (
          <li key={atmpt.attemptId}>
            Attempt {atmpt.attemptId} : {atmpt.attemptScore}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FinalScore;
