import { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { sendDetailedQuizQuery } from "./GPT";
import Report from "./Report";
import { CareerRecommendation } from "./GPT";
import Loading from "./Loading";

export type DetailedQuestion = {
  question: string;
  spanishQuestion: string;
};

export default function DetailedQuiz({
  keyData,
  isSpanish,
}: {
  keyData: string;
  isSpanish: boolean;
}) {
  const defaultOption = "";
  const questions: DetailedQuestion[] = [
    {
      question:
        "What achievement are you most proud of in your professional life, and what did it teach you about yourself?",
      spanishQuestion:
        "¿Cuál es el logro del que te sientes más orgulloso en tu vida profesional y qué te enseñó sobre ti mismo?",
    },
    {
      question:
        "In your ideal work environment, what type of schedule dynamic would you like for yourself?",
      spanishQuestion:
        "En tu entorno de trabajo ideal, ¿qué tipo de dinámica de horario te gustaría tener?",
    },
    {
      question:
        "What is the highest level of education you have and would like to achieve?",
      spanishQuestion:
        "¿Cuál es el nivel más alto de educación que tienes y te gustaría alcanzar?",
    },
    {
      question:
        "Reflecting on your skills and strengths, what types of roles or careers do you think would allow you to leverage them most effectively?",
      spanishQuestion:
        "Reflexionando sobre tus habilidades y fortalezas, ¿qué tipos de roles o carreras crees que te permitirían aprovecharlas de manera más efectiva?",
    },
    {
      question:
        "Have you ever thought about turning a hobby or personal interest into a career? If so, how do you imagine that transition happening?",
      spanishQuestion:
        "¿Alguna vez has pensado en convertir un pasatiempo o interés personal en una carrera? Si es así, ¿cómo imaginas que sería esa transición?",
    },
    {
      question:
        "Are there any emerging trends or technologies that excite you, and could potentially open up new career paths for you? If so, what are they and why?",
      spanishQuestion:
        "¿Hay alguna tendencia o tecnología emergente que te emocione y que pueda abrir nuevas oportunidades laborales para ti? Si es así, ¿cuáles son y por qué?",
    },
    {
      question:
        "Have you ever considered starting your own business? If so, what skills or expertise do you possess that could be marketable in those areas?",
      spanishQuestion:
        "¿Alguna vez has considerado iniciar tu propio negocio? Si es así, ¿qué habilidades o experiencia posees que podrían ser comercializables en esas áreas?",
    },
    {
      question:
        "Have you ever thought about pursuing a career that involves travel or allows you to work remotely? What aspects of such a career appeal to you?",
      spanishQuestion:
        "¿Alguna vez has pensado en seguir una carrera que implique viajar o te permita trabajar de forma remota? ¿Qué aspectos de esa carrera te atraen?",
    },
  ];

  const [answers, setAnswers] = useState<string[]>(
    new Array(questions.length).fill(defaultOption)
  );
  const [questionsComplete, setQuestionsComplete] = useState<number>(0);
  const [recJobs, setRecJobs] = useState<CareerRecommendation | null>(null);
  const [showReport, setShowReport] = useState(false);
  const totalQuestions = 8;

  const updateAnswer = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
    setQuestionsComplete(
      newAnswers.filter((answer) => answer.length > 1).length
    );
  };

  async function submitAnswers() {
    setShowReport(true);
    setRecJobs(await sendDetailedQuizQuery(questions, answers, keyData, isSpanish));
  }

  useEffect(() => {
    if (!showReport) {
      setRecJobs(null);
    }
  }, [showReport]);

  return (
    <div>
      {!showReport ? (
        <div>
          <ProgressBar
            questionsComplete={questionsComplete}
            totalQuestions={totalQuestions}
          />
          <h1>
            <u> {isSpanish ? "Quiz Detallado" : "Detailed Quiz"} </u>
          </h1>

          <hr></hr>
          {keyData !== "" ? (
            <div className="row">
              {[...Array(8)].map((_, index) => (
                <div className="column" key={index}>
                  <ol start={index + 1}>
                    <li>
                      <div
                        style={{
                          border: "1px solid black",
                          padding: "2px",
                          background: "whitesmoke",
                        }}
                      >
                        {isSpanish ? questions[index].spanishQuestion : questions[index].question}{" "}
                        {answers[index].length > 1 ? " ✔️" : " ❌"}
                      </div>
                    </li>
                    <textarea
                      id={`answer-${index}`} // unique id for each input from chrome suggestions
                      name={`answer-${index}`} // unique name for each input from chrome suggestions
                      value={answers[index]}
                      onChange={(e) => updateAnswer(index, e.target.value)}
                      style={{ width: "100%", minHeight: "30px" }}
                    />
                  </ol>
                </div>
              ))}
              <hr></hr>
              {questionsComplete === answers.length ? (
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
                    ? "Informe del Quiz Detallado"
                    : "Detailed Quiz Report"}
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
        ></Loading>
      )}
    </div>
  );
}
