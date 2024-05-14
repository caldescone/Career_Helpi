import { useState, useEffect } from "react";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";
import { CareerRecommendation } from "./GPT";

export default function Loading({
  submitAnswers,
  setShowReport,
  recJobs,
  isSpanish,
}: {
  submitAnswers: () => void;
  setShowReport: (showReport: boolean) => void;
  recJobs: CareerRecommendation | null;
  isSpanish: boolean;
}) {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, { isSpanish } ? 30000 : 20000);

    return () => clearTimeout(timer);
  }, [setShowRetry, isSpanish]); // Include setShowRetry as a dependency

  useEffect(() => {
    if (recJobs) {
      setShowRetry(false);
    }
  }, [recJobs]);

  const handleRetry = () => {
    submitAnswers();
    setShowRetry(false);
  };

  const handleGoBack = () => {
    setShowReport(false);
  };

  return (
    <div className="Loading">
      <h1 style={{ marginRight: "10px" }}>{isSpanish ? "Cargando" : "Loading"}</h1>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {showRetry && (
        <div className="popup">
          <p> {isSpanish ? "Esto tomó más tiempo de lo esperado." : "This took longer than expected."}
          </p>
          <button onClick={handleRetry}>{isSpanish ? "Reintentar" : "Retry"}</button>
          <button onClick={handleGoBack}>{isSpanish ? "Volver" : "Go Back"}</button>
        </div>
      )}
    </div>
  );
}
