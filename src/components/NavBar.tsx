// import HomePage from "./HomePage";
// import BasicQuiz from "./BasicQuiz";
// import DetailedQuiz from "./DetailedQuiz";
import NavDropdown from "react-bootstrap/NavDropdown";

function NavBar({
  brandName,
  imageSrcPath,
  currentPage,
  setCurrentPage,
}: {
  brandName: string;
  imageSrcPath: string;
  currentPage: "detailed" | "basic" | "home";
  setCurrentPage: (page: "detailed" | "basic" | "home") => void;
}) {
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
        <NavDropdown title="Menu" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={() => setCurrentPage("home")}>
            Home
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("basic")}>
            Basic Quiz
          </NavDropdown.Item>
          <NavDropdown.Item onClick={() => setCurrentPage("detailed")}>
            Detailed Quiz
          </NavDropdown.Item>
        </NavDropdown>
      </div>
    </nav>
  );
}
export default NavBar;
