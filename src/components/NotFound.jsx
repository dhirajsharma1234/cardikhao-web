import React from "react";
import { useNavigate } from "react-router-dom";
import '../NotFound.css'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="error-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <button onClick={() => navigate("/")} className="home-button">
          Go Back Home
        </button>
      </div>
      <div className="car-animation-container">
        <div className="car-animation"></div>
      </div>
    </div>
  );
};

export default NotFound;
