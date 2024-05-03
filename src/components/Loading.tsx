import React, { useState, useEffect } from "react";
import "../App.css";
import Spinner from "react-bootstrap/Spinner";

export default function Loading({
  submitAnswers,
  setShowReport,
}: {
  submitAnswers: () => void;
  setShowReport: (showReport: boolean) => void;
}) {
  const [showRetry, setShowRetry] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRetry(true);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer);
  }, [setShowRetry]); // Include setShowRetry as a dependency

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
          <p>This took longer than expected.</p>
          <button onClick={handleRetry}>Click here to try again</button>
          <button onClick={handleGoBack}>Click here to go back</button>
        </div>
      )}
    </div>
  );
}
