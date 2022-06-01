import React from 'react';
import './Footer.scss';

import mailImg from '../../assets/img/newsletter-mail.svg';
import paymentImg from '../../assets/img/payment/full-pay.png';

import FooterContentBlock from '../FooterContentBlock/FooterContentBlock';
import Logo from '../Logo/Logo';

import {
  contantUs,
  navigationArr,
  networks,
  forListeners,
  forSpeakers,
} from '../../utils/mapArrays/footerContent';
import { RightOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/components/pagination/pagination.min.css';

// import './styles.css';

// import Swiper core and required modules
import SwiperCore, { Pagination, Navigation, Autoplay } from 'swiper/core';

// install Swiper modules
SwiperCore.use([Pagination, Navigation, Autoplay]);

const layout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function Footer() {
  const [subscribeState, setSubscribeState] = React.useState('');
  const onChangeSubscribeInput = (e) => {
    const value = e.target.value;
    setSubscribeState(value);
  };

  const onSubmitSubscribeForm = () => {
    console.log(`Success: ${subscribeState}`);
  };

  return (
    <div className="footer">
      {/* <div className="footer__subsribe subscribe">
        <div className="subscribe__wrapper">
          <div className="subscribe__title">
            <img src={mailImg} alt="" />
            <h2>Подпишитесь на уведомления о новых мероприятиях</h2>
          </div>
          <div className="subscribe__form">
            <Input placeholder="Email" onChange={onChangeSubscribeInput} />
            <Button type="primary" onClick={onSubmitSubscribeForm}>
              Отправить
            </Button>
          </div>
        </div>
      </div> */}
      <div className="footer__logo">
        <Logo type={'footer'}/>
      </div>
      <div className="footer__content footer-content">
        <div className="footer-content__wrapper">
          <FooterContentBlock title={'Контакты'}>
            {contantUs.map((el, i) => {
              return (
                <div key={i} className="footer-content-block__item">
                  {el.img}
                  <a href={el.link}>{el.text}</a>
                </div>
              );
            })}
          </FooterContentBlock>
          <FooterContentBlock title={'Для слушателей'}>
            {forListeners.map((el, i) => {
              if (el.type === 'colored') {
                return (
                  <div key={i} className="footer-content-block__item_colored fs14">
                    <a href={el.link}>{el.text}</a>
                  </div>
                );
              } else {
                return (
                  <div key={i} className="footer-content-block__item fs14">
                    <a href={el.link}>{el.text}</a>
                  </div>
                );
              }
            })}
          </FooterContentBlock>
          <FooterContentBlock title={'Для лекторов'}>
            {forSpeakers.map((el, i) => {
              return (
                <div key={i} className="footer-content-block__item fs14">
                  <a className="footer-content-block__item" href={el.link}>
                    {el.text}
                  </a>
                </div>
              );
            })}
          </FooterContentBlock>
          <FooterContentBlock title={'Новости'}>
            <Swiper
              direction={'vertical'}
              pagination={{
                clickable: true,
                type: 'fraction',
              }}
              slidesPerView={2}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={false}
              spaceBetween={5}
              className="news-swiper">
              <SwiperSlide>news 1</SwiperSlide>
              <SwiperSlide>news 2</SwiperSlide>
              <SwiperSlide>news 3</SwiperSlide>
              <SwiperSlide>news 4</SwiperSlide>
              <SwiperSlide>news 5</SwiperSlide>
              <SwiperSlide>news 6</SwiperSlide>
              <SwiperSlide>news 7</SwiperSlide>
              <SwiperSlide>news 8</SwiperSlide>
              <SwiperSlide>news 9</SwiperSlide>
            </Swiper>
          </FooterContentBlock>
        </div>
      </div>
      {/* <div className="footer-content">
        <div className="footer-content__wrapper footer-content__bottom">
          <img className="footer-content__payment" src={paymentImg} alt="" />
          <div className="footer-content__logo"><Logo /></div>
          
          <p className="footer-content__rights">EnzoStudio © 2021. All Rights Reserved</p>
        </div>
      </div> */}
    </div>
  );
}

export default Footer;
