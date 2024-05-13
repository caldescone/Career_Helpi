export default function Report({
  Overview,
  RecCareer,
  Description,
  Salary,
  Education,
  Fit,
  OtherJobs,
  RelatedAspects,
  setShowReport,
}: {
  Overview: string;
  RecCareer: string;
  Description: string;
  Salary: string[];
  Education: string;
  Fit: string;
  OtherJobs: string[];
  RelatedAspects: string[];
  setShowReport: (showReport: boolean) => void;
}) {
  return (
    // Overall report
    <div>
      <div className="Report-Back-Color">
        <div className="Report">
          <br></br>
          <div className="Report-Background">
            {/* Summary */}
            <h3 className="Report-Title">
              <u>Resumen</u>
            </h3>
            <p className="Report-Text">{Overview}</p>
            <br></br>
          </div>

          <br></br>

          <div className="Report-Background">
            <br></br>

            {/*  Quiz Results */}
            <h3 className="Report-Title">
              <u>Carrera recomendada</u>
            </h3>
            <p className="Report-Text">{RecCareer}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Descripción del trabajo</u>
            </h3>
            <p className="Report-Text">{Description}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Rango salarial</u>
            </h3>
            <p className="Report-Text">Bajo: {Salary[0]}</p>
            <p className="Report-Text">Medio: {Salary[1]}</p>
            <p className="Report-Text">Alto: {Salary[2]}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Educación requerida</u>
            </h3>
            <p className="Report-Text">{Education}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Cómo se ajusta este trabajo a ti</u>
            </h3>
            <p className="Report-Text">{Fit}</p>

            <hr></hr>

            {/* Secondary report details */}
            <h3 className="Report-Title">
              <u>Otras recomendaciones</u>
            </h3>
            <p className="Report-Text">
              {OtherJobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Aspectos relacionados</u>
            </h3>
            <p className="Report-Text">
              {RelatedAspects.map((aspect, index) => (
                <li key={index}>{aspect}</li>
              ))}
            </p>

            <br></br>

            {/* Maybe add a picture showing the job along with the results on the right side? Leave the left side for the info? 
                    Put colored boxes around the two different sections of results? */}

            {/* Maybe style it so that there are boxes around the difference sections or something seperating them? */}
          </div>
          <br></br>
        </div>
      </div>
      {/* button allowing user to go back to quiz with answers still filled */}
      <div className="Back-to-Quiz">
        <br></br>
        <button onClick={() => setShowReport(false)}>
          Volver al cuestionario
        </button>
        <hr></hr>
      </div>
    </div>
  );
}
