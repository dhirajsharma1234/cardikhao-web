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
            <div className="filter-items">
                {/* Make (Brand) Filter */}
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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
                <div className="form-group">
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

            <div className="filter-actions">
                <button
                    type="button"
                    className="clear-filters-btn"
                    onClick={clearFilters}
                    disabled={isFilterLoading}
                >
                    {isFilterLoading ? (
                        <>
                            <span className="spinner"></span>
                            Applying...
                        </>
                    ) : (
                        "Clear Filters"
                    )}
                </button>
            </div>

            <style jsx>{`
                .filters-container {
                    padding: 16px;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .filter-items {
                    flex: 1;
                    overflow-y: auto;
                    padding-bottom: 16px;
                }

                .form-group {
                    margin-bottom: 16px;
                }

                .form-label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #333;
                    font-size: 14px;
                }

                .form-select,
                .form-control {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    background-color: white;
                    font-size: 16px;
                    appearance: none;
                    -webkit-appearance: none;
                    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    background-size: 16px;
                }

                .form-control {
                    background-image: none;
                }

                .filter-actions {
                    padding-top: 16px;
                    border-top: 1px solid #eee;
                }

                .clear-filters-btn {
                    width: 100%;
                    padding: 12px;
                    background-color: #f8f9fa;
                    border: 1px solid #ddd;
                    border-radius: 8px;
                    color: #333;
                    font-weight: 500;
                    font-size: 16px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .clear-filters-btn:hover:not(:disabled) {
                    background-color: #e9ecef;
                }

                .clear-filters-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top-color: #333;
                    animation: spin 1s ease-in-out infinite;
                    margin-right: 8px;
                    vertical-align: middle;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                /* Mobile-specific styles */
                @media (max-width: 768px) {
                    .form-select,
                    .form-control {
                        padding: 14px;
                        font-size: 16px;
                    }

                    .form-label {
                        font-size: 15px;
                    }

                    .clear-filters-btn {
                        padding: 14px;
                        font-size: 16px;
                    }
                }
            `}</style>
        </div>
    );
};

export default ListingFilter;
