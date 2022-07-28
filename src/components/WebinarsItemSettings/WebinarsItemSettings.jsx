import React, { useEffect, useState } from 'react';
import './WebinarsItemSettings.scss';

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
import {
  setMaunContentVebinarsSettings,
  setFullCourseCost,
} from '../../redux/actions/eventRedactor/eventRedactor';
import { setSideMenuFalse } from '../../redux/actions/sideMenu';

import { testUploadVimeoVids } from '../../utils/testVimeo';

function WebinarsItemSettings() {
  const dispatch = useDispatch();
  const { index, eventRedactor } = useSelector((state) => state.sideMenu);
  const data = useSelector(
    (state) => state.eventRedactor.mainContent.data.vebinars[index ? index : 0],
  );
  const [isPaid, seIsPaid] = React.useState(data.isPaid || false); 
  const [format, setFormat] = React.useState(data.format || 'recording');
  const [date, setDate] = React.useState(data.date || null);
  const [cost, setCost] = React.useState(data.cost || 0);
  const [currency, setCurrency] = React.useState(data.currency || 'RUB');
  const [promoCode, setPromoCode] = React.useState(data.promocode || '');
  const [personalDiscount, setPersonalDiscount] = React.useState(data.personalDiscount || 0);
  const [videoPreviured, setVideoPreviured] = useState(data.video || null);
  const [video, setVideo] = useState(data.video || null);
  const [videoName, setVideoName] = React.useState(data.videoName || null);
  const [videoDescription, setVideoDescription] = React.useState(data.videoDescription || null);

  React.useEffect(() => {
    console.log('data:', data);
  }, [data]);

  const onChangeDatePicker = (value, dateString) => {
    // console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setDate(dateString);
  };

  const onChangeSelectFormat = (value) => {
    // console.log(`selected ${value}`);
    setFormat(value);
  };

  const onOkDatePicker = (value) => {
    // console.log('onOk: ', value);
  };

  const onChangeRadioIdPaid = (e) => {
    // console.log('radio checked', e.target.value);
    seIsPaid(e.target.value);
  };

  const onChangeSelectCost = (e) => {
    // console.log('select cost:', e.target.value);
    setCost(e.target.value);
  };

  const onChangeSelectCurrency = (value) => {
    // console.log(`selected ${value}`);
    setCurrency(value);
  };

  const onChangePromoCode = (e) => {
    setPromoCode(e.target.value);
  };

  const onChangePromoCodeSell = (e) => {
    setPersonalDiscount(e.target.value);
  };

  const onUploadVideo = async(e) => {

    setVideo(e)

    if(!e||!e.type.match("video")){
      return
    }
    const reader = new FileReader()

    reader.onload = e =>{
      setVideoPreviured(e.target.result)
    }

    reader.readAsDataURL(e) 
  };

  const onChangeVideoName = (e) => {
    const value = e.target.value;
    setVideoName(value);
  };

  const onChangeVideoDescription = (e) => {
    const value = e.target.value;
    setVideoDescription(value);
  };

  const setAllSettingsDefault = () => {
    seIsPaid(true);
    setFormat(data.format || 'В записи');
    setDate(data.date || null);
    setCost(data.cost || 0);
    setCurrency(data.currency || 'RUB');
    setPromoCode(data.promocode || '');
    setPersonalDiscount(data.personalDiscount || 0);
    setVideo(null);
    setVideoName(data.videoName || '');
    setVideoDescription(data.videoDescription || '');
  };

  const onSaveItemSettings = () => {
    if (isPaid) {
      const dataObj = {
        isPaid,
        format,
        date,
        cost,
        currency,
        promoCode,
        personalDiscount,
        video,
        videoName,
        videoDescription,
      };
      dispatch(setMaunContentVebinarsSettings(dataObj, index));
      dispatch(setFullCourseCost());
    } else {
      const dataObj = {
        isPaid,
        format,
        date,
        cost: 0,
        currency: 'RUB',
        promoCode: '',
        personalDiscount: 0,
        video,
        videoName,
        videoDescription,
      };
      dispatch(setMaunContentVebinarsSettings(dataObj, index));
      dispatch(setFullCourseCost());
    }
    setAllSettingsDefault();
    dispatch(setSideMenuFalse());
  };

  // React.useEffect(() => {
  //   console.log(isPaid, format, date, cost, currency, promoCode, personalDiscount);
  // }, [isPaid, format, date, cost, currency, promoCode, personalDiscount]);

  return (
    <div className="webinars-item-settings-block settings-block">
      {format === "recording" && (
        <video src={videoPreviured} width="300px" controls></video>
      )}

      <ConfigProvider locale={ruRU}>
        <div className="settings-block-type-1">
          <h4>Выберите тип предоставляемого контента</h4>
          <Select defaultValue={format} onChange={onChangeSelectFormat}>
            <Select.Option value="В записи">В записи</Select.Option>
            <Select.Option value="Онлайн трансляция">Онлайн трансляция</Select.Option>
          </Select>
          {format === 'В записи' && (
            <>
              <Upload action={onUploadVideo} listType="video" maxCount={1} onRemove={()=>setVideo("")}>
                <Button>
                  <UploadOutlined /> Загрузить видео
                </Button>
              </Upload>
            </>
          )}
        </div>
        {format === 'В записи' && (
          <div className="settings-block-type-1">
            <h4>Введите название и краткое описание видео</h4>
            <p>Это обязательный пункт</p>
            <Input
              type="string"
              value={videoName}
              style={{ width: 'auto' }}
              placeholder="Название видео"
              onChange={onChangeVideoName}
            />
            <Input
              type="string"
              value={videoDescription}
              style={{ width: 'auto' }}
              placeholder="Краткое описание"
              onChange={onChangeVideoDescription}
            />
          </div>
        )}
        <div className="settings-block-type-1">
          {format === 'В записи' ? (
            <>
              <h4>Выберите дату появления видео в доступе</h4>
              <p>Это необязательный пункт, если дата не выбрана, то видео будет доступно сразу</p>
              <DatePicker onChange={onChangeDatePicker} onOk={onOkDatePicker} />
            </>
          ) : (
            <>
              <h4>Выберите дату и время проведения мероприятия</h4>
              <DatePicker showTime onChange={onChangeDatePicker} onOk={onOkDatePicker} />
            </>
          )}
        </div>
        <div className="settings-block-type-1">
          <h4>Выберите тип предоставляемого контента</h4>
          <Radio.Group onChange={onChangeRadioIdPaid} value={isPaid}>
            <Radio value={false}>Бесплатно</Radio>
            <Radio value={true}>Платный контент</Radio>
          </Radio.Group>
        </div>

        {isPaid && (
          <>
            <div className="settings-block-type-1">
              <h4>Введите стоимость предоставляемого контента</h4>
              <Input
                type="number"
                value={cost}
                style={{ width: 'auto' }}
                placeholder="Стоимость"
                onChange={onChangeSelectCost}
              />
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
              <h4>Введите скидку, предоставляемую по промокоду</h4>
              <p>Скидка указывается в процентах</p>
              <Input
                type="number"
                style={{ width: 'auto' }}
                value={personalDiscount}
                placeholder="Скидка по промокоду"
                onChange={onChangePromoCodeSell}
              />
            </div>
          </>
        )}

        <Button type="primary" onClick={onSaveItemSettings}>
          Сохранить
        </Button>
      </ConfigProvider>
    </div>
  );
}

export default WebinarsItemSettings;
