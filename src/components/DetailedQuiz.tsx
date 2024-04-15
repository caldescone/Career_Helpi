import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function DetailedQuiz() {
  const defaultOption = "";
  const QuestionList = ["Question 1","Question 2","Question 3","Question 4","Question 5","Question 6","Question 7","Question 8"]

  const [answers, setAnswers] = useState<string[]>(new Array(8).fill(defaultOption));
  const [questionsComplete, setQuestionsComplete] = useState<number>(0);
  const totalQuestions = 8;

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setQuestionsComplete(newAnswers.filter((answer) => answer.length > 3).length);
  };

  return (
    <div>
      <ProgressBar
        questionsComplete={questionsComplete}
        totalQuestions={totalQuestions}
      />
      <h1> <u> Detailed Quiz </u> </h1>

      <hr></hr>

      <div className="row">
        {[...Array(8)].map((_, index) => (
          <div className="column" key={index}>
            <ol start={index+1}>
              <li>{QuestionList[index]}</li>
              <input
                type="text"
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
              {answers[index].length > 3 ? "✔️" : "❌"}
            </ol>
          </div>
        ))}
        <hr></hr>
        <button onClick={() => console.log("Submitted")}>Submit</button>
        <hr></hr>
      </div>
    </div>
  );
};