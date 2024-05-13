import React, { useState, useEffect } from "react";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";
import { CareerRecommendation } from "./GPT";

export default function Loading({
  submitAnswers,
  setShowReport,
  recJobs,
}: {
  submitAnswers: () => void;
  setShowReport: (showReport: boolean) => void;
  recJobs: CareerRecommendation | null;
}) {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 20000); // 15 seconds

    return () => clearTimeout(timer);
  }, [setShowRetry]); // Include setShowRetry as a dependency

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
      <h1 style={{ marginRight: "10px" }}>Loading</h1>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {showRetry && (
        <div className="popup">
          <p>
            This took longer than expected / Esto tomó más tiempo de lo
            esperado.
          </p>
          <button onClick={handleRetry}>Try Again / Intentar de nuevo</button>
          <button onClick={handleGoBack}>Go Back / Volver</button>
        </div>
      )}
    </div>
  );
}
