import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import { sendBasicQuizQuery } from "./GPT";
import Report from "./Report";

export default function BasicQuiz({ keyData }: { keyData: string }) {
  const QuestionList: string[] = [
    "Do you like creative tasks?",
    "Which do you favor more: working in an office or engaging in fieldwork?",
    "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?",
    "Are you a tactile person or more of a visual/auditory person?",
    "Do you lean towards working in a startup or a well-established company?",
    "Do you possess or plan to complete a college degree?",
    "Do you prefer working in a group or independently?",
    "Are you comfortable using technology or do you prefer non-technical tasks?",
  ];

  const options: string[][] = [
    ["", "Yes", "No"],
    ["", "Office", "Fieldwork"],
    ["", "Aid to others", "Individual projects", "Collaborating with others"],
    ["", "Tactile", "Visual/Auditory"],
    ["", "Startup", "Well-established company"],
    ["", "Yes", "No"],
    ["", "Group", "Independently"],
    ["", "Technology", "Non-technical tasks"],
  ];

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(8).fill("")
  );
  const [questionsComplete, setQuestionsComplete] = useState<number>(0);
  const totalQuestions = selectedOptions.length;
  const [showReport, setShowReport] = useState(false);

  function updateSelectedOption(
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
    setQuestionsComplete(
      newSelectedOptions.filter((option) => option !== options[index][0]).length
    );
  }

  function submitAnswers() {
    setShowReport(true);
    sendBasicQuizQuery(QuestionList, selectedOptions, keyData);
  }

  return (
    <div>
      {!showReport ? (
        <div>
          <ProgressBar
            questionsComplete={questionsComplete}
            totalQuestions={totalQuestions}
          />
          <h1>
            <u>Basic Quiz</u>
          </h1>
          <hr></hr>
          <div className="row">
            {Array.from({ length: 8 }, (_, index) => (
              <div className="column" key={index}>
                <ol start={index + 1}>
                  <li>
                    {QuestionList[index]}{" "}
                    {selectedOptions[index] !== "" ? " ✔️" : " ❌"}
                  </li>
                  <div>
                    <Form.Group>
                      <Form.Select
                        value={selectedOptions[index]}
                        onChange={(event) => updateSelectedOption(index, event)}
                      >
                        {options[index].map((choice: string) => (
                          <option key={choice} value={choice}>
                            {choice}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <br />
                </ol>
              </div>
            ))}
            <hr></hr>
            {questionsComplete === selectedOptions.length ? (
              <span>
                <div>All Questions Complete!</div>
                <div>
                  When Ready, Please Hit Submit Below to Generate your Results!
                </div>
                <button onClick={() => submitAnswers()}>Submit</button>
                <hr></hr>
              </span>
            ) : (
              <span>
                <p>
                  Once you answers all the questions, a button will appear here
                  to submit your answers.
                </p>
                <hr></hr>
              </span>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="Report-Header">
              <h1> <u>Detailed Quiz Report</u> </h1>
              <h4>Based on your answers to the quiz, here are some jobs that you might be interested in: </h4>
          </div>
          <Report />
          <p></p>
          <button onClick={() => setShowReport(false)}>Go Back to Quiz</button>
          <hr></hr>
        </div>
      )}
    </div>
  );
}
