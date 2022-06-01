import React from 'react';
import './WebinarsList.scss';

import { Collapse, Timeline } from 'antd';
import { LeftCircleTwoTone, ClockCircleOutlined } from '@ant-design/icons';

import testImg from '../../assets/img/medicineSections/cardiovascular-surgery.jpg';
import testImg2 from '../../assets/img/medicineSections/otolaringology.jpg';

import VideoPlayer from '../VideoPlayer/VideoPlayer';
import CoursePaymentCard from '../CoursePaymentCard/CoursePaymentCard.jsx';
import TextEditor from '../TextEditor/TextEditor';
import DeleteButton from '../DeleteButton/DeleteButton';
import SettingsButton from '../SettingsButton/SettingsButton';
import ModalWindow from '../Modal/ModalWindow/ModalWindow';
import SideMenu from '../SideMenu/SideMenu';
import WebinarsItemSettings from '../WebinarsItemSettings/WebinarsItemSettings';
import EventUploadImage from '../EventUploadImage/EventUploadImage';
import AddItemButton from '../AddItemButton/AddItemButton';

import { mainContentPopoversContent } from '../../utils/eventPopoverContent/mainContentPopoverContent';

import { setPaidVideo } from '../../redux/actions/dev';
import {
  removeMainContentVebinarsItem,
  setMainContentVebinarsData,
  addItemMainContentVebinarsData,
} from '../../redux/actions/eventRedactor/eventRedactor';
import { setSideMenuTrue } from '../../redux/actions/sideMenu';
import { useSelector, useDispatch } from 'react-redux';

const { Panel } = Collapse;

function WebinarsList({ variant, isEditing }) {
  const dispatch = useDispatch();
  const { isPaidVideo } = useSelector((state) => state.dev);
  const { data, selectors } = useSelector((state) => state.eventRedactor.mainContent);
  const sideMenu = useSelector((state) => state.sideMenu);
  const { backgroundImg } = mainContentPopoversContent;

  React.useEffect(() => {
    console.log(data.vebinars.length);
  }, [data.vebinars.length]);

  const onOpenVebinarsItemSettings = (i) => {
    const selector = 'eventRedactor';
    dispatch(setSideMenuTrue(selector, i));
  };

  const onSelectTextEditorVebinars = (e, selector, index) => {
    const value = e;
    dispatch(setMainContentVebinarsData(selector, index, value));
  };

  const panelHeader = (obj, index, isEditing) => {
    return (
      <div className="webinars-item__header">
        <div className="webinars-item__left-block">
          <img src={obj.promoImg} alt="img" />
          {isEditing && (
            <EventUploadImage
              index={index}
              selector={'promoImg'}
              action={setMainContentVebinarsData}
              popoverContentType={backgroundImg}
            />
          )}
        </div>
        <div className="webinars-item__right-block">
          <div className="webinars-item__right-block-header">
            <span className="webinars-item__right-block_strong">{index + 1}</span>
            <span className="webinars-item__right-block_type">
              {obj.format === 'recording' ? 'В записи' : 'Прямая трансляция'}
            </span>
            <span
              className="webinars-item__right-block_filled-paid"
              style={{ backgroundColor: !data.vebinars[index].isPaid && 'green' }}>
              {obj.isPaid ? 'Платно' : 'Бесплатно'}
            </span>
            <span className="webinars-item__right-blockk_type">
              {data.vebinars[index].videoDuration} минут
            </span>
          </div>
          <div>
            <TextEditor
              onChange={(e) => onSelectTextEditorVebinars(e, 'title', index)}
              isEditing={selectors.vebinars}
              value={data.vebinars[index].title}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Timeline>
        {data.vebinars.length &&
          data.vebinars.map((el, i) => (
            <Timeline.Item
              key={i}
              dot={
                el.isPaid ? (
                  <ClockCircleOutlined style={{ fontSize: '24px' }} />
                ) : (
                  <ClockCircleOutlined style={{ fontSize: '24px', color: 'green' }} />
                )
              }
              style={{ fontSize: '18px' }}>
              <span className="time-line-date">{data.vebinars[i].date}</span>

              {isEditing && (
                <>
                  <SettingsButton onClick={() => onOpenVebinarsItemSettings(i)} />
                  <DeleteButton index={i} action={removeMainContentVebinarsItem} />
                </>
              )}
              <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => (
                  <LeftCircleTwoTone style={{ fontSize: '32px' }} rotate={isActive ? -90 : 0} />
                )}
                className="site-collapse-custom-collapse">
                <Panel
                  header={panelHeader(el, i, isEditing)}
                  key={i}
                  className="site-collapse-custom-panel">
                  <TextEditor
                    onChange={(e) => onSelectTextEditorVebinars(e, 'content', i)}
                    isEditing={selectors.vebinars}
                    value={data.vebinars[i].content}
                    // selector={'vebinars'}
                    // subSelector={'content'}
                    // action={setMainContentVebinarsData}
                    // vebinarIndex={`${i}`}
                  />
                  {isPaidVideo ? (
                    <VideoPlayer className={'webinars-player'} />
                  ) : el.isPaid ? (
                    <CoursePaymentCard type="segment" dataIndex={i} />
                  ) : (
                    <VideoPlayer className={'webinars-player'} />
                  )}
                </Panel>
              </Collapse>
            </Timeline.Item>
          ))}
      </Timeline>
      {isEditing && (
        <div className="webinars-list__add-item">
          <AddItemButton action={addItemMainContentVebinarsData} selector="vebinars" />
        </div>
      )}

      {data.vebinars.length && (
        <div className="pay-full-course">
          <CoursePaymentCard type="full" variant={variant} />
        </div>
      )}
      {sideMenu.eventRedactor && data.vebinars.length && (
        <SideMenu selector="eventRedactor" title="Основные настройки элемента">
          <WebinarsItemSettings />
        </SideMenu>
      )}
    </>
  );
}

export default WebinarsList;
