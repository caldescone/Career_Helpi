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
  isSpanish,
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
  isSpanish: boolean;
}) {
  return (
    // Overall report
    <div>
      <div className="parallax">
        <div className="Report">
          <br></br>
          <div className="Report-Background">
            {/* Summary */}
            <h3 className="Report-Title">
              <u>{isSpanish ? "Resumen" : "Summary"}</u>
            </h3>
            <p className="Report-Text">{Overview}</p>
            <br></br>
          </div>

          <br></br>

          <div className="Report-Background">
            <br></br>

            {/* Quiz results */}
            <h3 className="Report-Title">
              <u>{isSpanish ? "Carrera recomendada" : "Recommended Career"}</u>
            </h3>
            <p className="Report-Text">{RecCareer}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>{isSpanish ? "Descripción del trabajo" : "Job Description"}</u>
            </h3>
            <p className="Report-Text">{Description}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>{isSpanish ? "Rango salarial" : "Salary Range"}</u>
            </h3>
            <p className="Report-Text">{isSpanish ? "Bajo" : "Low"}: {Salary[0]}</p>
            <p className="Report-Text">{isSpanish ? "Medio" : "Medium"}: {Salary[1]}</p>
            <p className="Report-Text">{isSpanish ? "Alto" : "High"}: {Salary[2]}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>{isSpanish ? "Educación requerida" : "Education Required"}</u>
            </h3>
            <p className="Report-Text">{Education}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>{isSpanish ? "Cómo se ajusta este trabajo a ti" : "How this job fits you"}</u>
            </h3>
            <p className="Report-Text">{Fit}</p>

            <hr></hr>

            {/* Secondary report details */}
            <h3 className="Report-Title">
              <u>{isSpanish ? "Otras recomendaciones" : "Other Recommendations"}</u>
            </h3>
            <p className="Report-Text">
              {OtherJobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>{isSpanish ? "Aspectos relacionados" : "Related Aspects"}</u>
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
        <button onClick={() => setShowReport(false)}>{isSpanish ? "Volver al cuestionario" : "Back to Quiz"}</button>
        <hr></hr>
      </div>
    </div>
  );
}
