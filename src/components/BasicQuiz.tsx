import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";

export default function BasicQuiz() {

    const options: string[] = ["", "Yes", "No", "Office", "Field Work", "Individually", "Collaboratively","Tactile",
    "Visual/Auditory", "Start-up", "Well-established", "Yes", "No", "Group", "Independent", "Technology", "Non-Technical"];
    
    const QuestionList: string[] = ["Do you like creative tasks?", "Which do you favor more: working in an office or engaging in fieldwork?", 
    "Do you prefer working on individual projects, or enjoy collaborating with others on projects?", 
    "Are you a tactile person or more of a visual/auditory person?", 
    "Do you lean towards working in a startup or a well-established company?", 
    "Do you possess or plan to complete a college degree?", 
    "Do you prefer working in a group or independently?", 
    "Are you comfortable using technology or do you prefer non-technical tasks?"]
    
    const defaultOption = options[0];

    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(8).fill(defaultOption));
    const [questionsComplete, setQuestionsComplete] = useState<number>(0);
    const [showReport, setShowReport] = useState(false);
    const totalQuestions = selectedOptions.length;

    function updateSelectedOption(index: number, event: React.ChangeEvent<HTMLSelectElement>) {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
        setQuestionsComplete(newSelectedOptions.filter((option) => option !== defaultOption).length);
    }

    // function handleQuestionClick(question: string) {
    //   if (selectedOptions.length < 3) {
    //     setSelectedOptions([...selectedOptions, question]);
    //   }
    // };

    return (
        <div>
          {!showReport ? (
          <div>
            <ProgressBar questionsComplete={questionsComplete} totalQuestions={totalQuestions} />
            <h1>
                <u>Basic Quiz</u>
            </h1>
            <hr></hr>
            <div className="row">
                {Array.from({ length: 8 }, (_, index) => (
                    <div className="column" key={index}>
                        <ol start={index+1}>
                            <li>{QuestionList[index]}</li>
                            <div>
                                <Form.Group>
                                    <Form.Select value={selectedOptions[index]} onChange={(event) => updateSelectedOption(index, event)}>
                                        {options.map((choice: string) => (
                                            <option key={choice} value={choice}>
                                                {choice}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                {/* {selectedOptions[index] === "Yes" || selectedOptions[index] === "No" ? "✔️" : "❌"} */}
                                {selectedOptions[index] !== "" ? "✔️" : "❌"}
                            </div>
                            <br />
                        </ol>
                    </div>
                ))}
              <hr></hr>
                {questionsComplete === selectedOptions.length ? (
                    <span>
                      <div>All Questions Complete!</div>
                      <div>When Ready, Please Hit Submit Below to Generate your Results!</div>
                      <button onClick={() => setShowReport(true)}>Submit</button>
                      <hr></hr>
                    </span>
                ) : (
                    <span>
                      <p>Once you answers all the questions, a button will appear here to submit your answers.</p>
                      <hr></hr>
                    </span>
                )}
            </div>
          </div>
            ) : (
              <div>
                <h1> <u>Basic Quiz Report</u> </h1>
                <h4>Based on your answers to the quiz, here is a job that you might be interested in: </h4>
                {/* <h1>Top Recommended Career: {recJobs[0]}</h1> */}
                <hr></hr>
                <h3>Top Recommended Career:</h3>
                <p>Job Description:</p> 
                <p>Salary: </p>
                <p>Education Required: </p>
                {/* Maybe add a picture showing the job along with the results? */}
                {/* Maybe style it so that there are boxes around the difference sections or something seperating them? */}
                <button onClick={() => setShowReport(false)}>Go Back to Quiz</button>
                <hr></hr>
              </div>
            )
          }
        </div>
    );
}
