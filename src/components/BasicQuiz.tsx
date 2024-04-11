import React, { useState } from "react";
import { Form } from "react-bootstrap";
import ProgressBar from "./ProgressBar";

export default function BasicQuiz() {
  const [questionsComplete] = useState<number>(12);
  const totalQuestions = 15;

  
  let options: string[] = ["","Yes","No"]

  const defaultOption = options[0];
  const [selected1, setSelected1] = useState<string>(defaultOption);
  const [selected2, setSelected2] = useState<string>(defaultOption);
  const [selected3, setSelected3] = useState<string>(defaultOption);
  const [selected4, setSelected4] = useState<string>(defaultOption);
  const [selected5, setSelected5] = useState<string>(defaultOption);
  const [selected6, setSelected6] = useState<string>(defaultOption);
  const [selected7, setSelected7] = useState<string>(defaultOption);
  const [selected8, setSelected8] = useState<string>(defaultOption);

  function updateSelected1(event: React.ChangeEvent<HTMLSelectElement>) {
      setSelected1(event.target.value);
  }
  function updateSelected2(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected2(event.target.value);
  }
  function updateSelected3(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected3(event.target.value);
  }
  function updateSelected4(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected4(event.target.value);
  }
  function updateSelected5(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected5(event.target.value);
  }
  function updateSelected6(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected6(event.target.value);
  }
  function updateSelected7(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected7(event.target.value);
  }
  function updateSelected8(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelected8(event.target.value);
  }


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
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected1} onChange={updateSelected1}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected1 === "Yes" || selected1 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>

            <li>Question 2</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected2} onChange={updateSelected2}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected2 === "Yes" || selected2 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>

            <li>Question 3</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected3} onChange={updateSelected3}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected3 === "Yes" || selected3 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>

            <li>Question 4</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected4} onChange={updateSelected4}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected4 === "Yes" || selected4 === "No" ? "✔️" : "❌"}
            </div>
          </ol>
        </div>

        <div className="column">
          <ol>
            <li>Question 5</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected5} onChange={updateSelected5}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected5 === "Yes" || selected5 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>

            <li>Question 6</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected6} onChange={updateSelected6}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected6 === "Yes" || selected6 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>

            <li>Question 7</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected7} onChange={updateSelected7}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected7 === "Yes" || selected7 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>
            
            <li>Question 8</li>
            <div>
                <Form.Group>
                    {/* <Form.Label>How do you feel?</Form.Label> */}
                    <Form.Select value={selected8} onChange={updateSelected8}>
                        {options.map((choice: string) => (
                            <option key={choice} value={choice}>
                                {choice}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                {selected8 === "Yes" || selected8 === "No" ? "✔️" : "❌"}
            </div>
            <br></br>
          </ol>
        </div>
      </div>
    <hr></hr>
  </div>
      
  );
}
