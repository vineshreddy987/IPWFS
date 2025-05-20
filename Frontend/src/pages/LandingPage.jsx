import React, { useEffect, useState, useRef } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import HolographicCubes from "../components/HolographicCubes";

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [headerClass, setHeaderClass] = useState('');
  const [taglineIndex, setTaglineIndex] = useState(0);
  const gridRef = useRef(null);
  const cubesRef = useRef(null);
  const headerRef = useRef(null);
  const aboutRef = useRef(null);
  const featuresRef = useRef(null);
  const resourcesRef = useRef(null);
  
  const taglines = [
    "Prepare for your dream job interviews with our comprehensive platform.",
    "Practice with mock interviews tailored to your industry and experience.",
    "Get personalized feedback to improve your interview performance.",
    "Access a vast library of interview questions from top companies."
  ];
  
  useEffect(() => {
    // Add animation class after component mounts for entrance animations
    setIsLoaded(true);
    
    // Add mouse movement parallax effect
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      
      setMousePosition({ x, y });
      
      if (gridRef.current) {
        gridRef.current.style.transform = `rotateX(${10 + y * 5}deg) rotateY(${x * 3}deg) scale(1.5)`;
      }
      
      if (cubesRef.current) {
        const cubes = cubesRef.current.querySelectorAll('.cube');
        cubes.forEach((cube, index) => {
          const multiplier = (index + 1) * 0.2;
          cube.style.transform = `translateX(${x * 30 * multiplier}px) translateY(${y * 30 * multiplier}px) rotateX(${10 + y * 10}deg) rotateY(${x * 10}deg)`;
        });
      }
    };
    
    // Handle scroll to hide scroll indicator and update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Update scroll indicator visibility
      if (scrollPosition > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Add header scroll class based on scroll position
      if (scrollPosition > 50) {
        setHeaderClass('header-scrolled');
      } else {
        setHeaderClass('');
      }
      
      // Determine which section is currently in view
      const aboutOffset = document.getElementById('about')?.offsetTop - 300 || 0;
      const featuresOffset = document.getElementById('features')?.offsetTop - 300 || 0;
      const resourcesOffset = document.getElementById('resources')?.offsetTop - 300 || 0;
      const footerOffset = document.querySelector('.footer')?.offsetTop - 300 || 0;
      
      if (scrollPosition >= footerOffset) {
        setActiveSection('resources');
      } else if (scrollPosition >= resourcesOffset) {
        setActiveSection('resources');
      } else if (scrollPosition >= featuresOffset) {
        setActiveSection('features');
      } else if (scrollPosition >= aboutOffset) {
        setActiveSection('about');
      } else {
        setActiveSection('');
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    // Initially check scroll position
    handleScroll();
    
    // Rotate taglines every 5 seconds
    const taglineInterval = setInterval(() => {
      setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length);
    }, 5000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(taglineInterval);
    };
  }, [taglines.length]);
  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // Offset for header height
        behavior: 'smooth'
      });
    }
  };
  
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="grid-background" ref={gridRef}></div>
        
        {/* Use HolographicCubes component with the loaded class */}
        <HolographicCubes className={`${isLoaded ? 'loaded' : ''}`} />
        
        <div className={`header ${headerClass}`} ref={headerRef}>
          <div className="header-brand">IPWFS</div>
          <div className="nav-links">
            <a 
              href="#about" 
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
            >
              About
            </a>
            <a 
              href="#features" 
              className={activeSection === 'features' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a 
              href="#resources" 
              className={activeSection === 'resources' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('resources');
              }}
            >
              Resources
            </a>
            <Link to="/login">Login</Link>
          </div>
        </div>
        
        <main className="hero-content">
          <h1 className="main-title">
            <span className="line">Interview Prep</span>
            <span className="line">For Students</span>
          </h1>
          
          <div className="tagline">
            <p className="tagline-text">{taglines[taglineIndex]}</p>
          </div>
          
          <div className="cta-container">
            <Link to="/login" className="cta-button">
              Get Started Now →
            </Link>
          </div>
        </main>

        <div className={`scroll-indicator ${scrolled ? 'hidden' : ''}`} onClick={scrollToContent}>
          <div className="scroll-arrow"></div>
          <div className="scroll-text">Scroll Down</div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section" ref={aboutRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>About Us</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="about-content">
            <div className="about-text">
              <h3>Empowering Students for Interview Success</h3>
              <p>
                Interview Preparation Workshop for Students (IPWFS) is a cutting-edge platform designed 
                specifically to help students navigate the challenging world of job interviews. 
                We understand that interviews can be intimidating, especially for those just starting 
                their professional journey.
              </p>
              <p>
                Our mission is to equip students with the skills, confidence, and knowledge needed 
                to excel in interviews across all industries. Whether you're preparing for internships, 
                graduate positions, or your first full-time role, our comprehensive resources are 
                tailored to your needs.
              </p>
              <div className="about-stats">
                <div className="stat-item">
                  <span className="stat-number">10,000+</span>
                  <span className="stat-label">Students Helped</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Companies Covered</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">95%</span>
                  <span className="stat-label">Success Rate</span>
                </div>
              </div>
            </div>
            <div className="about-image-container">
              <div className="about-image"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section" ref={featuresRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>Our Features</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon icon-mock"></div>
              <h3>Mock Interviews</h3>
              <p>Practice with realistic interview simulations tailored to your target industry</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon icon-feedback"></div>
              <h3>AI Feedback</h3>
              <p>Receive instant analysis and improvement suggestions on your responses</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon icon-questions"></div>
              <h3>Question Bank</h3>
              <p>Access thousands of real interview questions from top companies</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon icon-coaching"></div>
              <h3>Expert Coaching</h3>
              <p>Connect with industry professionals for personalized guidance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="resources-section" ref={resourcesRef}>
        <div className="section-container">
          <div className="section-header">
            <h2>Resources</h2>
            <div className="section-divider"></div>
          </div>
          
          <div className="resources-content">
            <div className="resource-item">
              <h3>Interview Guides</h3>
              <p>Comprehensive guides for different interview types and industries</p>
              <a href="#" className="resource-link">Learn More →</a>
            </div>
            
            <div className="resource-item">
              <h3>Resume Builder</h3>
              <p>Create professional resumes that stand out to recruiters</p>
              <a href="#" className="resource-link">Try Now →</a>
            </div>
            
            <div className="resource-item">
              <h3>Video Tutorials</h3>
              <p>Watch expert tutorials on answering difficult questions</p>
              <a href="#" className="resource-link">Watch →</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <div className="brand">IPWFS</div>
            <p>Preparing students for interview success</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h4>Site Links</h4>
              <a href="#about">About Us</a>
              <a href="#features">Features</a>
              <a href="#resources">Resources</a>
              <Link to="/login">Login</Link>
            </div>
            
            <div className="footer-links-column">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Guides</a>
              <a href="#">FAQ</a>
              <a href="#">Support</a>
            </div>
            
            <div className="footer-links-column">
              <h4>Legal</h4>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Use</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Interview Prep For Students. All rights reserved.</p>
        </div>
      </footer>
      
      <div className="submit-button-container">
        <Link to="/login" className="submit-button">
          Login →
        </Link>
      </div>
    </div>
  );
};

export default LandingPage; 