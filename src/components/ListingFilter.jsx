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
        <div className="filters-container">
            {/* <div className="form-group mb-3">
                <input
                    type="text"
                    name="search"
                    value={filters.search}
                    onChange={handleFilterChange}
                    className="form-control"
                    placeholder="Search by model, fuel, color, etc."
                />
            </div> */}

            <div className="filter-items">
                {/* Make (Brand) Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Make</label>
                    <select
                        className="form-select"
                        name="brand"
                        value={filters.brand || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Make</option>
                        {brands.map((brand) => (
                            <option key={brand._id} value={brand.name}>
                                {brand.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Model Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Model</label>
                    <select
                        className="form-select"
                        name="modelName"
                        value={filters.modelName || ""}
                        onChange={handleFilterChange}
                        disabled={!filters.brand}
                    >
                        <option value="">Select Model</option>
                        {models.map((model) => (
                            <option key={model._id} value={model.name}>
                                {model.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Body Type Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Body</label>
                    <select
                        className="form-select"
                        name="bodyType"
                        value={filters.bodyType || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Body Type</option>
                        {filterOptions.bodyType.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Fuel Type Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Fuel type</label>
                    <select
                        className="form-select"
                        name="fuelType"
                        value={filters.fuelType || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Fuel Type</option>
                        {filterOptions.fuelType.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Max Price Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Max Price (in lakhs)</label>
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice || ""}
                        onChange={handleFilterChange}
                        className="form-control"
                        placeholder="Enter amount"
                        min="0"
                        step="0.01"
                    />
                </div>

                {/* Transmission Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Transmission</label>
                    <select
                        className="form-select"
                        name="transmission"
                        value={filters.transmission || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Transmission</option>
                        {filterOptions.transmission.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Condition Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">Condition</label>
                    <select
                        className="form-select"
                        name="condition"
                        value={filters.condition || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Select Condition</option>
                        {filterOptions.condition.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>

                {/* City Filter */}
                <div className="form-group mb-3">
                    <label className="form-label">City</label>
                    <input
                        type="text"
                        name="city"
                        value={filters.city || ""}
                        onChange={handleFilterChange}
                        className="form-control"
                        placeholder="Enter city"
                    />
                </div>
            </div>

            <div className="d-flex justify-content-end mt-3">
                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={clearFilters}
                    disabled={isFilterLoading}
                >
                    {isFilterLoading ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Applying...
                        </>
                    ) : (
                        "Clear Filters"
                    )}
                </button>
            </div>
        </div>
    );
};

export default ListingFilter;
