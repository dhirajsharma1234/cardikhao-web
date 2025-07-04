import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMobileMenuVisible, setMobileMenuVisible] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [isHeaderFixed, setHeaderFixed] = useState(false);
  const [isHeaderSmall, setHeaderSmall] = useState(false);
  const headerLowerRef = useRef(null);
  const injectSpaceRef = useRef(null);

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => {
    setMobileMenuVisible((prev) => {
      const newState = !prev;
      document.body.classList.toggle('mobile-menu-visible', newState);
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
      if (e.key === 'Escape' && isMobileMenuVisible) {
        toggleMobileMenu();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuVisible]);

  // Header fixed and small behavior
  useEffect(() => {
    const headerLower = headerLowerRef.current;
    if (!headerLower) return;

    const offsetTop = headerLower.offsetTop;
    const headerHeight = headerLower.offsetHeight;

    // Create spacer div
    const spacer = document.createElement('div');
    spacer.style.height = `${headerHeight}px`;
    spacer.style.display = 'none';
    headerLower.parentNode.insertBefore(spacer, headerLower.nextSibling);
    injectSpaceRef.current = spacer;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setHeaderFixed(scrollTop > offsetTop + headerHeight);
      setHeaderSmall(scrollTop > 300);
      spacer.style.display = scrollTop > offsetTop + headerHeight ? 'block' : 'none';
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      if (injectSpaceRef.current) {
        injectSpaceRef.current.remove();
      }
    };
  }, []);

  return (
    <>
      <header className={`main-header style2 ${isHeaderFixed ? 'is-fixed' : ''} ${isHeaderSmall ? 'is-small' : ''}`}>
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
                          width={225}
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
                      <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                        <ul className="navigation clearfix">
                          <li className="current">
                            <Link to="/">Home</Link>
                          </li>
                          <li className="tfcl-mega-menu dropdown2">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Buy used car
                            </a>
                            <ul>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Browse by Model
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/used-hyundai-i10-bangalore">
                                      Used Hyundai i10 Cars in Bangalore
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/used-hyundai-i20-bangalore">
                                      Used Hyundai i20 Cars in Bangalore
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/used-renault-kwid-bangalore">
                                      Used Renault Kwid Cars in Bangalore
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/used-maruti-baleno-bangalore">
                                      Used Maruti Baleno Cars in Bangalore
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Browse by Make
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/hyundai">Hyundai</Link>
                                  </li>
                                  <li>
                                    <Link to="/maruti-suzuki">Maruti Suzuki</Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Browse by Price
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/used-cars-under-2-lakhs-bangalore">
                                      Used Cars Under 2 lakhs in Bangalore
                                    </Link>
                                  </li>
                                  <li>
                                    <Link to="/used-cars-under-3-lakhs-bangalore">
                                      Used Cars Under 3 lakhs in Bangalore
                                    </Link>
                                  </li>
                                </ul>
                              </li>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Browse by Body Type
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/hatchback">Hatchback</Link>
                                  </li>
                                  <li>
                                    <Link to="/suv">SUV</Link>
                                  </li>
                                  <li>
                                    <Link to="/sedan">Sedan</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="tfcl-mega-menu dropdown2">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Sell car
                            </a>
                            <ul>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Sell car
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/used-car-valuation">Used car valuation</Link>
                                  </li>
                                  <li>
                                    <Link to="/sell-car-delhi">Sell car in Delhi</Link>
                                  </li>
                                  <li>
                                    <Link to="/sell-car-mumbai">Sell car in Mumbai</Link>
                                  </li>
                                  <li>
                                    <Link to="/sell-car-bangalore">Sell car in Bangalore</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="tfcl-mega-menu dropdown2">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Car finance
                            </a>
                            <ul>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Car finance
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/car-loan">Car loan</Link>
                                  </li>
                                  <li>
                                    <Link to="/emi-calculator">EMI Calculator</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="tfcl-mega-menu dropdown2">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              New cars
                            </a>
                            <ul>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  New cars
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/new-cars-hyundai">Hyundai</Link>
                                  </li>
                                  <li>
                                    <Link to="/new-cars-maruti">Maruti Suzuki</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                          <li className="tfcl-mega-menu dropdown2">
                            <a href="#" onClick={(e) => e.preventDefault()}>
                              Car services
                            </a>
                            <ul>
                              <li className="dropdown2">
                                <a href="#" onClick={(e) => e.preventDefault()}>
                                  Car services
                                </a>
                                <ul>
                                  <li>
                                    <Link to="/car-insurance">Car insurance</Link>
                                  </li>
                                  <li>
                                    <Link to="/car-servicing">Car servicing</Link>
                                  </li>
                                </ul>
                              </li>
                            </ul>
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
                          <img src="assets/images/icons/phone.png" alt="phone icon" />
                        </div>
                        <span>Call Us</span>
                      </a>
                    </div>
                  </div>
                  <div className="mobile-nav-toggler mobile-button" onClick={toggleMobileMenu}>
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
        <div className={`mobile-menu ${isMobileMenuVisible ? 'mobile-menu-visible' : ''}`}>
          <div className="menu-backdrop" onClick={toggleMobileMenu} />
          <nav className="menu-box">
            <div className="nav-logo">
              <Link to="/">
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
              <div className="login-box flex align-center">
                <i className="icon-autodeal-user fs-20" />
                <Link to="/login" className="fw-7 font-2">
                  Login
                </Link>
              </div>
              <div className="menu-outer">
                <ul className="navigation clearfix">
                  <li className="current">
                    <Link to="/" onClick={toggleMobileMenu}>
                      Home
                    </Link>
                  </li>
                  <li className="tfcl-mega-menu dropdown2">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1); }}>
                      Buy used car
                    </a>
                    <ul style={{ display: openDropdowns['1-1'] ? 'block' : 'none' }}>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1, 2); }}>
                          Browse by Model
                        </a>
                        <ul style={{ display: openDropdowns['2-1'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/used-hyundai-i10-bangalore" onClick={toggleMobileMenu}>
                              Used Hyundai i10 Cars in Bangalore
                            </Link>
                          </li>
                          <li>
                            <Link to="/used-hyundai-i20-bangalore" onClick={toggleMobileMenu}>
                              Used Hyundai i20 Cars in Bangalore
                            </Link>
                          </li>
                          <li>
                            <Link to="/used-renault-kwid-bangalore" onClick={toggleMobileMenu}>
                              Used Renault Kwid Cars in Bangalore
                            </Link>
                          </li>
                          <li>
                            <Link to="/used-maruti-baleno-bangalore" onClick={toggleMobileMenu}>
                              Used Maruti Baleno Cars in Bangalore
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(2, 2); }}>
                          Browse by Make
                        </a>
                        <ul style={{ display: openDropdowns['2-2'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/hyundai" onClick={toggleMobileMenu}>
                              Hyundai
                            </Link>
                          </li>
                          <li>
                            <Link to="/maruti-suzuki" onClick={toggleMobileMenu}>
                              Maruti Suzuki
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(3, 2); }}>
                          Browse by Price
                        </a>
                        <ul style={{ display: openDropdowns['2-3'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/used-cars-under-2-lakhs-bangalore" onClick={toggleMobileMenu}>
                              Used Cars Under 2 lakhs in Bangalore
                            </Link>
                          </li>
                          <li>
                            <Link to="/used-cars-under-3-lakhs-bangalore" onClick={toggleMobileMenu}>
                              Used Cars Under 3 lakhs in Bangalore
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(4, 2); }}>
                          Browse by Body Type
                        </a>
                        <ul style={{ display: openDropdowns['2-4'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/hatchback" onClick={toggleMobileMenu}>
                              Hatchback
                            </Link>
                          </li>
                          <li>
                            <Link to="/suv" onClick={toggleMobileMenu}>
                              SUV
                            </Link>
                          </li>
                          <li>
                            <Link to="/sedan" onClick={toggleMobileMenu}>
                              Sedan
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="tfcl-mega-menu dropdown2">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(2); }}>
                      Sell car
                    </a>
                    <ul style={{ display: openDropdowns['1-2'] ? 'block' : 'none' }}>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1, 2); }}>
                          Sell car
                        </a>
                        <ul style={{ display: openDropdowns['2-1'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/used-car-valuation" onClick={toggleMobileMenu}>
                              Used car valuation
                            </Link>
                          </li>
                          <li>
                            <Link to="/sell-car-delhi" onClick={toggleMobileMenu}>
                              Sell car in Delhi
                            </Link>
                          </li>
                          <li>
                            <Link to="/sell-car-mumbai" onClick={toggleMobileMenu}>
                              Sell car in Mumbai
                            </Link>
                          </li>
                          <li>
                            <Link to="/sell-car-bangalore" onClick={toggleMobileMenu}>
                              Sell car in Bangalore
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="tfcl-mega-menu dropdown2">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(3); }}>
                      Car finance
                    </a>
                    <ul style={{ display: openDropdowns['1-3'] ? 'block' : 'none' }}>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1, 2); }}>
                          Car finance
                        </a>
                        <ul style={{ display: openDropdowns['2-1'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/car-loan" onClick={toggleMobileMenu}>
                              Car loan
                            </Link>
                          </li>
                          <li>
                            <Link to="/emi-calculator" onClick={toggleMobileMenu}>
                              EMI Calculator
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="tfcl-mega-menu dropdown2">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(4); }}>
                      New cars
                    </a>
                    <ul style={{ display: openDropdowns['1-4'] ? 'block' : 'none' }}>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1, 2); }}>
                          New cars
                        </a>
                        <ul style={{ display: openDropdowns['2-1'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/new-cars-hyundai" onClick={toggleMobileMenu}>
                              Hyundai
                            </Link>
                          </li>
                          <li>
                            <Link to="/new-cars-maruti" onClick={toggleMobileMenu}>
                              Maruti Suzuki
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="tfcl-mega-menu dropdown2">
                    <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(5); }}>
                      Car services
                    </a>
                    <ul style={{ display: openDropdowns['1-5'] ? 'block' : 'none' }}>
                      <li className="dropdown2">
                        <a href="#" onClick={(e) => { e.preventDefault(); toggleDropdown(1, 2); }}>
                          Car services
                        </a>
                        <ul style={{ display: openDropdowns['2-1'] ? 'block' : 'none' }}>
                          <li>
                            <Link to="/car-insurance" onClick={toggleMobileMenu}>
                              Car insurance
                            </Link>
                          </li>
                          <li>
                            <Link to="/car-servicing" onClick={toggleMobileMenu}>
                              Car servicing
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className="button-mobi-sell">
                <Link className="sc-button btn-icon center" to="/add-listing" onClick={toggleMobileMenu}>
                  <svg
                    width={21}
                    height={20}
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#)">
                      <path
                        d="M5.91699 13.75H1.33366C1.22315 13.75 1.11717 13.7061 1.03903 13.628C0.960891 13.5498 0.916992 13.4438 0.916992 13.3333C0.916992 13.2228 0.960891 13.1168 1.03903 13.0387C1.11717 12.9606 1.22315 12.9167 1.33366 12.9167H4.91116L3.61033 11.6158C3.37548 11.3824 3.0581 11.251 2.72699 11.25H1.33366C1.22315 11.25 1.11717 11.2061 1.03903 11.128C0.960891 11.0498 0.916992 10.9438 0.916992 10.8333C0.916992 10.7228 0.960891 10.6168 1.03903 10.5387C1.11717 10.4606 1.22315 10.4167 1.33366 10.4167H2.72699C3.28366 10.4167 3.80616 10.6333 4.20033 11.0267L6.21199 13.0383C6.27083 13.0964 6.311 13.1708 6.32737 13.2518C6.34374 13.3329 6.33557 13.417 6.30391 13.4934C6.27224 13.5698 6.21851 13.635 6.14959 13.6807C6.08067 13.7264 5.99969 13.7505 5.91699 13.75ZM5.08366 17.9167H2.58366C1.89449 17.9167 1.33366 17.3558 1.33366 16.6667V15C1.33366 14.8895 1.37756 14.7835 1.4557 14.7054C1.53384 14.6272 1.63982 14.5833 1.75033 14.5833C1.86083 14.5833 1.96681 14.6272 2.04495 14.7054C2.12309 14.7835 2.16699 14.8895 2.16699 15V16.6667C2.16699 16.7772 2.21089 16.8831 2.28903 16.9613C2.36717 17.0394 2.47315 17.0833 2.58366 17.0833H5.08366C5.19417 17.0833 5.30015 17.0394 5.37829 16.9613C5.45643 16.8831 5.50033 16.7772 5.50033 16.6667V15.4167C5.50033 15.3061 5.54422 15.2002 5.62236 15.122C5.7005 15.0439 5.80649 15 5.91699 15C6.0275 15 6.13348 15.0439 6.21162 15.122C6.28976 15.2002 6.33366 15.3061 6.33366 15.4167V16.6667C6.33366 17.3558 5.77283 17.9167 5.08366 17.9167Z"
                        fill="white"
                      />
                      <path
                        d="M14.25 16.25H6.75C6.6852 16.2499 6.62129 16.2348 6.56333 16.2058L4.985 15.4167H1.33333C1.24152 15.4168 1.15226 15.3865 1.07945 15.3306C1.00664 15.2747 0.954383 15.1962 0.930833 15.1075C0.653273 13.9813 0.508675 12.8265 0.5 11.1C0.5 9.78916 1.0825 8.6475 2.39083 7.76416C3.53917 7.16333 6.11667 7.08333 10.5 7.08333C14.8833 7.08333 17.4608 7.16333 18.6092 7.76416C19.9175 8.6475 20.5 9.78916 20.5 11.1C20.5 13.4717 20.0867 15.0417 20.0692 15.1075C20.0456 15.1962 19.9934 15.2747 19.9206 15.3306C19.8477 15.3865 19.7585 15.4168 19.6667 15.4167H16.015L14.4358 16.2058C14.3782 16.2349 14.3145 16.25 14.25 16.25ZM6.84833 15.4167H14.1517L15.7308 14.6275C15.7887 14.5983 15.8527 14.5832 15.9175 14.5833H19.3375C19.4525 14.0525 19.6667 12.9058 19.6667 11.1C19.6667 10.0975 19.2483 9.23833 18.2242 8.70249C17.2258 8.18083 14.6275 7.91666 10.5 7.91666C6.3725 7.91666 3.77417 8.18083 2.77583 8.70249C1.75167 9.23833 1.33333 10.0975 1.33333 11.1C1.33333 12.9058 1.5475 14.0525 1.66333 14.5833H5.08333C5.1475 14.5833 5.21167 14.5983 5.27 14.6275L6.84833 15.4167Z"
                        fill="white"
                      />
                      <path
                        d="M19.6664 13.75H15.0831C15.0006 13.7501 14.9199 13.7258 14.8512 13.68C14.7825 13.6342 14.729 13.5691 14.6974 13.4929C14.6658 13.4167 14.6576 13.3328 14.6737 13.2518C14.6899 13.1709 14.7297 13.0966 14.7881 13.0383L16.7997 11.0267C16.9929 10.8327 17.2225 10.6789 17.4754 10.5742C17.7283 10.4695 17.9994 10.416 18.2731 10.4167H19.6664C19.7769 10.4167 19.8829 10.4606 19.961 10.5387C20.0392 10.6168 20.0831 10.7228 20.0831 10.8333C20.0831 10.9438 20.0392 11.0498 19.961 11.128C19.8829 11.2061 19.7769 11.25 19.6664 11.25H18.2731C17.9439 11.25 17.6223 11.3833 17.3889 11.6158L16.0889 12.9167H19.6664C19.7769 12.9167 19.8829 12.9606 19.961 13.0387C20.0392 13.1168 20.0831 13.2228 20.0831 13.3333C20.0831 13.4438 20.0392 13.5498 19.961 13.628C19.8829 13.7061 19.7769 13.75 19.6664 13.75ZM12.9998 13.75H7.99975C7.93868 13.75 7.87836 13.7365 7.82306 13.7106C7.76776 13.6847 7.71884 13.6469 7.67975 13.6L5.59642 11.1C5.54539 11.0393 5.5128 10.9652 5.50248 10.8866C5.49217 10.8079 5.50456 10.728 5.5382 10.6561C5.57184 10.5843 5.62532 10.5236 5.69233 10.4812C5.75935 10.4387 5.8371 10.4164 5.91642 10.4167H15.0831C15.1623 10.4167 15.2398 10.4393 15.3066 10.4818C15.3734 10.5243 15.4267 10.5849 15.4603 10.6566C15.4938 10.7283 15.5063 10.8081 15.4962 10.8866C15.486 10.9651 15.4538 11.0392 15.4031 11.1L13.3197 13.6C13.2807 13.6469 13.2317 13.6847 13.1764 13.7106C13.1211 13.7365 13.0608 13.75 12.9998 13.75ZM8.19475 12.9167H12.8039L14.1931 11.25H6.80558L8.19475 12.9167ZM18.4164 8.75C18.3351 8.75005 18.2556 8.72633 18.1877 8.68176C18.1197 8.63719 18.0663 8.57372 18.0339 8.49816C17.0931 6.3325 15.9423 3.92666 15.6447 3.64916C15.3256 3.37833 13.9681 2.91666 10.9164 2.91666H10.0831C7.03142 2.91666 5.67392 3.37833 5.35308 3.65083C5.05736 3.92666 3.90642 6.33333 2.96558 8.49916C2.92149 8.60061 2.83891 8.68038 2.73599 8.72094C2.63308 8.76149 2.51828 8.7595 2.41683 8.71541C2.31539 8.67132 2.23561 8.58873 2.19506 8.48582C2.1545 8.38291 2.15649 8.26811 2.20058 8.16666C2.67392 7.07666 4.26142 3.48416 4.81308 3.01499C5.50058 2.43166 7.46975 2.08333 10.0831 2.08333H10.9164C13.5297 2.08333 15.4989 2.43166 16.1864 3.01583C16.7381 3.485 18.3248 7.0775 18.7989 8.16749C18.826 8.23094 18.8369 8.30009 18.8308 8.3688C18.8247 8.4375 18.8017 8.50363 18.7638 8.56129C18.726 8.61895 18.6744 8.66635 18.6138 8.69927C18.5532 8.73219 18.4854 8.74962 18.4164 8.75ZM18.4164 17.9167H15.9164C15.2273 17.9167 14.6664 17.3558 14.6664 16.6667V15.4167C14.6664 15.3062 14.7103 15.2002 14.7885 15.122C14.8666 15.0439 14.9726 15 15.0831 15C15.1936 15 15.2996 15.0439 15.3777 15.122C15.4559 15.2002 15.4998 15.3062 15.4998 15.4167V16.6667C15.4998 16.7772 15.5436 16.8832 15.6218 16.9613C15.6999 17.0394 15.8059 17.0833 15.9164 17.0833H18.4164C18.5269 17.0833 18.6329 17.0394 18.711 16.9613C18.7892 16.8832 18.8331 16.7772 18.8331 16.6667V15C18.8331 14.8895 18.877 14.7835 18.9551 14.7054C19.0333 14.6272 19.1392 14.5833 19.2498 14.5833C19.3603 14.5833 19.4662 14.6272 19.5444 14.7054C19.6225 14.7835 19.6664 14.8895 19.6664 15V16.6667C19.6664 17.3558 19.1056 17.9167 18.4164 17.9167Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath>
                        <rect
                          width={20}
                          height={20}
                          fill="white"
                          transform="translate(0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>Add listing</span>
                </Link>
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