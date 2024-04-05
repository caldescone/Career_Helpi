import React from 'react';
import '../App.css'

const ProgressBar = ({ questionsComplete, totalQuestions }: { questionsComplete: number, totalQuestions: number }) => {
    const progress = (questionsComplete / totalQuestions) * 100;

    return (
        <div className="progress-bar">
            <div className="progress-bar__fill" style={{ width: `${progress}%` }}>
                <span className="progress-bar__text">{progress.toFixed(0)}%</span>
            </div>
        </div>
    );
};

export default ProgressBar;