/** @format */

import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isHeaderFixed, setHeaderFixed] = useState(false);
  const [isHeaderSmall, setHeaderSmall] = useState(false);
  const headerLowerRef = useRef(null);
  const injectSpaceRef = useRef(null);
  const [activeMenu, setActiveMenu] = useState("/");

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

  return (
    <>
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
                          >
                            <Link to="/coming-soon">Loans</Link>
                          </li>
                          <li
                            className={`tfcl-mega-menu ${
                              isActiveMenu("/coming-soon") ? "current" : ""
                            }`}
                          >
                            <Link to="/coming-soon">Scrap Your Car</Link>
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
                  <li className={isActiveMenu("/coming-soon") ? "current" : ""}>
                    <Link to="/coming-soon" onClick={toggleMobileMenu}>
                      Loans
                    </Link>
                  </li>
                  <li className={isActiveMenu("/coming-soon") ? "current" : ""}>
                    <Link to="/coming-soon" onClick={toggleMobileMenu}>
                      Scrap Your Car
                    </Link>
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
