import React, { useState, useEffect } from "react";
import "./AntCarousel.scss";

import { Carousel } from "antd";

import homeScreen1 from "../../assets/img/slider/main_pic1.jpg";
import homeScreen2 from "../../assets/img/slider/main_pic2.jpg";
import homeScreen3 from "../../assets/img/slider/main_pic3.jpg";
import homeScreen4 from "../../assets/img/slider/main_pic4.jpg";

function AntCarousel() {
  const slides = [
    `url(${homeScreen1})`,
    `url(${homeScreen2})`,
    `url(${homeScreen3})`,
    `url(${homeScreen4})`,
  ];

  // const [state, setState] = useState({ i: 1 }, { img: homeScreen1 });

  // React.useEffect(() => {
  //   const interval = setInterval(() => {
  //     setState({ img: slides[state.i] });
  //   }, 2000);
  // });

  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("dasd");
    const interval = setInterval(() => {
      setValue((v) => (v >= 3 ? 0 : v + 1));
    }, 5000);
  }, []);

  return (
    <div className="main-page__slider slider">
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
                Помогаем врачам делиться опытом <br /> и зарабатывать на знаниях
              </h3>
            </div>
            <div className="slider__item_shadow"></div>
          </div>
        </div>
        {/* <div className="slider__slide" onClick={() => console.log("123")}>
          <div
            className="slider__item"
            style={{ backgroundImage: `url(${homeScreen2})` }}
          >
            <div className="slider__text">
              <h2>Медицинское сообщество, готовое учить и обучаться</h2>
              <h3>
                Помогаем врачам делиться опытом <br /> и зарабатывать на знаниях
              </h3>
            </div>
            <div className="slider__item_shadow"></div>
          </div>
        </div>
        <div className="slider__slide" onClick={() => console.log("123")}>
          <div
            className="slider__item"
            style={{ backgroundImage: `url(${homeScreen3})` }}
          >
            <div className="slider__text">
              <h2>Медицинское сообщество, готовое учить и обучаться</h2>
              <h3>
                Помогаем врачам делиться опытом <br /> и зарабатывать на знаниях
              </h3>
            </div>
            <div className="slider__item_shadow"></div>
          </div>
        </div>
        <div className="slider__slide" onClick={() => console.log("123")}>
          <div
            className="slider__item"
            style={{ backgroundImage: `url(${homeScreen4})` }}
          >
            <div className="slider__text">
              <h2>Медицинское сообщество, готовое учить и обучаться</h2>
              <h3>
                Помогаем врачам делиться опытом <br /> и зарабатывать на знаниях
              </h3>
            </div>
            <div className="slider__item_shadow"></div>
          </div>
        </div> */}
      </Carousel>
    </div>
  );
}

export default AntCarousel;
