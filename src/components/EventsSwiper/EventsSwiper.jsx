import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./EventsSwiper.scss";
import { latestEvents } from "../../utils/mapArrays/latestEvents";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination, Navigation } from "swiper/core";
import Button from "../Button/Button";
SwiperCore.use([Autoplay, Pagination, Navigation]);

export default function EventsSwiper(children) {
  const swiperRef = useRef(null);
  const width = window.innerWidth;
  React.useEffect(() => {
    // console.log(swiperRef);
  }, [swiperRef]);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={
        width >= 1600 ? 4 : width >= 1000 ? 3 : width >= 600 ? 2 : 1
      }
      centeredSlides={width <= 600 && true}
      spaceBetween={30}
      pagination={{
        type: "custom",
      }}
      loop={true}
      navigation={true}
    >

      {latestEvents.map((el) => (
        <Link to={el.link} key={el.experience}>
          <SwiperSlide>
            <div className="events-swiper">
              <div className="events-swiper__img">
                <img src={el.cardImg} alt="" />
              </div>
              <div className="events-swiper__info">
                <p>{el.section}</p>
                <p>{el.title}</p>
                <p>{el.cost}</p>
                <div className="events-swiper__specialist">
                  <div className="events-swiper__specialist_img">
                    <img src={el.specialistImg} alt="" />
                  </div>
                  <p>{el.name}</p>
                </div>
                <Button text="Подробнее" />
              </div>
            </div>
          </SwiperSlide>
        </Link>
      ))}
    </Swiper>
  );
}
