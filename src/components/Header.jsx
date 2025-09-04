/** @format */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQueryParams } from "../hooks/useParams";
import ContactForm from "./ContactForm";

function Header() {
  const location = useLocation();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isHeaderFixed, setHeaderFixed] = useState(false);
  const [isHeaderSmall, setHeaderSmall] = useState(false);
  const headerLowerRef = useRef(null);
  const injectSpaceRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState("/");

  const { setParam, getParam } = useQueryParams();

  // Static data for menu items (same pattern as CAR_CATEGORIES in Home.jsx)
  const BODY_TYPES = [
    { name: "SUV", to: "/carlisting", filter: "bodyType=SUV" },
    { name: "Hatchback", to: "/carlisting", filter: "bodyType=HATCHBACK" },
    { name: "Sedan", to: "/carlisting", filter: "bodyType=SEDAN" },
  ];

  const CAR_BRANDS = [
    { name: "Bmw", to: "/carlisting", filter: "brand=bmw" },
    { name: "Mercedes", to: "/carlisting", filter: "brand=mercedes" },
    { name: "Hyndai", to: "/carlisting", filter: "brand=hyundai" },
    { name: "Audi", to: "/carlisting", filter: "brand=audi" },
  ];

  const PRICE_RANGES = [
    { name: "Under 2 lakhs", to: "/carlisting", filter: "maxPrice=2" },
    { name: "Under 3 lakhs", to: "/carlisting", filter: "maxPrice=3" },
    { name: "Under 5 lakhs", to: "/carlisting", filter: "maxPrice=5" },
  ];

  const POPULAR_MODELS = [
    { name: "S class", to: "/carlisting", filter: "modelName=test" },
    { name: "Hyundai i20", to: "/carlisting", filter: "modelName=testing" },
    {
      name: "Renault Kwid",
      to: "/carlisting",
      filter: "modelName=testing",
    },
    { name: "Maruti Baleno", to: "/carlisting", filter: "modelName=test" },
  ];

  // Update active menu based on current location
  useEffect(() => {
    const path = location.pathname;
    setActiveMenu(path);
  }, [location]);

  // Check if a menu item is active
  const isActiveMenu = (path) => {
    return activeMenu === path;
  };

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => {
      const newState = !prev;
      document.body.classList.toggle("mobile-menu-visible", newState);
      if (!newState) {
        // Reset all dropdowns when closing menu
        setOpenDropdowns({});
      }
      return newState;
    });
  };

  // Handle dropdown toggle for mobile menu
  const toggleDropdown = (index, level = 1) => {
    setOpenDropdowns((prev) => {
      const key = `${level}-${index}`;
      const isOpen = !!prev[key];
      // Close other dropdowns at the same level
      const newOpenDropdowns = Object.keys(prev).reduce((acc, curr) => {
        if (curr.startsWith(`${level}-`) && curr !== key) {
          return { ...acc, [curr]: false };
        }
        return acc;
      }, {});
      return { ...newOpenDropdowns, [key]: !isOpen };
    });
  };

  // Handle Escape key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMobileMenuVisible) {
        toggleMobileMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuVisible]);

  // Header fixed and small behavior
  useEffect(() => {
    const headerLower = headerLowerRef.current;
    if (!headerLower) return;

    const offsetTop = headerLower.offsetTop;
    const headerHeight = headerLower.offsetHeight;

    // Create spacer div
    const spacer = document.createElement("div");
    spacer.style.height = `${headerHeight}px`;
    spacer.style.display = "none";
    headerLower.parentNode.insertBefore(spacer, headerLower.nextSibling);
    injectSpaceRef.current = spacer;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setHeaderFixed(scrollTop > offsetTop + headerHeight);
      setHeaderSmall(scrollTop > 300);
      spacer.style.display =
        scrollTop > offsetTop + headerHeight ? "block" : "none";
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("load", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", handleScroll);
      if (injectSpaceRef.current) {
        injectSpaceRef.current.remove();
      }
    };
  }, []);

  // Generate Buy Used Car menu items
  const renderBuyUsedCarMenu = (isMobile = false) => (
    <ul style={isMobile && openDropdowns["1-1"] ? { display: "block" } : {}}>
      <li className="dropdown2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) toggleDropdown(1, 2);
          }}
        >
          Browse by Model
        </a>
        <ul
          style={isMobile && openDropdowns["2-1"] ? { display: "block" } : {}}
        >
          {POPULAR_MODELS.map((model, index) => (
            <li key={index}>
              <Link
                to={`${model.to}?${model.filter}`}
                onClick={isMobile ? toggleMobileMenu : undefined}
              >
                Used {model.name} Cars in Bangalore
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="dropdown2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) toggleDropdown(2, 2);
          }}
        >
          Browse by Make
        </a>
        <ul
          style={isMobile && openDropdowns["2-2"] ? { display: "block" } : {}}
        >
          {CAR_BRANDS.map((brand, index) => (
            <li key={index}>
              <Link
                to={`${brand.to}?${brand.filter}`}
                onClick={isMobile ? toggleMobileMenu : undefined}
              >
                {brand.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="dropdown2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) toggleDropdown(3, 2);
          }}
        >
          Browse by Price
        </a>
        <ul
          style={isMobile && openDropdowns["2-3"] ? { display: "block" } : {}}
        >
          {PRICE_RANGES.map((price, index) => (
            <li key={index}>
              <Link
                to={`${price.to}?${price.filter}`}
                onClick={isMobile ? toggleMobileMenu : undefined}
              >
                Used Cars {price.name} in Bangalore
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className="dropdown2">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            if (isMobile) toggleDropdown(4, 2);
          }}
        >
          Browse by Body Type
        </a>
        <ul
          style={isMobile && openDropdowns["2-4"] ? { display: "block" } : {}}
        >
          {BODY_TYPES.map((type, index) => (
            <li key={index}>
              <Link
                to={`${type.to}?${type.filter}`}
                onClick={isMobile ? toggleMobileMenu : undefined}
              >
                {type.name}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );

  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form submitted:", formData, "Type:", contactFormType);

      alert(
        `Thank you for your ${contactFormType} enquiry! We'll contact you soon.`
      );

      setIsContactFormOpen(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const serviceType = getParam("serviceType");

  React.useEffect(() => {
    if (!!serviceType) {
      if (
        serviceType === "finance" ||
        serviceType === "scrap" ||
        serviceType === "callback"
      ) {
        setContactFormType(serviceType);
        setIsContactFormOpen(true);
      }
    }
  }, [serviceType]);

  return (
    <>
      <ContactForm
        isOpen={isContactFormOpen}
        onClose={() => {
          setIsContactFormOpen(false);
          setParam("serviceType", null);
        }}
        onSubmit={handleFormSubmit}
        isSubmitting={isSubmitting}
        title={
          contactFormType === "finance"
            ? "Car Finance Enquiry"
            : contactFormType === "callback"
            ? "Request a callback"
            : "Scrap Your Car Enquiry"
        }
        description={
          contactFormType === "finance"
            ? "Get the best financing options for your dream car"
            : contactFormType === "callback"
            ? "We’ll call you back at your convenience"
            : "Get the best value for your old car"
        }
        showName={true}
        showEmail={true}
        showPhone={true}
        showMessage={true}
        showPrice={contactFormType === "finance"}
        priceLabel={
          contactFormType === "finance" ? "Loan Amount Needed (₹)" : ""
        }
        minPrice={0}
      />
      <style jsx>{`
        .car-details-container {
          min-height: 100vh;
          background-color: #f8f9fa;
          padding: 20px;
        }

        .loading,
        .error {
          padding: 20px;
          text-align: center;
          font-size: 18px;
        }

        .error {
          color: #dc3545;
        }

        .no-similar-cars {
          text-align: center;
          padding: 40px 20px;
          width: 100%;
          color: #666;
          font-size: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .no-similar-cars i {
          font-size: 48px;
          margin-bottom: 20px;
          color: #999;
        }

        .no-similar-cars p {
          margin: 0;
          font-weight: 500;
        }

        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }

        .popup-form {
          background: white;
          padding: 30px;
          border-radius: 8px;
          width: 90%;
          max-width: 500px;
          z-index: 10000;
          position: relative;
          max-height: 90vh;
          overflow-y: auto;
        }

        .form-popup-container {
          position: relative;
        }

        .car-price {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
          color: #333;
        }

        .form-group {
          margin-bottom: 15px;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }

        .form-group textarea {
          height: 80px;
        }

        .error-text {
          color: #dc3545;
          font-size: 12px;
          margin-top: 5px;
          display: block;
        }

        .submit-btn {
          background-color: #4caf50;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .submit-btn:hover {
          background-color: #45a049;
        }

        .close-btns.full-width {
          background-color: #f44336;
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
          width: 100%;
          margin-top: 10px;
        }

        .close-btns.full-width:hover {
          background-color: #d32f2f;
        }

        .btn-pf {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px 20px;
          border-radius: 4px;
          cursor: pointer;
          min-height: 44px;
        }

        .btn-pf.bg-orange {
          background-color: #ff9800;
        }

        .btn-pf.bg-green {
          background-color: #4caf50;
        }

        .btn-pf:disabled,
        .submit-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          opacity: 0.7;
        }

        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid #fff;
          border-top: 2px solid transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
          margin-right: 8px;
          vertical-align: middle;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Specifications Accordion Styles */
        .specs-header {
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 0;
          border-bottom: 1px solid #eee;
        }

        .specs-header h2 {
          margin: 0;
          font-size: 20px;
          display: flex;
          align-items: center;
        }

        .accordion-icon {
          margin-left: 10px;
          font-size: 24px;
          font-weight: bold;
        }

        .specs-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease-out;
        }

        .specs-content.open {
          max-height: 1000px;
          transition: max-height 0.5s ease-in;
        }

        /* Desktop - always show content */
        @media (min-width: 992px) {
          .specs-content {
            max-height: none !important;
            display: block !important;
            padding: 5px;
          }
          .accordion-icon {
            display: none;
          }
          .specs-header {
            cursor: default;
            border-bottom: none;
            padding-bottom: 0;
          }
        }

        /* Mobile styles */
        @media (max-width: 991px) {
          .specs-header {
            background-color: #f5f5f5;
            padding: 12px 15px;
            border-radius: 4px;
            margin-bottom: 10px;
          }

          .specs-content {
            padding: 0 15px;
          }

          .specs-content.open {
            padding-bottom: 15px;
          }
        }

        @media (max-width: 768px) {
          .popup-form {
            width: 95%;
            padding: 20px;
          }

          .row {
            flex-direction: column;
          }

          .col-lg-6 {
            width: 100%;
          }
        }
      `}</style>
      <header
        className={`main-header style2 ${isHeaderFixed ? "is-fixed" : ""} ${
          isHeaderSmall ? "is-small" : ""
        }`}
      >
        {/* Header Lower */}
        <div className="header-lower" ref={headerLowerRef}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="inner-container flex justify-space align-center">
                  {/* Logo Box */}
                  <div className="logo-box flex">
                    <div className="logo">
                      <Link to="/">
                        <img
                          className="lazyload img-none"
                          data-src="assets/images/logo/logo.png"
                          src="assets/images/logo/logo@2x.png"
                          alt="Gadi Dikhao Logo"
                          width={425}
                          height={40}
                        />
                        <img
                          className="lazyload img-is-fixed"
                          data-src="assets/images/logo/logo@2x.png"
                          src="assets/images/logo/logo@2x.png"
                          alt="Gadi Dikhao Logo"
                          width={225}
                          height={40}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="nav-outer flex align-center">
                    {/* Main Menu */}
                    <nav className="main-menu show navbar-expand-md">
                      <div
                        className="navbar-collapse collapse clearfix"
                        id="navbarSupportedContent"
                      >
                        <ul className="navigation clearfix">
                          <li className={isActiveMenu("/") ? "current" : ""}>
                            <Link to="/">Home</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/carlisting") ? "current" : ""
                            }`}
                          >
                            <Link to="/carlisting">Buy Used Car</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/sell-car") ? "current" : ""
                            }`}
                          >
                            <Link to="/sell-car">Sell car</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/coming-soon") ? "current" : ""
                            }`}
                            onClick={() => {
                              setParam("serviceType", "finance");
                            }}
                          >
                            <Link to="~">Loans</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/coming-soon") ? "current" : ""
                            }`}
                            onClick={() => {
                              setParam("serviceType", "scrap");
                            }}
                          >
                            <Link to="~">Scrap Your Car</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/contactUs") ? "current" : ""
                            }`}
                          >
                            <Link to="/contactUs">Contact Us</Link>
                          </li>
                        </ul>
                      </div>
                    </nav>
                    {/* Main Menu End */}
                  </div>
                  <div className="header-account flex align-center">
                    <div className="flat-bt-top">
                      <a className="sc-button" href="tel:+1234567890">
                        <div className="icon">
                          <img
                            src="assets/images/icons/phone.png"
                            alt="phone icon"
                          />
                        </div>
                        <span>Call Us</span>
                      </a>
                    </div>
                  </div>
                  <div
                    className="mobile-nav-toggler mobile-button"
                    onClick={toggleMobileMenu}
                  >
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End Header Lower */}

        {/* Mobile Menu */}
        <div className="close-btn" onClick={toggleMobileMenu}>
          <span className="icon flaticon-cancel-1" />
        </div>
        <div
          className={`mobile-menu ${
            isMobileMenuVisible ? "mobile-menu-visible" : ""
          }`}
        >
          <div className="menu-backdrop" onClick={toggleMobileMenu} />
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/" onClick={toggleMobileMenu}>
                <img
                  className="lazyload"
                  data-src="assets/images/logo/logo@2x.png"
                  src="assets/images/logo/logo@2x.png"
                  alt="Gadi Dikhao Logo"
                  width={197}
                  height={48}
                />
              </Link>
            </div>
            <div className="bottom-canvas">
              <div className="menu-outer">
                <ul className="navigation clearfix">
                  <li className={isActiveMenu("/") ? "current" : ""}>
                    <Link to="/" onClick={toggleMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className={isActiveMenu("/carlisting") ? "current" : ""}>
                    <Link to="/carlisting" onClick={toggleMobileMenu}>
                      Buy Used Car
                    </Link>
                  </li>
                  <li className={isActiveMenu("/sell-car") ? "current" : ""}>
                    <Link to="/sell-car" onClick={toggleMobileMenu}>
                      Sell Car
                    </Link>
                  </li>
                  <li
                    className={isActiveMenu("/coming-soon") ? "current" : ""}
                    onClick={() => {
                      toggleMobileMenu();
                      setParam("serviceType", "finance");
                    }}
                  >
                    <Link to="~">Loans</Link>
                  </li>
                  <li
                    className={isActiveMenu("/coming-soon") ? "current" : ""}
                    onClick={() => {
                      toggleMobileMenu();
                      setParam("serviceType", "scrap");
                    }}
                  >
                    <Link to="~">Scrap Your Car</Link>
                  </li>
                  <li className={isActiveMenu("/contactUs") ? "current" : ""}>
                    <Link to="/contactUs" onClick={toggleMobileMenu}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="button-mobi-sell">
                {/* Optional: Add listing button if needed */}
              </div>
            </div>
          </nav>
        </div>
        {/* End Mobile Menu */}
      </header>
    </>
  );
}

export default Header;
