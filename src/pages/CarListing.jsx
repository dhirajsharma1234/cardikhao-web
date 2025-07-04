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
import { fetchAllCars, fetchCarsByBrand } from "../util/api";
import { useDebounce } from "use-debounce";
import Loader from "../components/Loader";

function CarListing() {
    const { brandId } = useParams();
    const location = useLocation();
    const [page, setPage] = useState(1);
    const limit = 9;
    const [isFilterLoading, setIsFilterLoading] = useState(false);

    // Parse query parameters
    const searchParams = new URLSearchParams(location.search);
    const initialBodyType = searchParams.get("bodyType");
    const initialFuelType = searchParams.get("fuelType");

    // State for filters
    const [filters, setFilters] = useState({
        search: "",
        brand: brandId || "",
        modelName: "",
        bodyType: initialBodyType || "",
        fuelType: initialFuelType || "",
        transmission: "",
        condition: "",
        city: "",
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
                    "https://cardikhao-production.up.railway.app/api/brand/all?page=1&limit=100"
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
                    const response = await axios.get(
                        `https://cardikhao-production.up.railway.app/api/brand/model/${debouncedFilters.brand}`
                    );
                    setModels(response.data.models || []);
                } catch (error) {
                    console.error("Failed to fetch models:", error);
                    setModels([]);
                }
            } else {
                setModels([]);
            }
        };
        fetchModels();
    }, [debouncedFilters.brand]);

    // Update query based on debounced filters
    const {
        data: cars,
        isLoading,
        error,
    } = useQuery({
        queryKey: brandId
            ? ["cars", brandId, page, debouncedFilters]
            : ["cars", page, debouncedFilters],
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
                };
                return brandId
                    ? await fetchCarsByBrand({ brandId, ...params })
                    : await fetchAllCars(params);
            } finally {
                setIsFilterLoading(false);
            }
        },
    });

    const totalPages = Math.ceil((cars?.pagination?.total || 0) / limit);

    // Handle filter changes
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({
            ...prev,
            [name]: value,
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
                        <div className="cars-card-content">
                            {/* Car Image */}
                            <div className="cars-image-container">
                                <div className="cars-image-wrapper">
                                    <div className="cars-image">
                                        <img
                                            alt={`${car.brand?.name} ${car.modelName?.name}`}
                                            loading="lazy"
                                            width={220}
                                            height={120}
                                            src={
                                                car.images?.[0]
                                                    ? `https://cardikhao-production.up.railway.app/uploads/cars/${car.images[0]}`
                                                    : "/default-car.webp"
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Car Details */}
                            <div className="cars-details-container">
                                <div className="cars-main-details">
                                    <div className="cars-info">
                                        <div className="cars-title-wrapper">
                                            <h3 className="cars-model-title">
                                                {car.year} {car.brand?.name}{" "}
                                                {car.modelName?.name}
                                            </h3>
                                            <span className="cars-model-variant">
                                                {car.bodyType}
                                            </span>
                                        </div>

                                        <div className="cars-specs-list">
                                            <ul className="cars-specs">
                                                <li className="cars-spec-item">
                                                    {car.kmRun} km run
                                                </li>
                                                <li className="cars-spec-item">
                                                    {car.mileage} mileage
                                                </li>
                                                <li className="cars-spec-item">
                                                    {car.fuelType}
                                                </li>
                                                <li className="cars-spec-item">
                                                    {car.transmission}
                                                </li>
                                                <li className="cars-spec-item">
                                                    {car.condition === "new"
                                                        ? "1st owner"
                                                        : "2nd owner"}
                                                </li>
                                                {car.isSold && (
                                                    <li className="cars-spec-item text-red-500 font-bold">
                                                        SOLD
                                                    </li>
                                                )}
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
                                                            car.price / 100000
                                                        ).toFixed(2)}{" "}
                                                        lakh
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="cars-footer-details">
                                    <div className="cars-divider" />

                                    {car.isFeatured && (
                                        <div className="cars-badge-container">
                                            <div className="cars-assured-badge">
                                                <img
                                                    alt="Featured Car"
                                                    loading="lazy"
                                                    width={12}
                                                    height={12}
                                                    src="https://media.cars24.com/india/car-catalog/icons_13122024/cars24-assured.png"
                                                />
                                                <p>Featured Car</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="cars-location-info">
                                        <img
                                            alt="Location"
                                            loading="lazy"
                                            width={12}
                                            height={12}
                                            src="https://media.cars24.com/india/car-catalog/icons_13122024/location.png"
                                        />
                                        <div className="cars-address">
                                            <p>{car.city}</p>
                                        </div>
                                    </div>
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
            <section className="listing-grid tf-section3">
                <div className="container2 mx-auto px-4">
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
                                        <div className="wd-find-select">
                                            {/* Search Input */}
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="search"
                                                    value={filters.search}
                                                    onChange={
                                                        handleFilterChange
                                                    }
                                                    className="form-control"
                                                    placeholder="Search by model, fuel, color, etc."
                                                />
                                            </div>

                                            {/* Brand Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="brand"
                                                        value={filters.brand}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                        disabled={!!brandId}
                                                    >
                                                        <option value="">
                                                            Brand
                                                        </option>
                                                        {brands.map((brand) => (
                                                            <option
                                                                key={brand._id}
                                                                value={
                                                                    brand._id
                                                                }
                                                            >
                                                                {brand.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Model Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="modelName"
                                                        value={
                                                            filters.modelName
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                        disabled={
                                                            !filters.brand
                                                        }
                                                    >
                                                        <option value="">
                                                            Model
                                                        </option>
                                                        {models.map((model) => (
                                                            <option
                                                                key={model._id}
                                                                value={
                                                                    model._id
                                                                }
                                                            >
                                                                {model.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Body Type Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="bodyType"
                                                        value={filters.bodyType}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                    >
                                                        <option value="">
                                                            Body
                                                        </option>
                                                        {filterOptions.bodyType.map(
                                                            (option) => (
                                                                <option
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Fuel Type Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="fuelType"
                                                        value={filters.fuelType}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                    >
                                                        <option value="">
                                                            Fuel Type
                                                        </option>
                                                        {filterOptions.fuelType.map(
                                                            (option) => (
                                                                <option
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Transmission Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="transmission"
                                                        value={
                                                            filters.transmission
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                    >
                                                        <option value="">
                                                            Transmission
                                                        </option>
                                                        {filterOptions.transmission.map(
                                                            (option) => (
                                                                <option
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* Condition Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <select
                                                        name="condition"
                                                        value={
                                                            filters.condition
                                                        }
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="nice-select form-control"
                                                    >
                                                        <option value="">
                                                            Condition
                                                        </option>
                                                        {filterOptions.condition.map(
                                                            (option) => (
                                                                <option
                                                                    key={option}
                                                                    value={
                                                                        option
                                                                    }
                                                                >
                                                                    {option}
                                                                </option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>

                                            {/* City Filter */}
                                            <div className="form-group">
                                                <div className="group-select">
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        value={filters.city}
                                                        onChange={
                                                            handleFilterChange
                                                        }
                                                        className="form-control"
                                                        placeholder="City"
                                                    />
                                                </div>
                                            </div>
                                        </div>
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
                                    <div className="col-lg-12 listing-list-car-wrap listing-grid-car-wrap">
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
                                    </div>

                                    <div className="col-lg-12 listing-list-car-wrap listing-grid-car-wrap">
                                        <div className="container">
                                            <div className="box-tab center flex justify-between items-center mb-10 flex-wrap gap-5 d-lg-none">
                                                <div className="box-2 flex gap-2 flex-wrap">
                                                    <div className="filter-mobile lg:hidden">
                                                        <a
                                                            data-bs-toggle="offcanvas"
                                                            data-bs-target="#offcanvasRight"
                                                            aria-controls="offcanvasRight"
                                                            className="filter flex items-center gap-2 bg-gray-100 px-4 py-2 rounded"
                                                        >
                                                            Filter
                                                            <i className="icon-autodeal-filter" />
                                                        </a>
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
                                            <nav aria-label="Page navigation">
                                                <ul className="pagination justify-content-center mt-4">
                                                    <li
                                                        className={`page-item ${
                                                            page === 1
                                                                ? "disabled"
                                                                : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                setPage(
                                                                    page - 1
                                                                )
                                                            }
                                                            disabled={
                                                                page === 1
                                                            }
                                                        >
                                                            Previous
                                                        </button>
                                                    </li>

                                                    {Array.from(
                                                        { length: totalPages },
                                                        (_, i) => (
                                                            <li
                                                                key={i + 1}
                                                                className={`page-item ${
                                                                    page ===
                                                                    i + 1
                                                                        ? "active"
                                                                        : ""
                                                                }`}
                                                            >
                                                                <button
                                                                    className="page-link"
                                                                    onClick={() =>
                                                                        setPage(
                                                                            i +
                                                                                1
                                                                        )
                                                                    }
                                                                >
                                                                    {i + 1}
                                                                </button>
                                                            </li>
                                                        )
                                                    )}

                                                    <li
                                                        className={`page-item ${
                                                            page === totalPages
                                                                ? "disabled"
                                                                : ""
                                                        }`}
                                                    >
                                                        <button
                                                            className="page-link"
                                                            onClick={() =>
                                                                setPage(
                                                                    (prev) =>
                                                                        prev + 1
                                                                )
                                                            }
                                                            disabled={
                                                                page ===
                                                                totalPages
                                                            }
                                                        >
                                                            Next
                                                        </button>
                                                    </li>
                                                </ul>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Offcanvas for Mobile Filters */}
                <div
                    className="offcanvas offcanvas-end"
                    tabIndex="-1"
                    id="offcanvasRight"
                    aria-labelledby="offcanvasRightLabel"
                >
                    <div className="offcanvas-header">
                        <h5 id="offcanvasRightLabel">Filters and Sort</h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="form-filter-siderbar">
                            <form
                                method="post"
                                onSubmit={(e) => e.preventDefault()}
                            >
                                <div className="wd-find-select">
                                    {/* Mobile Search Input */}
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="search"
                                            value={filters.search}
                                            onChange={handleFilterChange}
                                            className="form-control"
                                            placeholder="Search by model, fuel, color, etc."
                                        />
                                    </div>

                                    {/* Mobile Brand Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="brand"
                                                value={filters.brand}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                                disabled={!!brandId}
                                            >
                                                <option value="">Brand</option>
                                                {brands.map((brand) => (
                                                    <option
                                                        key={brand._id}
                                                        value={brand._id}
                                                    >
                                                        {brand.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile Model Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="modelName"
                                                value={filters.modelName}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                                disabled={!filters.brand}
                                            >
                                                <option value="">Model</option>
                                                {models.map((model) => (
                                                    <option
                                                        key={model._id}
                                                        value={model._id}
                                                    >
                                                        {model.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile Body Type Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="bodyType"
                                                value={filters.bodyType}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                            >
                                                <option value="">Body</option>
                                                {filterOptions.bodyType.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile Fuel Type Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="fuelType"
                                                value={filters.fuelType}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                            >
                                                <option value="">
                                                    Fuel Type
                                                </option>
                                                {filterOptions.fuelType.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile Transmission Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="transmission"
                                                value={filters.transmission}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                            >
                                                <option value="">
                                                    Transmission
                                                </option>
                                                {filterOptions.transmission.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile Condition Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <select
                                                name="condition"
                                                value={filters.condition}
                                                onChange={handleFilterChange}
                                                className="nice-select form-control"
                                            >
                                                <option value="">
                                                    Condition
                                                </option>
                                                {filterOptions.condition.map(
                                                    (option) => (
                                                        <option
                                                            key={option}
                                                            value={option}
                                                        >
                                                            {option}
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>

                                    {/* Mobile City Filter */}
                                    <div className="form-group">
                                        <div className="group-select">
                                            <input
                                                type="text"
                                                name="city"
                                                value={filters.city}
                                                onChange={handleFilterChange}
                                                className="form-control"
                                                placeholder="City"
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            className="btn btn-primary w-full"
                                            data-bs-dismiss="offcanvas"
                                            disabled={isFilterLoading}
                                        >
                                            {isFilterLoading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    Applying...
                                                </>
                                            ) : (
                                                "Apply Filters"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </form>
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
            `}</style>
        </>
    );
}

export default CarListing;
