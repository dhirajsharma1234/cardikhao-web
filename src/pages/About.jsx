import React from 'react'

function About() {
  return (
    <>
  <section className="tf-banner style-1">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="content relative z-2">
            <div className="heading">
              <h1 className="text-color-1">
                Buying and selling cars <br /> has never been easier!
              </h1>
              <p className="text-color-1 fs-18 fw-4 lh-22 font">
                Leading online car buying and selling platform. helps users buy{" "}
                <br />
                cars that are right for them
              </p>
              <a href="#" className="sc-button btn-svg">
                <span>Search for your favorite car</span>
                <i className="icon-autodeal-next" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* widegt why-choose-us */}
  <section className="tf-section section-why-choose-us">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="image-wcs relative">
            <ul className="icon-list">
              <li className="tf-icon-list ani5">
                <i className="icon-autodeal-check" />
                <span className="fs-18 fw-6 lh-25 text-color-2">
                  Proven Expertise
                </span>
              </li>
              <li className="tf-icon-list ani4">
                <i className="icon-autodeal-check" />
                <span className="fs-18 fw-6 lh-25 text-color-2">
                  1 million visits per day
                </span>
              </li>
              <li className="tf-icon-list ani5">
                <i className="icon-autodeal-check" />
                <span className="fs-18 fw-6 lh-25 text-color-2">
                  7,800 car sellers
                </span>
              </li>
            </ul>
            <div className="image-inner1 hover-img-wrap img-style-hover">
              <img
                className=" ls-is-cached lazyloaded"
                data-src="assets/images/section/wcu-1.jpg"
                src="assets/images/section/wcu-1.jpg"
                alt="images"
              />
            </div>
            <div className="image-inner2">
              <img
                className=" ls-is-cached lazyloaded"
                data-src="assets/images/section/wcu-2.png"
                src="assets/images/section/wcu-2.png"
                alt="images"
              />
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="content-wcs">
            <div className="heading-section">
              <h2>Why Choose Auto Decar</h2>
              <p className="mt-18">
                Our experienced team excels in car sales with many years of
                successfully navigating the market, delivering informed
                decisions and optimal results.
              </p>
            </div>
            <div className="tf-icon-box-list">
              <div className="tf-icon-box style-2">
                <div className="icon">
                  <svg
                    width={50}
                    height={50}
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2181_18199)">
                      <path
                        d="M50 28.2812C50 27.5 49.5312 26.875 48.9062 26.5625C47.8125 26.0938 46.7969 25.4688 45.8594 24.7656C42.7344 22.3438 38.9844 20.7031 35.1562 19.9219C35.625 18.9844 35.8594 17.8906 35.8594 16.7969C35.8594 12.7344 32.5 9.375 28.4375 9.375C24.375 9.375 21.0156 12.7344 21.0156 16.7969C21.0156 18.125 21.3281 19.2969 21.9531 20.3906C20.2344 21.0156 18.9844 21.875 17.6562 22.6562C16.4062 23.4375 15.0781 24.2969 13.4375 24.9219C6.17188 25.3125 2.1875 26.7969 0.46875 29.6094C0.15625 30 0 30.625 0 31.1719V33.5156C0 34.8438 0.9375 35.9375 2.26562 36.1719L5.54688 36.6406C5.85938 38.9063 7.8125 40.7031 10.1562 40.7031C12.5 40.7031 14.375 38.9844 14.7656 36.7969L36.6406 36.7188C37.0312 38.9062 38.9062 40.625 41.25 40.625C43.5938 40.625 45.4688 38.9062 45.8594 36.7188H47.3438C48.5938 36.7188 50 35.7031 50 33.5156V28.2812ZM40.8594 23.4375C39.9219 24.0625 38.125 26.6406 34.375 26.6406H29.1406V24.1406C31.25 23.9062 33.125 22.8125 34.375 21.1719C34.6875 21.4844 37.0312 21.5625 40.8594 23.4375ZM28.3594 10.8594C31.6406 10.8594 34.2188 13.5156 34.2188 16.7187C34.2188 20 31.5625 22.5781 28.3594 22.5781C25.0781 22.5781 22.5 19.9219 22.5 16.7187C22.5 13.5156 25.1562 10.8594 28.3594 10.8594ZM18.4375 23.9062C22.0312 21.6406 22.3438 21.9531 22.7344 21.5625C23.9062 22.9688 25.625 23.9062 27.5781 24.1406V26.6406H18.0469C16.9531 26.6406 15.8594 26.4062 14.8438 25.9375C16.25 25.3125 17.3438 24.6094 18.4375 23.9062ZM10.2344 39.1406C8.51562 39.1406 7.10938 37.7344 7.10938 36.0156C7.10938 34.2969 8.51562 32.8906 10.2344 32.8906C11.9531 32.8906 13.3594 34.2969 13.3594 36.0156C13.3594 37.7344 11.9531 39.1406 10.2344 39.1406ZM41.25 39.0625C39.5312 39.0625 38.125 37.6562 38.125 35.9375C38.125 34.2188 39.5312 32.8125 41.25 32.8125C42.9688 32.8125 44.375 34.2188 44.375 35.9375C44.375 37.6562 42.9688 39.0625 41.25 39.0625ZM47.3438 35.1562H45.8594C45.4688 32.9688 43.5938 31.3281 41.25 31.3281C38.9062 31.3281 37.0312 33.0469 36.6406 35.2344L14.7656 35.3125C14.375 33.125 12.5 31.4844 10.1562 31.4844C7.89062 31.4844 6.01562 33.125 5.625 35.2344L2.5 34.7656C1.95312 34.6094 1.5625 34.0625 1.5625 33.5156V31.1719C1.5625 30.8594 1.64062 30.5469 1.79688 30.2344C2.65625 28.8281 4.6875 26.9531 12.7344 26.3281C14.2969 27.4219 16.0938 28.0469 17.9688 28.0469H34.375C38.9062 28.0469 41.0156 24.9219 42.1875 24.1406C42.1875 24.1406 42.1875 24.0625 42.2656 24.0625C43.2031 24.6094 44.0625 25.1562 44.8438 25.7812C45.8594 26.5625 47.0312 27.2656 48.2031 27.8125C48.3594 27.8906 48.4375 28.0469 48.4375 28.125V33.2812C48.4375 34.5312 48.0469 35.1562 47.3438 35.1562Z"
                        fill="CurrentColor"
                      />
                      <path
                        d="M26.3281 29.8438H23.3594C22.9688 29.8438 22.5781 30.1563 22.5781 30.625C22.5781 31.0938 22.8906 31.4062 23.3594 31.4062H26.3281C26.7188 31.4062 27.1094 31.0938 27.1094 30.625C27.1094 30.1563 26.7188 29.8438 26.3281 29.8438ZM26.7188 20.2344C27.0313 20.5469 27.5 20.5469 27.8125 20.2344L31.875 16.1719C32.1875 15.8594 32.1875 15.3906 31.875 15.0781C31.5625 14.7656 31.0938 14.7656 30.7813 15.0781L27.2656 18.5938L25.9375 17.2656C25.625 16.9531 25.1562 16.9531 24.8437 17.2656C24.5312 17.5781 24.5312 18.0469 24.8437 18.3594L26.7188 20.2344Z"
                        fill="CurrentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2181_18199">
                        <rect width={50} height={50} fill="CurrentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="content">
                  <h5>
                    <a href="#">Proven Expertise</a>
                  </h5>
                  <p>
                    Our experienced team excels in car sales with many years of
                    successfully navigating the market, delivering informed
                    decisions and optimal results.
                  </p>
                </div>
              </div>
              <div className="tf-icon-box style-2">
                <div className="icon">
                  <svg
                    width={50}
                    height={50}
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_2180_18173)">
                      <path
                        d="M8.51562 9.45312L9.14062 9.53125C8.82812 9.92188 8.67188 10.4688 8.75 11.0156L9.21875 18.5938C9.29688 19.2969 9.6875 19.9219 10.2344 20.2344V21.4844C10.2344 22.5781 11.0938 23.4375 12.1875 23.4375H15.4688C16.5625 23.4375 17.4219 22.5781 17.4219 21.4844V20.5469H30.5469V21.4844C30.5469 22.5781 31.4062 23.4375 32.5 23.4375H35.7812C36.875 23.4375 37.7344 22.5781 37.7344 21.4844V20.0781C38.2031 19.6875 38.5156 19.2188 38.5156 18.5938L38.9844 11.0156C39.0625 10.4688 38.8281 10 38.5938 9.53125L39.2969 9.45312C40.5469 9.29688 41.5625 8.20312 41.4844 6.79688C41.3281 5.625 40.3125 4.76562 39.1406 4.6875H37.1875C36.5625 4.6875 35.9375 4.92188 35.4688 5.39062C34.9219 4.14062 34.2188 2.96875 33.5938 1.95312C32.8906 0.78125 31.5625 0 30.2344 0H17.6562C16.25 0 15 0.703125 14.2188 1.95312C13.4375 3.20312 12.8906 4.21875 12.3438 5.39062C11.9531 4.92188 11.3281 4.6875 10.7031 4.6875L8.75 4.76562C7.42188 4.76562 6.40625 5.85938 6.40625 7.10938C6.40625 8.28125 7.34375 9.375 8.51562 9.45312ZM12.2656 8.75H35.5469C35.7812 9.0625 36.0156 9.29688 36.25 9.53125C33.2812 10.0781 31.4062 11.5625 30.3125 12.9688C29.7656 13.6719 28.9844 13.9844 28.2031 13.9844H19.5312C18.75 13.9844 17.9688 13.5938 17.4219 12.9688C16.3281 11.6406 14.4531 10.0781 11.4844 9.53125C11.7969 9.29688 12.0312 8.98438 12.2656 8.75ZM36.4844 19.0625H11.3281C11.0156 19.0625 10.7031 18.8281 10.7031 18.5156L10.4688 14.6094C10.7031 14.6094 13.8281 16.4844 16.0938 13.75C16.9531 14.7656 17.9687 15.5469 19.5312 15.5469H28.2812C29.7656 15.5469 30.7812 14.8438 31.7187 13.75C32.8125 15.0781 34.6875 15.625 36.3281 15L37.2656 14.6094L37.0312 18.5156C37.1094 18.8281 36.7969 19.0625 36.4844 19.0625ZM15 12.6563C13.4375 14.7656 10.9375 13.0469 10.3906 12.9688L10.3125 10.9375C12.4219 11.0156 13.9063 11.7969 15 12.6563ZM37.5 10.9375L37.4219 12.9688C36.875 13.0469 34.375 14.7656 32.8125 12.6563C33.9062 11.7969 35.3906 11.0156 37.5 10.9375ZM15.9375 21.5625C15.9375 21.7969 15.7031 22.0312 15.4688 22.0312H12.1875C11.9531 22.0312 11.7188 21.7969 11.7188 21.5625V20.625H15.8594V21.5625H15.9375ZM35.8594 21.9531H32.5781C32.3438 21.9531 32.1094 21.7188 32.1094 21.4844V20.5469H36.25V21.4844C36.25 21.7969 36.0938 21.9531 35.8594 21.9531ZM37.1875 6.25H39.1406C39.6094 6.25 40 6.5625 40 6.95312C40 7.03125 40.0781 7.8125 39.2188 7.89063L37.1875 8.125C36.25 7.1875 36.4844 7.03125 36.4844 6.95312C36.3281 6.5625 36.7187 6.25 37.1875 6.25ZM15.5469 2.73438C15.9375 2.03125 16.7969 1.5625 17.6562 1.5625H30.2344C31.0938 1.5625 31.875 2.03125 32.3438 2.73438C34.0625 5.625 33.9844 5.70312 34.6875 7.26562H13.2031C13.9062 5.625 13.75 5.625 15.5469 2.73438ZM8.75 6.25H10.7031C11.6406 6.17188 11.4062 7.1875 11.4844 7.26562C11.25 7.65625 11.0156 7.96875 10.7031 8.20312L8.67188 7.96875C8.20313 7.89062 7.8125 7.57813 7.8125 7.10938C7.96875 7.03125 7.96875 6.32812 8.75 6.25Z"
                        fill="CurrentColor"
                      />
                      <path
                        d="M48.9062 22.0311C47.4219 19.9218 44.375 19.9999 42.9688 21.8749L32.5 32.9686C31.7969 31.4843 30.3125 30.4686 28.6719 30.4686H19.375C18.5156 30.4686 17.7344 30.3124 16.9531 29.9218C13.0469 28.0468 8.35938 28.5936 5 31.4061L0.703125 34.9999C0.390625 35.2343 0.3125 35.7811 0.625 36.0936C0.859375 36.4061 1.40625 36.4843 1.71875 36.1718L6.01562 32.578C8.90625 30.1561 12.9688 29.6874 16.3281 31.328C17.2656 31.7968 18.3594 32.0311 19.4531 32.0311H28.75C30.1562 32.0311 31.4844 33.1249 31.4844 34.7655C31.4844 36.2499 30.3906 37.4218 28.9062 37.4218H18.8281C18.4375 37.4218 18.0469 37.7343 18.0469 38.203C18.0469 38.6718 18.3594 38.9843 18.8281 38.9843H28.75C30.9375 38.9843 32.8125 37.2655 32.8125 34.8436L44.1406 22.8905C45 21.7186 46.7969 21.7186 47.6562 22.9686C48.2031 23.7499 48.2031 24.8436 47.5781 25.6249L38.6719 37.3436C32.6562 45.3124 22.3438 47.6561 13.5156 44.9218C11.0937 44.1405 7.26562 44.6874 5 46.0155L0.78125 48.5936C0.390625 48.828 0.3125 49.2968 0.546875 49.6093C0.703125 49.9999 1.17188 50.078 1.5625 49.8436L5.9375 47.2655C7.8125 46.0936 11.1719 45.703 13.2031 46.328C22.5781 49.2186 33.5156 46.7186 40 38.203L48.9062 26.4843C49.8438 25.1562 49.8438 23.3593 48.9062 22.0311Z"
                        fill="CurrentColor"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2180_18173">
                        <rect width={50} height={50} fill="CurrentColor" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
                <div className="content">
                  <h5>
                    <a href="#">Customized Solutions</a>
                  </h5>
                  <p>
                    We pride ourselves on creating personalized strategies to
                    suit your unique goals, ensuring a seamless car selling
                    journey.
                  </p>
                </div>
              </div>
              <div className="tf-icon-box style-2">
                <div className="icon">
                  <svg
                    width={50}
                    height={50}
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.4219 23.75L8.4375 22.8906C7.34375 22.6562 6.32812 23.5156 6.32812 24.6094V26.25C6.32812 27.5781 7.34375 27.8906 8.59375 27.8906H12.9688C13.8281 27.8906 14.6875 27.7344 14.6875 26.7969V26.5625C14.6875 25.1562 13.75 23.9844 12.4219 23.75ZM7.8125 26.25V24.5312C7.8125 24.375 7.96875 24.2187 8.125 24.2969L12.1094 25.1562C12.6562 25.3125 13.0469 25.7812 13.125 26.3281C10.3906 26.3281 8.04687 26.3281 7.8125 26.25Z"
                      fill="CurrentColor"
                    />
                    <path
                      d="M47.8906 15.3906L42.2656 12.7344C40.3906 11.875 38.3594 11.5625 36.4062 11.9531L35.5469 10.2344C34.9219 8.67188 33.4375 7.57812 31.7187 7.57812H13.4375C11.7188 7.57812 10.2344 8.59375 9.60938 10.1563L6.5625 16.4844C5.85937 15.4688 4.6875 14.8438 3.4375 14.8438H2.10938C0.9375 14.8438 0 15.7813 0 16.9531V17.8125C0 18.9844 0.9375 19.9219 2.10938 19.9219H4.14062C3.28125 21.0156 2.89062 22.4219 2.89062 23.8281V28.5156C2.89062 30.3125 3.51562 32.0312 4.76562 33.5156V37.0312C4.76562 38.5938 6.01562 39.8438 7.57812 39.8438H10.4688C12.0312 39.8438 13.2812 38.5938 13.2812 37.0312V35.625H28.9062C32.3438 40.3125 37.7344 42.3438 37.8125 42.3438C37.9688 42.4219 38.125 42.4219 38.3594 42.3438C38.4375 42.2656 50 38.0469 50 27.5V18.75C50 17.3438 49.1406 16.0156 47.8906 15.3906ZM11.0156 10.7813C11.4062 9.76563 12.3438 9.14062 13.4375 9.14062H31.7187C32.8125 9.14062 33.75 9.76562 34.2188 10.8594L34.9219 12.3438C34.6094 12.4219 34.2969 12.5781 33.9844 12.7344L28.3594 15.3906C27.1094 16.0156 26.25 17.2656 26.25 18.6719H7.10938C7.42188 18.2031 7.10938 18.9844 11.0156 10.7813ZM1.5625 17.8125V16.9531C1.5625 16.6406 1.79688 16.4062 2.10938 16.4062H3.4375C5 16.4062 5.54688 17.8125 5.70312 18.0469C5.625 18.2031 5.54688 18.2812 5.39062 18.4375H2.10938C1.79688 18.3594 1.5625 18.125 1.5625 17.8125ZM11.7188 36.9531C11.7188 37.6562 11.1719 38.2031 10.4688 38.2031H7.5C6.79688 38.2812 6.25 37.6562 6.25 36.9531V34.6875C7.1875 35.2344 8.28125 35.5469 9.375 35.5469H11.7188V36.9531ZM9.29688 34.0625C6.48438 34.0625 4.29688 31.3281 4.29688 28.4375V23.75C4.29688 22.4219 4.84375 21.1719 5.78125 20.1562H26.25V27.0312H17.6562C17.2656 27.0312 16.875 27.3437 16.875 27.8125C16.875 28.2812 17.1875 28.5937 17.6562 28.5937H26.3281C26.4062 29.1406 26.4062 29.6094 26.5625 30.0781H17.6562C17.2656 30.0781 16.875 30.3906 16.875 30.8594C16.875 31.3281 17.1875 31.6406 17.6562 31.6406H26.875C27.1875 32.5 27.5 33.3594 27.9688 34.0625H9.29688ZM48.4375 27.5C48.4375 36.1719 39.6875 40.1562 38.125 40.7812C32.5 38.5156 27.8125 33.6719 27.8125 27.5V18.75C27.8125 17.8906 28.2812 17.1875 29.0625 16.7969L34.6875 14.1406C36.9531 13.0469 39.4531 13.0469 41.7188 14.1406L47.3438 16.7969C48.0469 17.1875 48.5938 17.8906 48.5938 18.75V27.5H48.4375Z"
                      fill="CurrentColor"
                    />
                    <path
                      d="M45.7812 18.5937L40.625 16.1719C39.0625 15.3906 37.1094 15.3906 35.5469 16.1719L30.4687 18.5937C30.2344 18.75 30 18.9844 30 19.2969V27.5C30 33.6719 35.3906 37.0312 37.7344 38.2031C37.9687 38.2812 38.2031 38.2812 38.4375 38.2031C40.7812 37.0312 46.1719 33.6719 46.1719 27.5V19.2969C46.1719 18.9844 46.0156 18.75 45.7812 18.5937ZM44.6875 27.5C44.6875 32.5 40.3125 35.4688 38.125 36.6406C35.5469 35.2344 31.5625 32.4219 31.5625 27.5V19.7656L36.25 17.5C37.4219 16.9531 38.8281 16.9531 40 17.5L44.6875 19.7656V27.5Z"
                      fill="CurrentColor"
                    />
                    <path
                      d="M35.0785 27.2657C34.766 27.0313 34.2973 27.1094 33.9848 27.4219C33.6723 27.7344 33.8285 28.2032 34.141 28.5157L37.1098 30.7813C37.4223 31.0157 37.891 30.9375 38.2035 30.625L42.5785 24.9219C42.8129 24.6094 42.7348 24.1407 42.4223 23.8282C42.1098 23.5938 41.641 23.6719 41.3285 23.9844L37.4223 29.0625L35.0785 27.2657Z"
                      fill="CurrentColor"
                    />
                  </svg>
                </div>
                <div className="content">
                  <h5>
                    <a href="#">Transparent Partnerships</a>
                  </h5>
                  <p>
                    Transparency is key in our client relationships. We
                    prioritize clear communication and ethical practices,
                    fostering trust and reliability throughout.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* widegt team */}
  <section className="tf-section3">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section center">
            <h2>Meet Our Agents</h2>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="tf-team box hover-img">
            <div className="images relative img-style">
              <a href="sale-agents-detail.html">
                <img
                  className="lazyloaded"
                  data-src="assets/images/img-box/team1.jpg"
                  src="assets/images/img-box/team1.jpg"
                  alt="images"
                />
              </a>
              <div className="icon-socials">
                <a href="#">
                  <i className="icon-autodeal-facebook" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-twitter" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-linkedin" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-instagram" />
                </a>
              </div>
            </div>
            <div className="content flex-two">
              <div className="inner">
                <h3 className="link-style-1">
                  <a href="sale-agents-detail.html">Arlene McCoy</a>
                </h3>
                <p className=" text-color-2">Administrative Staff</p>
              </div>
              <div className="icon-box flex">
                <a href="tel:0123456789">
                  <i className="fas fa-phone-alt" />
                </a>
                <a href="info:themes@gmail">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="tf-team box hover-img">
            <div className="images relative img-style">
              <a href="sale-agents-detail.html">
                <img
                  className="lazyloaded"
                  data-src="assets/images/img-box/team2.jpg"
                  src="assets/images/img-box/team2.jpg"
                  alt="images"
                />
              </a>
              <div className="icon-socials">
                <a href="#">
                  <i className="icon-autodeal-facebook" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-twitter" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-linkedin" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-instagram" />
                </a>
              </div>
            </div>
            <div className="content flex-two">
              <div className="inner">
                <h3 className="link-style-1">
                  <a href="sale-agents-detail.html">Ronald Richards</a>
                </h3>
                <p className=" text-color-2">Administrative Staff</p>
              </div>
              <div className="icon-box flex">
                <a href="tel:0123456789">
                  <i className="fas fa-phone-alt" />
                </a>
                <a href="info:themes@gmail">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="tf-team box hover-img">
            <div className="images relative img-style">
              <a href="sale-agents-detail.html">
                <img
                  className="lazyloaded"
                  data-src="assets/images/img-box/team3.jpg"
                  src="assets/images/img-box/team3.jpg"
                  alt="images"
                />
              </a>
              <div className="icon-socials">
                <a href="#">
                  <i className="icon-autodeal-facebook" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-twitter" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-linkedin" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-instagram" />
                </a>
              </div>
            </div>
            <div className="content flex-two">
              <div className="inner">
                <h3 className="link-style-1">
                  <a href="sale-agents-detail.html">Leslie Alexander</a>
                </h3>
                <p className=" text-color-2">Administrative Staff</p>
              </div>
              <div className="icon-box flex">
                <a href="tel:0123456789">
                  <i className="fas fa-phone-alt" />
                </a>
                <a href="info:themes@gmail">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="tf-team box hover-img">
            <div className="images relative img-style">
              <a href="sale-agents-detail.html">
                <img
                  className="lazyloaded"
                  data-src="assets/images/img-box/team4.jpg"
                  src="assets/images/img-box/team4.jpg"
                  alt="images"
                />
              </a>
              <div className="icon-socials">
                <a href="#">
                  <i className="icon-autodeal-facebook" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-twitter" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-linkedin" />
                </a>
                <a href="#">
                  <i className="icon-autodeal-instagram" />
                </a>
              </div>
            </div>
            <div className="content flex-two">
              <div className="inner">
                <h3 className="link-style-1">
                  <a href="sale-agents-detail.html">Cody Fisher</a>
                </h3>
                <p className=" text-color-2">Administrative Staff</p>
              </div>
              <div className="icon-box flex">
                <a href="tel:0123456789">
                  <i className="fas fa-phone-alt" />
                </a>
                <a href="info:themes@gmail">
                  <i className="fas fa-envelope" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="box-text flex justify-center mt-15 center flex-wrap">
            <p>Become an agent and get the commission you deserve. </p>{" "}
            <a href="contact.html" className="text-color-3 font-2 ">
              {" "}
              Contact us
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* logo */}
  <section className="flat-brand tf-section3">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="title-section center">
            <h2>Our partners</h2>
          </div>
          <div className="swiper-container carousel-5">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par1.png"
                      src="assets/images/partner/par1.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par2.png"
                      src="assets/images/partner/par2.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par3.png"
                      src="assets/images/partner/par3.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par4.png"
                      src="assets/images/partner/par4.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par5.png"
                      src="assets/images/partner/par5.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="slogan-logo">
                  <a href="#">
                    <img
                      className="lazyload"
                      data-src="assets/images/partner/par6.png"
                      src="assets/images/partner/par6.png"
                      alt="images"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* widegt tetimonial */}
  <section className="tf-section3">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section center">
            <h2>We love our clients</h2>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="swiper-container carousel-7 overflow-hidden">
            <div className="swiper-wrapper ">
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm1.jpg"
                        src="assets/images/author/avt-cm1.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm2.jpg"
                        src="assets/images/author/avt-cm2.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm3.jpg"
                        src="assets/images/author/avt-cm3.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm1.jpg"
                        src="assets/images/author/avt-cm1.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm2.jpg"
                        src="assets/images/author/avt-cm2.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="tf-testimonial bg-4">
                  <div className="inner-top flex-two">
                    <img
                      className="lazyload"
                      data-src="assets/images/section/star-5.png"
                      src="assets/images/section/star-5.png"
                      alt="images"
                    />
                    <p className="fs-12">15 May 2020 9:30 am</p>
                  </div>
                  <p className="fs-16 lh-22 text-color-2">
                    "My experience with property management services has
                    exceeded expectations. They efficiently manage properties
                    with a professional and attentive approach in every
                    situation. I feel reassured that any issue will be resolved
                    promptly and effectively."
                  </p>
                  <div className="author-box flex">
                    <div className="images">
                      <img
                        className="lazyload"
                        data-src="assets/images/author/avt-cm3.jpg"
                        src="assets/images/author/avt-cm3.jpg"
                        alt="images"
                      />
                    </div>
                    <div className="content">
                      <h5>Arlene McCoy</h5>
                      <p className="fs-12 lh-16">CEO Themesflat</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="swiper-pagination3" />
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* widegt List car */}
  <section className="tf-section3">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <div className="heading-section flex align-center justify-space flex-wrap gap-20">
            <h2>Recommended Used Cars For You</h2>
            <a href="blog-grid.html" className="tf-btn-arrow">
              View all
              <i className="icon-autodeal-btn-right" />
            </a>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="swiper-container tf-sw-mobile3 ">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car16.jpg"
                        src="assets/images/car-list/car16.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm3.jpg"
                          src="assets/images/author/avt-cm3.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Kathryn Murphy
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car17.jpg"
                        src="assets/images/car-list/car17.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt1.jpg"
                          src="assets/images/author/avt1.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Kathryn Murphy
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car14.jpg"
                        src="assets/images/car-list/car14.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm3.jpg"
                          src="assets/images/author/avt-cm3.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Miles, Esther
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car15.jpg"
                        src="assets/images/car-list/car15.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm2.jpg"
                          src="assets/images/author/avt-cm2.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Black, Marvin
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car16.jpg"
                        src="assets/images/car-list/car16.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm3.jpg"
                          src="assets/images/author/avt-cm3.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Kathryn Murphy
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car17.jpg"
                        src="assets/images/car-list/car17.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt1.jpg"
                          src="assets/images/author/avt1.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Kathryn Murphy
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car14.jpg"
                        src="assets/images/car-list/car14.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm3.jpg"
                          src="assets/images/author/avt-cm3.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Miles, Esther
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper-slide">
                <div className="box-car-list hv-one">
                  <div className="image-group relative ">
                    <div className="top flex-two">
                      <ul className="d-flex gap-8">
                        <li className="flag-tag success">Featured</li>
                        <li className="flag-tag style-1">
                          <div className="icon">
                            <svg
                              width={16}
                              height={13}
                              viewBox="0 0 16 13"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.5 9L4.93933 5.56067C5.07862 5.42138 5.24398 5.31089 5.42597 5.2355C5.60796 5.16012 5.80302 5.12132 6 5.12132C6.19698 5.12132 6.39204 5.16012 6.57403 5.2355C6.75602 5.31089 6.92138 5.42138 7.06067 5.56067L10.5 9M9.5 8L10.4393 7.06067C10.5786 6.92138 10.744 6.81089 10.926 6.7355C11.108 6.66012 11.303 6.62132 11.5 6.62132C11.697 6.62132 11.892 6.66012 12.074 6.7355C12.256 6.81089 12.4214 6.92138 12.5607 7.06067L14.5 9M2.5 11.5H13.5C13.7652 11.5 14.0196 11.3946 14.2071 11.2071C14.3946 11.0196 14.5 10.7652 14.5 10.5V2.5C14.5 2.23478 14.3946 1.98043 14.2071 1.79289C14.0196 1.60536 13.7652 1.5 13.5 1.5H2.5C2.23478 1.5 1.98043 1.60536 1.79289 1.79289C1.60536 1.98043 1.5 2.23478 1.5 2.5V10.5C1.5 10.7652 1.60536 11.0196 1.79289 11.2071C1.98043 11.3946 2.23478 11.5 2.5 11.5ZM9.5 4H9.50533V4.00533H9.5V4ZM9.75 4C9.75 4.0663 9.72366 4.12989 9.67678 4.17678C9.62989 4.22366 9.5663 4.25 9.5 4.25C9.4337 4.25 9.37011 4.22366 9.32322 4.17678C9.27634 4.12989 9.25 4.0663 9.25 4C9.25 3.9337 9.27634 3.87011 9.32322 3.82322C9.37011 3.77634 9.4337 3.75 9.5 3.75C9.5663 3.75 9.62989 3.77634 9.67678 3.82322C9.72366 3.87011 9.75 3.9337 9.75 4Z"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          6
                        </li>
                      </ul>
                      <div className="year flag-tag">2024</div>
                    </div>
                    <ul className="change-heart flex">
                      <li className="box-icon w-32">
                        <a
                          data-bs-toggle="offcanvas"
                          data-bs-target="#offcanvasBottom"
                          aria-controls="offcanvasBottom"
                          className="icon"
                        >
                          <svg
                            width={18}
                            height={18}
                            viewBox="0 0 18 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5.25 16.5L1.5 12.75M1.5 12.75L5.25 9M1.5 12.75H12.75M12.75 1.5L16.5 5.25M16.5 5.25L12.75 9M16.5 5.25H5.25"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                      <li className="box-icon w-32">
                        <a href="my-favorite.html" className="icon">
                          <svg
                            width={18}
                            height={16}
                            viewBox="0 0 18 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.5 4.875C16.5 2.80417 14.7508 1.125 12.5933 1.125C10.9808 1.125 9.59583 2.06333 9 3.4025C8.40417 2.06333 7.01917 1.125 5.40583 1.125C3.25 1.125 1.5 2.80417 1.5 4.875C1.5 10.8917 9 14.875 9 14.875C9 14.875 16.5 10.8917 16.5 4.875Z"
                              stroke="CurrentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    </ul>
                    <div className="img-style">
                      <img
                        className="lazyload"
                        data-src="assets/images/car-list/car15.jpg"
                        src="assets/images/car-list/car15.jpg"
                        alt="image"
                      />
                    </div>
                  </div>
                  <div className="content">
                    <div className="text-address">
                      <p className="text-color-3 font">Sedan</p>
                    </div>
                    <h5 className="link-style-1">
                      <a href="listing-detail-v1.html">
                        2017 BMV X1 xDrive 20d xline
                      </a>
                    </h5>
                    <div className="icon-box flex flex-wrap">
                      <div className="icons flex-three">
                        <i className="icon-autodeal-km1" />
                        <span>72,491 kms</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-diesel" />
                        <span>Diesel</span>
                      </div>
                      <div className="icons flex-three">
                        <i className="icon-autodeal-automatic" />
                        <span>Automatic</span>
                      </div>
                    </div>
                    <div className="money fs-20 fw-5 lh-25 text-color-3">
                      $73,000
                    </div>
                    <div className="days-box flex justify-space align-center">
                      <div className="img-author">
                        <img
                          className="lazyload"
                          data-src="assets/images/author/avt-cm2.jpg"
                          src="assets/images/author/avt-cm2.jpg"
                          alt="image"
                        />
                        <span className="font text-color-2 fw-5">
                          Black, Marvin
                        </span>
                      </div>
                      <a href="listing-detail-v1.html" className="view-car">
                        View car
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="swiper-button-next style-1" />
          <div className="swiper-button-prev style-1" />
        </div>
      </div>
    </div>
  </section>
</>

  )
}

export default About
