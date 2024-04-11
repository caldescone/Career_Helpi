import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function DetailedQuiz() {
  const [questionsComplete] = useState<number>(12);
  const totalQuestions = 15;

  return (
    <div>
    <ProgressBar
      questionsComplete={questionsComplete}
      totalQuestions={totalQuestions}
    />
    <h1> Detailed Quiz</h1>

    <hr></hr>

    <div className="row">
      <div className="column">
        <ol>
          <li>Question 1</li>
          <li>Question 2</li>
          <li>Question 3</li>
          <li>Question 4</li>
        </ol>
      </div>
      <div className="column">
        <ol>
          <li>Question 5</li>
          <li>Question 6</li>
          <li>Question 7</li>
          <li>Question 8</li>
        </ol>
      </div>
    </div>
  <hr></hr>
</div>
  );
}
