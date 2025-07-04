/** @format */

import React, { useState, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fetchSimilarCars } from "../util/api";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

// API functions
const fetchCarById = async (carId) => {
    const res = await axios.get(
        `https://cardikhao-production.up.railway.app/api/car/${carId}`
    );
    return res.data;
};

const submitEnquiry = async (payload) => {
    const response = await axios.post(
        "https://cardikhao-production.up.railway.app/api/enquiry",
        payload,
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    return response.data;
};

// Custom hook for form handling
const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name]: value ? "" : `${name} is required`,
        }));
    }, []);

    const resetForm = useCallback(
        () => setFormData(initialState),
        [initialState]
    );

    return { formData, errors, handleInputChange, resetForm };
};

// Reusable Form Component
const CarForm = ({ car, type, onClose, onSubmit, isSubmitting }) => {
    const initialState = {
        name: "",
        email: "",
        phone: "",
        ...(type === "bid" && { price: "" }),
        ...(type === "buy" && { message: "" }),
    };

    const { formData, errors, handleInputChange } = useForm(initialState);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) newErrors[key] = `${key} is required`;
        });
        if (type === "bid" && formData.price < car?.price) {
            newErrors.price = `Bid must be at least ₹${car?.price?.toLocaleString()}`;
        }
        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            return;
        }
        onSubmit(formData);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <h2>
                    {type === "bid" ? "Bid on" : "Buy"}: {car?.year}{" "}
                    {car?.brand?.name} {car?.modelName?.name}
                </h2>
                <p className="car-price">
                    {type === "bid" ? "Current Price" : "Price"}: ₹
                    {car?.price?.toLocaleString()}
                </p>
                <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.name && (
                            <span className="error-text">{errors.name}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.email && (
                            <span className="error-text">{errors.email}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                        {errors.phone && (
                            <span className="error-text">{errors.phone}</span>
                        )}
                    </div>
                    {type === "bid" && (
                        <div className="form-group">
                            <label>Your Bid Amount (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleInputChange}
                                min={car?.price}
                                required
                            />
                            {errors.price && (
                                <span className="error-text">
                                    {errors.price}
                                </span>
                            )}
                        </div>
                    )}
                    {type === "buy" && (
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.message && (
                                <span className="error-text">
                                    {errors.message}
                                </span>
                            )}
                        </div>
                    )}
                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span className="spinner" />
                                Submitting...
                            </>
                        ) : type === "bid" ? (
                            "Submit Bid"
                        ) : (
                            "Submit Enquiry"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="close-btns full-width"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

// Reusable Car Specification Component
const CarSpec = React.memo(({ icon, title, value }) => (
    <div className="col-xl-6 col-md-6 item">
        <div className="inner listing-infor-box">
            <div className="content-listing-info">
                <span className="listing-info-title">
                    <i className={`${icon} mr-2`} /> {title}:
                </span>
                <p className="listing-info-value">{value}</p>
            </div>
        </div>
    </div>
));

function CarDetails() {
    const [showForm, setShowForm] = useState(null);
    const [open, setOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const { carId } = useParams();
    const queryClient = useQueryClient();

    const {
        data: carData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["carDetail", carId],
        queryFn: () => fetchCarById(carId),
        enabled: !!carId,
    });

    const car = carData?.data;

    const {
        data: similarCarsData,
        isLoading: similarLoading,
        error: similarError,
    } = useQuery({
        queryKey: ["similarCars", car?.brand?.name, car?.modelName?.name],
        queryFn: () => fetchSimilarCars(car?.brand?.name, car?.modelName?.name),
        enabled: !!car?.brand?.name && !!car?.modelName?.name,
    });

    const similarCars = similarCarsData?.cars || [];

    const enquiryMutation = useMutation({
        mutationFn: submitEnquiry,
        onSuccess: () => {
            setShowForm(null);
            queryClient.invalidateQueries(["carDetail", carId]);
            toast.success(
                showForm === "bid"
                    ? "Bid submitted successfully!"
                    : "Enquiry submitted successfully!"
            );
        },
        onError: (error) => {
            console.error("Error submitting form:", error);
            toast.error(
                showForm === "bid"
                    ? "Failed to submit bid. Please try again."
                    : "Failed to submit enquiry. Please try again."
            );
        },
    });

    const images = car?.images?.map(
        (val) =>
            `https://cardikhao-production.up.railway.app/uploads/cars/${val}`
    );

    const handleSubmit = useCallback(
        (formData) => {
            const payload = {
                typeData: showForm === "bid" ? "bidding" : "enquiry",
                carId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                ...(showForm === "bid" && {
                    price: parseFloat(formData.price),
                }),
                ...(showForm === "buy" && { message: formData.message }),
            };
            enquiryMutation.mutate(payload);
        },
        [carId, enquiryMutation, showForm]
    );

    const handleImageClick = useCallback((i) => {
        setIndex(i);
        setOpen(true);
    }, []);

    const toggleForm = useCallback(
        (formType) => {
            setShowForm(showForm === formType ? null : formType);
        },
        [showForm]
    );

    if (isLoading) return <Loader />;

    if (error) return <div className="error">Error loading car details.</div>;

    return (
        <div className="car-details-container">
            <section className="tf-section3 listing-detail style-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="swiper mainslider slider home mb-40">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation={{
                                        nextEl: ".swiper-button-next",
                                        prevEl: ".swiper-button-prev",
                                    }}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    loop={true}
                                >
                                    {images?.map((img, i) => (
                                        <SwiperSlide key={i}>
                                            <div className="image-list-details">
                                                <div
                                                    className="image"
                                                    onClick={() =>
                                                        handleImageClick(i)
                                                    }
                                                    style={{
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`Slide ${i}`}
                                                        className="lazyload"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div className="swiper-button-next style-3" />
                                    <div className="swiper-button-prev style-3" />
                                </Swiper>
                                <Lightbox
                                    open={open}
                                    close={() => setOpen(false)}
                                    slides={images?.map((img) => ({
                                        src: img,
                                    }))}
                                    index={index}
                                />
                            </div>
                            <div className="listing-detail-wrap">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div
                                            data-bs-spy="scroll"
                                            data-bs-target="#navbar-example2"
                                            data-bs-offset={0}
                                            className="scrollspy-example"
                                            tabIndex={0}
                                        >
                                            <div className="listing-description mb-40">
                                                <div className="tfcl-listing-header">
                                                    <h2>Description</h2>
                                                </div>
                                                <div className="tfcl-listing-info mt-30">
                                                    <p>
                                                        {car?.description ||
                                                            "No description available"}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="listing-line" />
                                            <div
                                                className="listing-features footer-col-block"
                                                id="scrollspyHeading2"
                                            >
                                                <div className="footer-heading-desktop">
                                                    <h2>Specifications</h2>
                                                </div>
                                                <div className="footer-heading-mobie listing-details-mobie mb-30">
                                                    <h2>Specifications</h2>
                                                </div>
                                                <div className="features-inner tf-collapse-content mt-30">
                                                    <div className="row">
                                                        <CarSpec
                                                            icon="fas fa-check-circle"
                                                            title="Condition"
                                                            value={
                                                                car?.condition ===
                                                                "used"
                                                                    ? "Used"
                                                                    : "New"
                                                            }
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-calendar-alt"
                                                            title="Year"
                                                            value={car?.year}
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-tag"
                                                            title="Price"
                                                            value={`₹${car?.price?.toLocaleString()}`}
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-tachometer-alt"
                                                            title="Mileage"
                                                            value={`${car?.mileage?.toLocaleString()} km`}
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-gas-pump"
                                                            title="Fuel Type"
                                                            value={
                                                                car?.fuelType
                                                            }
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-cog"
                                                            title="Transmission"
                                                            value={
                                                                car?.transmission
                                                            }
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-palette"
                                                            title="Color"
                                                            value={car?.color}
                                                        />
                                                        <CarSpec
                                                            icon="fas fa-info-circle"
                                                            title="Status"
                                                            value={
                                                                car?.isSold
                                                                    ? "Sold"
                                                                    : "Available"
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="overlay-siderbar-mobie" />
                            <div className="listing-sidebar">
                                <div className="widget-listing mb-30">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="heading-widget flex-one mb-20 flex-wrap">
                                                <div className="inner">
                                                    <h1 className="title">
                                                        {car?.year}{" "}
                                                        {car?.brand?.name}{" "}
                                                        {car?.modelName?.name}
                                                    </h1>
                                                    <div className="icon-box flex flex-wrap">
                                                        <div className="icons flex-three">
                                                            <i className="icon-autodeal-km1" />
                                                            <span>
                                                                {car?.mileage?.toLocaleString()}{" "}
                                                                kms
                                                            </span>
                                                        </div>
                                                        <div className="icons flex-three">
                                                            <i className="icon-autodeal-diesel" />
                                                            <span>
                                                                {car?.fuelType}
                                                            </span>
                                                        </div>
                                                        <div className="icons flex-three">
                                                            <i className="icon-autodeal-automatic" />
                                                            <span>
                                                                {
                                                                    car?.transmission
                                                                }
                                                            </span>
                                                        </div>
                                                        <div className="icons flex-three">
                                                            <i className="icon-autodeal-owner" />
                                                            <span>
                                                                {car?.condition ===
                                                                "used"
                                                                    ? "Used"
                                                                    : "New"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="money text-color-3 font">
                                                        ₹
                                                        {car?.price?.toLocaleString()}
                                                    </div>
                                                    <div className="price-wrap flex">
                                                        <p className="fs-12 lh-16">
                                                            Added by:{" "}
                                                            {car?.addedBy?.name}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-contact">
                                        <h6>Contact dealer</h6>
                                        <div className="btn-contact flex-two">
                                            <button
                                                onClick={() =>
                                                    toggleForm("bid")
                                                }
                                                className="btn-pf bg-orange"
                                                disabled={
                                                    showForm === "bid" &&
                                                    enquiryMutation.isLoading
                                                }
                                            >
                                                {showForm === "bid" &&
                                                enquiryMutation.isLoading ? (
                                                    <>
                                                        <span className="spinner" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <span className="fs-16 fw-5 lh-20 font text-color-1">
                                                        {showForm === "bid"
                                                            ? "Close Bid Form"
                                                            : "Bid Car"}
                                                    </span>
                                                )}
                                            </button>
                                            <button
                                                onClick={() =>
                                                    toggleForm("buy")
                                                }
                                                className="btn-pf bg-green"
                                                disabled={
                                                    showForm === "buy" &&
                                                    enquiryMutation.isLoading
                                                }
                                            >
                                                {showForm === "buy" &&
                                                enquiryMutation.isLoading ? (
                                                    <>
                                                        <span className="spinner" />
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    <span className="fs-16 fw-5 lh-20 font text-color-1">
                                                        {showForm === "buy"
                                                            ? "Close Buy Form"
                                                            : "Buy Car"}
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-icon-pf gap-8 flex-three mb-40">
                                    <i className="far fa-flag" />
                                    <p className="font-1">
                                        Report this listing
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Similar Cars Section */}
            <section id="used-cars-carousel-section">
                <div className="cars-container">
                    <div className="cars-header justify-content-center">
                        <div className="cars-header-content text-center">
                            <h2 className="cars-title">
                                Explore similar {car?.brand?.name} cars
                            </h2>
                        </div>
                    </div>
                    <div className="cars-slider-wrapper">
                        {similarLoading ? (
                            <div className="loading">
                                Loading similar cars...
                            </div>
                        ) : similarError ? (
                            <div className="error">
                                Error loading similar cars
                            </div>
                        ) : similarCars?.length > 0 ? (
                            <>
                                <Swiper
                                    className="cars-slider-container"
                                    modules={[Navigation, Pagination]}
                                    spaceBetween={20}
                                    slidesPerView={1}
                                    breakpoints={{
                                        640: { slidesPerView: 2 },
                                        768: { slidesPerView: 3 },
                                        1024: { slidesPerView: 4 },
                                    }}
                                    navigation={{
                                        nextEl: ".cars-next-arrow",
                                        prevEl: ".cars-prev-arrow",
                                    }}
                                    pagination={{
                                        el: ".cars-slider-dots",
                                        clickable: true,
                                    }}
                                >
                                    {similarCars.map((similarCar) => (
                                        <SwiperSlide
                                            key={similarCar._id}
                                            className="cars-slide"
                                        >
                                            <div className="cars-card">
                                                <Link
                                                    to={`/car/${similarCar._id}`}
                                                    className="cars-card-link"
                                                >
                                                    <div className="cars-card-content">
                                                        <div className="cars-image-container">
                                                            <div className="cars-image-wrapper">
                                                                <div className="cars-image">
                                                                    <img
                                                                        alt={
                                                                            similarCar
                                                                                ?.modelName
                                                                                ?.name
                                                                        }
                                                                        loading="lazy"
                                                                        width={
                                                                            220
                                                                        }
                                                                        height={
                                                                            120
                                                                        }
                                                                        src={`https://cardikhao-production.up.railway.app/uploads/cars/${
                                                                            similarCar
                                                                                .images?.[0] ||
                                                                            "default-car.jpg"
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cars-details-container">
                                                            <div className="cars-main-details">
                                                                <div className="cars-info">
                                                                    <div className="cars-title-wrapper">
                                                                        <h3 className="cars-model-title">
                                                                            {
                                                                                similarCar.year
                                                                            }{" "}
                                                                            {
                                                                                similarCar
                                                                                    .brand
                                                                                    ?.name
                                                                            }{" "}
                                                                            {
                                                                                similarCar
                                                                                    .modelName
                                                                                    ?.name
                                                                            }
                                                                        </h3>
                                                                    </div>
                                                                    <div className="cars-specs-list">
                                                                        <ul className="cars-specs">
                                                                            <li className="cars-spec-item">
                                                                                {similarCar.mileage?.toLocaleString()}{" "}
                                                                                km
                                                                            </li>
                                                                            <li className="cars-spec-item">
                                                                                {
                                                                                    similarCar.fuelType
                                                                                }
                                                                            </li>
                                                                            <li className="cars-spec-item">
                                                                                {
                                                                                    similarCar.transmission
                                                                                }
                                                                            </li>
                                                                            <li className="cars-spec-item">
                                                                                {similarCar.condition ===
                                                                                "used"
                                                                                    ? "Used"
                                                                                    : "New"}
                                                                            </li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="cars-price-section">
                                                                    <div className="cars-price-details">
                                                                        <div className="cars-price-right">
                                                                            <div className="cars-price-amount">
                                                                                <p className="cars-price">
                                                                                    ₹
                                                                                    {similarCar.price?.toLocaleString()}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <button
                                    type="button"
                                    className="cars-slider-arrow cars-prev-arrow"
                                    aria-label="Previous car"
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 18L9 12L15 6"
                                            stroke="#0F0F10"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="cars-slider-arrow cars-next-arrow"
                                    aria-label="Next car"
                                >
                                    <svg
                                        width={24}
                                        height={24}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 6L15 12L9 18"
                                            stroke="#0F0F10"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <div className="cars-slider-dots" />
                            </>
                        ) : (
                            <div className="no-similar-cars">
                                <i className="fas fa-car" />
                                <p>No similar cars found</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Form Popups */}
            {showForm && (
                <div className="form-popup-container">
                    <CarForm
                        car={car}
                        type={showForm}
                        onClose={() => setShowForm(null)}
                        onSubmit={handleSubmit}
                        isSubmitting={enquiryMutation.isLoading}
                    />
                </div>
            )}

            <style jsx>{`
                .car-details-container {
                    min-height: 100vh;
                    background-color: #f8f9fa;
                    padding: 20px;
                }

                .loading,
                .error {
                    padding: 20px;
                    text-align: center;
                    font-size: 18px;
                }

                .error {
                    color: #dc3545;
                }

                .no-similar-cars {
                    text-align: center;
                    padding: 40px 20px;
                    width: 100%;
                    color: #666;
                    font-size: 18px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                .no-similar-cars i {
                    font-size: 48px;
                    margin-bottom: 20px;
                    color: #999;
                }

                .no-similar-cars p {
                    margin: 0;
                    font-weight: 500;
                }

                .popup-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.7);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 9999;
                }

                .popup-form {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 500px;
                    z-index: 10000;
                    position: relative;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .form-popup-container {
                    position: relative;
                }

                .car-price {
                    font-size: 18px;
                    font-weight: bold;
                    margin-bottom: 20px;
                    color: #333;
                }

                .form-group {
                    margin-bottom: 15px;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 5px;
                    font-weight: 500;
                }

                .form-group input,
                .form-group textarea,
                .form-group select {
                    width: 100%;
                    padding: 10px;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-size: 16px;
                }

                .form-group textarea {
                    height: 80px;
                }

                .error-text {
                    color: #dc3545;
                    font-size: 12px;
                    margin-top: 5px;
                    display: block;
                }

                .submit-btn {
                    background-color: #4caf50;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                    margin-top: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .submit-btn:hover {
                    background-color: #45a049;
                }

                .close-btns.full-width {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 12px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 16px;
                    width: 100%;
                    margin-top: 10px;
                }

                .close-btns.full-width:hover {
                    background-color: #d32f2f;
                }

                .btn-pf {
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 12px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    min-height: 44px;
                }

                .btn-pf.bg-orange {
                    background-color: #ff9800;
                }

                .btn-pf.bg-green {
                    background-color: #4caf50;
                }

                .btn-pf:disabled,
                .submit-btn:disabled {
                    background-color: #cccccc;
                    cursor: not-allowed;
                    opacity: 0.7;
                }

                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid #fff;
                    border-top: 2px solid transparent;
                    border-radius: 50%;
                    animation: spin 0.8s linear infinite;
                    margin-right: 8px;
                    vertical-align: middle;
                }

                @keyframes spin {
                    0% {
                        transform: rotate(0deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 768px) {
                    .popup-form {
                        width: 95%;
                        padding: 20px;
                    }

                    .row {
                        flex-direction: column;
                    }

                    .col-lg-6 {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}

export default CarDetails;
