import React from 'react';
import './EventDeployPanel.scss';

import { Progress, Upload } from 'antd';
import { CheckCircleFilled, ClockCircleFilled } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { setMaunContentVebinarsSettings } from '../../redux/actions/eventRedactor/eventRedactor';
import {
  setVideosFromRedactor,
  setVideoUploadingProcess,
  setVideoURI,
  setVideoTranscodingStatus,
  setVideoURL,
  fetchPostEventData,
  fetchPostEventPictures,
} from '../../redux/actions/UploadingCourse/UploadingCourse';

import {
  testUploadVimeoVids,
  testCheckTranscodingVimeoVids,
  testGetVimeoVidsURL,
} from '../../utils/testVimeo';

function EventDeployPanel() {
  const eventData = useSelector((state) => state.eventRedactor);
  const vebinarsData = useSelector((state) => state.eventRedactor.mainContent.data.vebinars);
  const uploadingData = useSelector((state) => state.UploadingCourse);
  const [videoURLFlag, setVideoURLFlag] = React.useState(true);
  // const [checkTranscodingFlag, setCheckTranscodingFlag] = React.useState(true);

  const dispatch = useDispatch();

  const dispatchUploadingVideoProcess = (percent, index) => {
    dispatch(setVideoUploadingProcess(percent, index));
  };
  // const dispatchVideoURI = (uri, index) => {
  //   dispatch(setVideoURI(uri, index));
  // };

  // const dispatchVideoTranscodingStatus = (status, index) => {
  //   dispatch(setVideoTranscodingStatus(status, index));
  // };

  // const dispatchVideoURL = (url, index) => {
  //   dispatch(setVideoURL(url, index));
  // };

  // React.useEffect(() => {
  //   testOnLoad();
  // }, []);

  // React.useEffect(() => {
  //   uploadingData.videoList.forEach((el, i) => {
  //     if (el.videoURI && !el.videoURL && videoURLFlag) {
  //       setVideoURLFlag(false);
  //       testGetVimeoVidsURL(el.videoURI, dispatchVideoURL, i);
  //     }
  //   });
  // }, [uploadingData.videoList, videoURLFlag]);

  // React.useEffect(() => {
  //   if (uploadingData.videoList.find((el) => !el.videoURL)) {
  //     setTimeout(() => {
  //       setVideoURLFlag(true);
  //     }, 3000);
  //   } else if (uploadingData.videoList.every((el) => el.videoURL)) {
  //     uploadFullCourseData();
  //   }
  // }, [!videoURLFlag]);

  // React.useEffect(() => {
  //   if (uploadingData.postedCourseId) {
  //     uploadFullCourseImgs();
  //   }
  // }, [uploadingData.postedCourseId]);

  // React.useEffect(() => {
  //   if (uploadingData.videoList.find((el) => el.transcodingStatus !== 'complete')) {
  //     setTimeout(() => {
  //       // console.log('flag:', checkTranscodingFlag);
  //       setCheckTranscodingFlag(true);
  //     }, 5000);
  //   }
  // }, [!checkTranscodingFlag]);

  // const testOnLoad = () => {
  //   uploadVideoFiles(uploadingData.videoList);
  // };

  // const uploadVideoFiles = async (videoArray) => {
  //   await videoArray.forEach(async (el, i) => {
  //     testUploadVimeoVids(
  //       el.video,
  //       `${el.videoName}`,
  //       `${el.videoDescription}`,
  //       dispatchUploadingVideoProcess,
  //       dispatchVideoURI,
  //       i,
  //     );
  //   });
  // };

  // const checkTranscodingVideoStatus = (videoURI) => {
  //   testCheckTranscodingVimeoVids(videoURI, setVideoTranscodingStatus);
  // };

  const testAppendVideo = async (e) => {
    const video = e;
    console.log(video.type, video.name);
    const dataObj = {
      isPaid: true,
      format: 'recording',
      date: '',
      cost: 0,
      currency: 'RUB',
      promoCode: '',
      personalDiscount: 0,
      video: video,
      videoName: video.name,
      videoDescription: video.type,
    };
    await vebinarsData.forEach((el, i) => dispatch(setMaunContentVebinarsSettings(dataObj, i)));
  };

  const uploadFullCourseData = async () => {
    //Замена всех картинок в курсе на пустую строку (для их дальнейшей загрузки через формдату)
    //замена всех полей video на уже сформированную ссылку из UploadingCourse.videoList
    const videoList = uploadingData.videoList;
    const fullCourseData = {
      banner: { ...eventData.banner.data, backgroundImg: '' },
      mainContent: {
        ...eventData.mainContent.data,
        vebinars: eventData.mainContent.data.vebinars.map((el, i) => {
          return {
            ...el,
            promoImg: '',
            video: videoList[i] ? videoList[i].videoURL : false,
          };
        }),
      },
      aboutSpeaker: {
        ...eventData.aboutSpeaker.data,
        img: '',
        video: videoList[videoList.length - 1].videoURL,
      },
    };
    await dispatch(fetchPostEventData(fullCourseData));
  };

  const uploadFullCourseImgs = async () => {
    const imgKeys = Object.keys(uploadingData.courseFiles);
    const imgValues = Object.values(uploadingData.courseFiles);
    console.log(imgKeys, imgValues);
    await imgKeys.map(async (el, i) => {
      if (el === 'webinarsImg') {
        await imgValues[i].map(async (el2, i) => {
          let bodyFormData = new FormData();
          bodyFormData.append('webinarImg', el2.file, el2.index);
          for (var value of bodyFormData.values()) {
            await dispatch(fetchPostEventPictures(uploadingData.postedCourseId, bodyFormData));
          }
          return;
        });
      } else {
        let bodyFormData = new FormData();
        bodyFormData.append(`${el}`, imgValues[i]);
        for (var value of bodyFormData.values()) {
          await dispatch(fetchPostEventPictures(uploadingData.postedCourseId, bodyFormData));
        }
        return;
      }
    });
  };

  return (
    <>
      <div className="deploy-panel">
        <div className="deploy-panel__title">
          <h2>Эта панель отображает процесс загрузки Вашего курса, поэтапно</h2>
          <h3>
            Пожалуйста, не выключайте компьютер и не закрывайте страницу до полного завершения всех
            процессов
          </h3>
          {/* <button onClick={uploadVideoFiles}>test upload videos</button> */}
          {/* <button onClick={checkTranscodingVideoStatus}>check transcoding video status</button> */}
          {/* <button onClick={getVideoURL}> get video URL</button> */}
          {/* <Upload action={testAppendVideo} listType="video" maxCount={1}>
            Видео
          </Upload> */}
          {/* <button
            onClick={() =>
              dispatch(setVideosFromRedactor(vebinarsData, eventData.aboutSpeaker.data))
            }>
            {' '}
            pull vids
          </button> */}
          {/* <button onClick={testOnLoad}>test on load</button> */}
          {/* <button onClick={uploadFullCourseData}> upload full course data</button> */}
          {/* <button onClick={uploadFullCourseImgs}> upload full course imgs</button> */}
        </div>
        <div className="deploy-panel__content">
          <p>Начинаю получение ключей доступа и процесс загрузки данных...</p>
          {uploadingData.videoList.length && (
            <div className="deploy-content">
              <h4 className="deploy-content__title">Загружаю видео-файлы на хостинг</h4>
              {uploadingData.videoList.map((el, i) => {
                return (
                  <div className="deploy-content__item" key={i}>
                    <p>{el.videoName}</p>
                    <Progress percent={el.uploadingProcess} />
                    {el.videoURI ? (
                      <div className="deploy-content__item_block">
                        <p>Ключ доступа получен</p>
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                      </div>
                    ) : el.uploadingProcess === 100 ? (
                      <div className="deploy-content__item_block">
                        <p>Получаю ключ доступа</p>
                        <ClockCircleFilled style={{ color: '#0080ff' }} />
                      </div>
                    ) : (
                      ''
                    )}
                    {el.videoURL ? (
                      <div className="deploy-content__item_block">
                        <p>Ссылка на видео получена</p>
                        <CheckCircleFilled style={{ color: '#52c41a' }} />
                      </div>
                    ) : el.uploadingProcess === 100 ? (
                      <div className="deploy-content__item_block">
                        <span>Получаю ссылку на перекодирование</span>
                        <ClockCircleFilled style={{ color: '#0080ff' }} />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="deploy-panel__content">
          {uploadingData.videoList.every((el) => el.videoURL) && (
            <h4 className="deploy-content__title">Загружаю данные о курсе на сервер</h4>
          )}
          <div className="deploy-content">
            <div className="deploy-content__item">
              {uploadingData.postedCourseId ? (
                <div className="deploy-content__item_block">
                  <p>JSON данные загружены</p>
                  <CheckCircleFilled style={{ color: '#52c41a' }} />
                </div>
              ) : uploadingData.videoList.every((el) => el.videoURL) ? (
                <div className="deploy-content__item_block">
                  <p>Загружаю JSON данные</p>
                  <ClockCircleFilled style={{ color: '#0080ff' }} />
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="deploy-content__item">
              {uploadingData.isImagesUploaded ? (
                <div className="deploy-content__item_block">
                  <p>Фото материалы загружены</p>
                  <CheckCircleFilled style={{ color: '#52c41a' }} />
                </div>
              ) : uploadingData.postedCourseId ? (
                <div className="deploy-content__item_block">
                  <p>Загружаю фото материалы</p>
                  <ClockCircleFilled style={{ color: '#0080ff' }} />
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="deploy-overlay"></div>
    </>
  );
}

export default EventDeployPanel;
