import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function BasicQuiz() {
  const [questionsComplete] = useState<number>(12);
  const totalQuestions = 15;

  return (
    <div className="quiz">
      <ProgressBar
        questionsComplete={questionsComplete}
        totalQuestions={totalQuestions}
      />
      <h1> Basic Quiz</h1>
    </div>
  );
}
