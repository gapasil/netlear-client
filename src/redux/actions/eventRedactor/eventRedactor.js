import eventRedactorAPI from './api';


export const setBannerData = (selector, index, data) => ({
  type: 'SET_BANNER_DATA',
  selector: selector,
  data: data,
});

export const setBannerSelectors = (selector, boolean) => ({
  type: 'SET_BANNER_SELECTOR',
  selector: selector,
  boolean: boolean,
});

export const setMainContentData = (selector, subSelector, data) => ({
  type: 'SET_MAIN_CONTENT_DATA',
  selector: selector,
  subSelector: subSelector,
  data: data,
});

export const removeMainContentVebinarsItem = (index) => ({
  type: 'REMOVE_MAIN_CONTENT_VEBINARS_ITEM',
  index: index,
});

export const setMainContentVebinarsData = (selector, index, data) => ({
  type: 'SET_MAIN_CONTENT_VEBINARS_DATA',
  selector: selector,
  index: index,
  data: data,
});

export const addItemMainContentVebinarsData = (selector) => ({
  selector: selector,
  type: 'ADD_ITEM_MAIN_CONTENT_VEBINARS_DATA',
});

export const setMainContentSelectors = (selector, boolean) => ({
  type: 'SET_MAIN_CONTENT_SELECTOR',
  selector: selector,
  boolean: boolean,
});

export const setCoorseRedux = (settingsObject) => {
  console.log(settingsObject);
  return{
    type: 'SET_COORSE',
    payload: settingsObject,
  }
};

export const setMaunContentVebinarsSettings = (settingsObject, index) => ({
  type: 'SET_MAIN_CONTENT_VEBINARS_SETTINGS',
  payload: settingsObject,
  index: index,
});

export const setAllSelectors = (boolean) => ({
  type: 'SET_ALL_SELECTORS',
  boolean: boolean,
});

export const setFullCourseSettings = (settingsObject) => ({
  type: 'SET_FULL_COURSE_SETTINGS',
  payload: settingsObject,
});

export const setFullCourseCost = () => ({
  type: 'SET_FULL_COURSE_COST',
});

export const setAboutSpeakerSelectors = (selector, boolean) => ({
  type: 'SET_ABOUT_SPEAKER_SELECTOR',
  selector: selector,
  boolean: boolean,
});

export const setAboutSpeakerData = (selector, index, data) => ({
  type: 'SET_ABOUT_SPEAKER_DATA',
  selector: selector,
  data: data,
});

// export const fetchPostVimeoVids = (video, title, description) => (dispatch) => {
//   eventRedactorAPI
//     .postVimeoVids(video, title, description)
//     .then((data) => {
//       // debugger;
//       console.log('fetch data:' + data);
//       // message.success('Письмо с подтверждением выслано на указанный Email');
//       // dispatch(setSpinFalse());
//     })
//     .catch((error) => {
//       console.log('fetch error:' + error);
//       // debugger;
//       if (error.response.status === 401) {
//         // message.error('Данный Email уже зарегистрирован');
//         // dispatch(setSpinFalse());
//       }
//       // console.log(error);
//     });
// };



export const fetchGetAllCourses = () => (dispatch) => {
  eventRedactorAPI
    .getAllCourses()
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
};
