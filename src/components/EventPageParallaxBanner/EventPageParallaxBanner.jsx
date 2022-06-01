import './EventPageParallaxBanner.scss';
import React from 'react';

import { ParallaxBanner } from 'react-scroll-parallax';
import { Popover } from 'antd';

import promoImg from '../../assets/img/medicineSections/dentistry.jpg';

import EditButton from '../EditButton/EditButton';
import EventUploadImage from '../EventUploadImage/EventUploadImage';

import { useDispatch, useSelector } from 'react-redux';
import { setBannerData, setBannerSelectors } from '../../redux/actions/eventRedactor/eventRedactor';
import { bannerPopoversContent } from '../../utils/eventPopoverContent/bannerPopoversContent';

function EventPageParallaxBanner({ variant }) {
  const dispatch = useDispatch();
  const { data, selectors } = useSelector((state) => state.eventRedactor.banner);
  const { title, speakerName, speakerShortDescription, backgroundImg } = bannerPopoversContent;

  const onSelectInputValue = (e) => {
    const selector = e.target.attributes.selector.nodeValue;
    const data = e.target.value;
    console.log(e);
    dispatch(setBannerData(selector, '', data));
  };

  return (
    <div className="parallax-banner">
      <ParallaxBanner
        className=""
        layers={[
          {
            image: data.backgroundImg || promoImg,
            amount: 1,
            children: '',
          },
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
              курс из <span className="text-styled__bright text-styled__bright_large">2</span>{' '}
              вебинаров <span className="text-styled__bright">в записи</span>
            </div>
            {selectors.title ? (
              <Popover
                placement="topRight"
                title={title.title}
                content={title.content}
                trigger="focus">
                <textarea
                  type="text"
                  className="test-input parallax-banner-content__title"
                  value={data.title}
                  selector="title"
                  onChange={onSelectInputValue}
                  autoFocus
                />
              </Popover>
            ) : (
              <h2 className="parallax-banner-content__title">
                {data.title}
                {variant === 'redactor' && (
                  <EditButton selector="title" action={setBannerSelectors} />
                )}
              </h2>
            )}

            <div className="parallax-banner-content__speaker-block speaker-block">
              <div className="parallax-banner-content__quantity">спикер</div>
              {selectors.speakerName ? (
                <Popover
                  placement="topRight"
                  title={speakerName.title}
                  content={speakerName.content}
                  trigger="focus">
                  <input
                    type="text"
                    className="test-input speaker-block__name"
                    value={data.speakerName}
                    selector="speakerName"
                    autofocus
                    onChange={onSelectInputValue}
                  />
                </Popover>
              ) : (
                <h2 className="speaker-block__name">
                  {data.speakerName}
                  {variant === 'redactor' && (
                    <EditButton selector="speakerName" action={setBannerSelectors} />
                  )}
                </h2>
              )}
              {selectors.speakerShortDescription ? (
                <Popover
                  placement="topRight"
                  title={speakerShortDescription.title}
                  content={speakerShortDescription.content}
                  trigger="focus">
                  <textarea
                    type="text"
                    className="test-input speaker-block__description"
                    value={data.speakerShortDescription}
                    selector="speakerShortDescription"
                    onChange={onSelectInputValue}
                  />
                </Popover>
              ) : (
                <p className="speaker-block__description">
                  {data.speakerShortDescription}
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
