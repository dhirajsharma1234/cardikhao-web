/** @format */

import axios from "axios";

const URL = "http://82.112.234.206:8000/api";

export const fetchBrands = async ({ page = 1, limit = 8 } = {}) => {
    const res = await axios.get(`${URL}/brand/all`, {
        params: { page, limit },
    });
    return res.data?.data || [];
};

// API functions
export const fetchAllCars = async ({
    page = 1,
    limit = 10,
    brand,
    modelName,
    bodyType,
    fuelType,
    transmission,
    condition,
    city,
    search,
    maxPrice,
}) => {
    const params = {
        page,
        limit,
        ...(brand && { brand }),
        ...(modelName && { modelName: modelName }),
        ...(bodyType && { bodyType }),
        ...(fuelType && { fuelType }),
        ...(transmission && { transmission }),
        ...(condition && { condition }),
        ...(city && { city }),
        ...(search && { search }),
        ...(maxPrice && { maxPrice }),
    };

    const res = await axios.get(`http://82.112.234.206:8000/api/car/all`, {
        params,
    });
    return res.data;
};

export const fetchSimilarCars = async (brand: string, modelName: string) => {
    if (!brand || !modelName) return { cars: [] };

    try {
        // Convert modelName to the hyphenated format if needed
        const formattedModelName = modelName.toLowerCase();

        const res = await axios.get(`${URL}/car/all`, {
            params: {
                page: 1,
                limit: 4,
                brand: brand.toLowerCase(), // ensure consistent casing
                modelName: formattedModelName,
            },
        });

        return res.data; // Return the full response data
    } catch (error) {
        console.error("Error fetching similar cars:", error);
        return { cars: [] };
    }
};

export const fetchCarById = async (carId: string) => {
    const res = await axios.get(`${URL}/car/${carId}`);
    return res.data;
};
