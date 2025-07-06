/** @format */

export const formatPriceINR = (price) => {
    if (price >= 1_00_00_000) {
        return `${(price / 1_00_00_000).toFixed(2)} crore`;
    } else if (price >= 1_00_000) {
        return `${(price / 1_00_000).toFixed(2)} lakh`;
    } else {
        return `${price.toLocaleString("en-IN")} INR`;
    }
};
