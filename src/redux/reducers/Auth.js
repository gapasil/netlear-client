import { setLS } from '../../utils/LocalStorage';

let initialState = {
  firstname: null,
  lastname: null,
  email: null,
  academicDegrees: null,
  picture: null,
  city: null,
  confidentialityOfPersonalData: 'all',
  confirmationOfQualifications: [],
  dateOfBirth: null,
  patronymic: null,
  gender: 'Мужской',
  authorization:null,
  phoneNumber: null,
  derictoriesFile:null,
  profession: null,
  url: null,
  urlFacebook: null,
  urlLinkedin: null,
  urlTwitter: null,
  urlYoutube: null,
  __v: 0,
  _id: null,
};

const Auth = (state = initialState, action) => {
  if (action.type === 'SET_USER_DATA') {
    const data = action.payload;
    return {
      ...state,
      ...data
    }
  }
  if (action.type === 'SET_USER_AVATAR') {
    return {
      ...state,
      picture: action.avatar,
    };
  }
  if (action.type === 'SET_USER_TOKEN') {
    const token = action.token;
    setLS('EDMED_USER_TOKEN', token);
    return {
      ...state,
      token: token,
    };
  }
  if (action.type === 'SET_LOGOUT') {
    return {
      ...state,
      ...initialState,
    };
  }
  return state;
};

export default Auth;
