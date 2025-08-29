/** @format */

// /** @format */

// import React, { useState, useEffect, useRef } from "react";
// import { FaSearch, FaCheckCircle, FaTimes, FaCamera } from "react-icons/fa";
// import axios from "axios";
// import "./SellForm.css";

// function SellForm() {
//     // Form data state
//     const [formData, setFormData] = useState({
//         brand: null,
//         brandId: null,
//         year: null,
//         modelName: null,
//         expectedPrice: null,
//         mileage: null,
//         fuelType: null,
//         transmission: null,
//         color: null,
//         additionalInfo: null,
//         images: [],
//         sellerName: null,
//         sellerPhone: null,
//         sellerEmail: null,
//         bodyType: null,
//         condition: null,
//         location: null,
//         variant: null,
//         ownership: null,
//         odometer: null,
//     });

//     const [brands, setBrands] = useState([]);
//     const [filteredBrands, setFilteredBrands] = useState([]);
//     const [models, setModels] = useState([]);
//     const [filteredModels, setFilteredModels] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [brandSearchTerm, setBrandSearchTerm] = useState("");
//     const [modelSearchTerm, setModelSearchTerm] = useState("");

//     // Current step tracking
//     const [currentStep, setCurrentStep] = useState(1);
//     const totalSteps = 10; // Updated from 9 to 10

//     // Data options
//     const fuelTypes = ["petrol", "diesel", "electric", "hybrid", "cng"];
//     const transmissions = ["Manual", "Automatic"];
//     const bodyTypes = [
//         "SEDAN",
//         "SUV",
//         "HATCHBACK",
//         "COUPE",
//         "CONVERTIBLE",
//         "WAGON",
//         "VAN",
//         "PICKUP",
//     ];
//     const conditions = ["new", "used"];
//     const colors = [
//         "Black",
//         "White",
//         "Silver",
//         "Gray",
//         "Red",
//         "Blue",
//         "Green",
//         "Yellow",
//         "Orange",
//         "Other",
//     ];
//     const ownershipOptions = ["1st", "2nd", "3rd", "4th", "5th or more"];
//     const odometerOptions = [
//         "0-10,000 km",
//         "10,000-30,000 km",
//         "30,000-50,000 km",
//         "50,000-70,000 km",
//         "70,000-100,000 km",
//         "100,000+ km",
//     ];
//     const variants = ["Base", "Mid", "Top", "Sport", "Luxury"];

//     // Generate years from 2025 down to 1984
//     const years = Array.from({ length: 42 }, (_, i) => 2025 - i);

//     // File input reference
//     const fileInputRef = useRef(null);

//     // Fetch brands on component mount
//     useEffect(() => {
//         const fetchBrands = async () => {
//             try {
//                 setLoading(true);
//                 const response = await axios.get(
//                     "https://api.gadidikhao.com/api/brand/all?page=1&limit=50"
//                 );
//                 setBrands(response.data.data);
//                 setFilteredBrands(response.data.data);
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchBrands();
//     }, []);

//     // Filter brands based on search term
//     useEffect(() => {
//         if (brandSearchTerm) {
//             const filtered = brands.filter((brand) =>
//                 brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
//             );
//             setFilteredBrands(filtered);
//         } else {
//             setFilteredBrands(brands);
//         }
//     }, [brandSearchTerm, brands]);

//     // Filter models based on search term
//     useEffect(() => {
//         if (modelSearchTerm) {
//             const filtered = models.filter((model) =>
//                 model.toLowerCase().includes(modelSearchTerm.toLowerCase())
//             );
//             setFilteredModels(filtered);
//         } else {
//             setFilteredModels(models);
//         }
//     }, [modelSearchTerm, models]);

//     // Handle selection changes
//     const handleSelect = (field, value) => {
//         setFormData((prev) => ({
//             ...prev,
//             [field]: value,
//         }));
//     };

//     // Handle image upload
//     const handleImageUpload = (e) => {
//         const files = Array.from(e.target.files);
//         if (files.length + formData.images.length > 10) {
//             setError("Maximum 10 images allowed");
//             return;
//         }

//         const validFiles = files.filter((file) => {
//             const isValid = file.type.startsWith("image/");
//             if (!isValid) {
//                 setError("Please upload only image files");
//             }
//             return isValid;
//         });

//         setFormData((prev) => ({
//             ...prev,
//             images: [...prev.images, ...validFiles],
//         }));

//         // Reset the input value to allow uploading the same file again
//         e.target.value = null;
//     };

//     // Remove image from the list
//     const removeImage = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             images: prev.images.filter((_, i) => i !== index),
//         }));
//     };

//     // Navigation functions
//     const goToStep = (step) => {
//         setCurrentStep(step);
//     };

//     const goToNextStep = () => {
//         if (currentStep === totalSteps) {
//             submitForm();
//             return;
//         }
//         goToStep(currentStep + 1);
//     };

//     const goToPreviousStep = () => {
//         if (currentStep > 1) {
//             goToStep(currentStep - 1);
//         }
//     };

//     // Submit form to API
//     const submitForm = async () => {
//         try {
//             setLoading(true);

//             const formDataToSend = new FormData();
//             formDataToSend.append("brand", formData.brandId);
//             formDataToSend.append("modelName", formData.modelName);
//             formDataToSend.append("year", formData.year);
//             formDataToSend.append("expectedPrice", formData.expectedPrice);
//             formDataToSend.append("mileage", formData.mileage);
//             formDataToSend.append("fuelType", formData.fuelType);
//             formDataToSend.append("transmission", formData.transmission);
//             formDataToSend.append("color", formData.color);
//             formDataToSend.append("additionalInfo", formData.additionalInfo);
//             formDataToSend.append("sellerName", formData.sellerName);
//             formDataToSend.append("sellerPhone", formData.sellerPhone);
//             formDataToSend.append("sellerEmail", formData.sellerEmail);
//             formDataToSend.append("bodyType", formData.bodyType);
//             formDataToSend.append("condition", formData.condition);
//             formDataToSend.append("variant", formData.variant);
//             formDataToSend.append("ownership", formData.ownership);
//             formDataToSend.append("odometer", formData.odometer);

//             // Append each image file
//             formData.images.forEach((image) => {
//                 formDataToSend.append("images", image);
//             });

//             const token = localStorage.getItem("token");
//             const config = {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "multipart/form-data",
//                 },
//             };

//             const response = await axios.post(
//                 "https://api.gadidikhao.com/api/sell/car",
//                 formDataToSend,
//                 config
//             );

//             if (response.data.status) {
//                 goToStep(totalSteps + 1); // Show success step
//             } else {
//                 setError("Failed to submit form. Please try again.");
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || err.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Load models when brand is selected (simulated)
//     useEffect(() => {
//         if (formData.brand) {
//             // In a real app, you would fetch models based on the selected brand
//             const sampleModels = [
//                 "Model A",
//                 "Model B",
//                 "Model C",
//                 "Model D",
//                 "Model E",
//                 "Model F",
//                 "Model G",
//                 "Model H",
//                 "Model I",
//                 "Model J",
//             ];
//             setModels(sampleModels);
//             setFilteredModels(sampleModels);
//         }
//     }, [formData.brand]);

//     return (
//         <div className="seller-form-modal">
//             <div className="modal-body">
//                 <div className="tab-content">
//                     {/* Brand Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 1 ? "active" : ""
//                         }`}
//                     >
//                         <form action="#">
//                             <div className="row">
//                                 <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                     <h3 className="ticont">
//                                         Select Your Brand Name
//                                     </h3>
//                                 </div>
//                             </div>

//                             <div className="row my-3">
//                                 <div className="col-10 col-md-9 col-lg-11 col-sm-9 col-xm-9">
//                                     <div className="search-icon-container">
//                                         <FaSearch className="fafa_search_style" />
//                                     </div>
//                                     <input
//                                         type="search"
//                                         className="form-control search-input"
//                                         placeholder="Search"
//                                         value={brandSearchTerm}
//                                         onChange={(e) =>
//                                             setBrandSearchTerm(e.target.value)
//                                         }
//                                     />
//                                 </div>
//                             </div>

//                             {loading && <p>Loading brands...</p>}
//                             {error && <p className="error">{error}</p>}

//                             <div className="mt-15">
//                                 <div className="yerssdl">
//                                     <div className="row justify-content-center options-grid">
//                                         {filteredBrands.map((brand) => (
//                                             <div
//                                                 className="col-lg-2 col-sm-3 ic-sec"
//                                                 key={brand._id}
//                                             >
//                                                 <div
//                                                     className={`popular-selling-items ${
//                                                         formData.brand ===
//                                                         brand.name
//                                                             ? "selected"
//                                                             : ""
//                                                     }`}
//                                                     onClick={() => {
//                                                         handleSelect(
//                                                             "brand",
//                                                             brand.name
//                                                         );
//                                                         handleSelect(
//                                                             "brandId",
//                                                             brand._id
//                                                         );
//                                                         goToNextStep();
//                                                     }}
//                                                 >
//                                                     <img
//                                                         src={`https://api.gadidikhao.com/uploads/brands/${brand.logo}`}
//                                                         alt={brand.name}
//                                                         onError={(e) => {
//                                                             e.target.onerror =
//                                                                 null;
//                                                             e.target.src =
//                                                                 "https://via.placeholder.com/100?text=No+Image";
//                                                         }}
//                                                     />
//                                                     <h6>{brand.name}</h6>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </div>

//                     {/* Year Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 2 ? "active" : ""
//                         }`}
//                     >
//                         <h3 className="ticont">Select the registration year</h3>
//                         <div className="yerssdl year-grid">
//                             {years.map((year) => (
//                                 <div
//                                     key={year}
//                                     className={`year-option ${
//                                         formData.year === year.toString()
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("year", year.toString());
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {year}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Model Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 3 ? "active" : ""
//                         }`}
//                     >
//                         <form>
//                             <div className="row">
//                                 <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                     <h3 className="ticont">
//                                         Select Your {formData.brand} Model
//                                     </h3>
//                                 </div>
//                             </div>

//                             <div className="row my-3">
//                                 <div className="col-10 col-md-9 col-lg-11 col-sm-9 col-xm-9">
//                                     <div className="search-icon-container">
//                                         <FaSearch className="fafa_search_style" />
//                                     </div>
//                                     <input
//                                         type="search"
//                                         className="form-control search-input"
//                                         placeholder="Search"
//                                         value={modelSearchTerm}
//                                         onChange={(e) =>
//                                             setModelSearchTerm(e.target.value)
//                                         }
//                                     />
//                                 </div>
//                             </div>
//                         </form>

//                         <div className="yerssdl model-grid">
//                             {filteredModels.map((model) => (
//                                 <div
//                                     key={model}
//                                     className={`model-option ${
//                                         formData.modelName === model
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("modelName", model);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {model}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Variant Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 4 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Select Variant</h3>
//                             </div>
//                         </div>
//                         <div className="yerssdl variant-grid">
//                             {variants.map((variant) => (
//                                 <div
//                                     key={variant}
//                                     className={`variant-option ${
//                                         formData.variant === variant
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("variant", variant);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {variant}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Ownership Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 5 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Select Car Ownership</h3>
//                             </div>
//                         </div>
//                         <div className="yerssdl ownership-grid">
//                             {ownershipOptions.map((ownership) => (
//                                 <div
//                                     key={ownership}
//                                     className={`ownership-option ${
//                                         formData.ownership === ownership
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("ownership", ownership);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {ownership} Owner
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Odometer Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 6 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Select KM driven</h3>
//                             </div>
//                         </div>
//                         <div className="yerssdl odometer-grid">
//                             {odometerOptions.map((odometer) => (
//                                 <div
//                                     key={odometer}
//                                     className={`odometer-option ${
//                                         formData.odometer === odometer
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("odometer", odometer);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {odometer}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Fuel Type Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 7 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Select Fuel Type</h3>
//                             </div>
//                         </div>
//                         <div className="yerssdl fuel-grid">
//                             {fuelTypes.map((fuel) => (
//                                 <div
//                                     key={fuel}
//                                     className={`fuel-option ${
//                                         formData.fuelType === fuel
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("fuelType", fuel);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {fuel.charAt(0).toUpperCase() +
//                                         fuel.slice(1)}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Location Tab */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 8 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Select Location</h3>
//                             </div>
//                         </div>
//                         <div className="yerssdl location-grid">
//                             {[
//                                 "Delhi",
//                                 "Mumbai",
//                                 "Bangalore",
//                                 "Hyderabad",
//                                 "Chennai",
//                                 "Kolkata",
//                                 "Pune",
//                                 "Ahmedabad",
//                             ].map((location) => (
//                                 <div
//                                     key={location}
//                                     className={`location-option ${
//                                         formData.location === location
//                                             ? "selected"
//                                             : ""
//                                     }`}
//                                     onClick={() => {
//                                         handleSelect("location", location);
//                                         goToNextStep();
//                                     }}
//                                 >
//                                     {location}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     {/* Vehicle Photos Tab - NEW STEP ADDED */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 9 ? "active" : ""
//                         }`}
//                     >
//                         <div className="row">
//                             <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
//                                 <h3 className="ticont">Add Vehicle Photos</h3>
//                                 <p className="text-muted">
//                                     Upload up to 10 photos of your vehicle
//                                 </p>
//                             </div>
//                         </div>

//                         <div className="image-upload-container">
//                             <input
//                                 type="file"
//                                 ref={fileInputRef}
//                                 multiple
//                                 accept="image/*"
//                                 onChange={handleImageUpload}
//                                 style={{ display: "none" }}
//                             />

//                             <div
//                                 className="upload-area"
//                                 onClick={() => fileInputRef.current.click()}
//                             >
//                                 <FaCamera className="upload-icon" />
//                                 <p>Click to upload photos</p>
//                                 <span>or drag and drop</span>
//                             </div>

//                             <div className="uploaded-images">
//                                 {formData.images.map((image, index) => (
//                                     <div key={index} className="image-preview">
//                                         <img
//                                             src={URL.createObjectURL(image)}
//                                             alt={`Preview ${index}`}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="remove-image-btn"
//                                             onClick={() => removeImage(index)}
//                                         >
//                                             <FaTimes />
//                                         </button>
//                                     </div>
//                                 ))}
//                             </div>

//                             <div className="image-upload-note">
//                                 <p>Tips for better photos:</p>
//                                 <ul>
//                                     <li>Take photos in good lighting</li>
//                                     <li>Include shots from all angles</li>
//                                     <li>Show interior and exterior</li>
//                                     <li>
//                                         Include close-ups of any special
//                                         features or damages
//                                     </li>
//                                 </ul>
//                             </div>

//                             <div className="text-center mt-4">
//                                 <button
//                                     className="btn btn-submit sell-submit"
//                                     onClick={goToNextStep}
//                                     disabled={formData.images.length === 0}
//                                 >
//                                     Continue to Contact Info
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Contact Info Tab - Now step 10 */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === 10 ? "active" : ""
//                         }`}
//                     >
//                         <h3 className="ticont">Contact Information</h3>

//                         <div className="contact-form">
//                             <div className="form-group">
//                                 <label>Full Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter your full name"
//                                     value={formData.sellerName || ""}
//                                     onChange={(e) =>
//                                         handleSelect(
//                                             "sellerName",
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label>Phone Number</label>
//                                 <input
//                                     type="tel"
//                                     placeholder="Enter your 10-digit phone number"
//                                     maxLength={10}
//                                     value={formData.sellerPhone || ""}
//                                     onChange={(e) =>
//                                         handleSelect(
//                                             "sellerPhone",
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>

//                             <div className="form-group">
//                                 <label>Email Address</label>
//                                 <input
//                                     type="email"
//                                     placeholder="Enter your email address"
//                                     value={formData.sellerEmail || ""}
//                                     onChange={(e) =>
//                                         handleSelect(
//                                             "sellerEmail",
//                                             e.target.value
//                                         )
//                                     }
//                                 />
//                             </div>

//                             <div className="form-submit">
//                                 <button
//                                     className="btn btn-submit sell-submit"
//                                     onClick={submitForm}
//                                     disabled={
//                                         loading ||
//                                         !formData.sellerName ||
//                                         !formData.sellerPhone ||
//                                         !formData.sellerEmail
//                                     }
//                                 >
//                                     {loading ? "Submitting..." : "Submit"}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Success Step */}
//                     <div
//                         className={`container tab-pane ${
//                             currentStep === totalSteps + 1 ? "active" : ""
//                         }`}
//                     >
//                         <div className="success-message">
//                             <div className="success-icon">
//                                 <FaCheckCircle />
//                             </div>
//                             <h2>Thank You!</h2>
//                             <p>
//                                 Your details have been submitted successfully.
//                                 Our team will contact you shortly with the best
//                                 offer for your car.
//                             </p>
//                             <button
//                                 className="btn btn-submit"
//                                 onClick={() => window.location.reload()}
//                             >
//                                 Start New Submission
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation */}
//             <div className="modal-footer">
//                 <button
//                     className="btn btn-prev"
//                     disabled={currentStep === 1}
//                     onClick={goToPreviousStep}
//                 >
//                     Previous
//                 </button>
//                 <div className="step-indicator">
//                     Step {currentStep} of {totalSteps}
//                 </div>
//             </div>

//             {error && currentStep <= totalSteps && (
//                 <div className="error-message">{error}</div>
//             )}
//         </div>
//     );
// }

// export default SellForm;

/** @format */

import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaCheckCircle, FaTimes, FaCamera } from "react-icons/fa";
import axios from "axios";
import "./SellForm.css";

function SellForm() {
    // Form data state
    const [formData, setFormData] = useState({
        brand: null,
        brandId: null,
        year: null,
        modelName: null,
        modelId: null,
        expectedPrice: null,
        mileage: null,
        fuelType: null,
        transmission: null,
        color: null,
        additionalInfo: null,
        images: [],
        sellerName: null,
        sellerPhone: null,
        sellerEmail: null,
        bodyType: null,
        condition: null,
        location: null,
        variant: null,
        ownership: null,
        odometer: null,
    });

    const [brands, setBrands] = useState([]);
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [models, setModels] = useState([]);
    const [filteredModels, setFilteredModels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [brandSearchTerm, setBrandSearchTerm] = useState("");
    const [modelSearchTerm, setModelSearchTerm] = useState("");

    // Current step tracking
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 9; // Reduced from 10 to 9 as we're skipping variant

    // Data options
    const fuelTypes = ["petrol", "diesel", "electric", "hybrid", "cng"];
    const transmissions = ["Manual", "Automatic"];
    const bodyTypes = [
        "SEDAN",
        "SUV",
        "HATCHBACK",
        "COUPE",
        "CONVERTIBLE",
        "WAGON",
        "VAN",
        "PICKUP",
    ];
    const conditions = ["new", "used"];
    const colors = [
        "Black",
        "White",
        "Silver",
        "Gray",
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Orange",
        "Other",
    ];
    const ownershipOptions = ["1st", "2nd", "3rd", "4th", "5th or more"];
    const odometerOptions = [
        "0-10,000 km",
        "10,000-30,000 km",
        "30,000-50,000 km",
        "50,000-70,000 km",
        "70,000-100,000 km",
        "100,000+ km",
    ];
    const variants = ["Base", "Mid", "Top", "Sport", "Luxury"];

    // Generate years from 2025 down to 1984
    const years = Array.from({ length: 42 }, (_, i) => 2025 - i);

    // File input reference
    const fileInputRef = useRef(null);

    // Fetch brands on component mount
    useEffect(() => {
        const fetchBrands = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    "https://api.gadidikhao.com/api/brand/all?page=1&limit=50"
                );
                setBrands(response.data.data);
                setFilteredBrands(response.data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBrands();
    }, []);

    // Filter brands based on search term
    useEffect(() => {
        if (brandSearchTerm) {
            const filtered = brands.filter((brand) =>
                brand.name.toLowerCase().includes(brandSearchTerm.toLowerCase())
            );
            setFilteredBrands(filtered);
        } else {
            setFilteredBrands(brands);
        }
    }, [brandSearchTerm, brands]);

    // Filter models based on search term
    useEffect(() => {
        if (modelSearchTerm) {
            const filtered = models.filter((model) =>
                model.name.toLowerCase().includes(modelSearchTerm.toLowerCase())
            );
            setFilteredModels(filtered);
        } else {
            setFilteredModels(models);
        }
    }, [modelSearchTerm, models]);

    // Handle selection changes
    const handleSelect = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    // Handle image upload
    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.images.length > 10) {
            setError("Maximum 10 images allowed");
            return;
        }

        const validFiles = files.filter((file) => {
            const isValid = file.type.startsWith("image/");
            if (!isValid) {
                setError("Please upload only image files");
            }
            return isValid;
        });

        setFormData((prev) => ({
            ...prev,
            images: [...prev.images, ...validFiles],
        }));

        // Reset the input value to allow uploading the same file again
        e.target.value = null;
    };

    // Remove image from the list
    const removeImage = (index) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index),
        }));
    };

    // Navigation functions
    const goToStep = (step) => {
        setCurrentStep(step);
    };

    const goToNextStep = () => {
        if (currentStep === totalSteps) {
            submitForm();
            return;
        }
        goToStep(currentStep + 1);
    };

    const goToPreviousStep = () => {
        if (currentStep > 1) {
            goToStep(currentStep - 1);
        }
    };

    // Fetch models when brand is selected
    const fetchModels = async (brandId) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `https://api.gadidikhao.com/api/brand/model/${brandId}`
            );
            setModels(response.data.data);
            setFilteredModels(response.data.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Submit form to API
    const submitForm = async () => {
        try {
            setLoading(true);

            const formDataToSend = new FormData();
            formDataToSend.append("brand", formData.brandId);
            formDataToSend.append("modelId", formData.modelId);
            formDataToSend.append("year", formData.year);
            formDataToSend.append("expectedPrice", formData.expectedPrice);
            formDataToSend.append("mileage", formData.mileage);
            formDataToSend.append("fuelType", formData.fuelType);
            formDataToSend.append("transmission", formData.transmission);
            formDataToSend.append("color", formData.color);
            formDataToSend.append("additionalInfo", formData.additionalInfo);
            formDataToSend.append("sellerName", formData.sellerName);
            formDataToSend.append("sellerPhone", formData.sellerPhone);
            formDataToSend.append("sellerEmail", formData.sellerEmail);
            formDataToSend.append("bodyType", formData.bodyType);
            formDataToSend.append("condition", formData.condition);
            formDataToSend.append("variant", formData.variant);
            formDataToSend.append("ownership", formData.ownership);
            formDataToSend.append("odometer", formData.odometer);

            // Append each image file
            formData.images.forEach((image) => {
                formDataToSend.append("images", image);
            });

            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            };

            const response = await axios.post(
                "http://localhost:8000/api/sell/car",
                formDataToSend,
                config
            );

            if (response.data.status) {
                goToStep(totalSteps + 1); // Show success step
            } else {
                setError("Failed to submit form. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="seller-form-modal">
            <div className="modal-body">
                <div className="tab-content">
                    {/* Brand Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 1 ? "active" : ""
                        }`}
                    >
                        <form action="#">
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                    <h3 className="ticont">
                                        Select Your Brand Name
                                    </h3>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-10 col-md-9 col-lg-11 col-sm-9 col-xm-9">
                                    <div className="search-icon-container">
                                        <FaSearch className="fafa_search_style" />
                                    </div>
                                    <input
                                        type="search"
                                        className="form-control search-input"
                                        placeholder="Search"
                                        value={brandSearchTerm}
                                        onChange={(e) =>
                                            setBrandSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            {loading && <p>Loading brands...</p>}
                            {error && <p className="error">{error}</p>}

                            <div className="mt-15">
                                <div className="yerssdl">
                                    <div className="row justify-content-center options-grid">
                                        {filteredBrands.map((brand) => (
                                            <div
                                                className="col-lg-2 col-sm-3 ic-sec"
                                                key={brand._id}
                                            >
                                                <div
                                                    className={`popular-selling-items ${
                                                        formData.brandId ===
                                                        brand._id
                                                            ? "selected"
                                                            : ""
                                                    }`}
                                                    onClick={() => {
                                                        handleSelect(
                                                            "brand",
                                                            brand.name
                                                        );
                                                        handleSelect(
                                                            "brandId",
                                                            brand._id
                                                        );
                                                        fetchModels(brand._id);
                                                        goToNextStep();
                                                    }}
                                                >
                                                    <img
                                                        src={`https://api.gadidikhao.com/uploads/brands/${brand.logo}`}
                                                        alt={brand.name}
                                                        onError={(e) => {
                                                            e.target.onerror =
                                                                null;
                                                            e.target.src =
                                                                "https://via.placeholder.com/100?text=No+Image";
                                                        }}
                                                    />
                                                    <h6>{brand.name}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Year Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 2 ? "active" : ""
                        }`}
                    >
                        <h3 className="ticont">Select the registration year</h3>
                        <div className="yerssdl year-grid">
                            {years.map((year) => (
                                <div
                                    key={year}
                                    className={`year-option ${
                                        formData.year === year.toString()
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("year", year.toString());
                                        goToNextStep();
                                    }}
                                >
                                    {year}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Model Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 3 ? "active" : ""
                        }`}
                    >
                        <form>
                            <div className="row">
                                <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                    <h3 className="ticont">
                                        Select Your {formData.brand} Model
                                    </h3>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-10 col-md-9 col-lg-11 col-sm-9 col-xm-9">
                                    <div className="search-icon-container">
                                        <FaSearch className="fafa_search_style" />
                                    </div>
                                    <input
                                        type="search"
                                        className="form-control search-input"
                                        placeholder="Search"
                                        value={modelSearchTerm}
                                        onChange={(e) =>
                                            setModelSearchTerm(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>

                        <div className="yerssdl model-grid">
                            {filteredModels.length > 0 ? (
                                filteredModels.map((model) => (
                                    <div
                                        key={model._id}
                                        className={`model-option ${
                                            formData.modelId === model._id
                                                ? "selected"
                                                : ""
                                        }`}
                                        onClick={() => {
                                            handleSelect(
                                                "modelName",
                                                model.name
                                            );
                                            handleSelect("modelId", model._id);
                                            goToNextStep();
                                        }}
                                    >
                                        {model.name}
                                    </div>
                                ))
                            ) : (
                                <div
                                    className="d-flex justify-content-center align-items-center w-100"
                                    style={{ minHeight: "200px" }}
                                >
                                    <span className="text-muted fs-5 fw-medium">
                                        Model not found
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Ownership Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 4 ? "active" : ""
                        }`}
                    >
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                <h3 className="ticont">Select Car Ownership</h3>
                            </div>
                        </div>
                        <div className="yerssdl ownership-grid">
                            {ownershipOptions.map((ownership) => (
                                <div
                                    key={ownership}
                                    className={`ownership-option ${
                                        formData.ownership === ownership
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("condition", ownership);
                                        goToNextStep();
                                    }}
                                >
                                    {ownership} Owner
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Odometer Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 5 ? "active" : ""
                        }`}
                    >
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                <h3 className="ticont">Select KM driven</h3>
                            </div>
                        </div>
                        <div className="yerssdl odometer-grid">
                            {odometerOptions.map((odometer) => (
                                <div
                                    key={odometer}
                                    className={`odometer-option ${
                                        formData.odometer === odometer
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("odometer", odometer);
                                        goToNextStep();
                                    }}
                                >
                                    {odometer}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Fuel Type Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 6 ? "active" : ""
                        }`}
                    >
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                <h3 className="ticont">Select Fuel Type</h3>
                            </div>
                        </div>
                        <div className="yerssdl fuel-grid">
                            {fuelTypes.map((fuel) => (
                                <div
                                    key={fuel}
                                    className={`fuel-option ${
                                        formData.fuelType === fuel
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("fuelType", fuel);
                                        goToNextStep();
                                    }}
                                >
                                    {fuel.charAt(0).toUpperCase() +
                                        fuel.slice(1)}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Location Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 7 ? "active" : ""
                        }`}
                    >
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                <h3 className="ticont">Select Location</h3>
                            </div>
                        </div>
                        <div className="yerssdl location-grid">
                            {[
                                "Delhi",
                                "Mumbai",
                                "Bangalore",
                                "Hyderabad",
                                "Chennai",
                                "Kolkata",
                                "Pune",
                                "Ahmedabad",
                            ].map((location) => (
                                <div
                                    key={location}
                                    className={`location-option ${
                                        formData.location === location
                                            ? "selected"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelect("location", location);
                                        goToNextStep();
                                    }}
                                >
                                    {location}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Vehicle Photos Tab */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 8 ? "active" : ""
                        }`}
                    >
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12 col-sm-12 col-xm-12">
                                <h3 className="ticont">Add Vehicle Photos</h3>
                                <p className="text-muted">
                                    Upload up to 10 photos of your vehicle
                                </p>
                            </div>
                        </div>

                        <div className="image-upload-container">
                            <input
                                type="file"
                                ref={fileInputRef}
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                style={{ display: "none" }}
                            />

                            <div
                                className="upload-area"
                                onClick={() => fileInputRef.current.click()}
                            >
                                <FaCamera className="upload-icon" />
                                <p>Click to upload photos</p>
                                <span>or drag and drop</span>
                            </div>

                            <div className="uploaded-images">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="image-preview">
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt={`Preview ${index}`}
                                        />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => removeImage(index)}
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="image-upload-note">
                                <p>Tips for better photos:</p>
                                <ul>
                                    <li>Take photos in good lighting</li>
                                    <li>Include shots from all angles</li>
                                    <li>Show interior and exterior</li>
                                    <li>
                                        Include close-ups of any special
                                        features or damages
                                    </li>
                                </ul>
                            </div>

                            <div className="text-center mt-4">
                                <button
                                    className="btn btn-submit sell-submit"
                                    onClick={goToNextStep}
                                    disabled={formData.images.length === 0}
                                >
                                    Continue to Contact Info
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Contact Info Tab - Now step 9 */}
                    <div
                        className={`container tab-pane ${
                            currentStep === 9 ? "active" : ""
                        }`}
                    >
                        <h3 className="ticont">Contact Information</h3>

                        <div className="contact-form">
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={formData.sellerName || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerName",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    placeholder="Enter your 10-digit phone number"
                                    maxLength={10}
                                    value={formData.sellerPhone || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerPhone",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    value={formData.sellerEmail || ""}
                                    onChange={(e) =>
                                        handleSelect(
                                            "sellerEmail",
                                            e.target.value
                                        )
                                    }
                                />
                            </div>

                            <div className="form-submit">
                                <button
                                    className="btn btn-submit sell-submit"
                                    onClick={submitForm}
                                    disabled={
                                        loading ||
                                        !formData.sellerName ||
                                        !formData.sellerPhone ||
                                        !formData.sellerEmail
                                    }
                                >
                                    {loading ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Success Step */}
                    <div
                        className={`container tab-pane ${
                            currentStep === totalSteps + 1 ? "active" : ""
                        }`}
                    >
                        <div className="success-message">
                            <div className="success-icon">
                                <FaCheckCircle />
                            </div>
                            <h2>Thank You!</h2>
                            <p>
                                Your details have been submitted successfully.
                                Our team will contact you shortly with the best
                                offer for your car.
                            </p>
                            <button
                                className="btn btn-submit"
                                onClick={() => window.location.reload()}
                            >
                                Start New Submission
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <div className="modal-footer">
                <button
                    className="btn btn-prev"
                    disabled={currentStep === 1}
                    onClick={goToPreviousStep}
                >
                    Previous
                </button>
                <div className="step-indicator">
                    Step {currentStep} of {totalSteps}
                </div>
            </div>

            {error && currentStep <= totalSteps && (
                <div className="error-message">{error}</div>
            )}
        </div>
    );
}

export default SellForm;
