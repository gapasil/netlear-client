import React from 'react';
import './HeaderUserBlock.scss';

import { useHistory, Link } from 'react-router-dom';

import { Avatar, Badge, Menu, Dropdown, Space, Button, Select } from 'antd';
import { UserOutlined, DownOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import ButtonCustom from '../ButtonCustom/ButtonCustom';

import buttonArrowImg from '../../assets/img/button/arrow.png';
import flagRusImg from '../../assets/img/languages/rus.png';
import flagUKImg from '../../assets/img/languages/uk.png';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogout } from '../../redux/actions/Auth/Auth';

// import { userLogout } from '../../redux/actions/user';
import { showModal } from '../../redux/actions/modal';
import { setSpinTrue } from '../../redux/actions/spinner';

import ModalWindow from '../Modal/ModalWindow/ModalWindow';
import Spinner from '../Spinner/Spinner';

const { Option } = Select;

function HeaderUserBlock({}) {
  const width = window.innerWidth;
  const dispatch = useDispatch();
  const history = useHistory();

  const userData = useSelector((state) => state.Auth);
  const { logoutModal } = useSelector((state) => state.modal);

  const onClickLogIn = () => {
    history.push('/login-page');
  };

  const onClickRegister = () => {
    history.push('/reg-page');
  };

  const onClickLogOut = () => {
    dispatch(showModal('logoutModal'));
  };

  const handleModalOk = () => {
    history.push('/');
    dispatch(fetchLogout());
    // dispatch(userLogout());
  };

  function onSelectLanguage(value) {
    console.log(`selected ${value}`);
  }

  const menu = (
    <Menu>
      <Spinner color={'blue'}>
        <Menu.Item key="0">
          <Link to={'/event'}>Мое обучение</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={'/event-redactor'}>Создать свои курсы</Link>
        </Menu.Item>
        <Menu.Divider />

        <Menu.Item key="2">
          <Link to={'/'}>Уведомления</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={'/'}>Сообщения</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="4">
          <Link to={'/edit-user-profile'}>Настройки учетной записи</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={'/'}>Edmed coins</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={'/'}>История покупок</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
          <Link to={'/'}>Помощь</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Space>
            <Button onClick={onClickLogOut}>Выйти</Button>
          </Space>
        </Menu.Item>
      </Spinner>
    </Menu>
  );

  return (
    <>
      {userData.authorization ? (
        <>
          <Dropdown overlay={menu} trigger={['click']}>
            <a
              className="ant-dropdown-link ant-user-dropdown-link"
              onClick={(e) => e.preventDefault()}>
              {width >= 600 && userData.firstName}
              <DownOutlined />
              <>
                <ModalWindow
                  title={'Вы действительно хотите выйти?'}
                  onClickOk={handleModalOk}
                  selector={'logoutModal'}>
                  <ExclamationCircleOutlined
                    style={{ color: 'yellow', fontSize: '50px' }}></ExclamationCircleOutlined>
                </ModalWindow>

                <div className="user-ico">
                  <span>
                    <Badge dot={true}>
                      <Avatar
                        shape="square"
                        icon={<img src={userData.picture} alt="ava" /> || <UserOutlined />}
                      />
                    </Badge>
                  </span>
                </div>
              </>
            </a>
          </Dropdown>
        </>
      ) : (
        <div className="header__buttons-block">
          <Space>
            <ButtonCustom type="primary" onClick={onClickLogIn}>
              <img className="button-img" src={buttonArrowImg} alt="" />
              Вход
            </ButtonCustom>
          </Space>
          {width >= 600 && (
            <Space>
              <ButtonCustom type="transparent" onClick={onClickRegister}>
                Регистрация
              </ButtonCustom>
            </Space>
          )}
        </div>
      )}
      <Space>
        <Select
          showArrow={false}
          className="select-language-ant"
          defaultValue="rus"
          onChange={onSelectLanguage}>
          <Option value="rus">
            <img className="flag-img" src={flagRusImg} alt="rus" />
          </Option>
          <Option value="eng">
            <img className="flag-img" src={flagUKImg} alt="eng" />
          </Option>
        </Select>
      </Space>
    </>
  );
}

export default HeaderUserBlock;
