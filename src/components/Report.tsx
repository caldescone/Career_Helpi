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
      <div className="Report-Header">
        <div className="Report-Intro">
          <h1>
            <u>Detailed Quiz Report</u>
          </h1>
          <h4>
            Based on your answers to the quiz, here are some jobs that you might
            be interested in
          </h4>
        </div>
      </div>
      <div className="Report-Back-Color">
        <div className="Report">
          <br></br>
          <div className="Report-Background">
            {/* Summary */}
            <h3 className="Report-Title">
              <u>Summary</u>
            </h3>
            <p className="Report-Text">{Overview}</p>
            <br></br>
          </div>

          <br></br>

          <div className="Report-Background">
            <br></br>

            {/* Quiz results */}
            <h3 className="Report-Title">
              <u>Recommended Career</u>
            </h3>
            <p className="Report-Text">{RecCareer}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Job Description</u>
            </h3>
            <p className="Report-Text">{Description}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Salary Range</u>
            </h3>
            <p className="Report-Text">Low: {Salary[0]}</p>
            <p className="Report-Text">Median: {Salary[1]}</p>
            <p className="Report-Text">High: {Salary[2]}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Education Required</u>
            </h3>
            <p className="Report-Text">{Education}</p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>How This Fits Job You</u>
            </h3>
            <p className="Report-Text">{Fit}</p>

            <hr></hr>

            {/* Secondary report details */}
            <h3 className="Report-Title">
              <u>Other Recommendations</u>
            </h3>
            <p className="Report-Text">
              {OtherJobs.map((job, index) => (
                <li key={index}>{job}</li>
              ))}
            </p>

            <hr></hr>

            <h3 className="Report-Title">
              <u>Related Aspects</u>
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
        <button onClick={() => setShowReport(false)}>Go Back to Quiz</button>
        <hr></hr>
      </div>
    </div>
  );
}
