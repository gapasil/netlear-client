import React from 'react';
import './EditUserProfileData.scss';

import { Input, Button, Image, Radio, ConfigProvider, DatePicker, Select } from 'antd';
import moment from 'moment';

import ruRU from 'antd/lib/locale/ru_RU';
import { DeleteTwoTone } from '@ant-design/icons';

import { useDispatch, useSelector } from 'react-redux';
import {
  setTempUserProfileData,
  setTempUserProfileAvatar,
  fetchUploadAvatar,
  setIsSaveDisabled,
} from '../../redux/actions/Temp/UserProfile';

import TextEditor from '../../components/TextEditor/TextEditor';

import { testUploadVimeoVids } from '../../utils/testVimeo';
import { getBase64 } from '../../utils/getBase64';

const dateFormat = 'YYYY/MM/DD';

const { Option } = Select;

function EditUserProfileData() {
  const { userProfile, picture } = useSelector((state) => state.Temp);
  const [filesState, setFilesState] = React.useState([]);

  const ref = React.useRef();
  const avatarRef = React.useRef();
  const dispatch = useDispatch();

  const onPickUpImage = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    // const file2 = avatarRef.current.files[0];
    const url = await getBase64(file);
    let bodyFormData = new FormData();
    bodyFormData.append('file', file);

    dispatch(setTempUserProfileAvatar(url));
    dispatch(fetchUploadAvatar(bodyFormData));
    dispatch(setIsSaveDisabled(false));
    // setIsSaveDisabled(false);
  };

  const onPickUpFile = (e) => {
    const file = e.target.files[0];
    console.log(e);
    if (file) {
      const newFilesArray = [file, ...filesState];
      setFilesState(newFilesArray);
      dispatch(setIsSaveDisabled(false));
      // setIsSaveDisabled(false);

      // testUploadVimeoVids(file);
    }
  };

  const onChangeDatePicker = (value, dateString) => {
    const selector = 'dateOfBirth';
    console.log(value, dateString);
    dispatch(setTempUserProfileData(selector, dateString));
    dispatch(setIsSaveDisabled(false));
    // setIsSaveDisabled(false);
  };

  const onSelectRadioGender = (e) => {
    const value = e.target.value;
    const selector = 'gender';
    dispatch(setTempUserProfileData(selector, value));
    dispatch(setIsSaveDisabled(false));
    // setIsSaveDisabled(false);
  };

  const onSelectСonfidentiality = (e) => {
    const selector = 'confidentialityOfPersonalData';
    const value = e;
    dispatch(setTempUserProfileData(selector, value));
    dispatch(setIsSaveDisabled(false));
    // setIsSaveDisabled(false);
  };

  const onChangeInput = (e) => {
    console.log(e);
    const value = e.target.value;
    const selector = e.target.attributes[1].nodeValue;
    dispatch(setTempUserProfileData(selector, value));
    dispatch(setIsSaveDisabled(false));
    // setIsSaveDisabled(false);
  };

  const onChangeAcademicDegrees = (e) => {
    const selector = 'academicDegrees';
    const value = e;
    dispatch(setTempUserProfileData(selector, value));
    // dispatch(setIsSaveDisabled(false))
  };
  console.log(userProfile);
  return (
    <>
      <div className="edit-user-profile__basic-info underline">
        <span className="edit-user-profile__subtitle">Основные сведения</span>
        <p className="edit-user-profile__subtitle-info">
          Расскажите другим пользователям и спикерам о себе
        </p>
        <div className="edit-user-profile__form-block">
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Фамилия</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="lastName"
                value={userProfile.lastname}
                onChange={onChangeInput}></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Имя</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="firstName"
                value={userProfile.name}
                onChange={onChangeInput}></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Отчество</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="patronymic"
                value={userProfile.patronymic}
                onChange={onChangeInput}></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block input-block__fs">
            <div className="input-block__placeholder">Фото профиля</div>
            <Image width={200} src={picture} className="input-block__avatar"></Image>
            <input
              id={'avatar-input'}
              ref={avatarRef}
              style={{ display: 'none' }}
              type="file"
              name="user[image]"
              selector="avatar"
              multiple={false}
              onChange={onPickUpImage}
            />
            <div className="input-block__upload-image">
              <label htmlFor={'avatar-input'} className="ant-btn ant-btn-primary">
                Загрузить фото
              </label>
              <div className="input-block__help-block">Выберите фото из своей галереи</div>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Профессия или род занятости</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="profession"
                value={userProfile.specialization}
                onChange={onChangeInput}></Input>
              <div className="input-block__help-block">Укажите Ваши профессиональные навыки</div>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Ученые степени или иные достижения</div>
            <div className="input-block__with-info">
              <TextEditor
                onChange={onChangeAcademicDegrees}
                isEditing={true}
                value={userProfile.academicDegrees}
              />
              <div className="input-block__with-info">
                <div className="input-block__help-block">
                  Опишите Ваши достижения в профессиональной сфере (в свободной форме).
                </div>
              </div>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Подтверждение квалификации</div>
            <div className="input-block__with-info">
              {filesState && (
                <div>
                  {filesState.map((el, i) => (
                    <div key={i}>
                      <span>{el.name}</span>
                      <DeleteTwoTone />
                    </div>
                  ))}
                </div>
              )}
              <input
                id={'file-patent-input'}
                type="file"
                ref={ref}
                style={{ display: 'none' }}
                name="user[image]"
                multiple={true}
                className=""
                onChange={onPickUpFile}
              />
              <label htmlFor={'file-patent-input'} className="ant-btn ant-btn-primary">
                Загрузить документы
              </label>
              <div className="input-block__help-block">
                Вы можете загрузить Ваши сертификаты, дипломы, патенты или иные документы,
                подтверждающие Вашу квалификацию
              </div>
              <div className="input-block__help-block">
                Другие пользователи смогут удостовериться в Вашей компетенции
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-user-profile__personal-info underline">
        <span className="edit-user-profile__subtitle">Дополнительная информация</span>
        <p className="edit-user-profile__subtitle-info">Ваши личные данные</p>
        <div className="edit-user-profile__form-block">
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Дата рождения</div>
            <div className="input-block__with-info">
              <ConfigProvider locale={ruRU}>
                <DatePicker
                  onChange={onChangeDatePicker}
                  value={
                    userProfile.dateOfBirth
                      ? moment(`${userProfile.dateOfBirth}`, dateFormat)
                      : null
                  }
                  format={dateFormat}
                />
              </ConfigProvider>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Город</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                value={userProfile.city}
                selector="city"
                onChange={onChangeInput}
                placeholder="Наименование города"></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Пол</div>
            <div className="input-block__with-info">
              <Radio.Group
                defaultValue={userProfile.gender}
                buttonStyle="solid"
                onChange={onSelectRadioGender}>
                <Radio.Button value="Мужской">Мужской</Radio.Button>
                <Radio.Button value="Женский">Женский</Radio.Button>
                {/* <Radio.Button value="o">Другое</Radio.Button> */}
              </Radio.Group>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Номер телефона</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="phoneNumber"
                value={userProfile.phoneNumber}
                onChange={onChangeInput}
                placeholder="Например: +375331112233"></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Конфиденциальность личных данных</div>
            <div className="input-block__with-info">
              <Select
                defaultValue={userProfile.confidentialityOfPersonalData}
                onChange={onSelectСonfidentiality}>
                <Option value="all">Все пользователи</Option>
                <Option value="speakers">Только Спикеры</Option>
                <Option value="me">Только я</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>
      <div className="edit-user-profile__webs underline">
        <span className="edit-user-profile__subtitle">Ссылки</span>
        <p className="edit-user-profile__subtitle-info">Ваши социальные сети/порталы</p>

        <div className="edit-user-profile__form-block">
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Личный веб-сайт</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="url"
                value={userProfile.url}
                onChange={onChangeInput}
                placeholder="https://..."></Input>
            </div>
          </div>

          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Twitter</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="urlTwitter"
                value={userProfile.urlTwitter}
                onChange={onChangeInput}
                placeholder="https://twitter.com/..."></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">Facebook</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="urlFacebook"
                value={userProfile.urlFacebook}
                onChange={onChangeInput}
                placeholder="https://www.facebook.com/"></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">LinkedIn</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="urlLinkedin"
                value={userProfile.urlLinkedin}
                onChange={onChangeInput}
                placeholder="https://www.linkedin.com/..."></Input>
            </div>
          </div>
          <div className="edit-user-profile__input-block input-block">
            <div className="input-block__placeholder">YouTube</div>
            <div className="input-block__with-info">
              <Input
                className="edit-user-profile__base-input"
                selector="urlYoutube"
                value={userProfile.urlYoutube}
                onChange={onChangeInput}
                placeholder="https://www.youtube.com/..."></Input>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditUserProfileData;
