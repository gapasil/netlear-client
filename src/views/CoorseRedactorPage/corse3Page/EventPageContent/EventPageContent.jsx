import React from 'react';
import './EventPageContent.scss';

import { Popover } from 'antd';

import WebinarsList from '../../../../components/WebinarsList/Webinars3List/WebinarsList';
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
} from '../../../../redux/actions/eventRedactor/eventRedactor';

function EventPageContent3({ variant }) {
  const dispatch = useDispatch();
  const { data, selectors } = useSelector((state) => state.eventRedactor.mainContent);


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

  return (
    <div className="event-page__wrapper">
      <div className="event-page__content event-page-content">
        <div className="event-page-content__points">
          {!selectors.youWillLearn ? (
            <>
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
            <WebinarsList variant={variant} isEditing={selectors.vebinars} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventPageContent3;
