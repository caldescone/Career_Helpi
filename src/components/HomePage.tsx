export default function HomePage() {
  return (
    <div className="row">
      <div className="columnCenter">
        <h1>
          {" "}
          <u>Basic Quiz Description</u>{" "}
        </h1>
        A quicker quiz filled with more basic questions.
        <br></br>
        <br></br>
        Estimated time: 5 Minutes
      </div>
      <div className="columnCenter">
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
