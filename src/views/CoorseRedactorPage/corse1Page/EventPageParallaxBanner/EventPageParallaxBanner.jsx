import './EventPageParallaxBanner.scss';
import React from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { Popover } from 'antd';
import { url } from "../../../../conf"
import promoImg from '../../../../assets/img/medicineSections/dentistry.jpg';

import EditButton from '../../../../components/EditButton/EditButton';
import EventUploadImage from '../../../../components/EventUploadImage/EventUploadImage';

import { useDispatch, useSelector } from 'react-redux';
import { setBannerData, setBannerSelectors } from '../../../../redux/actions/eventRedactor/eventRedactor';
import { bannerPopoversContent } from '../../../../utils/eventPopoverContent/bannerPopoversContent';

function EventPageParallaxBanner({ variant }) {
  const dispatch = useDispatch();
  const eventRedactor = useSelector((state) => state.eventRedactor);
  const dataBanner = eventRedactor.banner.data
  
  const { title, speakerName, speakerShortDescription, backgroundImg } = bannerPopoversContent;
  let objBanner

  const onSelectInputValue = (e) => {
    const selector = e.target.attributes.selector.nodeValue;
    const dataBanner = e.target.value;
    dispatch(setBannerData(selector, '', dataBanner));
  };

  if(variant == "redactor"){
    objBanner = {
      image: dataBanner.backgroundImg || promoImg,
      amount: 1,
      children: '',
    }
  } else {
    objBanner = {
      image:`${url}coorsefiles/${dataBanner.backgroundImg}`,
      amount: 1,
      children: '',
    }
  }

  return (
    <div className="parallax-banner">
      <ParallaxBanner
        className=""
        layers={[
          objBanner
        ]}
        style={{
          minHeight: '400px',
        }}>
        <div className="parallax-banner-content">
          {variant === 'redactor' && (
            <EventUploadImage
              selector={'backgroundImg'}
              action={setBannerData}
              popoverContentType={backgroundImg}
            />
          )}

          <div className="parallax-banner-content__wrapper">
            <div className="parallax-banner-content__quantity">
              курс из <span className="text-styled__bright text-styled__bright_large">{eventRedactor.mainContent.data.vebinars.length}</span>{' '}
              вебинаров <span className="text-styled__bright">в записи</span>
            </div>
            {variant == "redactor" ? (
              <Popover
                placement="topRight"
                title={title.title}
                content={title.content}
                trigger="focus">
                <textarea
                  type="text"
                  className="test-input parallax-banner-content__title"
                  value={dataBanner.title}
                  selector="title"
                  onChange={onSelectInputValue}
                  autoFocus
                />
              </Popover>
            ) : (
              <h2 className="parallax-banner-content__title">
                {dataBanner.title}
                {variant === 'redactor' && (
                  <EditButton selector="title" action={setBannerSelectors} />
                )}
              </h2>
            )}

            <div className="parallax-banner-content__speaker-block speaker-block">
              <div className="parallax-banner-content__quantity">спикер</div>
              {variant == "redactor" ? (
                <Popover
                  placement="topRight"
                  title={speakerName.title}
                  content={speakerName.content}
                  trigger="focus">
                  <input
                    type="text"
                    className="test-input speaker-block__name"
                    value={dataBanner.speakerName}
                    selector="speakerName"
                    autofocus
                    onChange={onSelectInputValue}
                  />
                </Popover>
              ) : (
                <h2 className="speaker-block__name">
                  {dataBanner.speakerName}
                  {variant === 'redactor' && (
                    <EditButton selector="speakerName" action={setBannerSelectors} />
                  )}
                </h2>
              )}
              {variant == "redactor" ? (
                <Popover
                  placement="topRight"
                  title={speakerShortDescription.title}
                  content={speakerShortDescription.content}
                  trigger="focus">
                  <textarea
                    type="text"
                    className="test-input speaker-block__description"
                    value={dataBanner.speakerShortDescription}
                    selector="speakerShortDescription"
                    onChange={onSelectInputValue}
                  />
                </Popover>
              ) : (
                <p className="speaker-block__description">
                  {dataBanner.speakerShortDescription}
                  {variant === 'redactor' && (
                    <EditButton selector="speakerShortDescription" action={setBannerSelectors} />
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="slider__item_shadow"></div>
      </ParallaxBanner>
    </div>
  );
}

export default EventPageParallaxBanner;
