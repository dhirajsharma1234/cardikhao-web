import React, { useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
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
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <SwiperSlide>
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
                "My experience with property management services has exceeded
                expectations. They efficiently manage properties with a
                professional and attentive approach in every situation. I feel
                reassured that any issue will be resolved promptly and
                effectively."
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
          </SwiperSlide>
          <div className="swiper-pagination3" />
        </Swiper>
      </div>
    </>
  );
}

export default TestiMonial;
