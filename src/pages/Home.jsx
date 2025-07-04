/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useTabs from "../hooks/useTabs";
import useSearch from "../hooks/useSearch";
import { fetchAllCars, fetchBrands } from "../util/api";
import { useQuery } from "@tanstack/react-query";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loader from "../components/Loader";
// import "./Home.css"; // CSS file for loader styles

// Constants for static data
const BANNER_CARDS = [
    {
        title: "Buy used car",
        offer: "Up To 20% OFF",
        image: "assets/images/video/car-1.webp",
        ariaLabel: "Buy used car with up to 20% off",
        offerBg: "var(--orange-50)",
        offerColor: "var(--orange-500)",
        to: "/carlisting",
    },
    {
        title: "Get loans",
        description: "For cars, personal needs & more.",
        image: "assets/images/video/loan-1.webp",
        ariaLabel: "Get loans for cars and personal needs",
        to: "/car-loan",
    },
    {
        title: "Get insured",
        description: "For your car, health & life.",
        image: "assets/images/video/insured-1.webp",
        ariaLabel: "Get insured for your car, health and life",
        to: "/car-insurance",
    },
    {
        title: "Sell car",
        description: "15,000+ buyer network.",
        image: "assets/images/video/sell-car.webp",
        ariaLabel: "Sell car with 15,000+ buyer network",
        to: "/sell-car",
    },
];

const SERVICE_ITEMS = [
    { title: "Buy used car", to: "/carlisting" },
    { title: "Sell car", to: "/sell-car" },
    { title: "Car finance", to: "/car-loan" },
    { title: "New cars", to: "/new-cars" },
    { title: "Car services", to: "/car-services" },
    { title: "Car insurance", to: "/car-insurance" },
    { title: "Car valuation", to: "/used-car-valuation" },
    { title: "EMI calculator", to: "/emi-calculator" },
];

const CAR_CATEGORIES = [
    { name: "SUV", to: "/carlisting", filter: "bodyType=SUV" },
    { name: "Hatchback", to: "/carlisting", filter: "bodyType=HATCHBACK" },
    { name: "Sedan", to: "/carlisting", filter: "bodyType=SEDAN" },
];

const FUEL_TYPES = [
    { name: "petrol", to: "/carlisting", filter: "fuelType=petrol" },
    { name: "diesel", to: "/carlisting", filter: "fuelType=diesel" },
    { name: "electric", to: "/carlisting", filter: "fuelType=electric" },
    { name: "cng", to: "/carlisting", filter: "fuelType=cng" },
    { name: "hybrid", to: "/carlisting", filter: "fuelType=hybrid" },
];

const NEWS_ITEMS = [
    {
        title: "Most expensive electric car in India launched — Top things to know!",
        category: "Auto Insider",
        image: "assets/images/blog/blog-1.webp",
        summary:
            "Here are the top things to know about the new 2025 Rolls-Royce Spectre Black Badge that has just been launched in India.",
        author: "Aryan Aggarwal",
        authorImg: "assets/images/blog/author-1.jpg",
        date: "24 Jun, 2025",
        readTime: "2 MINS",
        to: "/blog/rolls-royce-spectre",
    },
    {
        title: "Mahindra XUV700 facelift spotted with production-spec headlights, alloy wheels",
        category: "Auto Insider",
        image: "assets/images/blog/blog-2.webp",
        summary:
            "The Mahindra XUV700 facelift has been captured running on production-spec LED headlights and alloy wheels.",
        author: "Amit Saraswat",
        authorImg: "assets/images/blog/author-2.jpeg",
        date: "24 Jun, 2025",
        readTime: "3 MINS",
        to: "/blog/mahindra-xuv700-facelift",
    },
    {
        title: "Tata Harrier EV safety rating revealed — Achieves five stars in BNCAP",
        category: "Auto Insider",
        image: "assets/images/blog/blog-3.webp",
        summary:
            "Bharat NCAP has crash tested the Harrier EV and it comes out with flying colours.",
        author: "Amit Saraswat",
        authorImg: "assets/images/blog/author-2.jpeg",
        date: "24 Jun, 2025",
        readTime: "2 MINS",
        to: "/blog/tata-harrier-ev",
    },
    {
        title: "Upcoming Maruti e Vitara spotted undisguised ahead of India launch",
        category: "Auto Insider",
        image: "assets/images/blog/blog-4.webp",
        summary:
            "Ahead of its India launch that is likely to take place towards the end of year 2025, the Maruti e Vitara has been spotted testing without camouflage.",
        author: "Amit Saraswat",
        authorImg: "assets/images/blog/author-2.jpeg",
        date: "24 Jun, 2025",
        readTime: "2 MINS",
        to: "/blog/maruti-e-vitara",
    },
    {
        title: "Tata Harrier EV RWD prices announced — Full prices on June 27th",
        category: "Auto Insider",
        image: "assets/images/blog/blog-5.webp",
        summary:
            "Following its introductory price reveal on June 3, 2025, Tata Motors has now announced the prices of the rear-wheel-drive variants of the Harrier EV.",
        author: "Amit Saraswat",
        authorImg: "assets/images/blog/author-2.jpeg",
        date: "23 Jun, 2025",
        readTime: "2 MINS",
        to: "/blog/tata-harrier-ev-rwd",
    },
    {
        title: "Latest Toyota cars offers and discounts in June 2025 — Save up to Rs 1.46 lakh",
        category: "Auto Insider",
        image: "assets/images/blog/blog-6.webp",
        summary:
            "Read on to check the latest Toyota cars offers & discounts in June 2025. Find out the model-wise discounts available.",
        author: "Reema Bhora",
        authorImg: "assets/images/blog/author-3.jpeg",
        date: "20 May, 2025",
        readTime: "4 MINS",
        to: "/blog/toyota-offers-june-2025",
    },
];

// Reusable Loader Component
const CenteredLoader = () => (
    <div className="loader-container">
        <div className="loader">Loading...</div>
    </div>
);

// Reusable Banner Card Component
const BannerCard = ({ card }) => (
    <Link
        to={card.to}
        className="bannerCard interactiveElement"
        style={{ background: "rgb(248, 250, 252)" }}
        aria-label={card.ariaLabel}
    >
        <div className="bannerCard__content">
            <p
                className="bannerCard__title interactiveElement"
                style={{ color: "rgb(0, 0, 0)" }}
            >
                {card.title}
            </p>
            {card.offer && (
                <div
                    className="bannerCard__offer interactiveElement"
                    style={{ background: card.offerBg, color: card.offerColor }}
                >
                    {card.offer}
                </div>
            )}
            {card.description && (
                <p
                    className="bannerCard__description interactiveElement"
                    style={{ color: "rgba(0, 0, 0, 0.53)" }}
                >
                    {card.description}
                </p>
            )}
        </div>
        <div className="bannerCard__image">
            <img
                alt={card.title}
                loading="lazy"
                width={75}
                height={56}
                decoding="async"
                className="interactiveElement"
                src={card.image}
                style={{ color: "transparent" }}
            />
        </div>
    </Link>
);

// Reusable Service Card Component
const ServiceCard = ({ service }) => (
    <SwiperSlide>
        <Link to={service.to} className="service-card">
            <div className={`card-content ${service.className}`}>
                <img
                    src={service.image}
                    alt={service.title}
                    className="card-image"
                />
                <div className="card-gradient" />
                <div className="card-details">
                    <p className="card-title">{service.title}</p>
                    <p className="card-description">{service.description}</p>
                    <div className="card-features">
                        <div className="features-list">
                            {service.features.map((feature, idx) => (
                                <div key={idx} className="feature-item">
                                    <img
                                        src={feature.icon}
                                        alt={feature.text}
                                        className="feature-icon"
                                    />
                                    <p className="feature-text">
                                        {feature.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="card-cta">{service.cta}</div>
                    </div>
                </div>
            </div>
        </Link>
    </SwiperSlide>
);

function Home() {
    const searchInputRef = React.useRef(null);
    const { activeTab, handleTabClick, handleKeyDown } = useTabs();
    const { placeholder, handleSearch } = useSearch(searchInputRef);

    // API calls
    const {
        data: brands,
        isLoading: brandsLoading,
        error: brandsError,
    } = useQuery({
        queryKey: ["brands"],
        queryFn: fetchBrands,
    });

    const {
        data: carsData,
        isLoading: carsLoading,
        error: carsError,
    } = useQuery({
        queryKey: ["topCars"],
        queryFn: () => fetchAllCars({ page: 1, limit: 5 }),
    });

    // Combined loading and error states
    const sectionError = brandsError || carsError;

    if (sectionError) return <p>Error: {sectionError.message}</p>;

    return (
        <>
            {/* Banner Section */}
            <section
                className="custom-banner m-view-none"
                style={{
                    backgroundImage:
                        'url("assets/images/slider/banner-pic.webp")',
                }}
            >
                <div className="container">
                    <div className="banner-txt">
                        <div className="txt-top">
                            <h4>Welcome to</h4>
                            <img
                                src="assets/images/logo/logo-footer@2x.png"
                                alt="Gadi Dikhao Logo"
                            />
                        </div>
                        <h2>
                            better drives,
                            <br />
                            better lives
                        </h2>
                    </div>
                </div>
            </section>

            {/* Mobile View Banner */}
            <div id="marketingWeatherHeader">
                <div className="marketingBanner__container">
                    <div className="marketingBanner__videoContainer">
                        <video
                            src="assets/images/video/banner-video.mp4"
                            autoPlay
                            loop
                            playsInline
                            muted
                            poster="assets/images/video/video-banner-thumb.webp"
                            width="100%"
                            height="100%"
                            preload="auto"
                            fetchpriority="high"
                            className="interactiveElement"
                        />
                    </div>
                    <div className="videoOverlay" />
                    <div className="searchContainer">
                        <div className="searchInput__wrapper">
                            <div className="interactiveElement">
                                <div className="searchInput__field">
                                    <div className="searchInput__icon">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            className="searchIcon"
                                        >
                                            <path
                                                d="M17.942 17.058l-3.912-3.911a6.884 6.884 0 10-.883.883l3.91 3.912a.624.624 0 10.885-.884zM3.125 8.75a5.625 5.625 0 115.625 5.625A5.631 5.631 0 013.125 8.75z"
                                                fill="#717272"
                                            />
                                        </svg>
                                    </div>
                                    <input
                                        ref={searchInputRef}
                                        placeholder={placeholder}
                                        className="searchInput animatedPlaceholder"
                                        type="text"
                                        aria-label="Search cars"
                                        onKeyDown={handleSearch}
                                    />
                                </div>
                            </div>
                            <div className="aqiIndicator__wrapper">
                                <div className="aqiIndicator greenAQI">
                                    AQI: 104
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bannerCards__container">
                        {BANNER_CARDS.map((card, index) => (
                            <BannerCard key={index} card={card} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Service Area */}
            <div id="web-service" className="m-view-none">
                <div className="custom-container ourservices m-view-none">
                    <div className="service-wrap m-view-none">
                        <div className="service-list m-view-none">
                            {SERVICE_ITEMS.map((item, index) => (
                                <Link
                                    key={index}
                                    to={item.to}
                                    className="service-item"
                                >
                                    <div className="service-item-inner">
                                        <img
                                            loading="eager"
                                            src={`assets/images/services/service-${
                                                index + 1
                                            }.png`}
                                            alt={`icon-${item.title}`}
                                            className="service-item-img"
                                        />
                                        <p
                                            className={`service-title ${
                                                index === 0 ? "active" : ""
                                            }`}
                                        >
                                            {item.title}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <div className="search-wrap-main">
                            <div className="search-wrap">
                                <div className="input-wrap">
                                    <div className="input-shift">
                                        <input
                                            type="text"
                                            className="form-control"
                                            maxLength={1000}
                                            autoComplete="off"
                                            placeholder="Search for your favourite cars"
                                            defaultValue=""
                                        />
                                    </div>
                                    <span className="search-icon">
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g id="Search Icon">
                                                <g id="Search">
                                                    <path
                                                        id="Line_181"
                                                        d="M15.1621 15.7246L18.502 19"
                                                        stroke="#002441"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                    <ellipse
                                                        id="Ellipse_739"
                                                        cx="10.9943"
                                                        cy="11.1371"
                                                        rx="5.99237"
                                                        ry="6.13713"
                                                        stroke="#002441"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                            </g>
                                        </svg>
                                    </span>
                                </div>
                                <div className="search-box" />
                            </div>
                        </div>
                        <div className="brand-wrap">
                            {brandsLoading ? (
                                <Loader />
                            ) : (
                                <ul className="brand-list">
                                    {brands?.map((brand) => (
                                        <Link
                                            key={brand._id}
                                            to={`/brand/${
                                                brand._id ||
                                                brand.name.toLowerCase()
                                            }`}
                                            className="text-center brand-card"
                                        >
                                            <img
                                                alt={brand.name}
                                                fetchpriority="high"
                                                loading="lazy"
                                                width={65}
                                                height={32}
                                                decoding="async"
                                                style={{ color: "transparent" }}
                                                src={
                                                    brand.logo
                                                        ? `https://cardikhao-production.up.railway.app/uploads/brands/${brand.logo}`
                                                        : ""
                                                }
                                            />
                                        </Link>
                                    ))}
                                </ul>
                            )}
                            <div className="button-wrap">
                                <Link to="/carlisting" className="brand-btn">
                                    View all cars
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Car Listing */}
            <section id="used-cars-carousel-section">
                <div className="cars-container">
                    <div className="cars-header">
                        <div className="cars-header-content">
                            <h2 className="cars-title">Pre-Owned Cars</h2>
                            <p className="cars-subtitle">
                                Quality used cars at great prices
                            </p>
                        </div>
                        <div className="view-all-cars">
                            <Link to="/carlisting" className="view-all-text">
                                View all inventory
                            </Link>
                        </div>
                    </div>
                    <div className="cars-filter-tabs">
                        <div className="cars-tabs-container">
                            <div className="cars-tabs-wrapper">
                                <div className="cars-tab-item">
                                    <div className="cars-active-tab">
                                        <div className="cars-tab-content">
                                            <p className="cars-tab-label">
                                                Recently Added
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {carsLoading ? (
                        <CenteredLoader />
                    ) : carsError ? (
                        <div className="error-cars">
                            Error loading cars: {carsError.message}
                        </div>
                    ) : !carsData?.cars?.length ? (
                        <div className="no-cars">No cars available</div>
                    ) : (
                        <div className="cars-slider-wrapper">
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
                                {carsData.cars.map((car) => (
                                    <SwiperSlide
                                        key={car._id}
                                        className="cars-slide"
                                    >
                                        <div className="cars-card">
                                            <Link
                                                to={`/car/${car._id}`}
                                                className="cars-card-link"
                                            >
                                                <div className="cars-card-content">
                                                    <div className="cars-image-container">
                                                        <div className="cars-image-wrapper">
                                                            <div className="cars-image">
                                                                <img
                                                                    alt={`${car.brand.name} ${car.modelName.name}`}
                                                                    loading="lazy"
                                                                    width={220}
                                                                    height={120}
                                                                    src={
                                                                        car
                                                                            .images?.[0]
                                                                            ? `https://cardikhao-production.up.railway.app/uploads/cars/${car.images[0]}`
                                                                            : "assets/images/placeholder-car.jpg"
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="cars-wishlist-button">
                                                                <button aria-label="Add to wishlist">
                                                                    <img
                                                                        alt="Add to wishlist"
                                                                        loading="lazy"
                                                                        width={
                                                                            24
                                                                        }
                                                                        height={
                                                                            24
                                                                        }
                                                                        src="https://assets.cars24.com/production/catalog-web-in/250627155610/_next/static/media/icon-heart-empty.479d2b8c.svg"
                                                                    />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="cars-details-container">
                                                        <div className="cars-main-details">
                                                            <div className="cars-info">
                                                                <div className="cars-title-wrapper">
                                                                    <h3 className="cars-model-title">
                                                                        {
                                                                            car.year
                                                                        }{" "}
                                                                        {
                                                                            car
                                                                                .brand
                                                                                .name
                                                                        }{" "}
                                                                        {
                                                                            car
                                                                                .modelName
                                                                                .name
                                                                        }
                                                                    </h3>
                                                                    <span className="cars-model-variant">
                                                                        {
                                                                            car.bodyType
                                                                        }
                                                                    </span>
                                                                </div>
                                                                <div className="cars-specs-list">
                                                                    <ul className="cars-specs">
                                                                        <li className="cars-spec-item">
                                                                            {
                                                                                car.kmRun
                                                                            }{" "}
                                                                            km
                                                                        </li>
                                                                        <li className="cars-spec-item">
                                                                            {
                                                                                car.fuelType
                                                                            }
                                                                        </li>
                                                                        <li className="cars-spec-item">
                                                                            {
                                                                                car.transmission
                                                                            }
                                                                        </li>
                                                                        <li className="cars-spec-item">
                                                                            {
                                                                                car.color
                                                                            }
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
                                                                                {(
                                                                                    car.price /
                                                                                    100000
                                                                                ).toFixed(
                                                                                    2
                                                                                )}{" "}
                                                                                lakh
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="cars-footer-details">
                                                            <div className="cars-divider" />
                                                            <div className="cars-badge-container">
                                                                <div className="cars-assured-badge">
                                                                    <img
                                                                        alt="CARS24 Assured"
                                                                        loading="lazy"
                                                                        width={
                                                                            12
                                                                        }
                                                                        height={
                                                                            12
                                                                        }
                                                                        src="https://media.cars24.com/india/car-catalog/icons_13122024/cars24-assured.png"
                                                                    />
                                                                    <p>
                                                                        CARS24
                                                                        Assured
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="cars-location-info">
                                                                <img
                                                                    alt="address-icon"
                                                                    loading="lazy"
                                                                    width={12}
                                                                    height={12}
                                                                    src="https://media.cars24.com/india/car-catalog/icons_13122024/location.png"
                                                                />
                                                                <div className="cars-address">
                                                                    <p>
                                                                        {car.city ||
                                                                            "Bangalore, Karnataka"}
                                                                    </p>
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
                        </div>
                    )}
                </div>
            </section>

            {/* Services Section */}
            <div id="services-section">
                <div className="services-container container">
                    <div className="services-content">
                        <h2 className="section-heading blue-accent">
                            Our services
                        </h2>
                        <div className="services-slider">
                            <Swiper
                                modules={[Navigation]}
                                navigation={{
                                    prevEl: ".services-prev-arrow",
                                    nextEl: ".services-next-arrow",
                                }}
                                spaceBetween={24}
                                slidesPerView={1.2}
                                breakpoints={{
                                    640: {
                                        slidesPerView: 2,
                                    },
                                    768: {
                                        slidesPerView: 2.5,
                                    },
                                    1024: {
                                        slidesPerView: 3,
                                    },
                                    1280: {
                                        slidesPerView: 4,
                                    },
                                }}
                                className="swiper-wrapper"
                            >
                                {[
                                    {
                                        title: "BUY",
                                        description:
                                            "Drive home your dream car",
                                        image: "assets/images/services/2/service-1.webp",
                                        features: [
                                            {
                                                text: "140 quality checks",
                                                icon: "assets/images/icons/services/icon-1.svg",
                                            },
                                            {
                                                text: "7-day return",
                                                icon: "assets/images/icons/services/icon-2.svg",
                                            },
                                            {
                                                text: "Finance it your way",
                                                icon: "assets/images/icons/services/icon-3.svg",
                                            },
                                        ],
                                        cta: "View all cars",
                                        className: "buy-card",
                                        to: "/buy-used-car",
                                    },
                                    {
                                        title: "LOANS24",
                                        description:
                                            "Make your dreams real with a personal loan",
                                        image: "assets/images/services/2/service-2.png",
                                        features: [
                                            {
                                                text: "Attractive interest rates",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/08/23/8c14592d-c099-4d04-93ae-34e672b03dde-Icon-Button.png",
                                            },
                                            {
                                                text: "Disbursal in 5 mins",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/08/23/6180055e-d4f7-4088-934a-496969413e16-Icon-Button-1.png",
                                            },
                                            {
                                                text: "Get upto Rs 10 Lakhs",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/08/23/bd5d3107-14b8-43da-bdc5-5418e2eaecf5-Icon-Button-2.png",
                                            },
                                        ],
                                        cta: "Apply now",
                                        className: "loans-card",
                                        to: "/car-loan",
                                    },
                                    {
                                        title: "CREDIT CARDS",
                                        description:
                                            "All your credit card options in one place",
                                        image: "assets/images/services/2/service-3.webp",
                                        features: [
                                            {
                                                text: "30+ Card options",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/ef9381ff-05ac-46fa-b946-96ed1f428b68-30.svg",
                                            },
                                            {
                                                text: "Digital process",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/95b7da38-779b-4905-8818-948ee54d052d-Digital-Transparency.svg",
                                            },
                                            {
                                                text: "100% transparency",
                                                icon: "https://fastly-production.24c.in/india/cms/prod/banners/root/2024/07/24/5177fc55-6603-42b3-bbb1-ae6c77f5c2df-transparency.svg",
                                            },
                                        ],
                                        cta: "Apply now",
                                        className: "credit-card",
                                        to: "/credit-cards",
                                    },
                                    {
                                        title: "SELL",
                                        description:
                                            "Trust us to sell your car",
                                        image: "assets/images/services/2/service-4.webp",
                                        features: [
                                            {
                                                text: "Great price",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/7f923e63-855b-40e9-a987-eb8c38e23967-GREAT-PRICE.svg",
                                            },
                                            {
                                                text: "Instant payment",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/046aa5b3-ece2-4556-aef5-2dd4eb8a5385-INSTANT-PAYMENT.svg",
                                            },
                                            {
                                                text: "Hassle-free documentation",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/153ee08b-1b85-425f-8221-df21c6896f1c-HASSLE-FREE-DOCUMENTATION.svg",
                                            },
                                        ],
                                        cta: "Get car price",
                                        className: "sell-card",
                                        to: "/sell-car",
                                    },
                                    {
                                        title: "FINANCE",
                                        description:
                                            "Make your dream car a reality",
                                        image: "assets/images/services/2/service-5.webp",
                                        features: [
                                            {
                                                text: "Tenure up to 6 yrs",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/f43c06e6-82bb-49b6-831e-67465d9067cb-TENURE-6-MONTHS.svg",
                                            },
                                            {
                                                text: "0 down payment",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/38441486-01c1-45c0-9950-f47248aa264a-0-DOWN-PAYMENT.svg",
                                            },
                                            {
                                                text: "Flexible EMIs",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/e79dddab-1d51-4e3e-8da2-21b2f054b88b-FLEXIBLE-EMI.svg",
                                            },
                                        ],
                                        cta: "Check eligibility in 2 minutes",
                                        className: "finance-card",
                                        to: "/car-loan",
                                    },
                                    {
                                        title: "SCRAP CAR",
                                        description:
                                            "Your scrap car is worth more than you think",
                                        image: "assets/images/services/2/service-6.webp",
                                        features: [
                                            {
                                                text: "Fair price",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/876f8f2e-b8a0-420b-be4e-aa8a7e5d79be-FAIR-PRICE.svg",
                                            },
                                            {
                                                text: "Certificate of deposit",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/d494be07-c616-47e8-84a6-32afcb29cbbb-CERTIFICATE-DEPOSIT.svg",
                                            },
                                            {
                                                text: "Registered vendors",
                                                icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/2b5c2752-e545-49b3-9894-c418bfbda661-REGISTERED-VENDORS.svg",
                                            },
                                        ],
                                        cta: "Scrap your car",
                                        className: "scrap-card",
                                        to: "/scrap-car",
                                    },
                                ].map((service, index) => (
                                    <SwiperSlide key={index}>
                                        <Link
                                            to={service.to}
                                            className="service-card"
                                        >
                                            <div
                                                className={`card-content ${service.className}`}
                                            >
                                                <img
                                                    src={service.image}
                                                    alt={service.title}
                                                    className="card-image"
                                                />
                                                <div className="card-gradient" />
                                                <div className="card-details">
                                                    <p className="card-title">
                                                        {service.title}
                                                    </p>
                                                    <p className="card-description">
                                                        {service.description}
                                                    </p>
                                                    <div className="card-features">
                                                        <div className="features-list">
                                                            {service.features.map(
                                                                (
                                                                    feature,
                                                                    idx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            idx
                                                                        }
                                                                        className="feature-item"
                                                                    >
                                                                        <img
                                                                            src={
                                                                                feature.icon
                                                                            }
                                                                            alt={
                                                                                feature.text
                                                                            }
                                                                            className="feature-icon"
                                                                        />
                                                                        <p className="feature-text">
                                                                            {
                                                                                feature.text
                                                                            }
                                                                        </p>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                        <div className="card-cta">
                                                            {service.cta}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div className="slider-controls">
                                <button
                                    type="button"
                                    className="slider-arrow services-prev-arrow"
                                    aria-label="Previous services"
                                >
                                    <svg
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 18L9 12L15 6"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                                <button
                                    type="button"
                                    className="slider-arrow services-next-arrow"
                                    aria-label="Next services"
                                >
                                    <svg
                                        width={16}
                                        height={16}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M9 18L15 12L9 6"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Car Category */}
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
                                        id: "car-budget-tab",
                                        label: "Car budget",
                                        controls: "car-budget-panel",
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
                                            tabIndex={
                                                activeTab === tab.id ? 0 : -1
                                            }
                                            onClick={() =>
                                                handleTabClick(tab.id)
                                            }
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
                                    activeTab === "body-type-tab"
                                        ? "active"
                                        : ""
                                }`}
                                role="tabpanel"
                                aria-labelledby="body-type-tab"
                                tabIndex={0}
                                hidden={activeTab !== "body-type-tab"}
                            >
                                <div className="card-container">
                                    {CAR_CATEGORIES.map((category, index) => (
                                        <Link
                                            key={index}
                                            to={`${category.to}?${category.filter}`}
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
                                id="car-budget-panel"
                                className={`tab-panel ${
                                    activeTab === "car-budget-tab"
                                        ? "active"
                                        : ""
                                }`}
                                role="tabpanel"
                                aria-labelledby="car-budget-tab"
                                tabIndex={0}
                                hidden={activeTab !== "car-budget-tab"}
                            >
                                <div className="card-container">
                                    <div>
                                        <div className="used-cars-tabs budget-filter">
                                            <ul className="tabs-list">
                                                {[
                                                    {
                                                        budget: "2 Lakh",
                                                        to: "/used-cars-under-2-lakhs-bangalore",
                                                    },
                                                    {
                                                        budget: "3 Lakh",
                                                        to: "/used-cars-under-3-lakhs-bangalore",
                                                    },
                                                    {
                                                        budget: "4 Lakh",
                                                        to: "/used-cars-under-4-lakhs-bangalore",
                                                    },
                                                    {
                                                        budget: "5 Lakh",
                                                        to: "/used-cars-under-5-lakhs-bangalore",
                                                    },
                                                ].map((budget, index) => (
                                                    <li
                                                        key={index}
                                                        className="tab-item"
                                                    >
                                                        <Link
                                                            to={budget.to}
                                                            className="tab-link"
                                                        >
                                                            <span className="tab-prefix">
                                                                Cars under{" "}
                                                            </span>
                                                            <strong className="tab-value">
                                                                {budget.budget}
                                                            </strong>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                id="fuel-type-panel"
                                className={`tab-panel ${
                                    activeTab === "fuel-type-tab"
                                        ? "active"
                                        : ""
                                }`}
                                role="tabpanel"
                                aria-labelledby="fuel-type-tab"
                                tabIndex={0}
                                hidden={activeTab !== "fuel-type-tab"}
                            >
                                <div className="card-container">
                                    {FUEL_TYPES.map((fuel, index) => (
                                        <Link
                                            key={index}
                                            to={`${fuel.to}?${fuel.filter}`}
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

            {/* Auto News Section */}
            <div
                id="auto-news-section"
                className="auto-news-reset auto-news-section pt-40"
            >
                <div className="auto-news-container container">
                    <h2 className="section-heading blue-accent">
                        Latest from autoverse
                    </h2>
                    <div className="auto-news-slider-container">
                        <Swiper
                            modules={[Navigation, Pagination]}
                            navigation={{
                                prevEl: ".auto-news-prev-btn",
                                nextEl: ".auto-news-next-btn",
                            }}
                            pagination={{
                                el: ".auto-news-mobile-indicators",
                                clickable: true,
                            }}
                            spaceBetween={24}
                            slidesPerView={1.1}
                            breakpoints={{
                                640: { slidesPerView: 1.5 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            className="auto-news-slider-track"
                        >
                            {NEWS_ITEMS.map((news, index) => (
                                <SwiperSlide key={index}>
                                    <Link
                                        to={news.to}
                                        className="auto-news-slide"
                                    >
                                        <div className="auto-news-card">
                                            <div className="auto-news-img-container">
                                                <img
                                                    src={news.image}
                                                    alt={news.title}
                                                    className="auto-news-img"
                                                />
                                            </div>
                                            <div className="auto-news-content">
                                                <p className="auto-news-category">
                                                    {news.category}
                                                </p>
                                                <h2 className="auto-news-title">
                                                    {news.title}
                                                </h2>
                                                <div className="auto-news-summary-container">
                                                    <p className="auto-news-summary-label">
                                                        Summary
                                                    </p>
                                                    <div className="auto-news-summary">
                                                        {news.summary}
                                                    </div>
                                                    <span className="auto-news-read-more">
                                                        Read more
                                                    </span>
                                                    <div className="auto-news-gradient-overlay" />
                                                </div>
                                                <div className="auto-news-footer">
                                                    <div className="auto-news-author">
                                                        <img
                                                            src={news.authorImg}
                                                            alt={news.author}
                                                            className="auto-news-author-img"
                                                        />
                                                        <p className="auto-news-author-name">
                                                            {news.author}
                                                        </p>
                                                    </div>
                                                    <div className="auto-news-meta">
                                                        <div className="auto-news-meta-item">
                                                            {news.date}
                                                        </div>
                                                        <div className="auto-news-meta-item">
                                                            {news.readTime}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button
                            type="button"
                            className="auto-news-nav-btn auto-news-prev-btn"
                            aria-label="Previous slide"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            className="auto-news-nav-btn auto-news-next-btn"
                            aria-label="Next slide"
                        >
                            Next
                        </button>
                        <div className="auto-news-mobile-indicators" />
                    </div>
                </div>
            </div>

            {/* Need Help Section */}
            <div className="help-section">
                <div className="container">
                    <div className="help-section__content">
                        <h2 className="help-section__heading">Need help?</h2>
                        <div className="help-options">
                            {[
                                {
                                    title: "Ask us on WhatsApp!",
                                    description:
                                        "Get instant support via experts",
                                    icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/cf680a8c-6632-4b6f-bfa0-3e75a20de018-Whatsapp.svg",
                                    alt: "WhatsApp support",
                                },
                                {
                                    title: "Request a callback",
                                    description:
                                        "Our team will contact you shortly!",
                                    icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/a07bda7c-bb44-4745-9afc-e36dc425acb5-Call-back.svg",
                                    alt: "Request callback",
                                },
                                {
                                    title: "FAQs",
                                    description: "Get your doubts cleared",
                                    icon: "https://cdn.24c.in/prod/super-app/root/2024/07/24/f7175301-a8c1-4a9a-bf6b-aacabbdd56b8-FAQ.svg",
                                    alt: "FAQs",
                                },
                            ].map((option, index) => (
                                <div key={index} className="help-option">
                                    <a href="#" className="help-card">
                                        <img
                                            src={option.icon}
                                            alt={option.alt}
                                            className="help-card__icon"
                                        />
                                        <div className="help-card__content">
                                            <h3 className="help-card__title">
                                                {option.title}
                                            </h3>
                                            <p className="help-card__description">
                                                {option.description}
                                            </p>
                                        </div>
                                        <svg
                                            className="help-card__arrow"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                                        </svg>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
