import React from 'react';
import './EventPageAboutSpeaker.scss';

import { Popover, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

import speakerImg from '../../../../assets/img/lector_1.jpg';

import VideoPlayer from '../../../../components/VideoPlayer/VideoPlayer';
import EditButton from '../../../../components/EditButton/EditButton';
import SaveButton from '../../../../components/SaveButton/SaveButton';
import TextEditor from '../../../../components/TextEditor/TextEditor';
import EventUploadImage from '../../../../components/EventUploadImage/EventUploadImage';

import { useDispatch, useSelector } from 'react-redux';
import {
  setAboutSpeakerSelectors,
  setAboutSpeakerData,
} from '../../../../redux/actions/eventRedactor/eventRedactor';

import { aboutSpeakerPopoverContent } from '../../../../utils/eventPopoverContent/aboutSpeakerPopoverContent';
import { url } from '../../../../conf';

const { Dragger } = Upload;

function EventPageAboutSpeaker3({ variant }) {
  const dispatch = useDispatch();
  const { data, selectors } = useSelector((state) => state.eventRedactor.aboutSpeaker);
  const isEditing = selectors.blockEditing;
  const popoverContent = aboutSpeakerPopoverContent;
  
  console.log(data);

  const onSelectInputValue = (e) => {
    const selector = e.target.attributes.selector.nodeValue;
    const data = e.target.value;
    console.log(e);
    dispatch(setAboutSpeakerData(selector, '', data));
  };

  const onSelectTextEditorAboutSpeaker = (e) => {
    const value = e;
    const selector = 'description';
    dispatch(setAboutSpeakerData(selector, '', value));
  };

  const draggerProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
    beforeUpload: (file) => {
      const selector = 'video';
      dispatch(setAboutSpeakerData(selector, '', file));
      return false;
    },
  };

  return (
    <div className="about-speaker">
      <div className="about-speaker__wrapper">
        <div className="about-speaker__info">
          <div className="about-speaker__photo">
            {isEditing && (
              <EventUploadImage
                selector="img"
                action={setAboutSpeakerData}
                popoverContentType={popoverContent.img}
                index={1001}
              />
            )}
            <img src={data.img} alt="" />
          </div>

          <div className="about-speaker__description speaker-description">
            <span className="speaker-description__who">спикер</span>

            {!isEditing ? (
              <>
                {variant === 'redactor' && (
                  <EditButton action={setAboutSpeakerSelectors} selector="blockEditing" />
                )}
                <h2 className="speaker-description__name">{data.fullName}</h2>
                <h3 className="speaker-description__profession">{data.career}</h3>
              </>
            ) : (
              <>
                <SaveButton action={setAboutSpeakerSelectors} selector="blockEditing" />
                <Popover placement="topRight" title={'asdasdd'} content={'asdasd'} trigger="focus">
                  <input
                    type="text"
                    className="test-input speaker-description__name_input"
                    value={data.fullName}
                    selector="fullName"
                    autofocus
                    onChange={onSelectInputValue}
                  />
                </Popover>
                <Popover placement="topRight" title={'asdasdd'} content={'asdasd'} trigger="focus">
                  <input
                    type="text"
                    className="test-input speaker-description__profession_input"
                    value={data.career}
                    selector="career"
                    autoFocus
                    onChange={onSelectInputValue}
                  />
                </Popover>
              </>
            )}
            <div className="event-page-content__points-list">
              <TextEditor
                onChange={onSelectTextEditorAboutSpeaker}
                isEditing={selectors.blockEditing}
                value={data.description}></TextEditor>
            </div>
          </div>
        </div>
      </div>
      <div className="about-speaker__promo-video">
      {variant === 'redactor' && isEditing? 
          <div className="about-speaker__pickup-video">
            <Dragger {...draggerProps}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Кликните или перетащите сюда Ваше рекламное промо-видео
              </p>
              <p className="ant-upload-hint">
                Вы можете загрузить рекламное промо-видео с рассказом о себе и курсе.
              </p>
              <p className="ant-upload-hint">
                Данное видео будет доступно любому пользователю и будет отображаться на этом месте.
              </p>
              <p className="ant-upload-hint">
                Рекламное промо-видео повышает вероятность покупки курса другими пользователями.
              </p>
            </Dragger>
          </div>
          :
          variant !== "redactor"?
          <VideoPlayer videoURL={`${url}coorsefiles/${data.video}`} />
          :
          null
        }
        {variant === "redactor"?
        <div style={{width:"60%"}}>
          {!isEditing && <VideoPlayer videoURL={data.video} />}
        </div>        
        :
        null
        }
      </div>
    </div>
  );
}

export default EventPageAboutSpeaker3;
