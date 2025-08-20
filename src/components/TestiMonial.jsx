/** @format */

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

function TestiMonial() {
    return (
        <>
            <div className="col-lg-12">
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        el: ".swiper-pagination3",
                    }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                    }}
                    modules={[Pagination]}
                    className="carousel-7 overflow-hidden"
                >
                    {/* Review 1 */}
                    <SwiperSlide>
                        <div className="tf-testimonial bg-4">
                            <div className="inner-top flex-two">
                                <img
                                    src="assets/images/section/star-5.png"
                                    alt="rating"
                                />
                                <p className="fs-12">12 Jan 2025 • 5:45 pm</p>
                            </div>
                            <p className="fs-16 lh-22 text-color-2">
                                “I sold my Maruti Swift within 3 days on this
                                platform. The process was smooth, documents were
                                handled properly, and I got a better price
                                compared to local dealers.”
                            </p>
                            <div className="author-box flex">
                                <div className="images">
                                    <img
                                        src="assets/images/author/avt-cm1.jpg"
                                        alt="user"
                                    />
                                </div>
                                <div className="content">
                                    <h5>Rohit Verma</h5>
                                    <p className="fs-12 lh-16">Car Seller</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Review 2 */}
                    <SwiperSlide>
                        <div className="tf-testimonial bg-4">
                            <div className="inner-top flex-two">
                                <img
                                    src="assets/images/section/star-5.png"
                                    alt="rating"
                                />
                                <p className="fs-12">28 Feb 2025 • 2:15 pm</p>
                            </div>
                            <p className="fs-16 lh-22 text-color-2">
                                “Bought a Hyundai Creta through this website.
                                The filters made it easy to shortlist cars, and
                                the inspection report was very helpful. Highly
                                recommend for first-time buyers.”
                            </p>
                            <div className="author-box flex">
                                <div className="images">
                                    <img
                                        src="assets/images/author/avt-cm2.jpg"
                                        alt="user"
                                    />
                                </div>
                                <div className="content">
                                    <h5>Neha Sharma</h5>
                                    <p className="fs-12 lh-16">Car Buyer</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Review 3 */}
                    <SwiperSlide>
                        <div className="tf-testimonial bg-4">
                            <div className="inner-top flex-two">
                                <img
                                    src="assets/images/section/star-5.png"
                                    alt="rating"
                                />
                                <p className="fs-12">10 Mar 2025 • 11:00 am</p>
                            </div>
                            <p className="fs-16 lh-22 text-color-2">
                                “The instant car valuation tool was spot on! I
                                compared prices on different portals, but this
                                one gave me the best deal and a quick buyer
                                connection.”
                            </p>
                            <div className="author-box flex">
                                <div className="images">
                                    <img
                                        src="assets/images/author/avt-cm3.jpg"
                                        alt="user"
                                    />
                                </div>
                                <div className="content">
                                    <h5>Akash Mehta</h5>
                                    <p className="fs-12 lh-16">
                                        Verified Seller
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    {/* Review 4 */}
                    <SwiperSlide>
                        <div className="tf-testimonial bg-4">
                            <div className="inner-top flex-two">
                                <img
                                    src="assets/images/section/star-5.png"
                                    alt="rating"
                                />
                                <p className="fs-12">5 Apr 2025 • 7:20 pm</p>
                            </div>
                            <p className="fs-16 lh-22 text-color-2">
                                “Great platform for dealers as well. I could
                                list multiple cars with photos and get leads
                                directly. The dashboard makes tracking buyers
                                easy.”
                            </p>
                            <div className="author-box flex">
                                <div className="images">
                                    <img
                                        src="assets/images/author/avt-cm1.jpg"
                                        alt="dealer"
                                    />
                                </div>
                                <div className="content">
                                    <h5>Sandeep Kumar</h5>
                                    <p className="fs-12 lh-16">Car Dealer</p>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>

                    <div className="swiper-pagination3" />
                </Swiper>
            </div>
        </>
    );
}

export default TestiMonial;
