import React from "react";
import { useNavigate } from "react-router-dom";
import "../Error505.css"; // We'll create this CSS file

const Error505 = () => {
  const navigate = useNavigate();

  return (
    <div className="error505-container">
      <div className="error-content">
        <h1>505</h1>
        <h2>HTTP Version Not Supported</h2>
        <p>
          The server does not support the HTTP protocol version used in your
          request.
        </p>
        <div className="solution-box">
          <p>
            <strong>Possible solutions:</strong>
          </p>
          <ul>
            <li>Refresh the page</li>
            <li>Clear your browser cache</li>
            <li>Try again later</li>
          </ul>
        </div>
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

export default Error505;
