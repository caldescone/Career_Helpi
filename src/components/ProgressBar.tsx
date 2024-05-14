const ProgressBar = ({
  questionsComplete,
  totalQuestions,
}: {
  questionsComplete: number;
  totalQuestions: number;
}) => {
  const progress = (questionsComplete / totalQuestions) * 100;

  return (
    <div
      className="progress-bar"
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#000000",
        borderRadius: "50px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2), 0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="progress-bar__fill"
        style={{
          width: `${progress}%`,
          height: "100%",
          backgroundColor: "#4caf50",
          borderRadius: "inherit",
          transition: "width 0.4s ease-in-out",
        }}
      >
        <span
          className="progress-bar__text"
          style={{
            paddingLeft: "10px",
            color: "#fff",
            fontSize: "12px",
            textAlign: "center",
            width: "100%",
          }}
        >
          {progress.toFixed(0)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
