import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function DetailedQuiz() {
  const defaultOption = "";
  const QuestionList = ["What type of career are you interested in?",
    "In your ideal work environment, what type of schedule dynamic would you like for yourself?", 
    "What is the highest level of education you have and would like to achieve?", 
    "Reflecting on your skills and strengths, what types of roles or careers do you think would allow you to leverage them most effectively?", 
    "Have you ever thought about turning a hobby or personal interest into a career? If so, how do you imagine that transition happening?", 
    "Are there any emerging trends or technologies that excite you, and could potentially open up new career paths for you? If so, what are they and why?", 
    "Have you ever considered starting your own business? If so, what skills or expertise do you possess that could be marketable in those areas?", 
    "Have you ever thought about pursuing a career that involves travel or allows you to work remotely? What aspects of such a career appeal to you?"]

  const [answers, setAnswers] = useState<string[]>(new Array(8).fill(defaultOption));
  const [questionsComplete, setQuestionsComplete] = useState<number>(0);
  const totalQuestions = 8;

  const updateAnswer = (index: number, value: string) => {
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
                onChange={(e) => updateAnswer(index, e.target.value)}
              />
              {answers[index].length > 3 ? "✔️" : "❌"}
            </ol>
          </div>
        ))}
        <hr></hr>
        {questionsComplete === answers.length ? (
              <span>
                <div>All Questions Complete!</div>
                <div>When Ready, Please Hit Submit below</div>
              </span>
          ) : (
              <span></span>
          )}
        <button onClick={() => console.log("Submitted")}>Submit</button>
        <hr></hr>
      </div>
    </div>
  );
};