import React, { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function BasicQuiz() {

    const options: string[] = ["", "Yes", "No"];
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
                            <li>Question {index + 1}</li>
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
                <button onClick={() => console.log("Submitted")}>Submit</button>
              <hr></hr>
            </div>
        </div>
    );
}
