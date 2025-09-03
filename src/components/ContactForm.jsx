/** @format */

import React, { useState, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

// Custom hook for form handling
const useForm = (initialState) => {
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({
            ...prev,
            [name]: value ? "" : `${name} is required`,
        }));
    }, []);

    const resetForm = useCallback(
        () => setFormData(initialState),
        [initialState]
    );

    return { formData, errors, handleInputChange, resetForm };
};

const ContactForm = ({
    isOpen,
    onClose,
    onSubmit, // This prop is kept for backward compatibility
    isSubmitting = false,
    title = "Contact Form",
    description = "",
    showName = true,
    showEmail = true,
    showPhone = true,
    showMessage = true,
    initialData = {},
    // New prop to determine if we should use internal API handling
    useInternalApi = true,
}) => {
    const initialState = {
        name: "",
        email: "",
        phone: "",
        message: "",
        ...initialData,
    };

    const { formData, errors, handleInputChange, resetForm } =
        useForm(initialState);

    // Add the same API mutation from ContactUs.jsx
    const contactUsMutation = useMutation({
        mutationFn: async (formData) => {
            const payload = {
                typeData: "enquiry", // Fixed type for contact us form
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                message: formData.message,
            };

            const response = await axios.post(
                "https://api.gadidikhao.com/api/enquiry",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data;
        },
        onSuccess: () => {
            toast.success("Message sent successfully!");
            resetForm();
            if (onClose) onClose();
        },
        onError: (error) => {
            console.error("Error submitting contact form:", error);
            toast.error(
                "Error sending message: " +
                    (error.response?.data?.message || error.message)
            );
        },
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newErrors = {};

        // Validate required fields
        if (showName && !formData.name) newErrors.name = "Name is required";
        if (showEmail && !formData.email) newErrors.email = "Email is required";
        if (showPhone && !formData.phone) newErrors.phone = "Phone is required";
        if (showMessage && !formData.message)
            newErrors.message = "Message is required";

        if (Object.keys(newErrors).length) {
            // Set errors and prevent submission
            Object.keys(newErrors).forEach((key) => {
                errors[key] = newErrors[key];
            });
            // We need to use a function to force state update since we're directly mutating
            setErrors({ ...errors });
            return;
        }

        // Use internal API handling if enabled, otherwise use the passed onSubmit prop
        if (useInternalApi) {
            contactUsMutation.mutate(formData);
        } else if (onSubmit) {
            onSubmit(formData);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="popup-overlay">
            <div className="popup-form">
                <h2>{title}</h2>
                {description && (
                    <p className="form-description">{description}</p>
                )}

                <form onSubmit={handleFormSubmit}>
                    {showName && (
                        <div className="form-group">
                            <label>Your Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.name && (
                                <span className="error-text">
                                    {errors.name}
                                </span>
                            )}
                        </div>
                    )}

                    {showEmail && (
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.email && (
                                <span className="error-text">
                                    {errors.email}
                                </span>
                            )}
                        </div>
                    )}

                    {showPhone && (
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                            />
                            {errors.phone && (
                                <span className="error-text">
                                    {errors.phone}
                                </span>
                            )}
                        </div>
                    )}

                    {showMessage && (
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                                rows="4"
                            />
                            {errors.message && (
                                <span className="error-text">
                                    {errors.message}
                                </span>
                            )}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={
                            useInternalApi
                                ? contactUsMutation.isPending
                                : isSubmitting
                        }
                    >
                        {useInternalApi ? (
                            contactUsMutation.isPending ? (
                                <>
                                    <span className="spinner" />
                                    Submitting...
                                </>
                            ) : (
                                "Submit"
                            )
                        ) : isSubmitting ? (
                            <>
                                <span className="spinner" />
                                Submitting...
                            </>
                        ) : (
                            "Submit"
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="close-btns full-width"
                    >
                        Close
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
