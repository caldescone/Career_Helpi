import React, { useState } from "react";
import "./App.css";
import { Button, CardFooter, Form } from "react-bootstrap";

import BasicQuiz from "./components/BasicQuiz";
import DetailedQuiz from "./components/DetailedQuiz";
import HomePage from "./components/HomePage";
import BasicQuizSpanish from "./components/BasicQuizSpanish";
import DetailedQuizSpanish from "./components/DetailedQuizSpanish";
import HomePageSpanish from "./components/HomePageSpanish";
import NavBar from "./components/NavBar";
import logo from "./assets/images/logo2.png";

import { isValidKey } from "./components/GPT";
//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [currentPage, setCurrentPage] = useState<
    | "detailed"
    | "basic"
    | "home"
    | "basicSpanish"
    | "detailedSpanish"
    | "homeSpanish"
  >("home");

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    isValidKey(key).then((valid) => {
      if (valid) {
        localStorage.setItem(saveKeyData, JSON.stringify(key));
        window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
      } else {
        alert("Invalid API Key");
      }
    });
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }

  return (
    <div className="parallax">
      <NavBar
        brandName="         The Career Helpi"
        imageSrcPath={logo}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="App">
        {currentPage === "home" ? <HomePage currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null}
        {currentPage === "basic" ? <BasicQuiz keyData={keyData} /> : null}
        {currentPage === "detailed" ? <DetailedQuiz keyData={keyData} /> : null}
        {currentPage === "basicSpanish" ? (
          <BasicQuizSpanish keyData={keyData} />
        ) : null}
        {currentPage === "detailedSpanish" ? (
          <DetailedQuizSpanish keyData={keyData} />
        ) : null}
        {currentPage === "homeSpanish" ? <HomePageSpanish currentPage={currentPage} setCurrentPage={setCurrentPage}/> : null}

        <div className="EmptySpace"></div>

        <CardFooter>
          <Form>
            <Form.Label className="d-block text-center mt-2">
              API Key / Clave de API:
              <Form.Control
                id={`api`} // unique id for each input from chrome suggestions
                name={`api`} // unique name for each input from chrome suggestions
                type="password"
                placeholder="Insert API Key Here / Inserte la Clave de API Aquí"
                onChange={changeKey}
                style={{ width: "800px", margin: "0 auto" }}
              ></Form.Control>
            </Form.Label>

            <Button className="Submit-Button" onClick={handleSubmit}>
              Submit / Enviar
            </Button>
          </Form>
        </CardFooter>
      </div>
    </div>
  );
}
export default App;
