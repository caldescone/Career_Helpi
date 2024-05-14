// import HomePage from "./HomePage";
// import BasicQuiz from "./BasicQuiz";
// import DetailedQuiz from "./DetailedQuiz";
import { useState } from "react";
import { Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({
  brandName,
  imageSrcPath,
  currentPage,
  setCurrentPage,
}: {
  brandName: string;
  imageSrcPath: string;
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
  const [isSpanish, setIsSpanish] = useState<boolean>(true);

  // This is the Control
  function updateLanguage(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentPage(isSpanish ? "homeSpanish" : "home");
    setIsSpanish(!isSpanish);
  }
  return (
    <nav className="navbar fixed-top navbar-dark bg-dark shadow">
      <div className="container-fluid">
        <div className="navbar-brand" onClick={() => setCurrentPage("home")}>
          <img
            src={imageSrcPath}
            width="50"
            height="50"
            className="d-inline-block align-center"
            alt=""
          />
          <span className="fw-bolder fs-4">{brandName}</span>
        </div>
        {currentPage === "home" || currentPage === "homeSpanish" ? (
          <>
            <div className="ms-auto">
              {" "}
              {/* Add this div to push the switch to the right */}
              <Form.Check
                type="switch"
                id="is-spanish-check"
                label={isSpanish ? "English" : "Español"}
                checked={isSpanish}
                onChange={updateLanguage}
                className="white-label" // Add a CSS class for styling
              />
            </div>
          </>
        ) : null}
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => setCurrentPage("home")}>
            Home
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("basic")}>
            Basic Quiz
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("basicSpanish")}>
            Quiz Básico
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("detailed")}>
            Detailed Quiz
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("detailedSpanish")}>
            Quiz Detallado
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
}
export default NavBar;
