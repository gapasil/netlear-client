import React from 'react';
import './UserProfile.scss';

import { useSelector, useDispatch } from 'react-redux';
import { setDefaultUserProfileData } from '../../redux/actions/Temp/UserProfile';

import TextEditor from '../../components/TextEditor/TextEditor';

import { Button } from 'antd';
import {
  TwitterOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  YoutubeOutlined,
  EditOutlined,
} from '@ant-design/icons';

function UserProfile({ history }) {
  const { userProfile, picture } = useSelector((state) => state.Temp);
  const userData = useSelector((state) => state.Auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    console.log(userData);
    if (userData.authorization && !picture) {
      dispatch(setDefaultUserProfileData(userData));
    }
  }, [userData.authorization]);

  const onClickEditUserProfile = () => {
    history.push('/edit-user-profile');
  };

  const isValidField = (field) => {
    if (field !== null) {
      return field;
    } else {
      return '';
    }
  };

  return (
    <div className="user-profile">
      <div className="user-profile__background"></div>
      <div className="user-profile__content">
        <div className="user-profile__edit-ico" onClick={onClickEditUserProfile}>
          <EditOutlined />
        </div>
        <div className="user-profile__basic-info">
          <div className="user-profile__user-card user-card">
            <div
              className="user-card__avatar"
              style={{
                backgroundImage: `url(${picture})`,
              }}></div>
            <div className="user-card__name">{`${userProfile.lastName} ${
              userProfile.firstName
            } ${isValidField(userProfile.patronymic)}`}</div>
          </div>
          {userProfile.profession && (
            <div className="user-profile__profession">{userProfile.profession}</div>
          )}
        </div>
        <div className="user-profile__achievements info-card">
          <div className="info-card__title">Достижения/Ученые степени</div>
          <TextEditor onChange="" isEditing={false} value={userProfile.academicDegrees} />
        </div>
        <div className="user-profile__personal-info info-card">
          <div className="info-card__title">Личная информация</div>
          {userProfile.dateOfBirth && (
            <>
              <div className="info-card__content">
                <div className="info-card__placeholder">Дата рождения:</div>
                <div className="info-card__data">{userProfile.dateOfBirth}</div>
              </div>
            </>
          )}
          {userProfile.city && (
            <>
              <div className="info-card__content">
                <div className="info-card__placeholder">Город:</div>
                <div className="info-card__data">{userProfile.city}</div>
              </div>
            </>
          )}
          {userProfile.gender && (
            <>
              <div className="info-card__content">
                <div className="info-card__placeholder">Пол:</div>
                <div className="info-card__data">{userProfile.gender}</div>
              </div>
            </>
          )}
          {userProfile.phoneNumber && (
            <>
              <div className="info-card__content">
                <div className="info-card__placeholder">Номер телефона:</div>
                <div className="info-card__data">{userProfile.phoneNumber}</div>
              </div>
            </>
          )}
        </div>
        <div className="user-profile__webs info-card">
          <div className="info-card__title">Социальные сети/Интернет-ресурсы</div>
          <div className="info-card__content links-block">
            <a className="links-block__personal" href={userProfile.url}>
              {userProfile.url}
            </a>
            <div className="links-block__social-networks">
              <a href={userProfile.urlTwitter}>
                <TwitterOutlined />
              </a>
              <a href={userProfile.urlFacebook}>
                <FacebookOutlined />
              </a>
              <a href={userProfile.urlLinkedin}>
                <LinkedinOutlined />
              </a>
              <a href={userProfile.urlYoutube}>
                <YoutubeOutlined />
              </a>
            </div>
          </div>
        </div>
        <Button type="primary" size="large" onClick={onClickEditUserProfile}>
          Редактировать профиль
        </Button>
      </div>
    </div>
  );
}

export default UserProfile;
