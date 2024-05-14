// import HomePage from "./HomePage";
// import BasicQuiz from "./BasicQuiz";
// import DetailedQuiz from "./DetailedQuiz";
import { Form } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({
  brandName,
  imageSrcPath,
  currentPage,
  setCurrentPage,
  isSpanish,
  setIsSpanish,
}: {
  brandName: string;
  imageSrcPath: string;
  currentPage: "detailed" | "basic" | "home";
  setCurrentPage: (page: "detailed" | "basic" | "home") => void;
  isSpanish: boolean;
  setIsSpanish: (isSpanish: boolean) => void;
}) {
  // This is the Control
  function updateLanguage(event: React.ChangeEvent<HTMLInputElement>) {
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
          <span className="fw-bolder fs-4 p-4">{brandName}</span>
        </div>
        {currentPage === "home" ? (
          <>
            <div className="ms-auto">
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
        ) : ( null )}
        <NavDropdown
          title={isSpanish ? "Menú" : "Menu"}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item onClick={() => setCurrentPage("home")}>
            {isSpanish ? "Inicio" : "Home"}
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("basic")}>
            {isSpanish ? "Quiz Básico" : "Basic Quiz"}
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("detailed")}>
            {isSpanish ? "Quiz Detallado" : "Detailed Quiz"}
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
}
export default NavBar;
