import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MockInterview.css";

const MockInterview = () => {
  const [isInterviewActive, setIsInterviewActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(120); // 2 minutes per question
  const [isRecording, setIsRecording] = useState(false);
  const [userResponse, setUserResponse] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [interviewType, setInterviewType] = useState("technical");
  
  // Mock interview questions
  const questions = {
    technical: [
      "Can you explain the difference between let, const, and var in JavaScript?",
      "What is the virtual DOM in React and how does it work?",
      "Explain the concept of closures in JavaScript.",
      "How would you optimize a website's performance?",
      "Explain the box model in CSS."
    ],
    behavioral: [
      "Tell me about a time you faced a challenging situation in a project.",
      "How do you handle conflicts within a team?",
      "Describe a situation where you had to learn a new technology quickly.",
      "How do you prioritize your tasks when you have multiple deadlines?",
      "Tell me about a project you're particularly proud of."
    ]
  };
  
  // Timer countdown when interview is active
  useEffect(() => {
    let interval;
    if (isInterviewActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      // Auto-submit when time runs out
      handleSubmitAnswer();
    }
    
    return () => clearInterval(interval);
  }, [isInterviewActive, timer]);
  
  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const startInterview = () => {
    setIsInterviewActive(true);
    setCurrentQuestion(0);
    setTimer(120);
    setFeedback(null);
    setUserResponse("");
  };
  
  const handleRecording = () => {
    // In a real application, this would start/stop audio recording
    setIsRecording(!isRecording);
  };
  
  const handleSubmitAnswer = () => {
    // In a real app, this would submit the answer for AI evaluation
    // For now, we'll simulate feedback
    const feedbackResponses = [
      {
        score: 8,
        strengths: ["Clear explanation", "Good technical depth", "Structured response"],
        improvements: ["Could provide more real-world examples", "Consider mentioning alternative approaches"]
      },
      {
        score: 7,
        strengths: ["Demonstrated good understanding", "Logical flow in explanation"],
        improvements: ["Be more concise", "Add more specific technical details"]
      }
    ];
    
    setFeedback(feedbackResponses[Math.floor(Math.random() * feedbackResponses.length)]);
    setIsRecording(false);
  };
  
  const handleNextQuestion = () => {
    if (currentQuestion < questions[interviewType].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimer(120);
      setFeedback(null);
      setUserResponse("");
      setIsRecording(false);
    } else {
      // End of interview
      setIsInterviewActive(false);
    }
  };
  
  const handleInterviewTypeChange = (type) => {
    setInterviewType(type);
    if (isInterviewActive) {
      setIsInterviewActive(false);
      setFeedback(null);
    }
  };

  return (
    <div className="interview-container">
      <div className="interview-background">
        <div className="grid-overlay"></div>
      </div>
      
      <div className="floating-elements">
        <div className="floating-circle circle-1"></div>
        <div className="floating-circle circle-2"></div>
        <div className="floating-circle circle-3"></div>
      </div>
      
      <Link to="/dashboard" className="back-button">
        <span className="back-icon">←</span>
        <span>Back to Dashboard</span>
      </Link>
      
      <main className="interview-content">
        <header className="interview-header">
          <h1 className="gradient-text">AI Mock Interview</h1>
          <p className="subtitle">Practice your interview skills with our AI interviewer</p>
        </header>
        
        {!isInterviewActive ? (
          // Interview selection screen
          <div className="interview-setup">
            <div className="setup-card">
              <h2>Select Interview Type</h2>
              
              <div className="interview-types">
                <button 
                  className={`type-button ${interviewType === "technical" ? "active" : ""}`}
                  onClick={() => handleInterviewTypeChange("technical")}
                >
                  <div className="type-icon">💻</div>
                  <div className="type-details">
                    <h3>Technical Interview</h3>
                    <p>Coding & system design questions</p>
                  </div>
                </button>
                
                <button 
                  className={`type-button ${interviewType === "behavioral" ? "active" : ""}`}
                  onClick={() => handleInterviewTypeChange("behavioral")}
                >
                  <div className="type-icon">🤝</div>
                  <div className="type-details">
                    <h3>Behavioral Interview</h3>
                    <p>Soft skills & past experiences</p>
                  </div>
                </button>
              </div>
              
              <div className="interview-options">
                <div className="option">
                  <h3>Duration</h3>
                  <select className="interview-select">
                    <option>5 Questions (~15 min)</option>
                    <option>10 Questions (~30 min)</option>
                    <option>15 Questions (~45 min)</option>
                  </select>
                </div>
                
                <div className="option">
                  <h3>Difficulty</h3>
                  <select className="interview-select">
                    <option>Entry Level</option>
                    <option>Mid Level</option>
                    <option>Senior Level</option>
                  </select>
                </div>
              </div>
              
              <button className="start-button" onClick={startInterview}>
                <span className="button-text">Start Interview</span>
                <span className="button-icon">→</span>
              </button>
            </div>
            
            <div className="tips-card">
              <h2>Interview Tips</h2>
              <ul className="tips-list">
                <li>Speak clearly and at a moderate pace</li>
                <li>Use the STAR method for behavioral questions</li>
                <li>Take a moment to think before answering</li>
                <li>Give specific examples from your experience</li>
                <li>Ask clarifying questions when needed</li>
              </ul>
            </div>
          </div>
        ) : (
          // Active interview session
          <div className="interview-session">
            <div className="interview-info">
              <div className="question-counter">
                Question {currentQuestion + 1} of {questions[interviewType].length}
              </div>
              <div className="interview-timer">
                <div className={`timer ${timer < 30 ? "warning" : ""}`}>
                  {formatTime(timer)}
                </div>
              </div>
            </div>
            
            <div className="interview-panel">
              <div className="interviewer-section">
                <div className="interviewer-video">
                  <div className="video-placeholder">
                    <div className="avatar-circle">
                      <span>AI</span>
                    </div>
                  </div>
                  <div className="interviewer-status active">
                    <span>AI Interviewer</span>
                  </div>
                </div>
                
                <div className="question-card">
                  <h3>Question:</h3>
                  <p>{questions[interviewType][currentQuestion]}</p>
                </div>
              </div>
              
              <div className="candidate-section">
                <div className="candidate-video">
                  <div className="video-placeholder user">
                    <span>You</span>
                  </div>
                  <div className="interview-controls">
                    <button 
                      className={`control-button ${isRecording ? "recording" : ""}`}
                      onClick={handleRecording}
                    >
                      <span className="control-icon">{isRecording ? "⏹️" : "🎙️"}</span>
                      <span>{isRecording ? "Stop Recording" : "Start Recording"}</span>
                    </button>
                    <button 
                      className="control-button submit"
                      onClick={handleSubmitAnswer}
                      disabled={!isRecording && !userResponse}
                    >
                      <span className="control-icon">✓</span>
                      <span>Submit Answer</span>
                    </button>
                  </div>
                </div>
                
                <div className="response-area">
                  <h3>Your Response:</h3>
                  <textarea 
                    value={userResponse}
                    onChange={(e) => setUserResponse(e.target.value)}
                    placeholder="Type your answer here, or use the record button to speak..."
                    disabled={isRecording}
                    className={isRecording ? "recording" : ""}
                  ></textarea>
                </div>
              </div>
            </div>
            
            {feedback && (
              <div className="feedback-section">
                <h2>Question Feedback</h2>
                <div className="feedback-content">
                  <div className="feedback-score">
                    <div className="score-circle">
                      <span className="score-value">{feedback.score}</span>
                      <span className="score-max">/10</span>
                    </div>
                  </div>
                  
                  <div className="feedback-details">
                    <div className="feedback-category">
                      <h3>Strengths</h3>
                      <ul>
                        {feedback.strengths.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="feedback-category">
                      <h3>Areas for Improvement</h3>
                      <ul>
                        {feedback.improvements.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <button className="next-button" onClick={handleNextQuestion}>
                  {currentQuestion < questions[interviewType].length - 1 ? "Next Question" : "Finish Interview"}
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default MockInterview; 