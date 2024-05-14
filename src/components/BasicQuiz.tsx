import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { Form } from "react-bootstrap";
import { sendBasicQuizQuery } from "./GPT";
import Report from "./Report";
import { CareerRecommendation } from "./GPT";
import Loading from "./Loading";

export type Question = {
  question: string;
  spanishQuestion: string;
  options: string[];
  spanishOptions: string[];
  chosenAnswer: string;
};

export default function BasicQuiz({
  keyData,
  isSpanish,
}: {
  keyData: string;
  isSpanish: boolean;
}) {
  const [questions, setQuestions] = useState<Question[]>([
    {
      question: "Do you like creative tasks?",
      spanishQuestion: "¿Te gustan las tareas creativas?",
      options: ["", "Yes", "No"],
      spanishOptions: ["", "Sí", "No"],
      chosenAnswer: "",
    },
    {
      question:
        "Which do you favor more: working in an office or engaging in fieldwork?",
      spanishQuestion:
        "¿Qué prefieres más: trabajar en una oficina o realizar trabajo de campo?",
      options: ["", "Office", "Fieldwork"],
      spanishOptions: ["", "Oficina", "Trabajo de campo"],
      chosenAnswer: "",
    },
    {
      question:
        "Do you like providing aid to others in need, prefer working on individual projects, or enjoy collaborating with others on projects?",
      spanishQuestion:
        "¿Te gusta brindar ayuda a otros necesitados, prefieres trabajar en proyectos individuales o disfrutas colaborar con otros en proyectos?",
      options: [
        "",
        "Aid to others",
        "Individual projects",
        "Collaborating with others",
      ],
      spanishOptions: [
        "",
        "Ayuda a otros",
        "Proyectos individuales",
        "Colaborar con otros",
      ],
      chosenAnswer: "",
    },
    {
      question: "Are you a tactile person or more of a visual/auditory person?",
      spanishQuestion: "¿Eres una persona táctil o más bien visual/auditiva?",
      options: ["", "Tactile", "Visual/Auditory"],
      spanishOptions: ["", "Táctil", "Visual/Auditiva"],
      chosenAnswer: "",
    },
    {
      question:
        "Do you lean towards working in a startup or a well-established company?",
      spanishQuestion:
        "¿Te inclinas por trabajar en una startup o en una empresa bien establecida?",
      options: ["", "Startup", "Well-established company"],
      spanishOptions: ["", "Startup", "Empresa bien establecida"],
      chosenAnswer: "",
    },
    {
      question: "Do you possess or plan to complete a college degree?",
      spanishQuestion: "¿Posees o planeas completar un título universitario?",
      options: ["", "Yes", "No"],
      spanishOptions: ["", "Sí", "No"],
      chosenAnswer: "",
    },
    {
      question: "Do you prefer working in a group or independently?",
      spanishQuestion: "¿Prefieres trabajar en grupo o de forma independiente?",
      options: ["", "Group", "Independently"],
      spanishOptions: ["", "Grupo", "Independientemente"],
      chosenAnswer: "",
    },
    {
      question:
        "Are you comfortable using technology or do you prefer non-technical tasks?",
      spanishQuestion:
        "¿Te sientes cómodo utilizando tecnología o prefieres tareas no técnicas?",
      options: ["", "Technology", "Non-technical tasks"],
      spanishOptions: ["", "Tecnología", "Tareas no técnicas"],
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
    setRecJobs(await sendBasicQuizQuery(questions, keyData, isSpanish));
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
          />
          <h1>
            <u>{isSpanish ? "Quiz Básico" : "Basic Quiz"}</u>
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
                      {/* uses the index to display the question number starting from 1 */}
                      <li>
                        <div
                          style={{
                            border: "1px solid black",
                            padding: "2px",
                            background: "whitesmoke",
                          }}
                        >
                          {isSpanish
                            ? question.spanishQuestion
                            : question.question}
                          {selectedOptions[index] !== "" ? " ✔️" : " ❌"}
                        </div>
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
                            {isSpanish
                              ? question.spanishOptions.map(
                                  (
                                    choice: string // maps through the spanishOptions array to display each option
                                  ) => (
                                    <option key={choice} value={choice}>
                                      {/* sets the key and value of the option to the choice */}
                                      {choice}
                                    </option>
                                  )
                                )
                              : question.options.map(
                                  (
                                    choice: string // maps through the options array to display each option
                                  ) => (
                                    <option key={choice} value={choice}>
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
                  <div>
                    {isSpanish
                      ? "¡Todas las preguntas completadas!"
                      : "All Questions Complete!"}
                  </div>
                  <div>
                    {isSpanish
                      ? "Cuando estés listo, haz clic en Enviar a continuación para generar tus resultados!"
                      : "When Ready, Please Hit Submit Below to Generate your Results!"}
                  </div>
                  <button
                    className="submit mx-auto"
                    onClick={() => submitAnswers()}
                  >
                    {isSpanish ? "Enviar" : "Submit"}
                  </button>
                  {/* calls the submitAnswers function when the button is clicked */}
                  <hr></hr>
                </span>
              ) : (
                <span>
                  <p>
                    {isSpanish
                      ? "Una vez que respondas todas las preguntas, aparecerá un botón aquí para enviar tus respuestas."
                      : "Once you answers all the questions, a button will appear here to submit your answers."}
                  </p>
                  <hr></hr>
                </span>
              )}
            </div>
          ) : (
            <div>
              <h1>
                {isSpanish ? "Se requiere clave de API" : "API Key Required"}
              </h1>
              <p>
                {isSpanish
                  ? "Por favor ingresa una clave de API para continuar. Si no tienes una clave de API, puedes obtener una registrándote para obtener una cuenta en"
                  : "Please enter an API key to continue. If you do not have an API key, you can get one by signing up for an account at"}{" "}
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
                <u>
                  {isSpanish
                    ? "Informe del Cuestionario Básico"
                    : "Basic Quiz Report"}
                </u>
              </h1>
              <h4>
                {isSpanish
                  ? "Basado en tus respuestas al cuestionario, aquí hay un trabajo en el que podrías estar interesado:"
                  : "Based on your answers to the quiz, here is a job you might be interested in:"}
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
            isSpanish={isSpanish}
          />
        </div>
      ) : (
        <Loading
          submitAnswers={submitAnswers}
          setShowReport={setShowReport}
          recJobs={recJobs}
          isSpanish={isSpanish}
        />
      )}
    </div>
  );
}
