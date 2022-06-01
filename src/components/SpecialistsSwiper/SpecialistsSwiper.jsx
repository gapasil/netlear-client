import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./SpecialistsSwiper.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";

import BlockTitle from "../BlockTitle/BlockTitle";

import { specialists } from "../../utils/mapArrays/specialists";
// import Swiper core and required modules
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";

// install Swiper modules
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function SpecialistsSwiper() {
  const swiperRef = useRef(null);
  const width = window.innerWidth;
  React.useEffect(() => {
    // console.log(swiperRef);
  }, [swiperRef]);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={width >= 1600 ? 4 : width >= 1000 ? 3 :  width >= 600 ? 2 : 1}
      centeredSlides={width <= 600 && true}
      spaceBetween={30}
      pagination={{
        type: "custom",
      }}
      loop={true}
      navigation={true}
    >
      {specialists.map((el, i) => (
        <Link to={el.link} key={i}>
          <SwiperSlide>
            <div className="specialists-swiper__item">
              <div className="specialists-swiper__item_img">
                <img src={el.img} alt="" />
              </div>
              <div className="specialists-swiper__item_info">
                <p className="specialists-swiper__item_info1">{el.lastName}</p>
                <p className="specialists-swiper__item_info2">{el.firstName}</p>
                <p className="specialists-swiper__item_info3">
                  {el.experience}
                </p>
                <p className="specialists-swiper__item_info4">{el.location}</p>
              </div>
            </div>
          </SwiperSlide>
        </Link>
      ))}
    </Swiper>
  );
}
