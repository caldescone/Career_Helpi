import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import { sendBasicQuizQuery } from "./GPT";
import Report from "./Report";
import { CareerRecommendation } from "./GPT";
import Loading from "./Loading";

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
      question:
        "Which do you favor more: working in an office or engaging in fieldwork?",
      options: ["", "Office", "Fieldwork"],
      chosenAnswer: "",
    },
    {
      question:
        "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?",
      options: [
        "",
        "Aid to others",
        "Individual projects",
        "Collaborating with others",
      ],
      chosenAnswer: "",
    },
    {
      question: "Are you a tactile person or more of a visual/auditory person?",
      options: ["", "Tactile", "Visual/Auditory"],
      chosenAnswer: "",
    },
    {
      question:
        "Do you lean towards working in a startup or a well-established company?",
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
      question:
        "Are you comfortable using technology or do you prefer non-technical tasks?",
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
      newSelectedOptions.filter(
        (option) => option !== questions[index].options[0]
      ).length
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

  useEffect(() => {
    if (!showReport) {
      setRecJobs(null);
    }
  }, [showReport]);

  return (
    <div>
      {!showReport ? ( // flag to show the report, defaults to only showing the quiz
        <div>
          <ProgressBar
            questionsComplete={questionsComplete}
            totalQuestions={totalQuestions}
          />{" "}
          {/* This is to show the progress bar taking in the number of questions completed and the total number of questions */}
          <h1>
            <u>Basic Quiz</u>
          </h1>
          <hr></hr>
          <div className="row">
            {questions.map(
              (
                question,
                index // maps through the questions array to display each question and its options
              ) => (
                <div className="column" key={index}>
                  <ol start={index + 1}>
                    {" "}
                    {/* uses the index to display the question number starting from 1 */}
                    <li>
                      <div
                        style={{ border: "1px solid black", padding: "2px" }}
                      >
                        {question.question}{" "}
                        {selectedOptions[index] !== "" ? " ✔️" : " ❌"}
                      </div>{" "}
                      {/* displays the question with space between the X and ✔️ */}
                    </li>
                    <div>
                      <Form.Group>
                        <Form.Select
                          id={`question-${index}`} // unique id for each select from chrome suggestions
                          name={`question-${index}`} // unique name for each select from chrome suggestions
                          value={selectedOptions[index]} // sets the value of the select to the selected option
                          onChange={(event) =>
                            updateSelectedOption(index, event)
                          } // calls the updateSelectedOption function when the select value changes
                        >
                          {question.options.map(
                            (
                              choice: string // maps through the options array to display each option
                            ) => (
                              <option key={choice} value={choice}>
                                {" "}
                                {/* sets the key and value of the option to the choice */}
                                {choice}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Form.Group>
                    </div>
                    <br />
                  </ol>
                </div>
              )
            )}
            <hr></hr>
            {questionsComplete === selectedOptions.length ? ( // checks if all questions are complete before showing the submit button
              <span>
                <div>All Questions Complete!</div>
                <div>
                  When Ready, Please Hit Submit Below to Generate your Results!
                </div>
                <button
                  className="submit mx-auto"
                  onClick={() => submitAnswers()}
                >
                  Submit
                </button>{" "}
                {/* calls the submitAnswers function when the button is clicked */}
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
      ) : recJobs ? (
        <Report
          Overview={recJobs.overview}
          RecCareer={recJobs.jobTitle}
          Description={recJobs.jobDescription}
          Salary={recJobs.averageSalary}
          Education={recJobs.requirements}
          Fit={recJobs.applicationToCareer}
          OtherJobs={recJobs.otherJobs}
          RelatedAspects={recJobs.relatedAspects}
          setShowReport={setShowReport}
        />
          ) : (
            <Loading submitAnswers={submitAnswers} setShowReport={setShowReport} recJobs={recJobs} />
          )}
        </div>
      );
}
