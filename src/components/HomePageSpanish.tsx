export default function HomePageSpanish({
  currentPage,
  setCurrentPage,
}: {
  currentPage:
    | "detailed"
    | "basic"
    | "home"
    | "basicSpanish"
    | "detailedSpanish"
    | "homeSpanish";
  setCurrentPage: (
    page:
      | "detailed"
      | "basic"
      | "home"
      | "basicSpanish"
      | "detailedSpanish"
      | "homeSpanish"
  ) => void;
}) {
  return (
    <div className="Home-Page">
      <div className="row mt-5">
        <div className="middle-block">
          <br></br>
          <br></br>
          <div>
            <div className="container">
              <p className="text">¿Cuál es la mejor carrera para mí?</p>
            </div>
          </div>
          {/* <img src={logo} className="App-logo" alt="The-Career-Helpi" /> */}
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u>Quiz Básico</u>
            </h1>
            <h4>Un cuestionario más rápido lleno de preguntas más básicas.</h4>
            El cuestionario básico es un cuestionario más corto que te
            proporciona opciones para cada pregunta. Las preguntas te
            preguntarán sobre rasgos personales y preferencias dentro y fuera de
            la oficina. Este cuestionario está diseñado para ser una forma
            rápida de tener una idea general de qué carreras podrían
            interesarte. Puedes acceder al cuestionario desde el menú de arriba.
            <br></br>
            <br></br>
            Tiempo estimado: 5 minutos
            <br></br>
            <br></br>
            <button
              className="Submit-Button"
              onClick={() => setCurrentPage("basicSpanish")}
            >
              Al cuestionario básico
            </button>
          </div>
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u>Quiz Detallado</u>
            </h1>
            <h4>
              Un cuestionario más largo lleno de preguntas más difíciles y
              detalladas.
            </h4>
            El cuestionario detallado es un cuestionario más largo que involucra
            preguntas de completar espacios en blanco. Las preguntas te
            preguntarán sobre tus fortalezas, intereses, preferencias de entorno
            de trabajo y más. Este cuestionario está diseñado para darte una
            idea detallada de qué carreras podrían interesarte. Puedes acceder
            al cuestionario desde el menú de arriba.
            <br></br>
            <br></br>
            Tiempo estimado: 10 minutos
            <br></br>
            <br></br>
            <button
              className="Submit-Button"
              onClick={() => setCurrentPage("detailedSpanish")}
            >
              Ir al cuestionario detallado
            </button>
          </div>
        </div>
        <div className="EmptySpace"></div>
        <div className="Statement">
          <h4>
            Se generará un informe detallado utilizando ChatGPT y se te
            proporcionará después de completar el cuestionario.
          </h4>
        </div>
      </div>
    </div>
  );
}
