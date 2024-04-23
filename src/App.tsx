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
      <header className="App-header">
        The Career Helpi
      </header>
      { currentPage === "home" ? <HomePage /> : null }
      { currentPage === "basic" ? <BasicQuiz /> : null }
      { currentPage === "detailed" ? <DetailedQuiz /> : null }


      <Button className="Home-Button mt-5 mx-auto mb-3" onClick={() => setCurrentPage("home")}>
        Home Page
      </Button>
      <Button className="Basic-Button mt-5 mx-auto mb-3" onClick={() => setCurrentPage("basic")}>
        Basic Quiz
      </Button>
      <Button className="Detailed-Button mt-5 mx-auto mb-3" onClick={() => setCurrentPage("detailed")}>
        Detailed Quiz 
      </Button>

      <header className="App-header">
      </header>
      <Form>
        <Form.Label className="d-block text-center mt-3">API Key:</Form.Label>
        <Form.Control
          type="password"
          placeholder="Insert API Key Here"
          onChange={changeKey}
          style={{ width: "1000px", margin: "0 auto" }}
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


// return (
//   <div className="App">
//     { currentPage === "basic" ? <BasicQuiz /> : null }
//     { currentPage === "detailed" ? <DetailedQuiz /> : null }
//     <Button className="Basic-Button" onClick={() => setCurrentPage("home")}>
//       Home Page
//     </Button>
//     <Button className="Basic-Button" onClick={() => setCurrentPage("basic")}>
//       Basic Quiz
//     </Button>
//     <Button className="Detailed-Button" onClick={() => setCurrentPage("detailed")}>
//       Detailed Quiz 
//     </Button>


//     <div className="row">
//       <div className="columnCenter">
//         <h1> <u>Basic Quiz Description</u> </h1>
//         A quicker quiz filled with more basic questions. 
//         <br></br>
//         <br></br>
//         Estimated time: 5 Minutes
//       </div>
//       <div className="columnCenter">
//         <h1> <u>Detailed Quiz Description</u> </h1> 
//         A longer quiz filled with harder, more detailed questions.
//         <br></br>
//         <br></br>
//         Estimated time: 10 Minutes
//       </div>
//     </div>


//     <header className="App-header">
//     </header>
//     <Form>
//       <Form.Label>API Key:</Form.Label>
//       <Form.Control
//         type="password"
//         placeholder="Insert API Key Here"
//         onChange={changeKey}
//       ></Form.Control>
//       <br></br>
//       <Button className="Submit-Button" onClick={handleSubmit}>
//         Submit
//       </Button>
//     </Form>
//   </div>
// );
// }