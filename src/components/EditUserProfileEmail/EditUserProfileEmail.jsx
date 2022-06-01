import React from 'react';
import './EditUserProfileEmail.scss';

import { Input } from 'antd';

import { useSelector, useDispatch } from 'react-redux';
import { setTempUserProfileEmail,setIsSaveDisabled } from '../../redux/actions/Temp/UserProfile';

function EditUserProfileEmail() {
  const { userProfileEmail } = useSelector((state) => state.Temp);
  const dispatch = useDispatch();

  const onSelectEmail = (e) => {
    const value = e.target.value;
    const selector = e.target.attributes[1].nodeValue;
    dispatch(setTempUserProfileEmail(selector, value));

    if (!Object.values(userProfileEmail).includes(null)) {
      // setIsSaveDisabled(false);
      dispatch(setIsSaveDisabled(false))
    }
  };

  return (
    <div className="edit-user-profile__basic-info underline">
      <span className="edit-user-profile__subtitle">Изменение Email</span>
      <p className="edit-user-profile__subtitle-info">
        Вы можете изменить привязку Email к учетной записи
      </p>
      <div className="edit-user-profile__form-block">
        <div className="edit-user-profile__input-block input-block">
          <div className="input-block__placeholder">Старый Email</div>
          <div className="input-block__with-info">
            <Input
              className="edit-user-profile__base-input"
              selector="oldEmail"
              value={userProfileEmail.oldEmail}
              onChange={onSelectEmail}
            />
          </div>
        </div>
        <div className="edit-user-profile__input-block input-block">
          <div className="input-block__placeholder">Новый Email</div>
          <div className="input-block__with-info">
            <Input
              className="edit-user-profile__base-input"
              selector="newEmail"
              value={userProfileEmail.newEmail}
              onChange={onSelectEmail}
            />
          </div>
        </div>
        <div className="edit-user-profile__input-block input-block">
          <div className="input-block__placeholder">Повторите новый Email</div>
          <div className="input-block__with-info">
            <Input
              className="edit-user-profile__base-input"
              selector="newEmailRepeat"
              value={userProfileEmail.newEmailRepeat}
              onChange={onSelectEmail}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfileEmail;
