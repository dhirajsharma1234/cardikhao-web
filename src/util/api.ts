/** @format */

import axios from "axios";

const URL = "https://cardikhao-production.up.railway.app/api";

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
}) => {
    const params = {
        page,
        limit,
        ...(brand && { brand }),
        ...(modelName && { "modelName._id": modelName }),
        ...(bodyType && { bodyType }),
        ...(fuelType && { fuelType }),
        ...(transmission && { transmission }),
        ...(condition && { condition }),
        ...(city && { city }),
        ...(search && { "modelName.name": search }),
    };

    const res = await axios.get(
        `https://cardikhao-production.up.railway.app/api/car/all`,
        {
            params,
        }
    );
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

export const fetchCarsByBrand = async ({
    brandId,
    page = 1,
    limit = 10,
    modelName,
    bodyType,
    fuelType,
    transmission,
    condition,
    city,
    search,
}) => {
    if (!brandId) throw new Error("Brand ID is required");

    const params = {
        page,
        limit,
        ...(modelName && { "modelName._id": modelName }),
        ...(bodyType && { bodyType }),
        ...(fuelType && { fuelType }),
        ...(transmission && { transmission }),
        ...(condition && { condition }),
        ...(city && { city }),
        ...(search && { "modelName.name": search }),
    };

    const res = await axios.get(
        `https://cardikhao-production.up.railway.app/api/car/brand/${brandId}`,
        { params }
    );

    return res.data;
};

export const fetchCarById = async (carId: string) => {
    const res = await axios.get(`${URL}/car/${carId}`);
    return res.data;
};
