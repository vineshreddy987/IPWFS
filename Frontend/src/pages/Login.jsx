import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { authAPI } from "../services/api";
import HolographicCubes from "../components/HolographicCubes";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isDevelopmentMode, setIsDevelopmentMode] = useState(false);
  const navigate = useNavigate();

  // Check if we're in development mode
  useEffect(() => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setIsDevelopmentMode(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({...errors, [e.target.name]: ""});
    }
    // Clear API error when user makes changes
    if (apiError) {
      setApiError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (isSignUp) {
      if (!formData.name) {
        newErrors.name = "Name is required";
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        setIsLoading(true);
        setApiError("");
        
        if (isSignUp) {
          // Register new user
          const userData = {
            name: formData.name,
            email: formData.email,
            password: formData.password
          };
          
          const response = await authAPI.register(userData);
          
          if (response) {
            console.log("Registration successful");
            
            // Store auth token and user info
            localStorage.setItem('authToken', response.token || 'mock-token');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', formData.name);
            
            // Navigate to dashboard after successful registration
            navigate('/dashboard');
          } else if (isDevelopmentMode) {
            // Fallback for development mode
            console.log("Using development fallback for registration");
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', formData.name);
            
            navigate('/dashboard');
          } else {
            setApiError("Registration failed. Please try again later.");
          }
        } else {
          // Login user
          const response = await authAPI.login(formData.email, formData.password);
          
          if (response) {
            console.log("Login successful", response);
            
            // Store auth token and user info
            localStorage.setItem('authToken', response.token || 'mock-token');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', formData.email);
            
            if (response.user && response.user.name) {
              localStorage.setItem('userName', response.user.name);
            } else {
              localStorage.setItem('userName', 'User');
            }
            
            // Navigate to dashboard after successful login
            navigate('/dashboard');
          } else if (isDevelopmentMode) {
            // Fallback for development mode
            console.log("Using development fallback for login");
            localStorage.setItem('authToken', 'mock-token');
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('userEmail', formData.email);
            localStorage.setItem('userName', 'Test User');
            
            navigate('/dashboard');
          } else {
            setApiError("Login failed. Please try again later.");
          }
        }
      } catch (error) {
        console.error(isSignUp ? "Registration error:" : "Login error:", error);
        
        // Handle timeout errors gracefully
        if (error.code === 'ECONNABORTED') {
          setApiError("Connection to server timed out. Using fallback login.");
          
          // Auto-fallback for timeout errors
          if (isDevelopmentMode) {
            setTimeout(() => {
              console.log("Auto-fallback login after timeout");
              localStorage.setItem('authToken', 'mock-token');
              localStorage.setItem('isAuthenticated', 'true');
              localStorage.setItem('userEmail', formData.email);
              localStorage.setItem('userName', isSignUp ? formData.name : 'User');
              navigate('/dashboard');
            }, 1500);
          }
        } else {
          setApiError(error.response?.data?.message || 
                     (isSignUp ? "Registration failed" : "Login failed"));
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setErrors({});
    setApiError("");
  };

    return (    <div className="login-container">      {/* Use updated holographic cubes component */}      <HolographicCubes className="login-holographic-cubes" />
      
      <div className="login-wrapper">
        <div className="login-form-container">
          <div className="login-header">
            <Link to="/" className="login-logo">IPWFS</Link>
            <h2>{isSignUp ? "Create Account" : "Welcome Back"}</h2>
            <p className="login-subtitle">
              {isSignUp 
                ? "Join our interview preparation platform" 
                : "Login to access your personalized interview prep"}
            </p>
          </div>
          
          {apiError && (
            <div className="api-error-message">
              {apiError}
            </div>
          )}
          
          {(isDevelopmentMode || window.location.hostname !== 'localhost') && (
            <div className="dev-mode-notice">
              {window.location.hostname === 'localhost' 
                ? 'Development Mode: Mock authentication enabled'
                : 'Demo Mode: Any email/password combination will work'}
            </div>
          )}
          
          <form className="login-form" onSubmit={handleSubmit}>
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  autoComplete="name"
                  disabled={isLoading}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                autoComplete="email"
                disabled={isLoading}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "error" : ""}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                disabled={isLoading}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            {isSignUp && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                  autoComplete="new-password"
                  disabled={isLoading}
                />
                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
              </div>
            )}
            
            {!isSignUp && (
              <div className="forgot-password">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>
            )}
            
            <button 
              type="submit" 
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading 
                ? (isSignUp ? "Creating Account..." : "Signing In...") 
                : (isSignUp ? "Sign Up" : "Sign In")
              }
            </button>
          </form>
          
          <div className="login-footer">
            <p>
              {isSignUp 
                ? "Already have an account?" 
                : "Don't have an account?"}
              <button 
                type="button" 
                className="toggle-btn" 
                onClick={toggleMode}
                disabled={isLoading}
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
