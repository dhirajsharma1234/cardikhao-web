/** @format */

import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ScrapCarLandingPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        emailId: "",
        carBrand: "",
        model: "",
        year: "",
        fuelType: "",
        city: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Validate required fields
        if (
            !formData.name ||
            !formData.phoneNumber ||
            !formData.emailId ||
            !formData.carBrand ||
            !formData.model ||
            !formData.year ||
            !formData.fuelType ||
            !formData.city
        ) {
            toast.error("Please fill all required fields");
            setIsSubmitting(false);
            return;
        }

        // Show loading toast
        const loadingToast = toast.loading("Submitting your request...");

        try {
            // Make API request to submit scrap car request
            const response = await axios.post(
                `https://api.gadidikhao.com/api/scrap/car/request`,
                formData
            );

            if (response.status) {
                toast.success(
                    "Request submitted successfully! We'll contact you soon.",
                    { id: loadingToast }
                );
                // Reset form
                setFormData({
                    name: "",
                    phoneNumber: "",
                    emailId: "",
                    carBrand: "",
                    model: "",
                    year: "",
                    fuelType: "",
                    city: "",
                });
            } else {
                toast.error("Failed to submit request. Please try again.", {
                    id: loadingToast,
                });
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again later.", {
                id: loadingToast,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: "#363636",
                        color: "#fff",
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: "#4ade80",
                            secondary: "#fff",
                        },
                    },
                    error: {
                        duration: 4000,
                        iconTheme: {
                            primary: "#ef4444",
                            secondary: "#fff",
                        },
                    },
                    loading: {
                        duration: Infinity, // Stays until manually dismissed
                        iconTheme: {
                            primary: "#3b82f6",
                            secondary: "#fff",
                        },
                    },
                }}
            />

            <style>{`
        /* Background Gradient */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          background: linear-gradient(0deg,#ebf6ff 39.64%,#ffffff82 95.02%);
          color: #fff;
          padding: 50px 0;
        }

        .hero-left h1 {
          font-size: 3rem;
          font-weight: bold;
          color: #000;
        }

        .hero-left p {
          font-size: 1.1rem;
          margin-top: 15px;
          color: #000;
        }

        .form-box {
          background: #d50000;
          color: #fff;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }

        .form-box h3 {
          font-weight: 700;
          margin-bottom: 25px;
          text-transform: uppercase;
        }

        .form-control, .form-select {
          border-radius: 6px;
          margin-bottom: 15px;
          padding: 12px;
          font-size: 1rem;
          border: none;
        }

        .btn-submit {
          width: 100%;
          background: #000;
          color: #fff;
          font-weight: bold;
          padding: 14px;
          border-radius: 6px;
          text-transform: uppercase;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-submit:hover:not(:disabled) {
          background: #333;
          transform: translateY(-2px);
        }

        .btn-submit:disabled {
          background: #666;
          cursor: not-allowed;
          transform: none;
        }

        .scrap-policy {
          background: #fff;
          color: #333;
          padding: 80px 0;
        }

        .scrap-policy h2 {
          font-size: 2rem;
          color: #222;
          margin-bottom: 1rem;
        }

        .scrap-policy h5 {
          color: #666;
          margin-bottom: 2rem;
        }

        .scrap-policy p {
          font-size: 1rem;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .scrap-policy ul {
          padding-left: 1.5rem;
        }

        .scrap-policy ul li {
          margin-bottom: 8px;
        }

        .btn-readmore {
          background: linear-gradient(to right, #000428, #004e92);
          color: #fff;
          padding: 12px 25px;
          font-weight: bold;
          border-radius: 50px;
          transition: all 0.3s ease-in-out;
          text-decoration: none;
          display: inline-block;
          border: none;
          cursor: pointer;
          margin-top: 1rem;
        }

        .btn-readmore:hover {
          opacity: 0.9;
          transform: translateY(-2px);
          color: #fff;
        }

        .scrap-process {
          padding: 80px 0;
          background: #f8f9fa;
        }

        .scrap-process h2 {
          font-size: 2rem;
          color: #111;
          margin-bottom: 3rem;
        }

        .process-box {
          background: #fff;
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 25px;
          height: 100%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
        }

        .process-box h5 {
          color: #d50000;
          margin-bottom: 15px;
        }

        .process-box:hover {
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          transform: translateY(-5px);
        }

        .why-scrap {
          padding: 80px 0;
          background: #fff;
        }

        .why-scrap h2 {
          font-size: 2rem;
          color: #111;
          margin-bottom: 3rem;
        }

        .feature-box {
          background: #fff;
          transition: all 0.3s ease;
          border-radius: 8px;
          padding: 25px;
          height: 100%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
        }

        .feature-box h5 {
          color: #d50000;
          margin-bottom: 15px;
        }

        .feature-box:hover {
          box-shadow: 0 6px 15px rgba(0,0,0,0.15);
          transform: translateY(-5px);
        }

        @media (max-width: 992px) {
          .hero-left {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .hero-left h1 {
            font-size: 2.5rem;
          }
        }

        @media (max-width: 768px) {
          .hero-left h1 {
            font-size: 2rem;
          }
          
          .scrap-policy, .scrap-process, .why-scrap {
            padding: 60px 0;
          }
        }
      `}</style>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="row align-items-center">
                        {/* Left Text */}
                        <div className="col-lg-6 hero-left">
                            <h1>
                                Turn Your Scrap Car into
                                <br /> Instant Cash!
                            </h1>
                            <p>
                                Scrap Your Car Right Way with GadiDikhao.
                                <br /> For a cleaner, greener tomorrow
                            </p>
                        </div>

                        {/* Right Form */}
                        <div className="col-lg-5 offset-lg-1">
                            <div className="form-box">
                                <h3>Get an Instant Quote</h3>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Name*"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="Phone Number*"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email Id*"
                                        name="emailId"
                                        value={formData.emailId}
                                        onChange={handleInputChange}
                                        required
                                    />

                                    <select
                                        className="form-select"
                                        name="carBrand"
                                        value={formData.carBrand}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">
                                            Select Car Brand
                                        </option>
                                        <option value="Toyota">Toyota</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Hyundai">Hyundai</option>
                                        <option value="Ford">Ford</option>
                                        <option value="Maruti Suzuki">
                                            Maruti Suzuki
                                        </option>
                                        <option value="Tata">Tata</option>
                                        <option value="Mahindra">
                                            Mahindra
                                        </option>
                                    </select>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Model*"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Year*"
                                        name="year"
                                        value={formData.year}
                                        onChange={handleInputChange}
                                        min="1990"
                                        max={new Date().getFullYear() + 1}
                                        required
                                    />

                                    <select
                                        className="form-select"
                                        name="fuelType"
                                        value={formData.fuelType}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Fuel Type</option>
                                        <option value="Petrol">Petrol</option>
                                        <option value="Diesel">Diesel</option>
                                        <option value="CNG">CNG</option>
                                        <option value="Electric">
                                            Electric
                                        </option>
                                    </select>

                                    <select
                                        className="form-select"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Select City</option>
                                        <option value="Delhi">Delhi</option>
                                        <option value="Mumbai">Mumbai</option>
                                        <option value="Bangalore">
                                            Bangalore
                                        </option>
                                        <option value="Hyderabad">
                                            Hyderabad
                                        </option>
                                        <option value="Chennai">Chennai</option>
                                        <option value="Kolkata">Kolkata</option>
                                        <option value="Pune">Pune</option>
                                    </select>

                                    <button
                                        type="submit"
                                        className="btn btn-submit"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting
                                            ? "Submitting..."
                                            : "Get a Quote Now!"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Second Section */}
            <section className="scrap-policy">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 mx-auto">
                            <h2 className="fw-bold">
                                Know About Car Scrapping
                            </h2>
                            <h5>
                                Understanding the Government of India's Car
                                Scrapping Policy
                            </h5>

                            <h6 className="mt-4 fw-bold">
                                1. Overview of the Policy
                            </h6>
                            <p>
                                The Car Scrapping Policy is a strategic
                                initiative by the Government of India designed
                                to phase out older vehicles to enhance road
                                safety, reduce pollution, and boost the
                                automotive sector. The policy targets different
                                vehicle categories based on their age and fuel
                                type:
                            </p>
                            <ul>
                                <li>
                                    <strong>Private Vehicles:</strong> Vehicles
                                    that are more than 10 years old if diesel,
                                    and more than 15 years old if petrol, are
                                    subject to scrapping.
                                </li>
                                <li>
                                    <strong>Commercial Vehicles:</strong> Both
                                    diesel and petrol commercial vehicles older
                                    than 15 years are included in the policy.
                                </li>
                            </ul>

                            <button className="btn-readmore">
                                Read More About Policy
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Third Section */}
            <section className="scrap-process">
                <div className="container text-center">
                    <h2 className="fw-bold">
                        How To Scrap Your Car With GadiDikhao
                    </h2>
                    <div className="row g-4 mt-4">
                        {/* Step 1 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="process-box">
                                <h5 className="fw-semibold">
                                    Car Verification
                                </h5>
                                <p className="mb-0">
                                    Enter your vehicle details to quickly verify
                                    your car details and get started with a
                                    hassle-free selling experience.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="process-box">
                                <h5 className="fw-semibold">Self-Inspection</h5>
                                <p className="mb-0">
                                    Help us assess the condition of your car to
                                    provide you with the most accurate estimate.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="process-box">
                                <h5 className="fw-semibold">Pick Up</h5>
                                <p className="mb-0">
                                    A certified scrap vendor will pick up your
                                    car at your convenience—simply choose a time
                                    slot that works.
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="process-box">
                                <h5 className="fw-semibold">Payment</h5>
                                <p className="mb-0">
                                    Receive a secure, instant payment directly
                                    into your bank account once your car is
                                    picked up.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Fourth Section */}
            <section className="why-scrap">
                <div className="container">
                    <h2 className="fw-bold text-center">
                        Why Scrap Car With GadiDikhao?
                    </h2>
                    <div className="row g-4 mt-4">
                        {/* Box 1 */}
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h5 className="fw-semibold">Fair Price</h5>
                                <p className="mb-0">
                                    Get a fair and accurate quote for scrapping
                                    your car while contributing to a cleaner
                                    environment.
                                </p>
                            </div>
                        </div>

                        {/* Box 2 */}
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h5 className="fw-semibold">
                                    Certificate of Deposit
                                </h5>
                                <p className="mb-0">
                                    Get benefits on buying a new car with a
                                    Certificate of Deposit.
                                </p>
                            </div>
                        </div>

                        {/* Box 3 */}
                        <div className="col-md-4">
                            <div className="feature-box">
                                <h5 className="fw-semibold">
                                    Registered Vendors Only
                                </h5>
                                <p className="mb-0">
                                    At GadiDikhao, we exclusively partner with
                                    government-registered vendors to ensure
                                    trust and compliance.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ScrapCarLandingPage;
