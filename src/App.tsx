import React, { useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";

import BasicQuiz from "./components/BasicQuiz";
import DetailedQuiz from "./components/DetailedQuiz";
import HomePage from "./components/HomePage";

//local storage and API Key: key should be entered in by the user and will be stored in local storage (NOT session storage)
let keyData = "";
const saveKeyData = "MYKEY";
const prevKey = localStorage.getItem(saveKeyData); //so it'll look like: MYKEY: <api_key_value here> in the local storage when you inspect
if (prevKey !== null) {
  keyData = JSON.parse(prevKey);
}

function App() {
  const [key, setKey] = useState<string>(keyData); //for api key input
  const [currentPage, setCurrentPage] = useState<"detailed" | "basic" | "home">(
    "home"
  );

  //sets the local storage item to the api key the user inputed
  function handleSubmit() {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload(); //when making a mistake and changing the key again, I found that I have to reload the whole site before openai refreshes what it has stores for the local storage variable
  }

  //whenever there's a change it'll store the api key in a local state called key but it won't be set in the local storage until the user clicks the submit button
  function changeKey(event: React.ChangeEvent<HTMLInputElement>) {
    setKey(event.target.value);
  }
  return (
    <div className="App">
      { currentPage === "home" ? <HomePage /> : null }
      { currentPage === "basic" ? <BasicQuiz keyData={keyData} /> : null }
      { currentPage === "detailed" ? <DetailedQuiz keyData={keyData} /> : null }


      <Button className="Home-Button" onClick={() => setCurrentPage("home")}>
        Home Page
      </Button>
      <Button className="Basic-Button" onClick={() => setCurrentPage("basic")}>
        Basic Quiz
      </Button>
      <Button className="Detailed-Button" onClick={() => setCurrentPage("detailed")}>
        Detailed Quiz 
      </Button>

      <header className="App-header">
      </header>
      <Form>
        <Form.Label>API Key:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
        ></Form.Control>
        <br></br>
        <Button className="Submit-Button" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default App;