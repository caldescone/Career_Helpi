import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";

const QUESTIONS = [
    "Are you more interested in creative tasks or analytical tasks?",
    "Which do you favor more: working in an office or engaging in fieldwork?",
    "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?",
   " Are you a tactile person or more of a visual/auditory person?",
    "Do you lean towards working in a startup or a well-established company?",
    "Do you possess or plan to complete a college degree?",
    "Do you prefer working in a group or independently?",
    "Are you comfortable using technology or do you prefer non-technical tasks?"
]

export function BasicQuiz({
    options,
}: {
    options: string[];
}): JSX.Element {
    const [choice, setChoice] = useState<string>(options[0]);

    function updateChoice(event: React.ChangeEvent<HTMLSelectElement>) {
        setChoice(event.target.value);
    }

    return (
        <div>
            <Form.Group>
                {QUESTIONS.map((thisQ: string, index: number) =>
                    <><Form.Label>{QUESTIONS[index]}</Form.Label><Row>
                        <Col>
                        <Form.Check
                                type="radio"
                            ></Form.Check>
                        </Col>
                        <Col>
                        <Form.Check
                                type="radio"
                            ></Form.Check>
                        </Col>
                        <Col>
                        <Form.Check
                                type="radio"
                            ></Form.Check>
                        </Col>
                        <Col>
                        <Form.Check
                                type="radio"
                            ></Form.Check>
                        </Col>
                        <Col>
                        <Form.Check
                                type="radio"
                            ></Form.Check>
                        </Col>
                    </Row></>
            )}
            </Form.Group>
            
        </div>
    )
}