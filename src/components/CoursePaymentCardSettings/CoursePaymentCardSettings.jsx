import React from 'react';
import './CoursePaymentCardSettings.scss';

import {
  Button,
  Input,
  Group,
  Radio,
  Upload,
  Popconfirm,
  DatePicker,
  ConfigProvider,
  Select,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import ruRU from 'antd/lib/locale/ru_RU';

import { useDispatch, useSelector } from 'react-redux';
import { setFullCourseSettings, setFullCourseCost } from '../../redux/actions/eventRedactor/eventRedactor';
import { setSideMenuFalse } from '../../redux/actions/sideMenu';

function CoursePaymentCardSettings() {
  const dispatch = useDispatch();
  const { index, eventRedactor } = useSelector((state) => state.sideMenu);
  const data = useSelector((state) => state.eventRedactor.mainContent.data.fullCoursePayCard);

  const [currency, setCurrency] = React.useState(data.currency);
  const [promoCode, setPromoCode] = React.useState(data.promocode);
  const [discount, setDiscount] = React.useState(data.discount);
  const [promoCodeDiscount, setPromoCodeDiscount] = React.useState(data.promoCodeDiscount);

  const onChangeSelectCurrency = (value) => {
    console.log(`selected ${value}`);
    setCurrency(value);
  };

  const onChangePromoCode = (e) => {
    setPromoCode(e.target.value);
  };

  const onChangeSell = (e) => {
    setDiscount(e.target.value);
  };

  const onChangePromoCodeSell = (e) => {
    setPromoCodeDiscount(e.target.value);
  };

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  const onSaveItemSettings = () => {
    const dataObj = {
      currency,
      promoCode,
      discount,
      promoCodeDiscount,
    };
    dispatch(setFullCourseSettings(dataObj));
    dispatch(setFullCourseCost());
    dispatch(setSideMenuFalse());
  };

  React.useEffect(() => {
    console.log(currency, promoCode, discount, promoCodeDiscount);
  }, [currency, promoCode, discount, promoCodeDiscount]);

  return (
    <div className="webinars-item-settings-block settings-block">
      <ConfigProvider locale={ruRU}>
        <div className="settings-block-type-1">
          <h4>Введите скидку за приобретение полного курса</h4>
          <p>Скидка указывается в процентах</p>
          <Input
            type="number"
            style={{ width: 'auto' }}
            value={discount}
            placeholder="Скидка по промокоду"
            onChange={onChangeSell}
          />
        </div>
        <div className="settings-block-type-1">
          <h4>Выберите валюту</h4>
          <p>
            Выбранная валюта будет использоваться как для покупки единичных видео, так и полного
            курса
          </p>
          <Select defaultValue={currency} onChange={onChangeSelectCurrency}>
            <Select.Option value="RUB">RUB</Select.Option>
            <Select.Option value="USD">USD</Select.Option>
            <Select.Option value="EUR">EUR</Select.Option>
          </Select>
        </div>
        <div className="settings-block-type-1">
          <h4>Введите промокод</h4>
          <p>
            Это необязательный пункт, вы можете написать собственный промокод, по которому будет
            предоставляться скидка на данный продукт
          </p>
          <Input
            type="text"
            style={{ width: 'auto' }}
            placeholder="Промокод"
            value={promoCode}
            onChange={onChangePromoCode}
          />
          <h4>Введите дополнительную скидку, предоставляемую по промокоду</h4>
          <p>Скидка указывается в процентах</p>
          <Input
            type="number"
            style={{ width: 'auto' }}
            value={promoCodeDiscount}
            placeholder="Скидка по промокоду"
            onChange={onChangePromoCodeSell}
          />
        </div>

        <Button type="primary" onClick={onSaveItemSettings}>
          Сохранить
        </Button>
      </ConfigProvider>
    </div>
  );
}

export default CoursePaymentCardSettings;
