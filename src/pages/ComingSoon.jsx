import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../ComingSoon.css"; // We'll create this CSS file

const ComingSoon = () => {
    const canvasRef = useRef(null);
    const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];
    const particleCount = 280;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initialize particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 300;
        this.speed = 1 + Math.random();
        this.radius = Math.random() * 3;
        this.opacity = (Math.random() * 100) / 1000;
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fill();
        p.y -= p.speed;

        if (p.y <= -10) {
          particles[i] = new Particle();
        }
      }
    };

    const loop = () => {
      draw();
      requestAnimationFrame(loop);
    };

    // Initial setup
    resizeCanvas();
    loop();

    // Handle window resize
    window.addEventListener("resize", () => {
      resizeCanvas();
    });

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <section className="coming-soon-section">
      <canvas ref={canvasRef} id="coming-soon-canvas" />
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <div className="coming-soon-separator-container">
          <div className="coming-soon-separator coming-soon-line-separator">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="320.864"
                height="320.864"
                viewBox="0 0 320.864 320.864"
              >
                <path fill="#fff" />
              </svg>
            </span>
          </div>
        </div>
        <h3 className="coming-soon-subtitle">
          Building the future of car buying and selling. Stay tuned!
        </h3>
        <button onClick={() => navigate("/")} className="home-button">
          Go Back Home
        </button>
      </div>
    </section>
  );
};

export default ComingSoon;
