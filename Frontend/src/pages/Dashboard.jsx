import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import HolographicCubes from "../components/HolographicCubes";

// Placeholder icons - replace with actual icon imports in production
const icons = {
  interview: "👥",
  quiz: "📝",
  resources: "📚",
  resume: "📄",
  chat: "💬",
  profile: "👤",
  settings: "⚙️",
  stats: "📊",
};

const Dashboard = () => {
  const [userName, setUserName] = useState("Sarah");
  const [userStreak, setUserStreak] = useState(7);
  const [completedTasks, setCompletedTasks] = useState(3);
  const [totalTasks, setTotalTasks] = useState(5);

  // Mock upcoming interviews
  const upcomingInterviews = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      role: "Frontend Developer",
      date: "May 25, 2023",
      time: "2:00 PM",
    },
    {
      id: 2,
      company: "DataViz Solutions",
      role: "UX Designer",
      date: "May 27, 2023",
      time: "11:30 AM",
    },
  ];

  // Mock recommended resources
  const recommendedResources = [
    {
      id: 1,
      title: "Top 10 JavaScript Interview Questions",
      type: "Article",
      duration: "10 min read",
    },
    {
      id: 2,
      title: "Behavioral Interview Strategies",
      type: "Video",
      duration: "15 min",
    },
    {
      id: 3,
      title: "System Design Fundamentals",
      type: "Practice Quiz",
      duration: "30 min",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Updated background with holographic cubes */}
      <HolographicCubes className="dashboard-holographic-cubes" />
      
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <span className="logo-text">IPWFS</span>
        </div>
        
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item active">
            <span className="nav-icon">{icons.stats}</span>
            <span className="nav-text">Dashboard</span>
          </Link>
          <Link to="/mock-interviews" className="nav-item">
            <span className="nav-icon">{icons.interview}</span>
            <span className="nav-text">Mock Interviews</span>
          </Link>
          <Link to="/quizzes" className="nav-item">
            <span className="nav-icon">{icons.quiz}</span>
            <span className="nav-text">Quizzes</span>
          </Link>
          <Link to="/resources" className="nav-item">
            <span className="nav-icon">{icons.resources}</span>
            <span className="nav-text">Resources</span>
          </Link>
          <Link to="/resume-builder" className="nav-item">
            <span className="nav-icon">{icons.resume}</span>
            <span className="nav-text">Resume Builder</span>
          </Link>
          <Link to="/chatbot" className="nav-item">
            <span className="nav-icon">{icons.chat}</span>
            <span className="nav-text">AI Assistant</span>
          </Link>
        </nav>
        
        <div className="sidebar-footer">
          <Link to="/profile" className="nav-item small">
            <span className="nav-icon">{icons.profile}</span>
            <span className="nav-text">Profile</span>
          </Link>
          <Link to="/settings" className="nav-item small">
            <span className="nav-icon">{icons.settings}</span>
            <span className="nav-text">Settings</span>
          </Link>
        </div>
      </aside>
      
      {/* Main content */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="welcome-section">
            <h1>Welcome back, <span className="gradient-text">{userName}</span>!</h1>
            <p className="streak-info">
              <span className="streak-flame">🔥</span> {userStreak} day streak
            </p>
          </div>
          <div className="progress-section">
            <div className="progress-text">
              <p>Daily progress</p>
              <p className="progress-percentage">{Math.round((completedTasks / totalTasks) * 100)}%</p>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              ></div>
            </div>
            <p className="progress-detail">{completedTasks} of {totalTasks} tasks completed</p>
          </div>
        </header>
        
        <div className="dashboard-content">
          <div className="dashboard-row">
            {/* Feature cards section */}
            <section className="feature-cards">
              <div className="feature-card interview-card">
                <div className="feature-icon">{icons.interview}</div>
                <h3>Mock Interviews</h3>
                <p>Practice with AI-powered interviewers</p>
                <Link to="/mock-interviews" className="feature-link">Start Practice</Link>
              </div>
              
              <div className="feature-card quiz-card">
                <div className="feature-icon">{icons.quiz}</div>
                <h3>Skill Quizzes</h3>
                <p>Test your knowledge with interactive quizzes</p>
                <Link to="/quizzes" className="feature-link">Take a Quiz</Link>
              </div>
              
              <div className="feature-card resume-card">
                <div className="feature-icon">{icons.resume}</div>
                <h3>Resume Builder</h3>
                <p>Create and optimize your professional resume</p>
                <Link to="/resume-builder" className="feature-link">Build Resume</Link>
              </div>
              
              <div className="feature-card chat-card">
                <div className="feature-icon">{icons.chat}</div>
                <h3>AI Assistant</h3>
                <p>Get instant help with interview questions</p>
                <Link to="/chatbot" className="feature-link">Ask a Question</Link>
              </div>
            </section>
          </div>
          
          <div className="dashboard-row">
            {/* Upcoming interviews section */}
            <section className="dashboard-section interviews-section">
              <h2 className="section-title">Upcoming Interviews</h2>
              
              {upcomingInterviews.length > 0 ? (
                <div className="interviews-list">
                  {upcomingInterviews.map(interview => (
                    <div key={interview.id} className="interview-card">
                      <div className="interview-company">
                        <h3>{interview.company}</h3>
                        <p className="interview-role">{interview.role}</p>
                      </div>
                      <div className="interview-details">
                        <p className="interview-date">{interview.date}</p>
                        <p className="interview-time">{interview.time}</p>
                      </div>
                      <button className="interview-action">Prepare</button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No upcoming interviews scheduled</p>
                  <button className="schedule-button">Schedule Practice Interview</button>
                </div>
              )}
            </section>
            
            {/* Recommended resources section */}
            <section className="dashboard-section resources-section">
              <h2 className="section-title">Recommended for You</h2>
              
              <div className="resources-list">
                {recommendedResources.map(resource => (
                  <div key={resource.id} className="resource-card">
                    <div className="resource-info">
                      <h3>{resource.title}</h3>
                      <div className="resource-meta">
                        <span className="resource-type">{resource.type}</span>
                        <span className="resource-duration">{resource.duration}</span>
                      </div>
                    </div>
                    <button className="resource-action">View</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard; 