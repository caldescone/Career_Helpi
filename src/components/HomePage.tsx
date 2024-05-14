import React, { useState } from "react";

export default function HomePage() {

    const [currentPage, setCurrentPage] = useState<
    | "detailed"
    | "basic"
    | "home"
    | "basicSpanish"
    | "detailedSpanish"
    | "homeSpanish"
  >("home");

  return (
    <div className="Home-Page">
      <div className="row mt-5">
        <div className="middle-block">
          <br></br>
          <br></br>
          <div>
            <div className="container">
              <p className="text"> What career is best for me? </p>
            </div>
          </div>
          {/* <img src={logo} className="App-logo" alt="The-Career-Helpi" /> */}
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u>Basic Quiz</u>
            </h1>
            <h4>A quicker quiz filled with more basic questions.</h4>
            The basic quiz is a shorter quiz that provides you with options to
            each question. The questions will ask you about personal traits and
            preferences in and out of the office. This quiz is designed to be a
            quick way to get a general idea of what career paths might interest
            you. You can access the quiz from the menu above.
            <br></br>
            <br></br>
            Estimated time: 5 Minutes
            <br></br>
            <br></br>
            <button className="Submit-Button" onClick={() => setCurrentPage("basic")}>
                To Basic Quiz
            </button>
          </div>
        </div>
        <div className="columnCenter mt-5">
          <div className="Quiz-Description">
            <h1>
              <u>Detailed Quiz</u>
            </h1>
            <h4>A longer quiz filled with harder, more detailed questions.</h4>
            The detailed quiz is a longer quiz that involves fill in the blank
            questions. The questions will ask you about your strengths,
            interests, work environment preferences, and more. This quiz is
            designed to give you an in depth idea of what career paths might
            interest you. You can access the quiz from the menu above.
            <br></br>
            <br></br>
            Estimated time: 10 Minutes
            <br></br>
            <br></br>
            <button className="Submit-Button" onClick={() => setCurrentPage("detailed")}>
                To Detailed Quiz
            </button>
          </div>
        </div>
        <div className="EmptySpace"></div>
        <div className="Statement">
          <h4>
            A detailed report will be generated using ChatGPT and provided to
            you after you complete the quiz.
          </h4>
        </div>
      </div>
    </div>
  );
}