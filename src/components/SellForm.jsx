import React, { useState, useEffect } from "react";
import {
  FaCity,
  FaCheckCircle,
  FaLandmark,
  FaArchway,
  FaMonument,
} from "react-icons/fa";

function SellForm() {
  // Form data state
  const [formData, setFormData] = useState({
    brand: null,
    year: null,
    model: null,
    variant: null,
    state: null,
    rto: null,
    km: null,
    location: null,
    sellTime: null,
    contact: null,
  });

  // Current step tracking
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10; // Excluding summary and success steps

  // Data options
  const popularBrands = [
    {
      name: "Maruti Suzuki",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Maruti_Suzuki_logo.svg/1200px-Maruti_Suzuki_logo.svg.png",
    },
    {
      name: "Hyundai",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Hyundai_Motor_Company_logo.svg/1200px-Hyundai_Motor_Company_logo.svg.png",
    },
    {
      name: "Tata",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Tata_Motors_logo.svg/1200px-Tata_Motors_logo.svg.png",
    },
    {
      name: "Mahindra",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Mahindra_%26_Mahindra_Logo.svg/1200px-Mahindra_%26_Mahindra_Logo.svg.png",
    },
    {
      name: "Honda",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Honda_Logo.svg/1200px-Honda_Logo.svg.png",
    },
    {
      name: "Toyota",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Toyota_carlogo.svg/1200px-Toyota_carlogo.svg.png",
    },
    {
      name: "Kia",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Kia_Motors_logo_%282019%29.svg/1200px-Kia_Motors_logo_%282019%29.svg.png",
    },
    {
      name: "Volkswagen",
      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png",
    },
  ];

  const otherBrands = [
    "Renault",
    "Ford",
    "Skoda",
    "MG",
    "Nissan",
    "Jeep",
    "BMW",
    "Mercedes",
    "Audi",
    "Volvo",
    "Jaguar",
    "Land Rover",
    "Fiat",
    "Mitsubishi",
    "Force",
    "Isuzu",
    "Datsun",
    "Chevrolet",
  ];

  const states = [
    { name: "Delhi", icon: <FaLandmark /> },
    { name: "Maharashtra" },
    { name: "Karnataka", icon: <FaArchway /> },
    { name: "Telangana", icon: <FaMonument /> },
    { name: "Tamil Nadu" },
    { name: "West Bengal" },
    { name: "Gujarat" },
    { name: "Rajasthan" },
  ];

  const models = {
    "Maruti Suzuki": [
      "Swift",
      "Baleno",
      "Dzire",
      "Wagon R",
      "Alto",
      "Ertiga",
      "Brezza",
      "Ciaz",
    ],
    Hyundai: [
      "i20",
      "Verna",
      "Creta",
      "Venue",
      "Aura",
      "Alcazar",
      "Tucson",
      "Kona Electric",
    ],
    Tata: ["Nexon", "Harrier", "Safari", "Altroz", "Tiago", "Tigor", "Punch"],
    Mahindra: ["Thar", "XUV700", "Scorpio", "Bolero", "XUV300", "Marazzo"],
    Honda: ["City", "Amaze", "Jazz", "WR-V"],
    Toyota: ["Innova Crysta", "Fortuner", "Glanza", "Urban Cruiser"],
    Kia: ["Seltos", "Sonet", "Carnival"],
    Volkswagen: ["Polo", "Vento", "Taigun", "Virtus"],
  };

  const variants = {
    Swift: ["LXI", "VXI", "ZXI", "ZXI+"],
    Baleno: ["Sigma", "Delta", "Zeta", "Alpha"],
    i20: ["Magna", "Sportz", "Asta", "Asta (O)"],
    Creta: ["E", "EX", "S", "SX", "SX(O)"],
    Nexon: ["XE", "XM", "XZ+", "XZA+"],
    Thar: ["AX Opt", "LX", "AX"],
    City: ["SV", "V", "VX", "ZX"],
  };

  const rtoCodes = {
    delhi: [
      "DL-1C",
      "DL-2C",
      "DL-3C",
      "DL-4C",
      "DL-5C",
      "DL-6C",
      "DL-7C",
      "DL-8C",
      "DL-9C",
      "DL-10C",
    ],
    mumbai: ["MH-01", "MH-02", "MH-03", "MH-43", "MH-47"],
    bangalore: ["KA-01", "KA-02", "KA-03", "KA-04", "KA-05"],
    hyderabad: ["TS-07", "TS-08", "TS-09", "TS-10", "TS-11", "TS-12"],
    chennai: ["TN-01", "TN-02", "TN-03", "TN-04", "TN-05", "TN-06", "TN-07"],
    kolkata: ["WB-01", "WB-02", "WB-03", "WB-04", "WB-05", "WB-06"],
    pune: ["MH-12", "MH-14", "MH-49"],
    ahmedabad: ["GJ-1", "GJ-2", "GJ-3", "GJ-4", "GJ-5", "GJ-6"],
  };

  // Generate years from 2025 down to 1984
  const years = Array.from({ length: 42 }, (_, i) => 2025 - i);

  // Update next button state based on current step completion
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return !!formData.brand;
      case 2:
        return !!formData.year;
      case 3:
        return !!formData.model;
      case 4:
        return !!formData.variant;
      case 5:
        return !!formData.state;
      case 6:
        return !!formData.rto;
      case 7:
        return !!formData.km;
      case 8:
        return !!formData.location;
      case 9:
        return !!formData.sellTime;
      case 10:
        const contact = formData.contact;
        return contact && contact.length === 10 && /^\d+$/.test(contact);
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

  // Navigation functions
  const goToStep = (step) => {
    setCurrentStep(step);
  };

  const goToNextStep = () => {
    if (currentStep === totalSteps) {
      goToStep(11); // Show summary
      return;
    }

    if (currentStep === 11) {
      submitForm();
      goToStep(12); // Show success
      return;
    }

    goToStep(currentStep + 1);
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  };

  // Format sell time for display
  const formatSellTime = (sellTime) => {
    const formats = {
      immediately: "Immediately",
      "1week": "Within a Week",
      "1month": "Within a Month",
      flexible: "Flexible Timeline",
    };
    return formats[sellTime] || sellTime;
  };

  // Submit form (simulated)
  const submitForm = () => {
    console.log("Form submitted:", formData);
    // In a real application, you would send the data to a server here
  };

  return (
    <div className="seller-form">
      <div className="form-container">
        <div className="form-header">
          <h1>Sell Your Car Quickly</h1>
          <p>Fill in the details to get the best price for your car</p>
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
                {i + 1 === 4 && "Variant"}
                {i + 1 === 5 && "State"}
                {i + 1 === 6 && "RTO"}
                {i + 1 === 7 && "KM Driven"}
                {i + 1 === 8 && "Location"}
                {i + 1 === 9 && "Sell Time"}
                {i + 1 === 10 && "Contact"}
              </div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="form-content">
          {/* Step 1: Brand Selection */}
          <div
            className={`form-step ${currentStep === 1 ? "active" : ""}`}
            data-step={1}
          >
            <h2 className="step-title">Select Your Car Brand</h2>
            <div className="options-grid" id="brand-options">
              {popularBrands.map((brand) => (
                <div
                  key={brand.name}
                  className={`option-card ${
                    formData.brand === brand.name ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("brand", brand.name)}
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="brand-logo"
                  />
                  <span>{brand.name}</span>
                </div>
              ))}
            </div>
            <div className="other-brands">
              <h3>Other Brands</h3>
              <div className="other-brands-list" id="other-brands">
                {otherBrands.map((brand) => (
                  <div
                    key={brand}
                    className={`other-brand ${
                      formData.brand === brand ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("brand", brand)}
                  >
                    {brand}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Year Selection */}
          <div
            className={`form-step ${currentStep === 2 ? "active" : ""}`}
            data-step={2}
          >
            <h2 className="step-title">Select Manufacturing Year</h2>
            <div className="year-list" id="year-options">
              {years.map((year) => (
                <div
                  key={year}
                  className={`year-item ${
                    formData.year === year.toString() ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("year", year.toString())}
                >
                  {year}
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Model Selection */}
          <div
            className={`form-step ${currentStep === 3 ? "active" : ""}`}
            data-step={3}
          >
            <h2 className="step-title">Select Your Car Model</h2>
            <div className="model-list" id="model-options">
              {formData.brand && models[formData.brand] ? (
                models[formData.brand].map((model) => (
                  <div
                    key={model}
                    className={`model-item ${
                      formData.model === model ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("model", model)}
                  >
                    {model}
                  </div>
                ))
              ) : (
                <p>Please select a brand first</p>
              )}
            </div>
          </div>

          {/* Step 4: Variant Selection */}
          <div
            className={`form-step ${currentStep === 4 ? "active" : ""}`}
            data-step={4}
          >
            <h2 className="step-title">Select Variant</h2>
            <div className="variant-list" id="variant-options">
              {formData.model && variants[formData.model] ? (
                variants[formData.model].map((variant) => (
                  <div
                    key={variant}
                    className={`variant-item ${
                      formData.variant === variant ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("variant", variant)}
                  >
                    {variant}
                  </div>
                ))
              ) : (
                <p>Please select a model first</p>
              )}
            </div>
          </div>

          {/* Step 5: State Selection */}
          <div
            className={`form-step ${currentStep === 5 ? "active" : ""}`}
            data-step={5}
          >
            <h2 className="step-title">Select Registration State</h2>
            <div className="state-list" id="state-options">
              {states.map((state) => (
                <div
                  key={state.name}
                  className={`state-item ${
                    formData.state === state.name.toLowerCase()
                      ? "selected"
                      : ""
                  }`}
                  onClick={() =>
                    handleSelect("state", state.name.toLowerCase())
                  }
                >
                  {state.icon}
                  <span>{state.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 6: RTO Selection */}
          <div
            className={`form-step ${currentStep === 6 ? "active" : ""}`}
            data-step={6}
          >
            <h2 className="step-title">Select RTO Code</h2>
            <div className="rto-list" id="rto-options">
              {formData.state && rtoCodes[formData.state] ? (
                rtoCodes[formData.state].map((rto) => (
                  <div
                    key={rto}
                    className={`rto-item ${
                      formData.rto === rto ? "selected" : ""
                    }`}
                    onClick={() => handleSelect("rto", rto)}
                  >
                    {rto}
                  </div>
                ))
              ) : (
                <p>Please select a state first</p>
              )}
            </div>
          </div>

          {/* Step 7: KM Driven */}
          <div
            className={`form-step ${currentStep === 7 ? "active" : ""}`}
            data-step={7}
          >
            <h2 className="step-title">Select Kilometers Driven</h2>
            <div className="km-options" id="km-options">
              {[
                "0-10000",
                "10000-30000",
                "30000-50000",
                "50000-80000",
                "80000-100000",
                "100000+",
              ].map((range) => (
                <div
                  key={range}
                  className={`km-option ${
                    formData.km === range ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("km", range)}
                >
                  {range === "0-10000" && "0-10,000 km"}
                  {range === "10000-30000" && "10,000-30,000 km"}
                  {range === "30000-50000" && "30,000-50,000 km"}
                  {range === "50000-80000" && "50,000-80,000 km"}
                  {range === "80000-100000" && "80,000-1,00,000 km"}
                  {range === "100000+" && "1,00,000+ km"}
                </div>
              ))}
            </div>
          </div>

          {/* Step 8: Location */}
          <div
            className={`form-step ${currentStep === 8 ? "active" : ""}`}
            data-step={8}
          >
            <h2 className="step-title">Select Your Location</h2>
            <div className="location-list" id="location-options">
              {[
                "delhi",
                "mumbai",
                "bangalore",
                "hyderabad",
                "chennai",
                "kolkata",
                "pune",
                "ahmedabad",
              ].map((city) => (
                <div
                  key={city}
                  className={`location-item ${
                    formData.location === city ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("location", city)}
                >
                  <FaCity />
                  <span>{city.charAt(0).toUpperCase() + city.slice(1)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 9: Sell Time */}
          <div
            className={`form-step ${currentStep === 9 ? "active" : ""}`}
            data-step={9}
          >
            <h2 className="step-title">
              When are you planning to sell your car?
            </h2>
            <div className="sell-time-options" id="sell-time-options">
              {["immediately", "1week", "1month", "flexible"].map((time) => (
                <div
                  key={time}
                  className={`sell-time-option ${
                    formData.sellTime === time ? "selected" : ""
                  }`}
                  onClick={() => handleSelect("sellTime", time)}
                >
                  {time === "immediately" && "Immediately"}
                  {time === "1week" && "Within a Week"}
                  {time === "1month" && "Within a Month"}
                  {time === "flexible" && "Flexible Timeline"}
                </div>
              ))}
            </div>
          </div>

          {/* Step 10: Contact */}
          <div
            className={`form-step ${currentStep === 10 ? "active" : ""}`}
            data-step={10}
          >
            <h2 className="step-title">Enter Your Contact Number</h2>
            <input
              type="tel"
              className="contact-input"
              id="contact-number"
              placeholder="Enter your 10-digit mobile number"
              maxLength={10}
              value={formData.contact || ""}
              onChange={(e) => handleSelect("contact", e.target.value)}
            />
            <p
              style={{
                textAlign: "center",
                color: "#7f8c8d",
                marginBottom: "1rem",
              }}
            >
              We'll contact you to verify details and provide the best offer
            </p>
          </div>

          {/* Summary Step */}
          <div
            className={`form-step ${currentStep === 11 ? "active" : ""}`}
            data-step={11}
          >
            <div className="summary-container">
              <h2 className="step-title">Review Your Details</h2>
              <div id="summary-details">
                {[
                  { label: "Car Brand", value: formData.brand },
                  { label: "Manufacturing Year", value: formData.year },
                  { label: "Model", value: formData.model },
                  { label: "Variant", value: formData.variant },
                  { label: "Registration State", value: formData.state },
                  { label: "RTO Code", value: formData.rto },
                  { label: "Kilometers Driven", value: formData.km },
                  { label: "Location", value: formData.location },
                  {
                    label: "Planning to Sell",
                    value: formatSellTime(formData.sellTime),
                  },
                  { label: "Contact Number", value: formData.contact },
                ].map((item, index) => (
                  <div key={index} className="summary-item">
                    <span className="summary-label">{item.label}:</span>
                    <span className="summary-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Success Step */}
          <div
            className={`form-step ${currentStep === 12 ? "active" : ""}`}
            data-step={12}
          >
            <div className="success-message">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h2>Thank You!</h2>
              <p>
                Your details have been submitted successfully. Our team will
                contact you shortly with the best offer for your car.
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
            disabled={!isStepComplete()}
            onClick={goToNextStep}
          >
            {currentStep === totalSteps ? "Submit" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellForm;
