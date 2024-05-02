export default function Report(
    {
        Overview,
        RecCareer,
        Description,
        Salary,
        Education,
        Fit,
        OtherJobs,
        RelatedAspects,
      }: {
        Overview: string | null;
        RecCareer: string | null;
        Description: string | null;
        Salary: string | null;
        Education: string | null;
        Fit: string | null;
        OtherJobs: string | null;
        RelatedAspects: string | null;
      }
) {


    return (
        // Overall report
        <div className="Report">

            <br></br>

            {/* Overview */}
            <div className="Report-Overview">
                <h3>Overview:</h3>
                <p>{Overview}</p>

            </div>

            {/* Line break */}
            <br></br>

            {/* Quiz results */}
            <div className="Report-Text">
                <h3>Recommended Career:</h3>
                <p>{RecCareer}</p>

                <h3>Job Description:</h3> 
                <p>{Description}</p>

                <h3>Salary Range:</h3>
                <p>{Salary}</p>

                <h3>Education Required:</h3>
                <p>{Education}</p>

                <h3>How This Job Fits You:</h3>
                <p>{Fit}</p>
            </div>

            <br></br>

            {/* Secondary report details */}
            <div className="Report-Text">
                <h3>Other Recommendations:</h3>
                <p>{OtherJobs}</p>
                
                <h3>Related Aspects:</h3>
                <p>{RelatedAspects}</p>
            </div>
            {/* Maybe add a picture showing the job along with the results on the right side? Leave the left side for the info? 
            Put colored boxes around the two different sections of results? */}

            {/* Maybe style it so that there are boxes around the difference sections or something seperating them? */}

        </div>

    )
}