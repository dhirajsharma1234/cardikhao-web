/** @format */

import React from "react";

const Loader = () => {
    return (
        <div className="loader-container">
            <span className="loader"></span>
            <style jsx>{`
                .loader-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100vw;
                    background-color: #f9f9f9;
                }

                .loader {
                    display: block;
                    position: relative;
                    height: 32px;
                    width: 150px;
                    box-sizing: border-box;
                    overflow: hidden;
                    border: 2px solid #fff;
                    border-radius: 20px;
                }

                .loader:before {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: 2px;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: #ff3d00;
                    animation: ballbns 3s ease-in-out infinite;
                }

                @keyframes ballbns {
                    0% {
                        left: 0;
                        transform: translateX(0%);
                        box-shadow: -5px 0 0 -1px rgba(255, 61, 0, 0.9),
                            -10px 0 0 -2px rgba(255, 61, 0, 0.8),
                            -15px 0 0 -4px rgba(255, 61, 0, 0.6),
                            -20px 0 0 -6px rgba(255, 61, 0, 0.4),
                            -25px 0 0 -8px rgba(255, 61, 0, 0.2);
                    }

                    49% {
                        left: 100%;
                        transform: translateX(-100%);
                        box-shadow: -5px 0 0 -1px rgba(255, 61, 0, 0.9),
                            -10px 0 0 -2px rgba(255, 61, 0, 0.8),
                            -15px 0 0 -4px rgba(255, 61, 0, 0.6),
                            -20px 0 0 -6px rgba(255, 61, 0, 0.4),
                            -25px 0 0 -8px rgba(255, 61, 0, 0.2);
                    }

                    51% {
                        left: 100%;
                        transform: translateX(-100%);
                        box-shadow: 5px 0 0 -1px rgba(255, 61, 0, 0.9),
                            10px 0 0 -2px rgba(255, 61, 0, 0.8),
                            15px 0 0 -4px rgba(255, 61, 0, 0.6),
                            20px 0 0 -6px rgba(255, 61, 0, 0.4),
                            25px 0 0 -8px rgba(255, 61, 0, 0.2);
                    }

                    100% {
                        left: 0;
                        transform: translateX(0%);
                        box-shadow: 5px 0 0 -1px rgba(255, 61, 0, 0.9),
                            10px 0 0 -2px rgba(255, 61, 0, 0.8),
                            15px 0 0 -4px rgba(255, 61, 0, 0.6),
                            20px 0 0 -6px rgba(255, 61, 0, 0.4),
                            25px 0 0 -8px rgba(255, 61, 0, 0.2);
                    }
                }
            `}</style>
        </div>
    );
};

export default Loader;
