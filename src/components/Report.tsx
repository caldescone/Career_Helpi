export default function Report() {


    return (
        // Overall report
        <div className="Report">

            <br></br>

            {/* Overview */}
            <div className="Report-Overview">
                <h3>Overview:</h3>
                <p>Overview here</p>

            </div>

            {/* Line break */}
            <br></br>

            {/* Quiz results */}
            <div className="Report-Text">
                <h3>Recommended Career:</h3>
                <p>JOB TITLE</p>

                <h3>Job Description:</h3> 
                <p>DESCRIPTION</p>

                <h3>Salary Range:</h3>
                <p>RANGE</p>

                <h3>Education Required:</h3>
                <p>EDUCATION</p>

                <h3>How This Fits Job You:</h3>
                <p>HOW RELATED TO QUIZ</p>
            </div>

            <br></br>

            {/* Secondary report details */}
            <div className="Report-Text">
                <p>Other Recommendations:</p>
                <p>Related Aspects:</p>
            </div>
            {/* Maybe add a picture showing the job along with the results on the right side? Leave the left side for the info? 
            Put colored boxes around the two different sections of results? */}

            {/* Maybe style it so that there are boxes around the difference sections or something seperating them? */}

        </div>

    )
}