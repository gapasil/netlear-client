import profileAPI from './api';
import { setSpinFalse, setSpinTrue } from '../spinner';
import { removeLS, getLS, setLS } from '../../../utils/LocalStorage';
import { message } from 'antd';
import { fetchAuthMe, setUserAvatar } from '../Auth/Auth';

export const setDefaultUserProfileData = (userData) => ({
  type: 'SET_DEFAUILT_USER-PROFILE_DATA',
  payload: userData,
});

export const setTempUserProfileData = (selector, value) => ({
  type: 'SET_TEMP_USER-PROFILE_DATA',
  selector: selector,
  value: value,
});

export const setTempUserProfileAvatar = (value) => ({
  type: 'SET_TEMP_USER-PROFILE_AVATAR',
  value: value,
});

export const setTempUserProfilePassword = (selector, value) => ({
  type: 'SET_TEMP_USER-PROFILE_PASSWORD',
  selector: selector,
  value: value,
});

export const setTempUserProfileEmail = (selector, value) => ({
  type: 'SET_TEMP_USER-PROFILE_EMAIL',
  selector: selector,
  value: value,
});

export const fetchNewPassword = (data) => (dispatch) => {
  dispatch(setSpinTrue());
  profileAPI
    .newPassword(data)
    .then((data) => {
      console.log(data);
      // dispatch(setUserData(data));
      // dispatch(setUserToken(data.token));
      // setLS('EDMED_USER_TOKEN', data.token);
      message.success('Данные пароля изменены!');
      dispatch(setSpinFalse());
    })
    .catch((error) => {
      debugger;
      console.log(error);
      dispatch(setSpinFalse());
    });
};

export const fetchNewEmail = (data) => (dispatch) => {
  dispatch(setSpinTrue());
  profileAPI
    .newEmail(data)
    .then((data) => {
      console.log(data);
      // dispatch(setUserData(data));
      // dispatch(setUserToken(data.token));
      // setLS('EDMED_USER_TOKEN', data.token);
      message.success('Данные Email изменены!');
      dispatch(setSpinFalse());
    })
    .catch((error) => {
      debugger;
      console.log(error);
      dispatch(setSpinFalse());
    });
};

export const fetchNewProfileData = (data) => (dispatch) => {
  dispatch(setSpinTrue());
  profileAPI
    .newProfileData(data)
    .then((data) => {
      console.log(data);
      // debugger;
      // dispatch(setUserData(data));
      // dispatch(setUserToken(data.token));
      // setLS('EDMED_USER_TOKEN', data.token);
      message.success('Данные профиля изменены!');
      dispatch(setSpinFalse());
      dispatch(fetchAuthMe());
    })
    .catch((error) => {
      debugger;
      console.log(error);
      dispatch(setSpinFalse());
    });
};

export const fetchUploadAvatar = (data) => (dispatch) => {
  dispatch(setSpinTrue());
  profileAPI
    .uploadAvatar(data)
    .then((data) => {
      console.log(data);
      dispatch(setSpinFalse());
      message.success('Фото профиля загружено!');
      // dispatch(setUserAvatar(data.picture));
    })
    .catch((error) => {
      debugger;
      console.log(error);
      dispatch(setSpinFalse());
    });
};

export const setIsSaveDisabled = (boolean) => ({
  type: 'SET_IS_SAVE_DISABLED',
  boolean: boolean,
});
