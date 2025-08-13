/** @format */

import React, { useState, useEffect } from "react";
import {
    FaCity,
    FaCheckCircle,
    FaLandmark,
    FaArchway,
    FaMonument,
} from "react-icons/fa";
import axios from "axios";
import "./SellForm.css";

function SellForm() {
    // Form data state
    const [formData, setFormData] = useState({
        brand: null,
        brandId: null,
        year: null,
        modelName: null,
        expectedPrice: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        color: null,
        additionalInfo: null,
        images: [],
        sellerName: null,
        sellerPhone: null,
        sellerEmail: null,
        bodyType: null,
        condition: null,
        location: null,
    });

    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Current step tracking
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 10; // Adjusted for your API fields

    // Data options
    const fuelTypes = ["petrol", "diesel", "electric", "hybrid", "cng"];
    const transmissions = ["Manual", "Automatic"];
    const bodyTypes = [
        "SEDAN",
        "SUV",
        "HATCHBACK",
        "COUPE",
        "CONVERTIBLE",
        "WAGON",
        "VAN",
        "PICKUP",
    ];
    const conditions = ["new", "used"];
    const colors = [
        "Black",
        "White",
        "Silver",
        "Gray",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
        "Other",
    ];

    // Generate years from 2025 down to 1984
    const years = Array.from({ length: 42 }, (_, i) => 2025 - i);

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "http://82.112.234.206:8000/api/brand/all?page=1&limit=50"
                );
                setBrands(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Update next button state based on current step completion
    const isStepComplete = () => {
        switch (currentStep) {
            case 1:
                return !!formData.brand;
            case 2:
                return !!formData.year;
            case 3:
                return !!formData.modelName;
            case 4:
                return !!formData.expectedPrice;
            case 5:
                return !!formData.mileage;
            case 6:
                return !!formData.fuelType;
            case 7:
                return (
                    !!formData.transmission &&
                    !!formData.color &&
                    !!formData.bodyType &&
                    !!formData.condition
                );
            case 8:
                return !!formData.location;
            case 9:
                return (
                    !!formData.sellerName &&
                    !!formData.sellerPhone &&
                    !!formData.sellerEmail
                );
            case 10:
                return !!formData.additionalInfo;
            default:
                return true;
        }
    };

    // Handle selection changes
    const handleSelect = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle file upload
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prev) => ({
            ...prev,
            images: files,
        }));
    };

    // Navigation functions
    const goToStep = (step) => {
        setCurrentStep(step);
    };

    const goToNextStep = () => {
        if (currentStep === totalSteps) {
            submitForm();
            return;
        }
        goToStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    };

    // Submit form to API
    const submitForm = async () => {
        try {
            setLoading(true);

            const formDataToSend = new FormData();
            formDataToSend.append("brand", formData.brandId);
            formDataToSend.append("modelName", formData.modelName);
            formDataToSend.append("year", formData.year);
            formDataToSend.append("expectedPrice", formData.expectedPrice);
            formDataToSend.append("mileage", formData.mileage);
            formDataToSend.append("fuelType", formData.fuelType);
            formDataToSend.append("transmission", formData.transmission);
            formDataToSend.append("color", formData.color);
            formDataToSend.append("additionalInfo", formData.additionalInfo);
            formDataToSend.append("sellerName", formData.sellerName);
            formDataToSend.append("sellerPhone", formData.sellerPhone);
            formDataToSend.append("sellerEmail", formData.sellerEmail);
            formDataToSend.append("bodyType", formData.bodyType);
            formDataToSend.append("condition", formData.condition);

            // Append each image file
            formData.images.forEach((image) => {
                formDataToSend.append("images", image);
            });

            const token = localStorage.getItem("token"); // Assuming you store JWT token in localStorage
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(
                "http://82.112.234.206:8000/api/sell/car",
                formDataToSend,
                config
            );

            if (response.data.status) {
                goToStep(totalSteps + 1); // Show success step
            } else {
                setError("Failed to submit form. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="seller-form">
            <div className="form-container">
                <div className="form-header">
                    <h1>Sell Your Car Quickly</h1>
                    <p>
                        Fill in the details to get the best price for your car
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    {[...Array(totalSteps)].map((_, i) => (
                        <div
                            key={i + 1}
                            className={`progress-step ${
                                currentStep === i + 1 ? "active" : ""
                            } ${currentStep > i + 1 ? "completed" : ""}`}
                            data-step={i + 1}
                        >
                            <div className="step-number">
                                {i + 1 === 1 && "Brand"}
                                {i + 1 === 2 && "Year"}
                                {i + 1 === 3 && "Model"}
                                {i + 1 === 4 && "Price"}
                                {i + 1 === 5 && "Mileage"}
                                {i + 1 === 6 && "Fuel Type"}
                                {i + 1 === 7 && "Details"}
                                {i + 1 === 8 && "Location"}
                                {i + 1 === 9 && "Contact"}
                                {i + 1 === 10 && "Additional Info"}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Form Content */}
                <div className="form-content">
                    {/* Step 1: Brand Selection */}
                    <div
                        className={`form-step ${
                            currentStep === 1 ? "active" : ""
                        }`}
                        data-step={1}
                    >
                        <h2 className="step-title">Select Your Car Brand</h2>
                        {loading && <p>Loading brands...</p>}
                        {error && <p className="error">{error}</p>}
                        <div className="options-grid" id="brand-options">
                            {brands.map((brand) => (
                                <div
                                    key={brand._id}
                                    className={`option-card ${
                                        formData.brand === brand.name
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("brand", brand.name);
                                        handleSelect("brandId", brand._id);
                                    }}
                                >
                                    <img
                                        src={`http://82.112.234.206:8000/uploads/brands/${brand.logo}`}
                                        alt={brand.name}
                                        className="brand-logo"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src =
                                                "https://via.placeholder.com/100?text=No+Image";
                                        }}
                                    />
                                    <span>{brand.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 2: Year Selection */}
                    <div
                        className={`form-step ${
                            currentStep === 2 ? "active" : ""
                        }`}
                        data-step={2}
                    >
                        <h2 className="step-title">
                            Select Manufacturing Year
                        </h2>
                        <div className="year-list" id="year-options">
                            {years.map((year) => (
                                <div
                                    key={year}
                                    className={`year-item ${
                                        formData.year === year.toString()
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSelect("year", year.toString())
                                    }
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 3: Model Name */}
                    <div
                        className={`form-step ${
                            currentStep === 3 ? "active" : ""
                        }`}
                        data-step={3}
                    >
                        <h2 className="step-title">Enter Your Car Model</h2>
                        <input
                            type="text"
                            className="model-input"
                            placeholder="Enter your car model (e.g., BMW X5)"
                            value={formData.modelName || ""}
                            onChange={(e) =>
                                handleSelect("modelName", e.target.value)
                            }
                        />
                    </div>

                    {/* Step 4: Expected Price */}
                    <div
                        className={`form-step ${
                            currentStep === 4 ? "active" : ""
                        }`}
                        data-step={4}
                    >
                        <h2 className="step-title">Expected Price (₹)</h2>
                        <input
                            type="number"
                            className="price-input"
                            placeholder="Enter your expected price"
                            value={formData.expectedPrice || ""}
                            onChange={(e) =>
                                handleSelect("expectedPrice", e.target.value)
                            }
                        />
                    </div>

                    {/* Step 5: Mileage */}
                    <div
                        className={`form-step ${
                            currentStep === 5 ? "active" : ""
                        }`}
                        data-step={5}
                    >
                        <h2 className="step-title">Mileage (km)</h2>
                        <input
                            type="number"
                            className="mileage-input"
                            placeholder="Enter mileage in kilometers"
                            value={formData.mileage || ""}
                            onChange={(e) =>
                                handleSelect("mileage", e.target.value)
                            }
                        />
                    </div>

                    {/* Step 6: Fuel Type */}
                    <div
                        className={`form-step ${
                            currentStep === 6 ? "active" : ""
                        }`}
                        data-step={6}
                    >
                        <h2 className="step-title">Select Fuel Type</h2>
                        <div className="details-container">
                            <div className="details-section">
                                <h3>Fuel Type</h3>
                                <div className="options-grid">
                                    {fuelTypes.map((type) => (
                                        <label
                                            key={type}
                                            className="radio-option"
                                        >
                                            <input
                                                type="radio"
                                                name="fuelType"
                                                value={type}
                                                checked={
                                                    formData.fuelType === type
                                                }
                                                onChange={() =>
                                                    handleSelect(
                                                        "fuelType",
                                                        type
                                                    )
                                                }
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Step 7: Additional Details */}
                    <div
                        className={`form-step ${
                            currentStep === 7 ? "active" : ""
                        }`}
                        data-step={7}
                    >
                        <h2 className="step-title">Additional Details</h2>
                        <div className="details-container">
                            {/* Transmission */}
                            <div className="details-section">
                                <h3>Transmission</h3>
                                <div className="options-grid">
                                    {transmissions.map((type) => (
                                        <label
                                            key={type}
                                            className="radio-option"
                                        >
                                            <input
                                                type="radio"
                                                name="transmission"
                                                value={type}
                                                checked={
                                                    formData.transmission ===
                                                    type
                                                }
                                                onChange={() =>
                                                    handleSelect(
                                                        "transmission",
                                                        type
                                                    )
                                                }
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Body Type */}
                            <div className="details-section">
                                <h3>Body Type</h3>
                                <div className="options-grid">
                                    {bodyTypes.map((type) => (
                                        <label
                                            key={type}
                                            className="radio-option"
                                        >
                                            <input
                                                type="radio"
                                                name="bodyType"
                                                value={type}
                                                checked={
                                                    formData.bodyType === type
                                                }
                                                onChange={() =>
                                                    handleSelect(
                                                        "bodyType",
                                                        type
                                                    )
                                                }
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Condition */}
                            <div className="details-section">
                                <h3>Condition</h3>
                                <div className="options-grid">
                                    {conditions.map((type) => (
                                        <label
                                            key={type}
                                            className="radio-option"
                                        >
                                            <input
                                                type="radio"
                                                name="condition"
                                                value={type}
                                                checked={
                                                    formData.condition === type
                                                }
                                                onChange={() =>
                                                    handleSelect(
                                                        "condition",
                                                        type
                                                    )
                                                }
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">
                                                {type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Color */}
                            <div className="details-section">
                                <h3>Color</h3>
                                <div className="options-grid">
                                    {colors.map((color) => (
                                        <label
                                            key={color}
                                            className="radio-option"
                                        >
                                            <input
                                                type="radio"
                                                name="color"
                                                value={color}
                                                checked={
                                                    formData.color === color
                                                }
                                                onChange={() =>
                                                    handleSelect("color", color)
                                                }
                                                className="radio-input"
                                            />
                                            <span className="radio-custom"></span>
                                            <span className="radio-label">
                                                {color}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Image Upload */}
                            <div className="details-section">
                                <h3>Upload Images (Max 5)</h3>
                                <div className="file-upload">
                                    <label className="file-upload-label">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileUpload}
                                            style={{ display: "none" }}
                                        />
                                        <span className="file-upload-button">
                                            Choose Files
                                        </span>
                                        <span className="file-upload-text">
                                            {formData.images.length > 0
                                                ? `${formData.images.length} file(s) selected`
                                                : "No file chosen"}
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Step 8: Location */}
                    <div
                        className={`form-step ${
                            currentStep === 8 ? "active" : ""
                        }`}
                        data-step={8}
                    >
                        <h2 className="step-title">Select Your Location</h2>
                        <div className="location-list" id="location-options">
                            {[
                                "Delhi",
                                "Mumbai",
                                "Bangalore",
                                "Hyderabad",
                                "Chennai",
                                "Kolkata",
                                "Pune",
                                "Ahmedabad",
                            ].map((city) => (
                                <div
                                    key={city}
                                    className={`location-item ${
                                        formData.location === city
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        handleSelect("location", city)
                                    }
                                >
                                    <FaCity />
                                    <span>{city}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step 9: Contact Information */}
                    <div
                        className={`form-step ${
                            currentStep === 9 ? "active" : ""
                        }`}
                        data-step={9}
                    >
                        <h2 className="step-title">Contact Information</h2>

                        <div className="contact-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.sellerName || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your 10-digit phone number"
                                    maxLength={10}
                                    value={formData.sellerPhone || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerPhone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.sellerEmail || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerEmail",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                        </div>
                    </div>

                    {/* Step 10: Additional Information */}
                    <div
                        className={`form-step ${
                            currentStep === 10 ? "active" : ""
                        }`}
                        data-step={10}
                    >
                        <h2 className="step-title">Additional Information</h2>
                        <textarea
                            className="additional-info"
                            placeholder="Provide any additional information about your car (optional)"
                            rows={5}
                            value={formData.additionalInfo || ""}
                            onChange={(e) =>
                                handleSelect("additionalInfo", e.target.value)
                            }
                        />
                    </div>

                    {/* Success Step */}
                    <div
                        className={`form-step ${
                            currentStep === totalSteps + 1 ? "active" : ""
                        }`}
                        data-step={totalSteps + 1}
                    >
                        <div className="success-message">
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <h2>Thank You!</h2>
                            <p>
                                Your details have been submitted successfully.
                                Our team will contact you shortly with the best
                                offer for your car.
                            </p>
                            <button
                                className="btn btn-submit"
                                onClick={() => window.location.reload()}
                            >
                                Start New Submission
                            </button>
                        </div>
                    </div>
                </div>

                {/* Navigation Buttons */}
                <div className="form-navigation">
                    <button
                        className="btn btn-prev"
                        id="prev-btn"
                        disabled={currentStep === 1 || currentStep > totalSteps}
                        onClick={goToPreviousStep}
                    >
                        Previous
                    </button>
                    <button
                        className="btn btn-next"
                        id="next-btn"
                        disabled={!isStepComplete() || loading}
                        onClick={goToNextStep}
                    >
                        {currentStep === totalSteps
                            ? loading
                                ? "Submitting..."
                                : "Submit"
                            : "Next"}
                    </button>
                </div>

                {error && currentStep <= totalSteps && (
                    <div className="error-message">{error}</div>
                )}
            </div>
        </div>
    );
}

export default SellForm;
