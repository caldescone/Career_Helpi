import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "./ProgressBar";

export default function DetailedQuiz() {
  const [questionsComplete] = useState<number>(12);
  const totalQuestions = 15;


  const [answer1, setAnswer1] = useState<string>("");
  const [answer2, setAnswer2] = useState<string>("");
  const [answer3, setAnswer3] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [answer5, setAnswer5] = useState<string>("");
  const [answer6, setAnswer6] = useState<string>("");
  const [answer7, setAnswer7] = useState<string>("");
  const [answer8, setAnswer8] = useState<string>("");

  function updateAnswer1(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer1(event.target.value);
  }
  function updateAnswer2(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer2(event.target.value);
  }
  function updateAnswer3(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer3(event.target.value);
  }
  function updateAnswer4(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer4(event.target.value);
  }
  function updateAnswer5(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer5(event.target.value);
  }
  function updateAnswer6(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer6(event.target.value);
  }
  function updateAnswer7(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer7(event.target.value);
  }
  function updateAnswer8(event: React.ChangeEvent<HTMLInputElement>) {
    setAnswer8(event.target.value);
  }


  return (
    <div>
    <ProgressBar
      questionsComplete={questionsComplete}
      totalQuestions={totalQuestions}
    />
    <h1> <u> Detailed Quiz </u> </h1>

    <hr></hr>

    <div className="row">
        <div className="column">
          <ol>
            <li>Question 1</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer1} onChange={updateAnswer1} />
              </Form.Group> {answer1.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 2</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer2} onChange={updateAnswer2} />
              </Form.Group> {answer2.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 3</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer3} onChange={updateAnswer3} />
              </Form.Group> {answer3.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 4</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer4} onChange={updateAnswer4} />
              </Form.Group> {answer4.length > 3 ? "✔️" : "❌"}
            </div>
          </ol>
        </div>
        <div className="column">
          <ol>
            <li>Question 5</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer5} onChange={updateAnswer5} />
              </Form.Group> {answer5.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 6</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer6} onChange={updateAnswer6} />
              </Form.Group> {answer6.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 7</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer7} onChange={updateAnswer7} />
              </Form.Group> {answer7.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
            <li>Question 8</li>
            <div>
              <Form.Group controlId="formCheckAnswer">
                  <Form.Label>Answer:</Form.Label>
                  <Form.Control value={answer8} onChange={updateAnswer8} />
              </Form.Group> {answer8.length > 3 ? "✔️" : "❌"}
            </div>
            <br></br>
          </ol>
        </div>
      </div>
  <hr></hr>
</div>
  );
}
