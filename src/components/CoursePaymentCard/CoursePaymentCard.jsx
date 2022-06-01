import React from 'react';

import './CoursePaymentCard.scss';

import { Button, Input } from 'antd';
import { PlaySquareTwoTone, InteractionTwoTone, TrophyTwoTone } from '@ant-design/icons';

import { setPaidVideo } from '../../redux/actions/dev';
import { setSideMenuTrue } from '../../redux/actions/sideMenu';
import { setFullCourseCost } from '../../redux/actions/eventRedactor/eventRedactor';
import { useSelector, useDispatch } from 'react-redux';

import SettingsButton from '../SettingsButton/SettingsButton';
import SideMenu from '../SideMenu/SideMenu';
import CoursePaymentCardSettings from '../CoursePaymentCardSettings/CoursePaymentCardSettings';

function CoursePaymentCard({ type = 'segment', dataIndex = 0, variant }) {
  const data = useSelector((state) => state.eventRedactor.mainContent.data.vebinars[dataIndex]);
  const fullCourseData = useSelector(
    (state) => state.eventRedactor.mainContent.data.fullCoursePayCard,
  );
  const dispatch = useDispatch();

  const currencySymbol =
    data.currency === 'RUB'
      ? '₽'
      : data.currency === 'EUR'
      ? '€'
      : data.currency === 'USD'
      ? '$'
      : '';

  const onOpenFullPayCardSettings = () => {
    const selector = 'fullCoursePayCard';
    dispatch(setSideMenuTrue(selector));
  };

  React.useEffect(() => {
    if (type === 'full') {
      dispatch(setFullCourseCost());
    }
  }, [type]);

  const onChangeCouponInput = () => {};

  const onSubmitCoupon = () => {};

  const onClickPayNow = () => {
    dispatch(setPaidVideo(true));
  };
  return (
    <div className="payment-card">
      {variant === 'redactor' && (
        <>
          {' '}
          <SettingsButton onClick={onOpenFullPayCardSettings} />{' '}
          <SideMenu
            selector="fullCoursePayCard"
            title="Основные настройки карты покупки полного курса">
            <CoursePaymentCardSettings />
          </SideMenu>
        </>
      )}
      {type === 'full' && <h2>Приобрести полный курс по сниженной цене</h2>}
      <div className="payment-card__cost-block">
        <h2 className="payment-card__cost">
          {type === 'full' ? fullCourseData.costWithDiscount : data.cost} {currencySymbol}
        </h2>
        {type === 'full' && (
          <>
            <span className="payment-card__full-cost">
              {`${fullCourseData.cost} ${currencySymbol}`}
            </span>
            <span className="payment-card__sale">{`Скидка ${fullCourseData.discount}%`}</span>
          </>
        )}
      </div>
      <Button
        className="payment-card__pay-now-button"
        size="large"
        type="primary"
        onClick={onClickPayNow}>
        Купить сейчас
      </Button>
      <div className="payment-card__course-includes-block course-includes-block">
        <h3 className="course-includes-block__title">
          {type === 'segment' ? 'Этот блок включает:' : 'Этот курс включает:'}
        </h3>
        <div className="course-includes-block__content">
          <div className="course-includes-block__item">
            <PlaySquareTwoTone /> <p>1 видео</p>
          </div>
          <div className="course-includes-block__item">
            <InteractionTwoTone /> <p>Пожизненный доступ</p>
          </div>
          <div className="course-includes-block__item">
            <TrophyTwoTone /> <p>Сертификат об окончании</p>
          </div>
        </div>
      </div>
      <div className="payment-card__coupon-block">
        <Input placeholder="Введите купон" onChange={onChangeCouponInput} />
        <Button type="primary" onClick={onSubmitCoupon}>
          Применить
        </Button>
      </div>
    </div>
  );
}

export default CoursePaymentCard;
