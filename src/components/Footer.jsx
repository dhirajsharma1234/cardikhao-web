/** @format */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Optional: Uncomment if using react-router-dom for navigation
// import { useNavigate } from 'react-router-dom';

function Footer() {
    const [isVisible, setIsVisible] = useState(window.innerWidth < 768);
    const [activeNav, setActiveNav] = useState("home");
    // Optional: Uncomment for navigation
    // const navigate = useNavigate();

    useEffect(() => {
        // Initialize visibility based on screen width
        const updateVisibility = () => {
            const isMobile = window.innerWidth < 768;
            setIsVisible(isMobile);
            console.log(
                "updateVisibility: isMobile=",
                isMobile,
                "isVisible=",
                isVisible
            ); // Debugging
        };

        let lastScrollPosition = window.pageYOffset;
        let ticking = false;

        const handleScroll = () => {
            if (window.innerWidth >= 768) {
                setIsVisible(false); // Hide on desktop
                console.log("handleScroll: Desktop view, hiding footer"); // Debugging
                return;
            }

            const currentScrollPos = window.pageYOffset;
            const scrollDirection = currentScrollPos < lastScrollPosition;

            // Show footer when scrolling up or near top
            const shouldBeVisible = scrollDirection || currentScrollPos < 1000; // Increased threshold
            setIsVisible(shouldBeVisible);
            console.log(
                "handleScroll: scrollPos=",
                currentScrollPos,
                "direction=",
                scrollDirection ? "up" : "down",
                "isVisible=",
                shouldBeVisible
            ); // Debugging
            lastScrollPosition = currentScrollPos;
        };

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleResize = () => {
            updateVisibility();
        };

        // Initial visibility check
        updateVisibility();

        window.addEventListener("scroll", onScroll);
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleNavClick = (nav) => {
        if (nav === "orbit") return;
        setActiveNav(nav);
        console.log(`Navigated to: ${nav}`);
        // Optional: Uncomment for actual navigation
        // navigate(`/${nav}`);
    };

    const handleKeyDown = (e, nav) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNavClick(nav);
        }
    };

    console.log("Footer render: isVisible=", isVisible); // Debugging

    return (
        <>
            <footer
                className="site-footer"
                style={{
                    background:
                        "linear-gradient(270deg, rgba(251, 255, 246, 0.2) 0.45%, rgba(255, 255, 255, 0) 194.45%), linear-gradient(1deg, rgba(171, 254, 214, 0.2) 15.19%, rgba(228, 254, 186, 0.2) 76.1%, rgba(255, 255, 255, 0.2) 105.61%)",
                }}
            >
                <div className="footer-container">
                    <div className="footer-branding">
                        <img
                            loading="lazy"
                            src="assets/images/logo/logo-circle.png"
                            alt="Gadidikhao"
                            width={84}
                            height={84}
                            className="footer-logo"
                        />
                        <span className="brand-separator">|</span>
                        <h3 className="brand-tagline">
                            Better drives, better lives
                        </h3>
                    </div>
                    <div className="footer-content">
                        <div className="footer-links-grid">
                            <div className="footer-links-section">
                                <h4 className="footer-section-title">
                                    Company
                                </h4>
                                <ul className="footer-links-list">
                                    <li>
                                        <a href="javascript:void(0);">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Careers
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Press kit
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">Blog</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Article
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">News</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Privacy Policy
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Sustainability
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Testimonials
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-links-section">
                                <h4 className="footer-section-title">
                                    Discover
                                </h4>
                                <ul className="footer-links-list">
                                    <li>
                                        <a href="javascript:void(0);">
                                            Buy used car
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Sell used car
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Used car valuation
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Motor insurance
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Check & pay challan
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Check vehicle details
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Explore new cars
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Scrap your car
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div className="footer-links-section">
                                <h4 className="footer-section-title">
                                    Help & support
                                </h4>
                                <ul className="footer-links-list">
                                    <li>
                                        <a href="javascript:void(0);">FAQs</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Security
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Contact us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Become a partner
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            RC transfer status
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);">
                                            Terms & conditions
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer-social-section">
                            <h4 className="footer-section-title">
                                Social Links
                            </h4>
                            <ul className="social-links">
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        aria-label="Facebook"
                                    >
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/facebook.png"
                                            alt="Facebook"
                                            width={40}
                                            height={40}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        aria-label="Twitter"
                                    >
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/ex.png"
                                            alt="Twitter"
                                            width={40}
                                            height={40}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        aria-label="Instagram"
                                    >
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/instragram.png"
                                            alt="Instagram"
                                            width={40}
                                            height={40}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        aria-label="YouTube"
                                    >
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/youtube.png"
                                            alt="YouTube"
                                            width={40}
                                            height={40}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="javascript:void(0);"
                                        aria-label="LinkedIn"
                                    >
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/linkin.png"
                                            alt="LinkedIn"
                                            width={40}
                                            height={40}
                                        />
                                    </a>
                                </li>
                            </ul>
                            <div className="app-downloads">
                                <a href="javascript:void(0);">
                                    <img
                                        loading="lazy"
                                        src="assets/images/footer/ppstore.png"
                                        alt="App Store"
                                        width={160}
                                        height={47}
                                    />
                                </a>
                                <a href="javascript:void(0);">
                                    <img
                                        loading="lazy"
                                        src="assets/images/footer/playstore.png"
                                        alt="Play Store"
                                        width={160}
                                        height={47}
                                    />
                                </a>
                            </div>
                            <h4 className="footer-section-title">
                                We are global
                            </h4>
                            <ul className="country-links">
                                <li>
                                    <a href="javascript:void(0);">
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/australia.png"
                                            alt="Australia"
                                            width={40}
                                            height={40}
                                        />
                                        <span>Australia</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">
                                        <img
                                            loading="lazy"
                                            src="assets/images/footer/uae.png"
                                            alt="UAE"
                                            width={40}
                                            height={40}
                                        />
                                        <span>UAE</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <p className="copyright">
                        © 2025 Gadi Dikhao, All rights reserved
                    </p>
                </div>
            </footer>
            {/* Mobile View */}
            <div
                className={`mobile-footer-container ${
                    isVisible ? "mobile-visible" : ""
                }`}
            >
                <nav className="mobile-footer-navbar">
                    <button
                        className={`mobile-footer-nav-item ${
                            activeNav === "home" ? "mobile-active" : ""
                        }`}
                        onClick={() => handleNavClick("home")}
                        onKeyDown={(e) => handleKeyDown(e, "home")}
                        aria-label="Home"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_5155_122396)">
                                <path
                                    d="M17.082 3.83301H15.9342C15.4905 3.83301 15.1309 4.28401 15.1309 4.84035V11.7777C15.1309 12.334 15.4905 12.785 15.9342 12.785H17.082C17.5257 12.785 17.8853 12.334 17.8853 11.7777V4.84035C17.8853 4.28401 17.5257 3.83301 17.082 3.83301Z"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M4.11523 10.7483L11.124 5.89868L17.8876 10.8598V16.9806C17.8876 18.0868 16.8641 18.9824 15.6 18.9824H6.40276C5.13873 18.9824 4.11523 18.0868 4.11523 16.9806V10.7483Z"
                                    fill="#EF6E0B"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M20.3342 11.0376L11.7498 4.13219C11.5437 3.93124 11.2721 3.83076 11.0004 3.83305C10.7288 3.83305 10.4572 3.93124 10.2488 4.13219L1.66671 11.0376C1.25693 11.4372 1.25693 12.0857 1.66671 12.4853C2.0765 12.8849 2.74152 12.8849 3.1513 12.4853L11.0004 6.29696L18.8496 12.4853C19.2594 12.8849 19.9244 12.8849 20.3342 12.4853C20.7416 12.0857 20.7439 11.4372 20.3342 11.0376Z"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M8.93359 15.0188C8.93359 14.1653 9.62552 13.4734 10.479 13.4734H11.5198C12.3734 13.4734 13.0653 14.1653 13.0653 15.0188V18.9823H8.93359V15.0188Z"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_5155_122396">
                                    <rect
                                        width={21}
                                        height={21}
                                        fill="white"
                                        transform="translate(0.5 0.907715)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="mobile-footer-nav-label">Home</span>
                    </button>
                    <Link to="/carlisting" aria-label="Buy car">
                        <button
                            className={`mobile-footer-nav-item ${
                                activeNav === "buy" ? "mobile-active" : ""
                            }`}
                            onClick={() => handleNavClick("buy")}
                            onKeyDown={(e) => handleKeyDown(e, "buy")}
                            aria-label="Buy car"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width={22}
                                height={22}
                                viewBox="0 0 22 22"
                                fill="none"
                            >
                                <g clipPath="url(#clip0_5155_122274)">
                                    <path
                                        d="M17.392 10.0364L12.9544 4.74404C12.6322 4.36048 12.158 4.1394 11.6573 4.1394H5.42184C4.48693 4.1394 3.73047 4.89586 3.73047 5.83078V10.0392"
                                        fill="white"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.9095 10.0364H3.0905C2.28436 10.0364 1.63086 10.6899 1.63086 11.496V14.8734C1.63086 15.6796 2.28436 16.3331 3.0905 16.3331H18.9095C19.7156 16.3331 20.3691 15.6796 20.3691 14.8734V11.496C20.3691 10.6899 19.7156 10.0364 18.9095 10.0364Z"
                                        fill="white"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.89675 18.9488C8.64437 18.9488 10.0611 17.5321 10.0611 15.7844C10.0611 14.0368 8.64437 12.6201 6.89675 12.6201C5.14914 12.6201 3.73242 14.0368 3.73242 15.7844C3.73242 17.5321 5.14914 18.9488 6.89675 18.9488Z"
                                        fill="white"
                                        stroke="currentColor"
                                        strokeWidth="1.3"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M15.2835 18.9488C17.0311 18.9488 18.4478 17.5321 18.4478 15.7844C18.4478 14.0368 17.0311 12.6201 15.2835 12.6201C13.5359 12.6201 12.1191 14.0368 12.1191 15.7844C12.1191 17.5321 13.5359 18.9488 15.2835 18.9488Z"
                                        fill="white"
                                        stroke="currentColor"
                                        strokeWidth="1.3" // Fixed typo
                                        strokeLinejoin="round"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_5155_122274">
                                        <rect
                                            width={21}
                                            height={21}
                                            fill="white"
                                            transform="translate(0.5 0.5)"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="mobile-footer-nav-label">
                                Buy car
                            </span>
                        </button>
                    </Link>
                    <button
                        className="mobile-footer-nav-item mobile-footer-nav-center"
                        aria-label="Orbit"
                        onClick={() => handleNavClick("orbit")}
                        onKeyDown={(e) => handleKeyDown(e, "orbit")}
                    >
                        <div className="mobile-footer-center-icon-container">
                            <div className="mobile-footer-center-icon-border" />
                            <div className="mobile-footer-center-icon">
                                <div className="mobile-footer-center-icon-image">
                                    <img
                                        alt="car image"
                                        loading="lazy"
                                        width={36}
                                        height={36}
                                        decoding="async"
                                        src="assets/images/footer/default-car.a96596bd.svg"
                                        style={{ color: "transparent" }}
                                    />
                                </div>
                            </div>
                        </div>
                        <span className="mobile-footer-nav-label">Orbit</span>
                    </button>
                    <a
                        href="javascript:void(0);"
                        className={`mobile-footer-nav-item ${
                            activeNav === "sell" ? "mobile-active" : ""
                        }`}
                        onClick={() => handleNavClick("sell")}
                        onKeyDown={(e) => handleKeyDown(e, "sell")}
                        aria-label="Sell car"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_6163_151072)">
                                <path
                                    d="M6.71538 12.496L4.08432 8.07626C3.65074 7.3479 3.90636 6.40522 4.64851 5.99568L9.35534 3.3983C9.7396 3.18626 10.1974 3.15313 10.6082 3.30766L18.5739 6.30419C19.3111 6.58152 19.7082 7.38185 19.4832 8.13669L17.6222 14.3789C17.3896 15.1591 16.5772 15.6113 15.7916 15.3979L7.61116 13.1763C7.23563 13.0744 6.91443 12.8304 6.71538 12.496Z"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <circle
                                    cx="7.5748"
                                    cy="7.85905"
                                    r="1.00741"
                                    transform="rotate(-23.2048 7.5748 7.85905)"
                                    fill="white"
                                    stroke="currentColor"
                                />
                                <path
                                    d="M16.8149 8.31383L15.4794 12.6156"
                                    stroke="white"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M4.16385 12.9973L3.48711 7.89835C3.37559 7.05807 3.98197 6.29238 4.82545 6.20839L10.1749 5.67571C10.6116 5.63222 11.0455 5.78218 11.3622 6.08605L17.5027 11.9788C18.071 12.5242 18.1207 13.4162 17.6164 14.0213L13.4464 19.0253C12.9253 19.6507 12.0004 19.7463 11.3624 19.2406L4.71912 13.9755C4.41415 13.7338 4.21504 13.383 4.16385 12.9973Z"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <circle
                                    cx="7.04004"
                                    cy="9.4165"
                                    r="1.34277"
                                    fill="white"
                                    stroke="currentColor"
                                />
                                <path
                                    d="M15.0943 13.1331L12.1719 16.5606"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinecap="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_6163_151072">
                                    <rect
                                        width={21}
                                        height={21}
                                        fill="white"
                                        transform="translate(0.5 0.5)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="mobile-footer-nav-label">
                            Sell car
                        </span>
                    </a>
                    <button
                        className={`mobile-footer-nav-item ${
                            activeNav === "loan" ? "mobile-active" : ""
                        }`}
                        onClick={() => handleNavClick("loan")}
                        onKeyDown={(e) => handleKeyDown(e, "loan")}
                        aria-label="Loan"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={22}
                            height={22}
                            viewBox="0 0 22 22"
                            fill="none"
                        >
                            <g clipPath="url(#clip0_5160_122553)">
                                <path
                                    d="M10.9527 12.1533C14.8001 12.1406 17.9237 13.1714 17.9263 14.4556C17.9314 15.7398 14.814 16.7894 10.9666 16.7995C7.3332 16.8123 4.34541 15.8931 4.02426 14.7105C4.00167 14.6406 3.99207 14.5677 3.99296 14.4972C3.98787 13.2157 7.10517 12.1635 10.9527 12.1533Z"
                                    fill="white"
                                />
                                <path
                                    d="M17.9254 14.4558L17.956 17.1072C17.9595 17.5692 17.6957 17.9933 17.2803 18.1939C11.7406 20.8583 6.98394 19.5488 5.17101 18.8516C4.69405 18.6674 4.35982 18.2344 4.31091 17.7265L4.02344 14.7107C4.34459 15.8932 7.33238 16.8124 10.9657 16.7997C14.8132 16.7896 17.9306 15.74 17.9254 14.4558Z"
                                    fill="white"
                                />
                                <path
                                    d="M17.9286 14.4556C17.9337 15.7398 14.8164 16.7893 10.969 16.8021C7.11886 16.8123 3.99523 15.7815 3.99268 14.4973C3.99013 13.213 7.10489 12.1635 10.9524 12.1534C14.7998 12.1406 17.9234 13.1714 17.9286 14.4556Z"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M4.02539 14.7109L4.31541 17.7241C4.36432 18.2319 4.69861 18.6676 5.1729 18.8492C6.98583 19.5464 11.729 21.2191 17.2687 18.5547C17.6841 18.3541 17.9478 17.93 17.9444 17.468L17.9299 14.4534"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                    strokeLinejoin="round"
                                />
                                <circle
                                    cx="10.9602"
                                    cy="8.56714"
                                    r="6.00161"
                                    fill="white"
                                    stroke="currentColor"
                                    strokeWidth="1.3"
                                />
                                <path
                                    d="M13.5615 5.99426C13.5615 6.21762 13.3783 6.41235 13.1434 6.41235H12.0037C12.124 6.60135 12.2214 6.80753 12.2729 7.03662H13.1434C13.3668 7.03662 13.5615 7.22562 13.5615 7.45471C13.5615 7.6838 13.3783 7.87279 13.1434 7.87279H12.2729C12.1011 8.64597 11.4367 9.23588 10.6349 9.32179C10.5776 9.33324 10.5089 9.33324 10.4345 9.33324H9.98201L11.305 10.662L12.187 11.5497C12.3531 11.7158 12.3531 11.9792 12.187 12.1453C12.1068 12.2198 11.9923 12.2656 11.8892 12.2656C11.7861 12.2656 11.6715 12.2198 11.5914 12.1453L8.66474 9.21297C8.5502 9.08697 8.51583 8.90942 8.5731 8.74906C8.64183 8.59443 8.79074 8.49134 8.96828 8.49134H10.4287C10.8525 8.49134 11.2191 8.22788 11.3852 7.86134H8.77356C8.55019 7.86134 8.35547 7.67234 8.35547 7.44325C8.35547 7.21416 8.53874 7.02516 8.77356 7.02516V7.03662H11.3966C11.2305 6.67007 10.864 6.41235 10.4345 6.41235H8.77356C8.55019 6.41235 8.35547 6.21762 8.35547 5.99426C8.35547 5.7709 8.53874 5.57617 8.77356 5.57617H13.1434C13.3668 5.57617 13.5615 5.76517 13.5615 5.99426Z"
                                    fill="currentColor"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_5160_122553">
                                    <rect
                                        width={21}
                                        height={21}
                                        fill="white"
                                        transform="translate(0.5 0.594727)"
                                    />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className="mobile-footer-nav-label">Loan</span>
                    </button>
                </nav>
            </div>
        </>
    );
}

export default Footer;
