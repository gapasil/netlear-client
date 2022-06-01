import React from 'react';
import './EditUserProfilePassword.scss';

import { Input } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import {
  setTempUserProfilePassword,
  setIsSaveDisabled,
} from '../../redux/actions/Temp/UserProfile';

function EditUserProfilePassword() {
  const { userProfilePassword } = useSelector((state) => state.Temp);
  const dispatch = useDispatch();

  const onSelectPassword = (e) => {
    const value = e.target.value;
    const selector = e.target.attributes[0].nodeValue;
    dispatch(setTempUserProfilePassword(selector, value));

    if (!Object.values(userProfilePassword).includes(null)) {
      dispatch(setIsSaveDisabled(false));
      // setIsSaveDisabled(false);
    }
  };

  return (
    <>
      <div className="edit-user-profile__basic-info underline">
        <span className="edit-user-profile__subtitle">Изменение пароля</span>
        <p className="edit-user-profile__subtitle-info">Вы можете изменить пароль учетной записи</p>
        <div className="edit-user-profile__form-block">
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Старый пароль</div>
            <div className="input-block__with-info">
              <Input.Password
                className="edit-user-profile__base-input"
                selector="oldPassword"
                value={userProfilePassword.oldPassword}
                onChange={onSelectPassword}
              />
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Новый пароль</div>
            <div className="input-block__with-info">
              <Input.Password
                className="edit-user-profile__base-input"
                selector="newPassword"
                value={userProfilePassword.newPassword}
                onChange={onSelectPassword}
              />
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Повторите новый пароль</div>
            <div className="input-block__with-info">
              <Input.Password
                className="edit-user-profile__base-input"
                selector="newPasswordRepeat"
                value={userProfilePassword.newPasswordRepeat}
                onChange={onSelectPassword}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserProfilePassword;
