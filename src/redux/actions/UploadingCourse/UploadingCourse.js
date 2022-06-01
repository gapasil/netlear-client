import uploadingCourseAPI from './api';

export const setVideosFromRedactor = (vebinarsArray, aboutSpeaker) => {
  return {
    type: 'SET_VIDEOS_FROM_REDACTOR',
    vebinarsArray: vebinarsArray,
    aboutSpeaker: aboutSpeaker,
  };
};

export const setVideoUploadingProcess = (percent, index) => ({
  type: 'SET_VIDEO_UPLOADING_PROCESS',
  percent,
  index,
});

export const setVideoURI = (uri, index) => ({
  type: 'SET_VIDEO_URI',
  uri,
  index,
});

export const setVideoTranscodingStatus = (status, index) => ({
  type: 'SET_VIDEO_TRANSCODING_STATUS',
  status,
  index,
});

export const setVideoURL = (url, index) => ({
  type: 'SET_VIDEO_URL',
  url,
  index,
});

export const setPostedCourseId = (id) => ({
  type: 'SET_POSTED_COURSE_ID',
  payload: id,
});

export const setCourseImg = (file, name, index = false) => ({
  type: 'SET_COURSE_IMG',
  file: file,
  name: name,
  index: index,
});

export const fetchPostEventData = (data) => (dispatch) => {
  uploadingCourseAPI
    .postEventData(data)
    .then((data) => {
      // debugger;
      dispatch(setPostedCourseId(data.id));
      console.log('fetch res data:' + data);
      // dispatch(setSpinFalse());
    })
    .catch((error) => {
      console.log('fetch catch error:' + error);
      debugger;
      // console.log(error);
      // dispatch(setSpinFalse());
    });
};

export const fetchPostEventPictures = (eventId, data) => (dispatch) => {
  uploadingCourseAPI
    .putEventImages(eventId, data)
    .then((data) => {
      // debugger;
      // dispatch(setPostedCourseId(data.id));
      console.log('fetch res data:' + data);
      dispatch(setImagesUploaded(true));
      // dispatch(setSpinFalse());
    })
    .catch((error) => {
      console.log('fetch catch error:' + error);
      debugger;
      // console.log(error);
      // dispatch(setSpinFalse());
    });
};

export const setImagesUploaded = (boolean) => ({
  type: 'SET_IMAGES_UPLOADED',
  boolean,
});
