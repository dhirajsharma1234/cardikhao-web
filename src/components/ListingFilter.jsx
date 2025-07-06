/** @format */

import React from "react";

const ListingFilter = ({
    filters,
    handleFilterChange,
    brands,
    models,
    filterOptions,
    isFilterLoading,
    clearFilters,
}) => {
    return (
        <>
            <div className="wd-find-select">
                {/* Search Input */}
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

                {/* Make (Brand) Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div className="nice-select" tabIndex={0}>
                            <span className="current">
                                {filters.brand || "Make"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.brand ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "brand",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Make
                                </li>
                                {brands.map((brand) => (
                                    <li
                                        key={brand._id}
                                        data-value={brand.name}
                                        className={`option ${
                                            filters.brand === brand.name
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "brand",
                                                    value: brand.name,
                                                },
                                            })
                                        }
                                    >
                                        {brand.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Model Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div
                            className="nice-select"
                            tabIndex={0}
                            style={{ opacity: filters.brand ? 1 : 0.6 }}
                        >
                            <span className="current">
                                {filters.modelName || "Model"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.modelName ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "modelName",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Model
                                </li>
                                {models.map((model) => (
                                    <li
                                        key={model._id}
                                        data-value={model.name}
                                        className={`option ${
                                            filters.modelName === model.name
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "modelName",
                                                    value: model.name,
                                                },
                                            })
                                        }
                                    >
                                        {model.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Body Type Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div className="nice-select" tabIndex={0}>
                            <span className="current">
                                {filters.bodyType || "Body"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.bodyType ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "bodyType",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Body
                                </li>
                                {filterOptions.bodyType.map((option) => (
                                    <li
                                        key={option}
                                        data-value={option}
                                        className={`option ${
                                            filters.bodyType === option
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "bodyType",
                                                    value: option,
                                                },
                                            })
                                        }
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Fuel Type Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div className="nice-select" tabIndex={0}>
                            <span className="current">
                                {filters.fuelType || "Fuel type"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.fuelType ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "fuelType",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Fuel type
                                </li>
                                {filterOptions.fuelType.map((option) => (
                                    <li
                                        key={option}
                                        data-value={option}
                                        className={`option ${
                                            filters.fuelType === option
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "fuelType",
                                                    value: option,
                                                },
                                            })
                                        }
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Max Price Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <input
                            type="number"
                            name="maxPrice"
                            value={filters.maxPrice}
                            onChange={handleFilterChange}
                            className="form-control"
                            placeholder="Max Price (in lakhs)"
                            min="0"
                            step="0.01"
                        />
                    </div>
                </div>

                {/* Transmission Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div className="nice-select" tabIndex={0}>
                            <span className="current">
                                {filters.transmission || "Transmission"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.transmission ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "transmission",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Transmission
                                </li>
                                {filterOptions.transmission.map((option) => (
                                    <li
                                        key={option}
                                        data-value={option}
                                        className={`option ${
                                            filters.transmission === option
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "transmission",
                                                    value: option,
                                                },
                                            })
                                        }
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Condition Filter */}
                <div className="form-group">
                    <div className="group-select">
                        <div className="nice-select" tabIndex={0}>
                            <span className="current">
                                {filters.condition || "Condition"}
                            </span>
                            <ul className="list">
                                <li
                                    data-value=""
                                    className={`option ${
                                        !filters.condition ? "selected" : ""
                                    }`}
                                    onClick={() =>
                                        handleFilterChange({
                                            target: {
                                                name: "condition",
                                                value: "",
                                            },
                                        })
                                    }
                                >
                                    Condition
                                </li>
                                {filterOptions.condition.map((option) => (
                                    <li
                                        key={option}
                                        data-value={option}
                                        className={`option ${
                                            filters.condition === option
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleFilterChange({
                                                target: {
                                                    name: "condition",
                                                    value: option,
                                                },
                                            })
                                        }
                                    >
                                        {option}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* City Filter */}
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

                {/* Clear Filters Button (for mobile) */}
                <div className="mt-4 d-lg-none">
                    <button
                        type="button"
                        className="btn btn-primary w-full"
                        onClick={clearFilters}
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
                            "Clear Filters"
                        )}
                    </button>
                </div>
            </div>
        </>
    );
};

export default ListingFilter;
