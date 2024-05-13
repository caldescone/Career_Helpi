import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import { sendBasicSpanishQuizQuery } from "./GPTSpanish";
import Report from "./Report";
import { CareerRecommendation } from "./GPTSpanish";
import Loading from "./Loading";

export type Question = {
  question: string;
  options: string[];
  chosenAnswer: string;
};

export default function BasicQuizSpanish({ keyData }: { keyData: string }) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "¿Te gustan las tareas creativas?",
      options: ["", "Sí", "No"],
      chosenAnswer: "",
    },
    {
      question:
        "¿Qué prefieres más: trabajar en una oficina o realizar trabajo de campo?",
      options: ["", "Oficina", "Trabajo de campo"],
      chosenAnswer: "",
    },
    {
      question:
        "¿Te gusta brindar ayuda a otros necesitados, prefieres trabajar en proyectos individuales o disfrutas colaborar con otros en proyectos?",
      options: [
        "",
        "Ayuda a otros",
        "Proyectos individuales",
        "Colaborar con otros",
      ],
      chosenAnswer: "",
    },
    {
      question: "¿Eres una persona táctil o más bien visual/auditiva?",
      options: ["", "Táctil", "Visual/Auditiva"],
      chosenAnswer: "",
    },
    {
      question:
        "¿Te inclinas por trabajar en una startup o en una empresa bien establecida?",
      options: ["", "Startup", "Empresa bien establecida"],
      chosenAnswer: "",
    },
    {
      question: "¿Posees o planeas completar un título universitario?",
      options: ["", "Sí", "No"],
      chosenAnswer: "",
    },
    {
      question: "¿Prefieres trabajar en grupo o de forma independiente?",
      options: ["", "Grupo", "Independientemente"],
      chosenAnswer: "",
    },
    {
      question:
        "¿Te sientes cómodo utilizando tecnología o prefieres tareas no técnicas?",
      options: ["", "Tecnología", "Tareas no técnicas"],
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
    setRecJobs(await sendBasicSpanishQuizQuery(questions, keyData));
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
            <u>Quiz Básico</u>
          </h1>
          <hr></hr>
          {keyData !== "" ? (
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
                  <div>¡Todas las preguntas completadas!</div>
                  <div>
                    Cuando estés listo, por favor presiona "Enviar" a
                    continuación para generar tus resultados.
                  </div>
                  <button
                    className="submit mx-auto"
                    onClick={() => submitAnswers()}
                  >
                    Enviar
                  </button>{" "}
                  {/* calls the submitAnswers function when the button is clicked */}
                  <hr></hr>
                </span>
              ) : (
                <span>
                  <p>
                    Una vez que respondas todas las preguntas, aparecerá un
                    botón aquí para enviar tus respuestas.
                  </p>
                  <hr></hr>
                </span>
              )}
            </div>
          ) : (
            <div>
              <h1>Se requiere clave de API</h1>
              <p>
                Por favor ingresa una clave de API para continuar. Si no tienes
                una clave de API, puedes obtener una registrándote para obtener
                una cuenta en{" "}
                <a href="https://platform.openai.com/signup">
                  https://platform.openai.com/signup
                </a>
                .
              </p>
            </div>
          )}
        </div>
      ) : recJobs ? (
        <div>
          <div className="Report-Header">
            <div className="Report-Intro">
              <h1>
                <u>Informe del Quiz Básico</u>
              </h1>
              <h4>
                Basado en tus respuestas al cuestionario, aquí hay un trabajo en
                el que podrías estar interesado:
              </h4>
            </div>
          </div>
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
        </div>
      ) : (
        <Loading
          submitAnswers={submitAnswers}
          setShowReport={setShowReport}
          recJobs={recJobs}
        />
      )}
    </div>
  );
}
