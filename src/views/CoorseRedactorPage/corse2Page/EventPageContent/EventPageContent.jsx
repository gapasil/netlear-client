import React,{useEffect, useState} from 'react';
import './EventPageContent.scss';

import { Popover , Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import VideoPlayer from '../../../../components/VideoPlayer/VideoPlayer';
import WebinarsList from '../../../../components/WebinarsList/Webinars2List/WebinarsList';
import EditButton from '../../../../components/EditButton/EditButton';
import DeleteButton from '../../../../components/DeleteButton/DeleteButton';
import AddItemButton from '../../../../components/AddItemButton/AddItemButton';
import SaveButton from '../../../../components/SaveButton/SaveButton';
import TextEditor from '../../../../components/TextEditor/TextEditor';

import { useDispatch, useSelector } from 'react-redux';
import {
  setMainContentData,
  setMainContentSelectors,
  removeMainContentData,
  addItemMainContentData,
  setAboutSpeakerData,
} from '../../../../redux/actions/eventRedactor/eventRedactor';
import CoursePaymentCard from '../../../../components/CoursePaymentCard/CoursePaymentCard';
import { url } from '../../../../conf';

function EventPageContent2({ variant }) {
  const { Dragger } = Upload;
  const dispatch = useDispatch();
  const eventRedactor = useSelector((state) => state.eventRedactor);
  const data      = eventRedactor.mainContent.data
  const selectors = eventRedactor.mainContent.selectors
  const [videoPreviured, setVideoPreviured] = useState(null)

  const onSelectInputValue = (e, index) => {
    const selector = e.target.attributes.selector.nodeValue;
    const subSelector = e.target.attributes.subSelector.nodeValue;
    const data = e.target.value;
    dispatch(setMainContentData(selector, subSelector, data, index));
  };

  const onSelectTextEditorYouWillLearn = (e) => {
    const selector = 'youWillLearn';
    const subSelector = 'content';
    const value = e;
    dispatch(setMainContentData(selector, subSelector, value));
  };

  const onSelectTextEditorEventProgram = (e) => {
    const selector = 'eventProgram';
    const subSelector = 'content';
    const value = e;
    dispatch(setMainContentData(selector, subSelector, value));
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

  const draggerVideo = (e) =>{

    let target = e.file
    if(!target||!target.type.match("video")){
      return
    }
    const reader = new FileReader()

    reader.onload = e =>{
      setVideoPreviured(e.target.result)
    }

    reader.readAsDataURL(target) 
  }

  useEffect(()=>{
    setVideoPreviured(url +"coorsefiles"+ eventRedactor.aboutSpeaker.data.video)
  },[])

  return (
    <div className="event-page__wrapper">
      <div className="event-page__content event-page-content">
        <div className="event-page-content__points">
          {!selectors.youWillLearn ? (
            <>
              <div className="about-speaker__promo-video">
                    {variant === 'redactor' && !videoPreviured && (
                      <div className="about-speaker__pickup-video">
                        <Dragger {...draggerProps} onChange={draggerVideo}>
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
                    )}
                    {videoPreviured? <VideoPlayer videoURL={videoPreviured} />:null}
              </div>
              <div className="event-page-content__title">
                {variant === 'redactor' ? (
                  <Popover
                    placement="bottomRight"
                    title={'Изменение полей'}
                    content={
                      'Вы можете изменять, удалять или добавлять элементы в список, а также - менять заголовок блока'
                    }
                    trigger="hover">
                    {data.youWillLearn.title}
                    <EditButton selector="youWillLearn" action={setMainContentSelectors} />
                  </Popover>
                ) : (
                  `${data.youWillLearn.title}`
                )}
              </div>
            </>
          ) : (
            <>
              <div className="event-page-content__title">
                <input
                  className="event-page-content__title test-input"
                  type="text"
                  value={data.youWillLearn.title}
                  selector="youWillLearn"
                  subSelector="title"
                  autoFocus
                  placeholder="Введите название блока"
                  onChange={(e) => onSelectInputValue(e)}
                />
                <SaveButton selector="youWillLearn" action={setMainContentSelectors} />
              </div>
            </>
          )}

          {variant === "redactor" ? (
            <div className="event-page-content__points-list">
              <TextEditor
                onChange={onSelectTextEditorYouWillLearn}
                isEditing={selectors.youWillLearn}
                value={data.youWillLearn.content}></TextEditor>
            </div>            
          )
          :
          (
            <div className="event-page-content__points-list">
              <TextEditor
                value={data.youWillLearn.content}></TextEditor>
           </div>    
          )
          }
        </div>
        <div className="event-page-content__program">
          {variant === 'redactor' ? (
            <>
              {!selectors.eventProgram ? (
                <>
                  <h3 className="event-page-content__title">
                    <Popover
                      placement="bottomRight"
                      title={'Изменение полей'}
                      content={
                        'Вы можете изменять, удалять или добавлять элементы в список, а также - менять заголовок блока'
                      }
                      trigger="hover">
                      {data.eventProgram.title}

                      <EditButton selector="eventProgram" action={setMainContentSelectors} />
                    </Popover>
                  </h3>
                  <div className="event-page-content__points-list">
                    <TextEditor
                      onChange={onSelectTextEditorEventProgram}
                      isEditing={selectors.eventProgram}
                      value={data.eventProgram.content}></TextEditor>
                  </div>
                </>
              ) : (
                <>
                  <div className="event-page-content__title">
                    <input
                      className="event-page-content__title test-input"
                      type="text"
                      value={data.eventProgram.title}
                      selector="eventProgram"
                      subSelector="title"
                      autoFocus
                      placeholder="Введите название блока"
                      onChange={(e) => onSelectInputValue(e)}
                    />
                    <SaveButton selector="eventProgram" action={setMainContentSelectors} />
                  </div>
                  <div className="event-page-content__points-list">
                    <TextEditor
                      onChange={onSelectTextEditorEventProgram}
                      isEditing={selectors.eventProgram}
                      value={data.eventProgram.content}></TextEditor>
                  </div>
                </>
              )}
            </>
          ) : (
            <>
              <h3 className="event-page-content__title">{data.eventProgram.title}</h3>
              <div className="event-page-content__points-list">
                <TextEditor
                 value={data.eventProgram.content}></TextEditor>
              </div>
            </>
          )}
        </div>
        <div className="event-page-content__webinars">
          {variant === 'redactor' ? (
            <>
              <h3 className="event-page-content__title">
                <Popover
                  placement="topRight"
                  title={'Редактирование списка вебинаров'}
                  content={'Вы можете изменять, удалять или добавлять элементы в список'}
                  trigger="hover">
                  Вебинары
                  {!selectors.vebinars ? (
                    <EditButton selector="vebinars" action={setMainContentSelectors} />
                  ) : (
                    <SaveButton selector="vebinars" action={setMainContentSelectors} />
                  )}
                </Popover>
              </h3>
            </>
          ) : (
            ''
          )}

          <div className="event-page-content__webinars-list">
            <WebinarsList variant={variant} isEditing={selectors.vebinars} type={2}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageContent2;
