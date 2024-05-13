import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { sendDetailedSpanishQuizQuery } from "./GPTSpanish";
import Report from "./Report";
import { CareerRecommendation } from "./GPTSpanish";
import Loading from "./Loading";

export default function DetailedQuizSpanish({ keyData }: { keyData: string }) {
  const defaultOption = "";
  const QuestionList = [
    "¿Cuál es el logro del que te sientes más orgulloso en tu vida profesional y qué te enseñó sobre ti mismo?",
    "En tu entorno de trabajo ideal, ¿qué tipo de dinámica de horario te gustaría tener?",
    "¿Cuál es el nivel más alto de educación que tienes y te gustaría alcanzar?",
    "Reflexionando sobre tus habilidades y fortalezas, ¿qué tipos de roles o carreras crees que te permitirían aprovecharlas de manera más efectiva?",
    "¿Alguna vez has pensado en convertir un pasatiempo o interés personal en una carrera? Si es así, ¿cómo imaginas que sería esa transición?",
    "¿Hay alguna tendencia o tecnología emergente que te emocione y que pueda abrir nuevas oportunidades laborales para ti? Si es así, ¿cuáles son y por qué?",
    "¿Alguna vez has considerado iniciar tu propio negocio? Si es así, ¿qué habilidades o experiencia posees que podrían ser comercializables en esas áreas?",
    "¿Alguna vez has pensado en seguir una carrera que implique viajar o te permita trabajar de forma remota? ¿Qué aspectos de esa carrera te atraen?",
  ];

  const [answers, setAnswers] = useState<string[]>(
    new Array(8).fill(defaultOption)
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
      newAnswers.filter((answer) => answer.length > 3).length
    );
  };

  async function submitAnswers() {
    setShowReport(true);
    setRecJobs(
      await sendDetailedSpanishQuizQuery(QuestionList, answers, keyData)
    );
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
            <u> Quiz Detallado </u>
          </h1>

          <hr></hr>
          {keyData !== "" ? (
            <div className="row">
              {[...Array(8)].map((_, index) => (
                <div className="column" key={index}>
                  <ol start={index + 1}>
                    <li>
                      <div
                        style={{ border: "1px solid black", padding: "2px" }}
                      >
                        {QuestionList[index]}{" "}
                        {answers[index].length > 3 ? " ✔️" : " ❌"}
                      </div>
                    </li>
                    <input
                      id={`answer-${index}`} // unique id for each input from chrome suggestions
                      name={`answer-${index}`} // unique name for each input from chrome suggestions
                      type="text"
                      value={answers[index]}
                      onChange={(e) => updateAnswer(index, e.target.value)}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </ol>
                </div>
              ))}
              <hr></hr>
              {questionsComplete === answers.length ? (
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
                  </button>
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
                <u>Informe del Quiz Detallado</u>
              </h1>
              <h4>
                Basado en tus respuestas al quiz, aquí tienes un trabajo en el
                que podrías estar interesado:
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
        ></Loading>
      )}
    </div>
  );
}
