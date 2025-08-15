/** @format */

import React, { useEffect, useState, useMemo } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCars } from "../util/api";
import { useDebounce } from "use-debounce";
import ListingFilter from "../components/ListingFilter";
import Loader from "../components/Loader";
import { formatPriceINR } from "../util/priceConversion";

function CarListing() {
    const { brandId } = useParams();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const limit = 9;
    const [isFilterLoading, setIsFilterLoading] = useState(false);
    const [showMobileFilter, setShowMobileFilter] = useState(false);

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const initialBodyType = searchParams.get("bodyType");
    const initialFuelType = searchParams.get("fuelType");
    const priceType = searchParams.get("maxPrice");
    const brandType = searchParams.get("brand");
    const searchQuery = searchParams.get("search");

    console.log("My brand type");
    console.log(brandType);

    // State for filters
    const [filters, setFilters] = useState({
        search: searchQuery || "",
        brand: brandType || brandId || "",
        modelName: "",
        bodyType: initialBodyType || "",
        fuelType: initialFuelType || "",
        transmission: "",
        condition: "",
        city: "",
        maxPrice: priceType || "",
    });

    // Debounced filters (500ms delay)
    const [debouncedFilters] = useDebounce(filters, 500);

    // State for dynamic brand and model options
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    // Filter options for enums
    const filterOptions = {
        fuelType: ["petrol", "diesel", "electric", "hybrid", "cng"],
        transmission: ["Automatic", "Manual"],
        bodyType: [
            "SEDAN",
            "SUV",
            "HATCHBACK",
            "CONVERTIBLE",
            "COUPE",
            "PICKUP",
            "VAN",
            "WAGON",
        ],
        condition: ["new", "used"],
    };

    // Fetch brands
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get(
                    "http://api.gadidikhao.com/api/brand/all?page=1&limit=10"
                );
                setBrands(response?.data?.data || []);
            } catch (error) {
                console.error("Failed to fetch brands:", error);
            }
        };
        fetchBrands();
    }, []);

    // Fetch models when debounced brand changes
    useEffect(() => {
        const fetchModels = async () => {
            if (debouncedFilters.brand) {
                try {
                    const selectedBrand = brands.find(
                        (brand) => brand.name === debouncedFilters.brand
                    );
                    if (selectedBrand) {
                        const response = await axios.get(
                            `http://api.gadidikhao.com/api/brand/model/${selectedBrand._id}`
                        );
                        setModels(response.data.data || []);
                    }
                } catch (error) {
                    console.error("Failed to fetch models:", error);
                    setModels([]);
                }
            } else {
                setModels([]);
            }
        };
        fetchModels();
    }, [debouncedFilters.brand, brands]);

    // Update query based on debounced filters
    const {
        data: cars,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["cars", page, debouncedFilters],
        queryFn: async () => {
            setIsFilterLoading(true);
            try {
                const params = {
                    page,
                    limit,
                    brand: debouncedFilters.brand,
                    modelName: debouncedFilters.modelName,
                    bodyType: debouncedFilters.bodyType,
                    fuelType: debouncedFilters.fuelType,
                    transmission: debouncedFilters.transmission,
                    condition: debouncedFilters.condition,
                    city: debouncedFilters.city,
                    search: debouncedFilters.search,
                    maxPrice: debouncedFilters.maxPrice
                        ? debouncedFilters.maxPrice
                        : "",
                };

                return await fetchAllCars(params);
            } finally {
                setIsFilterLoading(false);
            }
        },
    });

    const totalPages = Math.ceil((cars?.pagination?.total || 0) / limit);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // Special handling for maxPrice to ensure it's a valid number
        let processedValue = value;
        if (name === "maxPrice") {
            processedValue =
                value === "" ? "" : Math.max(0, parseFloat(value) || "");
        }

        setFilters((prev) => ({
            ...prev,
            [name]: processedValue,
            ...(name === "brand" && { modelName: "" }), // Reset model when brand changes
        }));
        setPage(1); // Reset to first page on filter change
    };

    // Clear all filters
    const clearFilters = () => {
        setFilters({
            search: "",
            brand: brandId || "",
            modelName: "",
            bodyType: "",
            fuelType: "",
            transmission: "",
            condition: "",
            city: "",
            maxPrice: "",
        });
        setPage(1);
    };

    // Memoized car cards to prevent unnecessary re-renders
    const carCards = useMemo(() => {
        if (isLoading) {
            return <Loader />;
        }

        if (error) {
            return (
                <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ minHeight: "300px" }}
                >
                    <p className="text-danger fs-5 fw-medium bg-white px-4 py-3 rounded shadow-sm">
                        Failed to load cars. Please try again later.
                    </p>
                </div>
            );
        }

        if (!cars?.cars?.length) {
            return (
                <div
                    className="d-flex justify-content-center align-items-center w-100"
                    style={{ minHeight: "300px" }}
                >
                    <p className="text-muted fs-5 fw-medium bg-white px-4 py-3 rounded shadow-sm">
                        No cars found matching the criteria.
                    </p>
                </div>
            );
        }

        return cars.cars.map((car) => (
            <div className="col-md-4" key={car._id}>
                <div className="cars-card">
                    <Link to={`/car/${car._id}`} className="cars-card-link">
                        <div className="box-car-list hv-one">
                            <div className="image-group relative ">
                                <div className="top flex-two">
                                    <ul className="d-flex gap-8">
                                        {car?.isFeatured && (
                                            <li className="flag-tag success">
                                                Featured
                                            </li>
                                        )}
                                        <li className="flag-tag success">
                                            {car?.condition === "new"
                                                ? "new"
                                                : "used"}
                                        </li>
                                    </ul>
                                    <div className="year flag-tag">
                                        {car.year}
                                    </div>
                                </div>
                                <div className="img-style">
                                    <img
                                        className="lazyload"
                                        data-src={
                                            car.images?.[0]
                                                ? `http://api.gadidikhao.com/uploads/cars/${car.images[0]}`
                                                : "http://api.gadidikhao.com/uploads/cars/car-not-found.png"
                                        }
                                        src={
                                            car.images?.[0]
                                                ? `http://api.gadidikhao.com/uploads/cars/${car.images[0]}`
                                                : "http://api.gadidikhao.com/uploads/cars/car-not-found.png"
                                        }
                                        alt={`${car?.brand?.name} ${car?.modelName?.name}`}
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
                                        {car?.year} {car?.brand?.name}{" "}
                                        {car?.modelName?.name}
                                    </a>
                                </h5>
                                <div className="icon-box flex flex-wrap">
                                    <div className="icons flex-three">
                                        <i className="icon-autodeal-km1" />
                                        <span>{car.kmRun} km</span>
                                    </div>
                                    <div className="icons flex-three">
                                        <i className="icon-autodeal-diesel" />
                                        <span>{car?.fuelType}</span>
                                    </div>
                                    <div className="icons flex-three">
                                        <i className="icon-autodeal-automatic" />
                                        <span>{car?.transmission}</span>
                                    </div>
                                </div>
                                <div className="money fs-20 fw-5 lh-25 text-color-3">
                                    ₹{(car.price / 100000).toFixed(2)} lakh
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
            </div>
        ));
    }, [cars, isLoading, error]);

    return (
        <>
            <section className="listing-grid contact-us tf-section3">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="banner-area">
                            <div className="container">
                                <div className="banner-text">
                                    <h2>Find Your Perfect Car, Right Here!</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container2 mx-auto px-4 pt-50">
                    <div className="row">
                        <div className="col-lg-12 flex flex-col lg:flex-row gap-8">
                            {/* Desktop Filter Sidebar */}
                            <div className="sidebar-right-listing hidden lg:block w-full lg:w-1/4">
                                <div className="sidebar-title flex justify-between flex-wrap">
                                    <h4>Filters and Sort</h4>
                                    <button
                                        className="fw-5 font claer text-color-2"
                                        onClick={clearFilters}
                                    >
                                        <i className="icon-autodeal-plus" />
                                        Clear
                                    </button>
                                </div>
                                <div className="form-filter-siderbar">
                                    <form
                                        method="post"
                                        onSubmit={(e) => e.preventDefault()}
                                    >
                                        <ListingFilter
                                            filters={filters}
                                            handleFilterChange={
                                                handleFilterChange
                                            }
                                            brands={brands}
                                            models={models}
                                            filterOptions={filterOptions}
                                            isFilterLoading={isFilterLoading}
                                            clearFilters={clearFilters}
                                        />
                                    </form>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="sidebar-left-listing w-full lg:w-3/4">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="search-wrap-main">
                                            <div className="search-wrap">
                                                <div className="input-wrap">
                                                    <div className="input-shift">
                                                        <input
                                                            type="text"
                                                            name="search"
                                                            value={
                                                                filters.search
                                                            }
                                                            onChange={
                                                                handleFilterChange
                                                            }
                                                            className="form-control"
                                                            maxLength={1000}
                                                            autoComplete="off"
                                                            placeholder="Search for your favourite cars"
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
                                    </div>
                                    {/* <div className="col-lg-12 listing-list-car-wrap listing-grid-car-wrap">
                                        <div className="promo-slider">
                                            <div className="promo-slider__container">
                                                <Swiper
                                                    modules={[
                                                        Navigation,
                                                        Pagination,
                                                    ]}
                                                    spaceBetween={16}
                                                    slidesPerView={1.2}
                                                    breakpoints={{
                                                        640: {
                                                            slidesPerView: 2.2,
                                                        },
                                                        1024: {
                                                            slidesPerView: 3.2,
                                                        },
                                                    }}
                                                    navigation={{
                                                        nextEl: ".promo-slider__button--next",
                                                        prevEl: ".promo-slider__button--prev",
                                                    }}
                                                    className="promo-slider__wrapper"
                                                >
                                                    <SwiperSlide className="promo-slider__item">
                                                        <div className="promo-card">
                                                            <img
                                                                className="promo-card__image"
                                                                alt="Loan offer"
                                                                loading="lazy"
                                                                width={328}
                                                                height={136}
                                                                src="https://media.cars24.com/india/cms/prod/banners/root/2025/04/29/af606fe5-5d6b-45ab-bee2-dab26088660f-Loans24.png?w=328&dpr=1&format=webp"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="promo-slider__item">
                                                        <div className="promo-card">
                                                            <img
                                                                className="promo-card__image"
                                                                alt="Discount offer"
                                                                loading="lazy"
                                                                width={328}
                                                                height={136}
                                                                src="https://media.cars24.com/india/cms/prod/banners/root/2025/04/29/73140f16-a155-44b0-a2b9-1a6db32d2ab9-Discount.png?w=328&dpr=1&format=webp"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                    <SwiperSlide className="promo-slider__item">
                                                        <div className="promo-card">
                                                            <img
                                                                className="promo-card__image"
                                                                alt="Exchange offer"
                                                                loading="lazy"
                                                                width={328}
                                                                height={136}
                                                                src="https://media.cars24.com/india/cms/prod/banners/root/2025/04/29/31b4c186-ef33-4692-9f3d-1933a9eeb6fc-Exchange.png?w=328&dpr=1&format=webp"
                                                            />
                                                        </div>
                                                    </SwiperSlide>
                                                    <div className="promo-slider__navigation">
                                                        <button className="promo-slider__button promo-slider__button--prev">
                                                            <svg
                                                                width={24}
                                                                height={24}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M15 18L9 12L15 6"
                                                                    stroke="#002441"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                        <button className="promo-slider__button promo-slider__button--next">
                                                            <svg
                                                                width={24}
                                                                height={24}
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M9 18L15 12L9 6"
                                                                    stroke="#002441"
                                                                    strokeWidth={
                                                                        2
                                                                    }
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div className="swiper-pagination promo-slider__pagination" />
                                                </Swiper>
                                            </div>
                                        </div>
                                    </div> */}

                                    <div className="col-lg-12 listing-list-car-wrap listing-grid-car-wrap">
                                        <div className="container-fluid">
                                            <div className="box-tab center flex justify-between items-center mb-10 flex-wrap gap-5 d-lg-none">
                                                <div className="box-2 flex gap-2 flex-wrap">
                                                    <div className="filter-mobile lg:hidden">
                                                        <button
                                                            onClick={() =>
                                                                setShowMobileFilter(
                                                                    true
                                                                )
                                                            }
                                                            className="filter flex items-center gap-2 bg-gray-100 px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M6.66667 12.6667H9.33333V11.3333H6.66667V12.6667ZM2 3.33333V4.66667H14V3.33333H2ZM4 8H12V6.66667H4V8Z"
                                                                    fill="white"
                                                                />
                                                            </svg>
                                                            Filter
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row position-relative">
                                                {isFilterLoading && (
                                                    <div className="loading-overlay">
                                                        <span className="visually-hidden">
                                                            Loading...
                                                        </span>
                                                    </div>
                                                )}
                                                {carCards}
                                            </div>
                                            <div className="themesflat-pagination clearfix mt-40">
                                                <ul>
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`page-numbers style ${
                                                                page === 1
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (page !== 1)
                                                                    setPage(
                                                                        page - 1
                                                                    );
                                                            }}
                                                        >
                                                            <i className="far fa-angle-left" />
                                                        </a>
                                                    </li>
                                                    {Array.from(
                                                        { length: totalPages },
                                                        (_, i) => (
                                                            <li key={i + 1}>
                                                                <a
                                                                    href="#"
                                                                    className={`page-numbers ${
                                                                        page ===
                                                                        i + 1
                                                                            ? "current"
                                                                            : ""
                                                                    }`}
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.preventDefault();
                                                                        setPage(
                                                                            i +
                                                                                1
                                                                        );
                                                                    }}
                                                                >
                                                                    {i + 1}
                                                                </a>
                                                            </li>
                                                        )
                                                    )}
                                                    <li>
                                                        <a
                                                            href="#"
                                                            className={`page-numbers style ${
                                                                page ===
                                                                totalPages
                                                                    ? "disabled"
                                                                    : ""
                                                            }`}
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (
                                                                    page !==
                                                                    totalPages
                                                                )
                                                                    setPage(
                                                                        (
                                                                            prev
                                                                        ) =>
                                                                            prev +
                                                                            1
                                                                    );
                                                            }}
                                                        >
                                                            <i className="far fa-angle-right" />
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Offcanvas for Mobile Filters */}

                <div
                    className={`mobile-filter-overlay ${
                        showMobileFilter ? "active" : ""
                    }`}
                >
                    <div className="mobile-filter-container">
                        <div className="mobile-filter-header">
                            <h5>Filters and Sort</h5>
                            <button
                                onClick={() => setShowMobileFilter(false)}
                                className="close-filter"
                            >
                                &times;
                            </button>
                        </div>
                        <div className="mobile-filter-body">
                            <ListingFilter
                                filters={filters}
                                handleFilterChange={handleFilterChange}
                                brands={brands}
                                models={models}
                                filterOptions={filterOptions}
                                isFilterLoading={isFilterLoading}
                                clearFilters={clearFilters}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <style jsx>{`
                .promo-slider__navigation {
                    position: absolute;
                    top: 50%;
                    left: 0;
                    right: 0;
                    transform: translateY(-50%);
                    display: flex;
                    justify-content: space-between;
                    pointer-events: none;
                    z-index: 10;
                }
                .promo-slider__button {
                    pointer-events: auto;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .promo-slider__button:hover {
                    background: #f5f5f5;
                }
                .promo-slider__button--prev {
                    margin-left: 0px;
                }
                .promo-slider__button--next {
                    margin-right: 0px;
                }
                .offcanvas {
                    width: 100%;
                    max-width: 400px;
                }
                .offcanvas-header {
                    border-bottom: 1px solid #e5e7eb;
                }
                .offcanvas-body {
                    padding: 1rem;
                }
                .btn-close {
                    background: transparent
                        url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707A1 1 0 010 .293z'/%3e%3c/svg%3e")
                        center/1em auto no-repeat;
                }
                .loading-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(255, 255, 255, 0.8);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 10;
                }
                .mobile-filter-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                    display: none;
                }

                .mobile-filter-overlay.active {
                    display: block;
                }

                .mobile-filter-container {
                    position: fixed;
                    top: 0;
                    right: 0;
                    width: 85%;
                    max-width: 400px;
                    height: 100%;
                    background: white;
                    transform: translateX(100%);
                    transition: transform 0.3s ease-out;
                    overflow-y: auto;
                    z-index: 1001;
                }

                .mobile-filter-overlay.active .mobile-filter-container {
                    transform: translateX(0);
                }

                .mobile-filter-header {
                    padding: 15px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    border-bottom: 1px solid #eee;
                }

                .mobile-filter-body {
                    padding: 15px;
                }

                .close-filter {
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                }
            `}</style>
        </>
    );
}

export default CarListing;
