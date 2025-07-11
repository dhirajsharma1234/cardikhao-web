/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import useTabs from "../hooks/useTabs";
import useSearch from "../hooks/useSearch";
import { fetchAllCars, fetchBrands } from "../util/api";
import { useQuery } from "@tanstack/react-query";
import TestiMonial from "../components/TestiMonial";
import { useNavigate } from "react-router-dom";

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
    { title: "Car finance", to: "/" },
    { title: "New cars", to: "/" },
    { title: "Car services", to: "/" },
    // { title: "Car insurance", to: "/car-insurance" },
    // { title: "Car valuation", to: "/used-car-valuation" },
    // { title: "EMI calculator", to: "/emi-calculator" },
];

const CAR_CATEGORIES = [
    { name: "SUV", to: "/carlisting", filter: "bodyType=SUV" },
    { name: "Hatchback", to: "/carlisting", filter: "bodyType=HATCHBACK" },
    { name: "Sedan", to: "/carlisting", filter: "bodyType=SEDAN" },
];

const CAR_BUDGET = [
    {
        name: "2 Lakh",
        to: "/carlisting",
        filter: "maxPrice=2",
    },
    {
        name: "3 Lakh",
        to: "/carlisting",
        filter: "maxPrice=3",
    },
    {
        name: "4 Lakh",
        to: "/carlisting",
        filter: "maxPrice=4",
    },
    {
        name: "5 Lakh",
        to: "/carlisting",
        filter: "maxPrice=5",
    },
];

const FUEL_TYPES = [
    { name: "petrol", to: "/carlisting", filter: "fuelType=petrol" },
    { name: "diesel", to: "/carlisting", filter: "fuelType=diesel" },
    { name: "ev", to: "/carlisting", filter: "fuelType=electric" },
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
    const navigate = useNavigate();
    const searchInputRef = React.useRef(null);
    const { activeTab, handleTabClick, handleKeyDown } = useTabs();
    const placeholder = "Search for your favourite cars";
    // const { placeholder, handleSearch } = useSearch(searchInputRef);

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

    // Dynamic search on Enter
    const handleSearch = (e) => {
        if (e.key === "Enter") {
            const query = searchInputRef.current?.value?.trim();
            if (query) {
                navigate(`/carlisting?search=${encodeURIComponent(query)}`);
            }
        }
    };

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
            {/* <div id="marketingWeatherHeader">
                <div className="marketingBanner__container">
                    <div className="marketingBanner__videoContainer">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/videoseries?list=PLkIAuxN4a74QeJ99nNTQ-Ox5cjd-37d2z&autoplay=1&mute=1&loop=1&playlist=PLkIAuxN4a74QeJ99nNTQ-Ox5cjd-37d2z&controls=0&modestbranding=1&rel=0"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="interactiveElement"
                            title="Marketing Banner Video"
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
                                        placeholder={placeholder || ""}
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
                        {[
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
                                ariaLabel:
                                    "Get loans for cars and personal needs",
                                to: "/",
                            },
                            {
                                title: "Get insured",
                                description: "For your car, health & life.",
                                image: "assets/images/video/insured-1.webp",
                                ariaLabel:
                                    "Get insured for your car, health and life",
                                to: "/",
                            },
                            {
                                title: "Sell car",
                                description: "15,000+ buyer network.",
                                image: "assets/images/video/sell-car.webp",
                                ariaLabel:
                                    "Sell car with 15,000+ buyer network",
                                to: "/sell-car",
                            },
                        ].map((card, index) => (
                            <Link
                                key={index}
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
                                            style={{
                                                background: card.offerBg,
                                                color: card.offerColor,
                                            }}
                                        >
                                            {card.offer}
                                        </div>
                                    )}
                                    {card.description && (
                                        <p
                                            className="bannerCard__description interactiveElement"
                                            style={{
                                                color: "rgba(0, 0, 0, 0.53)",
                                            }}
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
                        ))}
                    </div>
                </div>
            </div> */}
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
                            // fetchpriority="high"
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
                                        placeholder={placeholder || ""}
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
                                            ref={searchInputRef}
                                            placeholder={placeholder}
                                            className="searchInput animatedPlaceholder"
                                            type="text"
                                            aria-label="Search cars"
                                            onKeyDown={handleSearch}
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
                                            to={`/carlisting?brand=${
                                                brand.name ||
                                                brand.name.toLowerCase()
                                            }`}
                                            className="text-center brand-card"
                                        >
                                            <img
                                                alt={brand.name}
                                                // fetchpriority="high"
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
                                                <div className="box-car-list hv-one">
                                                    <div className="image-group relative ">
                                                        <div className="top flex-two">
                                                            <ul className="d-flex gap-8">
                                                                {car?.isFeatured && (
                                                                    <li className="flag-tag success">
                                                                        Featured
                                                                    </li>
                                                                )}
                                                            </ul>
                                                            <div className="year flag-tag">
                                                                {car.year}
                                                            </div>
                                                        </div>
                                                        <div className="img-style">
                                                            <img
                                                                className="lazyload"
                                                                data-src={
                                                                    car
                                                                        .images?.[0]
                                                                        ? `https://cardikhao-production.up.railway.app/uploads/cars/${car.images[0]}`
                                                                        : "assets/images/placeholder-car.jpg"
                                                                }
                                                                src={
                                                                    car
                                                                        .images?.[0]
                                                                        ? `https://cardikhao-production.up.railway.app/uploads/cars/${car.images[0]}`
                                                                        : "assets/images/placeholder-car.jpg"
                                                                }
                                                                alt={`${car.brand.name} ${car.modelName.name}`}
                                                                loading="lazy"
                                                                style={{
                                                                    width: "100%",
                                                                    height: "206px",
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="content">
                                                        <div className="text-address">
                                                            <p className="text-color-3 font">
                                                                {car.bodyType}
                                                            </p>
                                                        </div>
                                                        <h5 className="link-style-1">
                                                            <a href="#">
                                                                {car.year}{" "}
                                                                {car.brand.name}{" "}
                                                                {
                                                                    car
                                                                        .modelName
                                                                        .name
                                                                }
                                                            </a>
                                                        </h5>
                                                        <div className="icon-box flex flex-wrap">
                                                            <div className="icons flex-three">
                                                                <i className="icon-autodeal-km1" />
                                                                <span>
                                                                    {car.kmRun}{" "}
                                                                    km
                                                                </span>
                                                            </div>
                                                            <div className="icons flex-three">
                                                                <i className="icon-autodeal-diesel" />
                                                                <span>
                                                                    {
                                                                        car.fuelType
                                                                    }
                                                                </span>
                                                            </div>
                                                            <div className="icons flex-three">
                                                                <i className="icon-autodeal-automatic" />
                                                                <span>
                                                                    {
                                                                        car.transmission
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="money fs-20 fw-5 lh-25 text-color-3">
                                                            ₹
                                                            {(
                                                                car.price /
                                                                100000
                                                            ).toFixed(2)}{" "}
                                                            lakh
                                                        </div>
                                                        <div className="days-box flex justify-space align-center">
                                                            <div className="img-author">
                                                                <img
                                                                    className="lazyload"
                                                                    data-src="assets/images/logo/logo-circle.png"
                                                                    src="assets/images/logo/logo-circle.png"
                                                                    alt="image"
                                                                />
                                                                <span className="font text-color-2 fw-5">
                                                                    {car.color}
                                                                </span>
                                                            </div>
                                                            <a
                                                                href="listing-detail-v1.html"
                                                                className="view-car"
                                                            >
                                                                View car
                                                            </a>
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
            {/* widget */}
            <section className="tf-section3 pt-100">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div
                                className="heading-section center w-560  m0-auto wow fadeInUpSmall"
                                data-wow-delay="0.2s"
                                data-wow-duration="1000ms"
                            >
                                <h2>
                                    Search for your favorite car or sell your
                                    car on Gadi Dikhao
                                </h2>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="tf-icon-box style-3 mg-42">
                                <div className="inner-wrap flex-three">
                                    <div className="icon">
                                        <svg
                                            width={60}
                                            height={60}
                                            viewBox="0 0 60 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14.9062 19.3124L10.125 18.2812C8.8125 17.9999 7.59375 19.0312 7.59375 20.3437V22.3124C7.59375 23.9062 8.71875 24.2812 10.3125 24.2812H15.75C17.0625 24.2812 17.5312 23.7187 17.5312 22.9687V22.6874C17.625 21.0937 16.5 19.6874 14.9062 19.3124ZM9.375 22.4062V20.3437C9.375 20.1562 9.5625 19.9687 9.75 20.0624L14.5312 21.0937C15.1875 21.2812 15.6562 21.8437 15.75 22.4999C13.3125 22.4062 9.65625 22.4999 9.375 22.4062ZM21.1875 25.2187H33C33.4688 25.2187 33.9375 24.8437 33.9375 24.2812C33.9375 23.7187 33.5625 23.3437 33 23.3437H21.1875C20.7188 23.3437 20.25 23.7187 20.25 24.2812C20.25 24.8437 20.7188 25.2187 21.1875 25.2187Z"
                                                fill="CurrentColor"
                                            />
                                            <path
                                                d="M59.5312 55.2188L52.9688 44.7188C57.1875 40.4062 58.125 33.6562 54.75 28.4062C53.7188 26.8125 52.4062 25.4062 50.8125 24.375V19.5C50.8125 17.9062 50.3438 16.2188 49.3125 14.8125H51.6562C53.0625 14.8125 54.1875 13.6875 54.1875 12.2812V11.25C54.1875 9.84375 53.0625 8.71875 51.6562 8.71875H50.0625C48.5625 8.71875 47.25 9.46875 46.3125 10.6875L42.6562 3.1875C41.9062 1.3125 40.125 0 38.0625 0H16.125C14.0625 0 12.2812 1.21875 11.5312 3.09375L7.875 10.6875C7.03125 9.46875 5.625 8.71875 4.125 8.71875H2.53125C1.125 8.71875 0 9.84375 0 11.25V12.2812C0 13.6875 1.125 14.8125 2.53125 14.8125H4.875C3.84375 16.125 3.375 17.8125 3.375 19.5V25.125C3.375 27.2812 4.125 29.3438 5.625 31.125V35.3438C5.625 37.2188 7.125 38.7188 9 38.7188H12.4688C14.3438 38.7188 15.8438 37.2188 15.8438 35.3438V33.6562H30.2812C29.9062 36.6562 30.4688 39.75 32.1562 42.4688C35.4375 47.7188 41.8125 49.9688 47.625 48L54.1875 58.5C55.125 60 57 60.375 58.5 59.5312C60 58.5938 60.375 56.7188 59.5312 55.2188ZM50.0625 10.5938H51.6562C52.0312 10.5938 52.3125 10.875 52.3125 11.25V12.2812C52.3125 12.6562 52.0312 12.9375 51.6562 12.9375H47.625C47.5312 12.8438 47.4375 12.6562 47.25 12.4688C47.5312 12.2812 48.1875 10.5938 50.0625 10.5938ZM13.2188 3.84375C13.6875 2.625 14.8125 1.875 16.125 1.875H38.0625C39.375 1.875 40.5 2.625 41.0625 3.9375C41.4375 4.6875 45.2812 12.75 45.75 13.4062H8.53125C8.90625 12.75 8.53125 13.5938 13.2188 3.84375ZM1.875 12.2812V11.25C1.875 10.875 2.15625 10.5938 2.53125 10.5938H4.125C5.0625 10.5938 5.90625 11.0625 6.375 11.8125L6.84375 12.5625C6.75 12.75 6.65625 12.8438 6.46875 13.0312H2.53125C2.15625 12.9375 1.875 12.6562 1.875 12.2812ZM14.0625 35.25C14.0625 36.0938 13.4062 36.75 12.5625 36.75H9C8.15625 36.75 7.5 36.0938 7.5 35.25V32.5312C8.625 33.1875 9.9375 33.5625 11.25 33.5625H14.0625V35.25ZM11.1562 31.7813C7.6875 31.7813 5.15625 28.5 5.15625 25.0312V19.4062C5.15625 17.8125 5.8125 16.3125 6.9375 15.0938H47.1562C48.375 16.3125 48.9375 17.8125 48.9375 19.4062V23.25C48.1875 22.875 47.3438 22.5938 46.5938 22.4062V20.25C46.5938 18.8438 45.2812 17.9062 44.0625 18.1875L39.2812 19.2188C37.7812 19.5938 36.6562 20.9062 36.6562 22.5C36.6562 22.6875 36.5625 23.25 37.0312 23.7188L36.4688 24C35.1562 24.8438 34.125 25.7812 33.1875 26.9062H21.1875C20.7188 26.9062 20.25 27.2812 20.25 27.8438C20.25 28.4062 20.625 28.7812 21.1875 28.7812H31.875C31.3125 29.7188 30.9375 30.75 30.6562 31.6875H11.1562V31.7813ZM40.5 22.5H38.4375C38.5312 21.8438 39 21.2812 39.6562 21.1875C39.75 21.1875 39.75 21.1875 39.6562 21.1875L44.5312 20.1562C44.7188 20.1562 44.9062 20.25 44.9062 20.4375V22.3125C43.4062 22.0312 41.9062 22.125 40.5 22.5ZM33.75 41.4375C30.375 36.0938 32.0625 28.9688 37.4062 25.5938C42.75 22.2188 49.875 23.9062 53.25 29.25C56.625 34.5938 54.9375 41.7188 49.5938 45.0938C44.1562 48.4688 37.125 46.875 33.75 41.4375ZM57.5625 57.9375C57 58.3125 56.1562 58.125 55.7812 57.5625L49.4062 47.3438C49.7812 47.1562 50.1562 46.9688 50.5312 46.6875C50.9062 46.5 51.2812 46.2188 51.5625 45.9375L57.9375 56.1562C58.3125 56.8125 58.125 57.5625 57.5625 57.9375Z"
                                                fill="CurrentColor"
                                            />
                                        </svg>
                                    </div>
                                    <h3>
                                        <a href="#">
                                            Are you looking for a car?
                                        </a>
                                    </h3>
                                </div>
                                <div className="content">
                                    <p>
                                        Save time and effort as you no longer
                                        need to visit multiple stores to find
                                        the right car.
                                    </p>
                                    <div className="meta style">
                                        <Link
                                            to="/carlisting"
                                            className="sc-button btn-svg btn-55"
                                        >
                                            <span>Find cars</span>
                                            <i className="icon-autodeal-search" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="image">
                                <img
                                    className="lazyload w-100"
                                    data-src="assets/images/section/find-car-1.png"
                                    src="assets/images/section/find-car-1.png"
                                    alt="images"
                                />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="tf-icon-box style-3 mg-42">
                                <div className="inner-wrap flex-three">
                                    <div className="icon">
                                        <svg
                                            width={58}
                                            height={60}
                                            viewBox="0 0 58 60"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M15.9688 39.5624L10.9062 38.4374C9.5 38.1562 8.28125 39.1874 8.28125 40.5937V42.7499C8.28125 44.4374 9.59375 44.7187 11.1875 44.8124H17C18.0312 44.8124 18.875 44.4374 18.875 43.4062V43.1249C18.7812 41.3437 17.6562 39.9374 15.9688 39.5624ZM10.0625 42.8437V40.4999C10.0625 40.2187 10.25 40.0312 10.5313 40.1249L15.6875 41.2499C16.4375 41.4374 17 42.0937 17.0937 42.8437C16.9062 42.9374 10.1563 42.9374 10.0625 42.8437ZM47.0938 38.4374L41.9375 39.5624C40.25 39.9374 39.125 41.3437 39.125 43.0312C39.125 43.1249 38.9375 44.3437 40.25 44.6249C40.9062 44.8124 45.125 44.7187 46.9062 44.7187C48.5 44.7187 49.7187 44.3437 49.7187 42.6562V40.4999C49.8125 39.1874 48.5 38.1562 47.0938 38.4374ZM47.9375 42.8437C47.6562 42.9374 41.0938 42.9374 41 42.9374C41.0938 42.1874 41.5625 41.5312 42.3125 41.3437L47.4688 40.2187C47.75 40.1249 47.9375 40.3124 47.9375 40.5937V42.8437ZM35.2812 43.8749H22.7187C22.25 43.8749 21.7812 44.2499 21.7812 44.8124C21.7812 45.3749 22.1562 45.7499 22.7187 45.7499H35.2812C35.75 45.7499 36.2188 45.3749 36.2188 44.8124C36.2188 44.2499 35.8438 43.8749 35.2812 43.8749ZM35.2812 47.7187H22.7187C22.25 47.7187 21.7812 48.0937 21.7812 48.6562C21.7812 49.2187 22.1562 49.5937 22.7187 49.5937H35.2812C35.75 49.5937 36.2188 49.2187 36.2188 48.6562C36.2188 48.0937 35.8438 47.7187 35.2812 47.7187Z"
                                                fill="CurrentColor"
                                            />
                                            <path
                                                d="M55.25 28.3125H53.5625C51.9688 28.3125 50.4688 29.0625 49.625 30.4688L47.9375 27.0938C52.8125 24.8438 56.1875 19.9688 56.1875 14.25C56.0938 6.375 49.7188 0 41.9375 0C34.1562 0 27.7812 6.375 27.7812 14.1562C27.7812 15.8438 28.0625 17.4375 28.625 18.9375H17.2812C15.125 18.9375 13.1562 20.25 12.4062 22.2188L8.46875 30.375C7.625 29.0625 6.125 28.2188 4.53125 28.2188H2.75C1.34375 28.2188 0.125 29.4375 0.125 30.8438V31.9687C0.125 33.375 1.25 34.5938 2.75 34.5938H5.46875C4.34375 36 3.78125 37.7812 3.78125 39.6562V45.6562C3.78125 47.9062 4.625 50.1562 6.21875 52.0312V56.5312C6.21875 58.5 7.8125 60 9.6875 60H13.4375C15.4062 60 16.9062 58.4062 16.9062 56.5312V54.75H41V56.5312C41 58.5 42.5938 60 44.4688 60H48.2188C50.1875 60 51.6875 58.4062 51.6875 56.5312V52.0312C53.2812 50.25 54.125 48.0938 54.125 45.75V39.75C54.125 38.625 53.8438 37.4062 53.375 36.375C53.0938 35.8125 52.8125 35.25 52.3438 34.6875H55.25C56.6562 34.6875 57.875 33.5625 57.875 32.0625V30.9375C57.7812 29.4375 56.6562 28.3125 55.25 28.3125ZM41.9375 1.875C48.7812 1.875 54.3125 7.40625 54.3125 14.1562C54.3125 20.9062 48.7812 26.4375 42.0312 26.4375C35.2812 26.4375 29.75 20.9062 29.75 14.1562C29.75 7.40625 35.1875 1.875 41.9375 1.875ZM14.0938 22.9688C14.5625 21.6562 15.875 20.8125 17.2812 20.8125H29.4688C31.8125 25.3125 36.5 28.3125 41.9375 28.3125C43.4375 28.3125 44.8438 28.125 46.1562 27.6562C46.25 27.75 48.5 32.5312 48.875 33.1875H9.03125C9.40625 32.625 8.84375 33.9375 14.0938 22.9688ZM2 31.9687V30.8438C2 30.375 2.375 30 2.75 30H4.4375C6.5 30 7.25 31.875 7.4375 32.1562C7.34375 32.3438 7.15625 32.5312 7.0625 32.7188H2.75C2.375 32.7188 2 32.4375 2 31.9687ZM15.125 56.4375C15.125 57.375 14.375 58.125 13.4375 58.125H9.6875C8.75 58.125 8 57.375 8 56.4375V53.4375C9.21875 54.1875 10.625 54.5625 12.0312 54.5625H15.125V56.4375ZM48.3125 58.125H44.5625C43.625 58.125 42.875 57.375 42.875 56.4375V54.6562H45.9687C47.375 54.6562 48.7812 54.2812 50 53.5312V56.5312C50 57.375 49.25 58.125 48.3125 58.125ZM52.4375 45.5625C52.4375 49.3125 49.7187 52.7812 45.9687 52.7812H12.0312C8.28125 52.7812 5.5625 49.2188 5.5625 45.5625V39.5625C5.5625 37.875 6.21875 36.1875 7.53125 34.9688H50.5625C51.125 35.5312 51.5938 36.1875 51.9688 36.9375C52.3438 37.7812 52.5312 38.7188 52.5312 39.5625V45.5625H52.4375ZM56 31.9687C56 32.4375 55.625 32.7188 55.25 32.7188H50.9375C50.75 32.5312 50.6562 32.3438 50.5625 32.1562C50.8438 31.875 51.5 30 53.5625 30H55.25C55.7188 30 56 30.375 56 30.75V31.9687Z"
                                                fill="CurrentColor"
                                            />
                                            <path
                                                d="M39.125 17.9062C39.125 17.4375 38.75 16.9687 38.1875 16.9687C37.625 16.9687 37.25 17.3437 37.25 17.9062C37.25 20.1562 38.8438 22.0312 41 22.4062V23.625C41 24.0938 41.375 24.5625 41.9375 24.5625C42.5 24.5625 42.875 24.1875 42.875 23.625V22.4062C45.0312 21.9375 46.625 20.1562 46.625 17.9062C46.625 15.6562 45.0312 13.7812 42.875 13.4062V7.78125C44 8.15625 44.75 9.1875 44.75 10.4062C44.75 10.875 45.125 11.3438 45.6875 11.3438C46.25 11.3438 46.625 10.9688 46.625 10.4062C46.625 8.15625 45.0312 6.28125 42.875 5.90625V4.6875C42.875 4.21875 42.5 3.75 41.9375 3.75C41.375 3.75 41 4.125 41 4.6875V5.90625C38.8438 6.375 37.25 8.15625 37.25 10.4062C37.25 12.6562 38.8438 14.5312 41 14.9062V20.4375C39.9688 20.1562 39.125 19.125 39.125 17.9062ZM44.75 17.9062C44.75 19.125 43.9062 20.1562 42.875 20.5312V15.2812C44 15.5625 44.75 16.6875 44.75 17.9062ZM39.125 10.4062C39.125 9.1875 39.9688 8.15625 41 7.78125V13.125C39.9688 12.6562 39.125 11.625 39.125 10.4062Z"
                                                fill="CurrentColor"
                                            />
                                        </svg>
                                    </div>
                                    <h3>
                                        <Link to="/sell-car">
                                            Do you want to sell a car?
                                        </Link>
                                    </h3>
                                </div>
                                <div className="content">
                                    <p>
                                        Find your perfect car match and sell
                                        your car quickly with our user-friendly
                                        online service.
                                    </p>
                                    <div className="meta style">
                                        <Link
                                            to="/sell-car"
                                            className="sc-button btn-svg btn-55"
                                        >
                                            <span>Sell a car</span>
                                            <i className="icon-autodeal-next" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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
                                        description: "Coming soon...",
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
                                        description: "Coming soon...",
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
                                        description: "Coming soon...",
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
                                        to: "#",
                                    },
                                    {
                                        title: "SELL",
                                        description: "Coming soon...",
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
                                        description: "Coming soon...",
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
                                        description: "Coming soon...",
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
                                                {CAR_BUDGET.map(
                                                    (budget, index) => (
                                                        <li
                                                            key={index}
                                                            className="tab-item"
                                                        >
                                                            <Link
                                                                to={`${budget.to}?${budget.filter}`}
                                                                className="tab-link"
                                                            >
                                                                <span className="tab-prefix">
                                                                    Cars under{" "}
                                                                </span>
                                                                <strong className="tab-value">
                                                                    {
                                                                        budget.name
                                                                    }
                                                                </strong>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
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
                        What motivates us
                    </h2>
                    <TestiMonial />
                    {/* <div className="auto-news-slider-container">
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
                    </div> */}
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
                                    <Link
                                        to="https://wa.me/8603977536?text=Hello%20I%20would%20like%20to%20make%20an%20enquiry."
                                        target="_blank"
                                        className="help-card"
                                    >
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
                                    </Link>
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
