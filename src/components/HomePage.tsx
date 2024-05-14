export default function HomePage({
  currentPage,
  setCurrentPage,
  isSpanish,
  setIsSpanish,
}: {
  currentPage: "detailed" | "basic" | "home";
  setCurrentPage: (page: "detailed" | "basic" | "home") => void;
  isSpanish: boolean;
  setIsSpanish: (isSpanish: boolean) => void;
}) {
  return (
    <div className="Home-Page">
      <div className="row mt-5">
        <div className="middle-block">
          <br></br>
          <br></br>
          <div>
            <div className="container">
              <p className="text">
                {isSpanish
                  ? "¿Cuál es la mejor carrera para mí?"
                  : "What is the best career for me?"}{" "}
              </p>
            </div>
          </div>
          {/* <img src={logo} className="App-logo" alt="The-Career-Helpi" /> */}
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u> {isSpanish ? "Quiz Básico" : "Basic Quiz"} </u>
            </h1>
            <h4>
              {isSpanish
                ? "Un cuestionario más rápido lleno de preguntas más básicas."
                : "A quicker quiz filled with more basic questions."}
            </h4>
            {isSpanish
              ? "El cuestionario básico es un cuestionario más corto que te proporciona opciones para cada pregunta. Las preguntas te preguntarán sobre rasgos personales y preferencias dentro y fuera de la oficina. Este cuestionario está diseñado para ser una forma rápida de tener una idea general de qué carreras podrían interesarte. Puedes acceder al cuestionario desde el menú de arriba."
              : "The basic quiz is a shorter quiz that provides you with options to each question. The questions will ask you about personal traits and preferences in and out of the office. This quiz is designed to be a quick way to get a general idea of what career paths might interest you. You can access the quiz from the menu above."}
            <br></br>
            <br></br>
            {isSpanish
              ? "Tiempo estimado: 5 minutos"
              : "Estimated time: 5 Minutes"}
            <br></br>
            <br></br>
            <button
              className="Submit-Button"
              onClick={() => setCurrentPage("basic")}
            >
              {isSpanish ? "Al Quiz Básico" : "To Basic Quiz"}
            </button>
          </div>
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u> {isSpanish ? "Quiz Detallado" : "Detailed Quiz"}</u>
            </h1>
            <h4>
              {isSpanish
                ? "Un cuestionario más largo lleno de preguntas más difíciles y detalladas."
                : "A longer quiz filled with harder, more detailed questions."}
            </h4>
            {isSpanish
              ? "El cuestionario detallado es un cuestionario más largo que involucra preguntas de completar espacios en blanco. Las preguntas te preguntarán sobre tus fortalezas, intereses, preferencias de entorno de trabajo y más. Este cuestionario está diseñado para darte una idea detallada de qué carreras podrían interesarte. Puedes acceder al cuestionario desde el menú de arriba."
              : "The detailed quiz is a longer quiz that involves fill in the blank questions. The questions will ask you about your strengths, interests, work environment preferences, and more. This quiz is designed to give you an in depth idea of what career paths might interest you. You can access the quiz from the menu above."}
            <br></br>
            <br></br>
            {isSpanish
              ? "Tiempo estimado: 10 minutos"
              : "Estimated time: 10 Minutes"}
            <br></br>
            <br></br>
            <button
              className="Submit-Button"
              onClick={() => setCurrentPage("detailed")}
            >
              {isSpanish ? "Ir al cuestionario detallado" : "To Detailed Quiz"}
            </button>
          </div>
        </div>
        <div className="EmptySpace"></div>
        <div className="Statement">
          <h4>
            {isSpanish
              ? "Se generará un informe detallado utilizando ChatGPT y se te proporcionará después de completar el cuestionario."
              : "A detailed report will be generated using ChatGPT and provided to you after you complete the quiz."}
          </h4>
        </div>
      </div>
    </div>
  );
}
