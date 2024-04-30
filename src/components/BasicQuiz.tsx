import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";

export default function BasicQuiz() {

    const options: string[] = ["", "Yes", "No"];
    const QuestionList: string[] = ["Do you like creative tasks?", "Which do you favor more: working in an office or engaging in fieldwork?", 
    "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?", 
    "Are you a tactile person or more of a visual/auditory person?", 
    "Do you lean towards working in a startup or a well-established company?", 
    "Do you possess or plan to complete a college degree?", 
    "Do you prefer working in a group or independently?", 
    "Are you comfortable using technology or do you prefer non-technical tasks?"]
    
    const defaultOption = options[0];

    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(8).fill(defaultOption));
    const [questionsComplete, setQuestionsComplete] = useState<number>(0);
    const totalQuestions = selectedOptions.length;

    function updateSelectedOption(index: number, event: React.ChangeEvent<HTMLSelectElement>) {
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[index] = event.target.value;
        setSelectedOptions(newSelectedOptions);
        setQuestionsComplete(newSelectedOptions.filter((option) => option !== defaultOption).length);
    }

    return (
        <div>
            <ProgressBar questionsComplete={questionsComplete} totalQuestions={totalQuestions} />
            <h1>
                <u>Basic Quiz</u>
            </h1>
            <hr />

            <div className="row">
                {Array.from({ length: 8 }, (_, index) => (
                    <div className="column" key={index}>
                        <ol start={index+1}>
                            <div style={ {border: '1px solid black', padding: '2px'} } >{QuestionList[index]}</div>
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
                                {selectedOptions[index] === "Yes" || selectedOptions[index] === "No" ? "✔️" : "❌"}
                            </div>
                            <br />
                        </ol>
                    </div>
                ))}
              <hr></hr>
                <button className="submit mx-auto" onClick={() => console.log("Submitted")}>Submit</button>
              <hr></hr>
            </div>
        </div>
    );
}
