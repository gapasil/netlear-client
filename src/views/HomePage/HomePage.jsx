import React, { useState, useEffect } from "react";
import "./HomePage.scss";
import "../../components/AntCarousel/AntCarousel.scss";
import { Carousel } from "antd";
import homeScreen1 from "../../assets/img/slider/main_pic1.jpg";
import homeScreen2 from "../../assets/img/slider/main_pic2.jpg";
import homeScreen3 from "../../assets/img/slider/main_pic3.jpg";
import homeScreen4 from "../../assets/img/slider/main_pic4.jpg";

import LatestArticles from "../LatestArticles/LatestArticles";
import LatestEvents from "../LatestEvents/LatestEvents";

function HomePage() {
  const slides = [
    `url(${homeScreen1})`,
    `url(${homeScreen2})`,
    `url(${homeScreen3})`,
    `url(${homeScreen4})`,
  ];

  const [value, setValue] = useState(0);

  const [background, setBackground] = useState({});
  useEffect(() => {
    myFunction();
    return () => {
      setBackground({});
    };
  }, []);
  const myFunction = () => {
    setBackground(
      setInterval(() => {
        setValue((v) => (v >= 3 ? 0 : v + 1));
      }, 5000)
    );
  };

  return (
    <div className="main-page">
      <div className="slider">
        <Carousel
          autoplay={false}
          autoplaySpeed={2000}
          pauseOnHover={false}
          dots={false}
          arrows={false}
        >
          <div className="slider__slide">
            <div
              className="slider__item"
              style={{ backgroundImage: slides[value] }}
            >
              <div className="slider__text">
                <h2>Медицинское сообщество, готовое учить и обучаться</h2>
                <h3>
                  Помогаем врачам делиться опытом
                  <br />и зарабатывать на знаниях
                </h3>
              </div>
              <div className="slider__item_shadow"></div>
            </div>
          </div>
        </Carousel>
      </div>
      <LatestEvents />
      <LatestArticles />
    </div>
  );
}

export default HomePage;
