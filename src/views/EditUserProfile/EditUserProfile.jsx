import React from 'react';
import './EditUserProfile.scss';

import { Button, Select, message } from 'antd';

// import ruRU from 'antd/lib/locale/ru_RU';
// import { DeleteTwoTone } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  setDefaultUserProfileData,
  fetchNewPassword,
  fetchNewEmail,
  fetchNewProfileData,
  fetchUploadAvatar,
} from '../../redux/actions/Temp/UserProfile';

import EditUserProfileData from '../../components/EditUserProfileData/EditUserProfileData';
import EditUserProfilePassword from '../../components/EditUserProfilePassword/EditUserProfilePassword';
import EditUserProfileEmail from '../../components/EditUserProfileEmail/EditUserProfileEmail';

const { Option } = Select;

function EditUserProfile({ history }) {
  const userData = useSelector((state) => state.Auth);
  const tempUserData = useSelector((state) => state.Temp);
  const [editDataType, setEditDataType] = React.useState('main');

  const ref = React.useRef();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userData.authorization && !tempUserData.picture) {
      dispatch(setDefaultUserProfileData(userData));
    }
  }, [userData.authorization]);

  const onSelectEditDataType = (e) => {
    setEditDataType(e);
  };

  const onViewUserProfile = () => {
    history.push('/user-profile');
  };

  const onSaveSettings = () => {
    const passwordValues = Object.values(tempUserData.userProfilePassword);
    const emailValues = Object.values(tempUserData.userProfileEmail);
    const userDataObj = {
      ...tempUserData.userProfile,
      avatar: tempUserData.avatar,
    };
    console.log(userDataObj);
    dispatch(fetchNewProfileData(userDataObj));

    if (!passwordValues.includes(null && '')) {
      const passwordObj = { oldPassword: passwordValues[0], newPassword: passwordValues[1] };

      passwordValues[1] === passwordValues[2]
        ? dispatch(fetchNewPassword(passwordObj))
        : message.error('Проверьте совпадение новых паролей');
    }
    if (!emailValues.includes(null && '')) {
      const emailObj = { oldEmail: emailValues[0], newEmail: emailValues[1] };
      emailValues[1] === emailValues[2]
        ? dispatch(fetchNewEmail(emailObj))
        : message.error('Проверьте совпадение новых Email');
    }
  };

  return (
    <div className="edit-user-profile">
      <div className="edit-user-profile__container">
        <div className="edit-user-profile__header underline">
          <div className="edit-user-profile__left-block">
            <h2 className="edit-user-profile__title ">Редактор профиля</h2>
            <Select
              className="edit-user-profile__header-button-size"
              defaultValue={editDataType}
              onChange={onSelectEditDataType}>
              <Option value="main">Основные настройки</Option>
              <Option value="password">Смена пароля</Option>
              <Option value="email">Смена Email </Option>
            </Select>
          </div>

          <div className="edit-user-profile__button-block">
            <Button
              type="primary"
              disabled={tempUserData.isSaveDisabled}
              size="large"
              style={{ marginRight: 10 }}
              className="edit-user-profile__header-button-size"
              onClick={onSaveSettings}>
              Сохранить изменения
            </Button>
            <Button
              type="primary"
              size="large"
              className="edit-user-profile__header-button-size"
              onClick={onViewUserProfile}>
              Посмотреть профиль
            </Button>
          </div>
        </div>
        {editDataType === 'main' ? (
          <EditUserProfileData  />
        ) : editDataType === 'password' ? (
          <EditUserProfilePassword  />
        ) : (
          <EditUserProfileEmail />
        )}
        <div className="edit-user-profile__save-block">
          <div className="input-block__help-block">
            Примечание. Другие учащиеся курса всегда могут видеть ваше имя и фотографию профиля в
            сообщениях форумов и оценках сокурсников. Изображение вашего профиля в отправленных вами
            рейтингах и отзывах доступно всем, кто просматривает каталог Edmed. Дополнительные
            сведения доступны в документе <a href="#">Политика конфиденциальности</a>.
          </div>
          <Button
            type="primary"
            disabled={tempUserData.isSaveDisabled}
            size="large"
            style={{ marginTop: 15 }}
            onClick={onSaveSettings}>
            Сохранить изменения
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EditUserProfile;
