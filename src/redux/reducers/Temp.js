const initialState = {
  isSaveDisabled: true,

  userProfile: {
    academicDegrees: null,
    city: null,
    confidentialityOfPersonalData: 'all',
    confirmationOfQualifications: [],
    dateOfBirth: null,
    email: null,
    firstName: null,
    lastName: null,
    patronymic: null,
    gender: 'Мужской',
    phoneNumber: null,
    profession: null,
    url: null,
    urlFacebook: null,
    urlLinkedin: null,
    urlTwitter: null,
    urlYoutube: null,
    __v: 0,
    _id: null,
  },
  picture: null,
  userProfilePassword: {
    oldPassword: null,
    newPassword: null,
    newPasswordRepeat: null,
  },
  userProfileEmail: {
    oldEmail: null,
    newEmail: null,
    newEmailRepeat: null,
  },
  
};

const Temp = (state = initialState, action) => {
  if (action.type === 'SET_DEFAUILT_USER-PROFILE_DATA') {
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        ...action.payload,
      },
      picture: action.payload.picture,
    };
  }
  if (action.type === 'SET_TEMP_USER-PROFILE_DATA') {
    const selector = action.selector;
    const value = action.value;
    return {
      ...state,
      userProfile: {
        ...state.userProfile,
        [selector]: value,
      },
    };
  }
  if (action.type === 'SET_TEMP_USER-PROFILE_AVATAR') {
    const value = action.value;
    return {
      ...state,
      picture: value,
    };
  }
  if (action.type === 'SET_TEMP_USER-PROFILE_PASSWORD') {
    const selector = action.selector;
    const value = action.value;
    return {
      ...state,
      userProfilePassword: {
        ...state.userProfilePassword,
        [selector]: value,
      },
    };
  }
  if (action.type === 'SET_TEMP_USER-PROFILE_EMAIL') {
    const selector = action.selector;
    const value = action.value;
    return {
      ...state,
      userProfileEmail: {
        ...state.userProfileEmail,
        [selector]: value,
      },
    };
  }
  if (action.type === 'SET_IS_SAVE_DISABLED') {
    const value = action.boolean;
    return {
      ...state,
      isSaveDisabled: value,
    };
  }
  

  return state;
};

export default Temp;
