const initialState = {
  videoList: [],
  postedCourseId: null,
  courseFiles: { webinarsImg: [] },
  isImagesUploaded : false
};

const uploadingCourse = (state = initialState, action) => {
  if (action.type === 'SET_VIDEOS_FROM_REDACTOR') {
    const vebinarsArray = action.vebinarsArray.filter((el, i) => {
      if (el.video) {
        return el;
      } else return;
    });
    const aboutSpeakerVideo =
      typeof action.aboutSpeaker.video !== 'string' ? [action.aboutSpeaker] : [];
    const concatArray = [...vebinarsArray, ...aboutSpeakerVideo];
    console.log('c', concatArray);
    const videoList = concatArray.map((el, i) => {
      return {
        video: el?.video,
        videoName: el?.videoName,
        videoDescription: el.videoDescription || '',
        uploadingProcess: 0,
        transcodingStatus: null,
        videoURI: null,
        videoURL: null,
      };
    });
    return {
      ...state,
      videoList: videoList,
    };
  }
  if (action.type === 'SET_VIDEO_UPLOADING_PROCESS') {
    const newVideoArray = state.videoList.slice().map((el, i) => {
      if (i === action.index) {
        return { ...el, uploadingProcess: action.percent };
      } else return el;
    });
    return {
      ...state,
      videoList: newVideoArray,
    };
  }

  if (action.type === 'SET_VIDEO_URI') {
    const newVideoArray = state.videoList.slice().map((el, i) => {
      if (i === action.index) {
        return { ...el, videoURI: action.uri };
      } else return el;
    });
    return {
      ...state,
      videoList: newVideoArray,
    };
  }

  if (action.type === 'SET_VIDEO_TRANSCODING_STATUS') {
    const newVideoArray = state.videoList.slice().map((el, i) => {
      if (i === action.index) {
        return { ...el, transcodingStatus: action.status };
      } else return el;
    });
    return {
      ...state,
      videoList: newVideoArray,
    };
  }

  if (action.type === 'SET_VIDEO_URL') {
    const newVideoArray = state.videoList.slice().map((el, i) => {
      if (i === action.index) {
        return { ...el, videoURL: action.url };
      } else return el;
    });
    return {
      ...state,
      videoList: newVideoArray,
    };
  }
  if (action.type === 'SET_POSTED_COURSE_ID') {
    const id = action.payload;
    return {
      ...state,
      postedCourseId: id,
    };
  }
  if (action.type === 'SET_COURSE_IMG') {
    const file = action.file;
    const name = action.name;
    const index = action.index;
    // console.log('reducer:', name, file);
    if (typeof index !== 'boolean') {
      // const webinarsImgArray = state.courseFiles.webinarsImg.slice();
      // const newWebinarsImgArray = webinarsImgArray.push(file);
      // console.log('check:', webinarsImgArray);
      return {
        ...state,
        courseFiles: {
          ...state.courseFiles,
          webinarsImg: [...state.courseFiles.webinarsImg, { file: file, index: index }],
        },
      };
    } else {
      return {
        ...state,
        courseFiles: {
          ...state.courseFiles,
          [name]: file,
        },
      };
    }
  }
  if (action.type === 'SET_IMAGES_UPLOADED') {
    const boolean = action.boolean;
    return {
      ...state,
      isImagesUploaded: boolean,
    };
  }
  //   if (action.type === 'SET_SPIN_FALSE') {
  //     return {
  //         isSpinning: action.payload,
  //     };
  //   }

  return state;
};

export default uploadingCourse;
