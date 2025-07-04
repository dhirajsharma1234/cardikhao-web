/** @format */

// components/CarCategories.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const CarCategories = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("body-type-tab");

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const handleKeyDown = (e, tabId) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setActiveTab(tabId);
        }
    };

    return (
        <div className="car-category pt-40">
            <div className="container">
                <h2 className="section-heading blue-accent">
                    Cars by category
                </h2>
                <div className="tab-component">
                    <nav className="tab-navigation" role="tablist">
                        <ul className="tab-list">
                            {[
                                {
                                    id: "body-type-tab",
                                    label: "Body type",
                                    controls: "body-type-panel",
                                },
                                {
                                    id: "fuel-type-tab",
                                    label: "Fuel type",
                                    controls: "fuel-type-panel",
                                },
                            ].map((tab) => (
                                <li
                                    key={tab.id}
                                    className={`tab-item ${
                                        activeTab === tab.id ? "active" : ""
                                    }`}
                                    role="presentation"
                                >
                                    <button
                                        className="tab-button"
                                        role="tab"
                                        aria-selected={activeTab === tab.id}
                                        aria-controls={tab.controls}
                                        id={tab.id}
                                        tabIndex={activeTab === tab.id ? 0 : -1}
                                        onClick={() => handleTabClick(tab.id)}
                                        onKeyDown={(e) =>
                                            handleKeyDown(e, tab.id)
                                        }
                                    >
                                        {tab.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="tab-content">
                        <div
                            id="body-type-panel"
                            className={`tab-panel ${
                                activeTab === "body-type-tab" ? "active" : ""
                            }`}
                            role="tabpanel"
                            aria-labelledby="body-type-tab"
                            tabIndex={0}
                            hidden={activeTab !== "body-type-tab"}
                        >
                            <div className="card-container">
                                {[
                                    { name: "SUV", filter: "bodyType=SUV" },
                                    {
                                        name: "Hatchback",
                                        filter: "bodyType=Hatchback",
                                    },
                                    { name: "Sedan", filter: "bodyType=Sedan" },
                                ].map((category, index) => (
                                    <Link
                                        key={index}
                                        to={`/carlisting?${category.filter}`}
                                        className="card"
                                    >
                                        <img
                                            alt={category.name}
                                            loading="lazy"
                                            width={124}
                                            height={50}
                                            decoding="async"
                                            src={`assets/images/category/car/${category.name}.webp`}
                                        />
                                        <strong>{category.name}</strong>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div
                            id="fuel-type-panel"
                            className={`tab-panel ${
                                activeTab === "fuel-type-tab" ? "active" : ""
                            }`}
                            role="tabpanel"
                            aria-labelledby="fuel-type-tab"
                            tabIndex={0}
                            hidden={activeTab !== "fuel-type-tab"}
                        >
                            <div className="card-container">
                                {[
                                    {
                                        name: "Petrol",
                                        filter: "fuelType=Petrol",
                                    },
                                    {
                                        name: "Diesel",
                                        filter: "fuelType=Diesel",
                                    },
                                    {
                                        name: "Electric",
                                        filter: "fuelType=Electric",
                                    },
                                    { name: "CNG", filter: "fuelType=CNG" },
                                    {
                                        name: "Hybrid",
                                        filter: "fuelType=Hybrid",
                                    },
                                ].map((fuel, index) => (
                                    <Link
                                        key={index}
                                        to={`/carlisting?${fuel.filter}`}
                                        className="card"
                                    >
                                        <img
                                            alt={fuel.name}
                                            loading="lazy"
                                            width={124}
                                            height={50}
                                            decoding="async"
                                            src={`assets/images/category/fuel/${fuel.name.toLowerCase()}.webp`}
                                        />
                                        <strong>{fuel.name}</strong>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCategories;
