import authAPI from './api';
import { setSpinFalse, setSpinTrue } from '../spinner';
import { removeLS, getLS, setLS } from '../../../utils/LocalStorage';
import { message } from 'antd';

export const setUserToken = (token) => ({
  type: 'SET_USER_TOKEN',
  token: token,
});

export const setUserData = (data) => ({
  type: 'SET_USER_DATA',
  data: data,
});

export const setUserAvatar = (picture) => ({
  type: 'SET_USER_AVATAR',
  picture: picture,
});

export const setUserLogout = () => ({
  type: 'SET_LOGOUT',
});

export const fetchSignUp = (values) => (dispatch) => {
  const userData = {
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
  };

  authAPI
    .signUp(userData)
    .then((data) => {
      // debugger;
      // setLS('EDMED_USER_TOKEN', data.token);
      // dispatch(setUserToken(data.token));
      // console.log(data);
      message.success('Письмо с подтверждением выслано на указанный Email');
      dispatch(setSpinFalse());
    })
    .catch((error) => {
      // debugger;
      if (error.response.status === 401) {
        message.error('Данный Email уже зарегистрирован');
        dispatch(setSpinFalse());
      }
      console.log(error);
    });
};

export const fetchAuthorization = (id) => (dispatch) => {
  dispatch(setSpinTrue());
  authAPI
    .authorization(id)
    .then((data) => {
      dispatch(setUserToken(data.token));
      console.log(data);
      dispatch(setSpinFalse());
    })
    .catch((error) => console.log(error));
};

export const fetchAuthMe = () => (dispatch) => {
  const userToken = getLS('EDMED_USER_TOKEN');
  dispatch(setSpinTrue());
  authAPI
    .authMe()
    .then((data) => {
      // debugger;
      console.log(data);
      dispatch(setUserData(data));
      dispatch(setSpinFalse());
    })
    .catch((error) => console.log(error));
};

export const fetchLogout = () => (dispatch) => {
  dispatch(setSpinTrue());
  authAPI
    .logout()
    .then((data) => {
      //   debugger;
      console.log(data);
      dispatch(setUserLogout());
      removeLS('EDMED_USER_TOKEN');
      dispatch(setSpinFalse());
      message.success('Вы успешно покинули сессию');
    })
    .catch((error) => {
      debugger;
      console.log(error);
    });
};

export const fetchLogIn = (data) => (dispatch) => {
  dispatch(setSpinTrue());
  authAPI
    .logIn(data)
    .then((data) => {
      console.log(data);
      // dispatch(setUserData(data));
      dispatch(setUserToken(data.token));
      setLS('EDMED_USER_TOKEN', data.token);
      message.success('Вы успешно авторизовались');
      dispatch(setSpinFalse());
    })
    .catch((error) => {
      debugger;
      console.log(error);
      dispatch(setSpinFalse());
    });
};

//Google reg

// export const fetchGoogleToken = () => (dispatch) => {
//   authAPI
//     .authGoogle()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error));
// };
