import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import { sendBasicQuizQuery } from "./GPT";
import Report from "./Report";
import { CareerRecommendation } from "./GPT";
import { send } from "process";

export type Question = {
  question: string;
  options: string[];
  chosenAnswer: string;
};

export default function BasicQuiz({ keyData }: { keyData: string }) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "Do you like creative tasks?",
      options: ["", "Yes", "No"],
      chosenAnswer: "",
    },
    {
      question: "Which do you favor more: working in an office or engaging in fieldwork?",
      options: ["", "Office", "Fieldwork"],
      chosenAnswer: "",
    },
    {
      question: "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?",
      options: ["", "Aid to others", "Individual projects", "Collaborating with others"],
      chosenAnswer: "",
    },
    {
      question: "Are you a tactile person or more of a visual/auditory person?",
      options: ["", "Tactile", "Visual/Auditory"],
      chosenAnswer: "",
    },
    {
      question: "Do you lean towards working in a startup or a well-established company?",
      options: ["", "Startup", "Well-established company"],
      chosenAnswer: "",
    },
    {
      question: "Do you possess or plan to complete a college degree?",
      options: ["", "Yes", "No"],
      chosenAnswer: "",
    },
    {
      question: "Do you prefer working in a group or independently?",
      options: ["", "Group", "Independently"],
      chosenAnswer: "",
    },
    {
      question: "Are you comfortable using technology or do you prefer non-technical tasks?",
      options: ["", "Technology", "Non-technical tasks"],
      chosenAnswer: "",
    },
  ]);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    Array(questions.length).fill("")
  );
  const [questionsComplete, setQuestionsComplete] = useState<number>(0);
  const totalQuestions = questions.length;
  const [recJobs, setRecJobs] = useState<CareerRecommendation | null>(null);
  const [showReport, setShowReport] = useState(false);
  function updateSelectedOption(
    index: number,
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[index] = event.target.value;
    setSelectedOptions(newSelectedOptions);
    setQuestionsComplete(
      newSelectedOptions.filter((option) => option !== questions[index].options[0]).length
    );
    const newQuestions = [...questions];
    newQuestions[index].chosenAnswer = event.target.value;
    setQuestions(newQuestions);
  }
  async function submitAnswers() {
    console.log(questions);
    setShowReport(true);
    setRecJobs(await sendBasicQuizQuery(questions, keyData));
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
            {questions.map((question, index) => (
              <div className="column" key={index}>
                <ol start={index + 1}>
                  <li>
                    {question.question}{" "}
                    {selectedOptions[index] !== "" ? " ✔️" : " ❌"}
                  </li>
                  <div>
                    <Form.Group>
                      <Form.Select
                        value={selectedOptions[index]}
                        onChange={(event) => updateSelectedOption(index, event)}
                      >
                        {question.options.map((choice: string) => (
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