export default function HomePage() {
  return (
    <div className="row mt-5">
                <div className="middle-block">
            <div>
              {" "}
              <div className="container">
                {" "}
                <p className="text"> What career is best for me? </p>
              </div>
            </div>
            {/* <img src={logo} className="App-logo" alt="The-Career-Helpi" /> */}
          </div>
      <div className="columnCenter mt-5">
        <h1>
          {" "}
          <u>Basic Quiz Description</u>{" "}
        </h1>
        A quicker quiz filled with more basic questions.
        <br></br>
        <br></br>
        Estimated time: 5 Minutes
      </div>
      <div className="columnCenter mt-5">
        <h1>
          {" "}
          <u>Detailed Quiz Description</u>{" "}
        </h1>
        A longer quiz filled with harder, more detailed questions.
        <br></br>
        <br></br>
        Estimated time: 10 Minutes
      </div>
    </div>
  );
}
