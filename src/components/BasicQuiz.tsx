import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "./ProgressBar";

export default function BasicQuiz() {
  const [questionsComplete] = useState<number>(12);
  const totalQuestions = 15;

  return (
    <div>
      <ProgressBar
        questionsComplete={questionsComplete}
        totalQuestions={totalQuestions}
      />
      <h1> <u> Basic Quiz </u> </h1>
      <hr></hr>

      <div className="row">
        <div className="column">
          <ol>
            <li>Question 1</li>
            
            <br></br>
            <li>Question 2</li>
            
            <br></br>
            <li>Question 3</li>
            
            <br></br>
            <li>Question 4</li>
            
          </ol>
        </div>
        <div className="column">
          <ol>
            <li>Question 5</li>
            
            <br></br>
            <li>Question 6</li>
            
            <br></br>
            <li>Question 7</li>
            
            <br></br>
            <li>Question 8</li>
            
            <br></br>
          </ol>
        </div>
      </div>
    <hr></hr>
  </div>
      
  );
}
