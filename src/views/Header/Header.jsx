import React, { useState, useEffect } from "react";
import { useHistory, Link, useLocation } from "react-router-dom";
import "./Header.scss";
import Modal from "../../components/Modal/Modal";
import SearchIcon  from "../../assets/icons/header/search.svg";
import LikeIcon    from "../../assets/icons/header/like.svg";
import UserIcon    from "../../assets/icons/header/user.svg";
import LogoImg     from "../../assets/icons/logo/edmed-logo-svg.svg";
import HeaderImg   from "../../assets/img/header/header_active_img.jpg";
import { MenuData } from "./MenuData";
import "../../App.scss";
import LoginForm from "../../components/LoginForm/LoginForm";
import RegForm from "../../components/RegForm/RegForm";
import { Avatar, Badge, Menu, Dropdown, Space, Button, Select } from "antd";
import {
  UserOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { fetchLogout } from "../../redux/actions/Auth/Auth";
import store from "../../redux/store"
import ModalWindow from "../../components/Modal/ModalWindow/ModalWindow";
import Spinner from "../../components/Spinner/Spinner";
import { showModal } from "../../redux/actions/modal";

let color = "#ffffff";
let style = "light";
let fillStyle = "#C7CEDB";

function Header({auth}) {
  const [state, setState] = useState({ isBurgerOpen: false });
  const [whiteBlackMenu,setWhiteBlackMenu] = useState(false)
  const location = useLocation()
  const handleBurgerBtnClick = () => {
    setState({ isBurgerOpen: !state.isBurgerOpen });
  };

  useEffect(()=>{
    if(state.isBurgerOpen){
      setWhiteBlackMenu(true)
      style = "dark"
    }else if(location.pathname == "/tariffs"){
      setWhiteBlackMenu(true)
      style = "dark"
    }else if(location.pathname.length > 20){
      setWhiteBlackMenu(true)
      style = "dark"
    }else if(location.pathname == "/coorse"){
      setWhiteBlackMenu(true)
      style = "dark"
    }else if(location.pathname == "/events"){
      setWhiteBlackMenu(true)
      style = "dark"
    }else if(location.pathname == "/event-redactor"){
      setWhiteBlackMenu(true)
      style = "dark"
    }else{
      setWhiteBlackMenu(false)
      style = "light"
    }
  },[location.pathname,state])

  const [stateReg,setStateReg] = useState(null)
  const [like, setLike] = useState({ isLike: false });
  const handleLikeBtnClick = () => {
    setLike({ isLike: !like.isLike });
  };

  const [modalActive, setModalActive] = useState(false);
  const showLoginForm = () => {
    setModalActive(true);
  };
  const [modalActive1, setModalActive1] = useState(false);
  const showRegForm = () => {
    setModalActive1(true)
    setModalActive(false)
  };
  const [modalActive3,setModalActive3] = useState(false)
  const stateRegCb = (result) =>{
    setStateReg(result)
    setModalActive1(false)
  }
  const width = window.innerWidth;
  const history = useHistory();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.Auth);

  const onClickLogIn = () => {
    history.push("/login-page");
  };
  const onClickLogOut = () => {
    dispatch(showModal("logoutModal"));
  };

  const handleModalOk = () => {
    history.push("/");
    dispatch(fetchLogout());
    // dispatch(userLogout());
  };
  useEffect(()=>{
    if(stateReg){
      setModalActive3(true)
    }
  },[stateReg])

  const menu = (
    <Menu>
      <Spinner color={"blue"}>
        <Menu.Item key="0">
          <Link to={"/event"}>Мое обучение</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <Link to={"/event-redactor"}>Создать свои курсы</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="2">
          <Link to={"/"}>Уведомления</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to={"/"}>Сообщения</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="8">
          <Link to={"/edit-user-profile"}>Настройки учетной записи</Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to={"/"}>Edmed coins</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to={"/"}>История покупок</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="5">
          <Link to={"/"}>Помощь</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Space>
            <Button onClick={onClickLogOut}>Выйти</Button>
          </Space>
        </Menu.Item>
      </Spinner>
    </Menu>
  );

  return (
    <div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        className="modal__login"
      >
        <LoginForm callback={showRegForm} props={()=>{setModalActive(false);auth()}}/>
        {/* <RegForm /> */}
      </Modal>
      <Modal
        active={modalActive1}
        setActive={setModalActive1}
        className="modal__reg"
      >
        <RegForm callback={showLoginForm} prop={stateRegCb}/>
      </Modal>
      <Modal 
        active={modalActive3}
        setActive={setModalActive3}
        className="modal__info"
      >
        <p>{stateReg}</p>
      </Modal>
      <div
        className={`header ${
          state.isBurgerOpen ? "header--active-nav" : "hide"
        }`}
      >
        <div className="header__container">
          <Link to="/" className="header__logo">
            <LogoImg
              className="header__logo-img"
              style={{ fill: whiteBlackMenu ? "#24292F" : fillStyle }}
            />
          </Link>
          <div className="header__right">
            <form className="search__form">
              <SearchIcon
                className="search__button"
                style={{ fill: whiteBlackMenu ? "#161616" : color , marginTop:"0px"}}
              />
              <input
                type="text"
                placeholder="Поиск по сайту"
                className={`search__input ${style} ${
                  whiteBlackMenu ? "search__input--active" : "hide"
                }`}
              />
            </form>
            <div className="block_Knop">
            <LikeIcon
              className="like"
              // onClick={handleLikeBtnClick}
              onClick={showRegForm}
              style={
                ({ stroke: whiteBlackMenu ? like.isLike ? "red" : "#161616" : like.isLike ? "red" : color})
              }
            />

            {userData.authorization ? (
              <>
                <Dropdown overlay={menu} trigger={["click"]}>
                  <div
                    className="ant-dropdown-link ant-user-dropdown-link"
                    style={{"cursor":"pointer"}}
                    onClick={(e) => e.preventDefault()}
                  >
                    {width >= 600 && userData.firstName}
                    <>
                      <ModalWindow
                        title={"Вы действительно хотите выйти?"}
                        onClickOk={handleModalOk}
                        selector={"logoutModal"}
                      >
                        <ExclamationCircleOutlined
                          style={{ color: "yellow", fontSize: "50px" }}
                        ></ExclamationCircleOutlined>
                      </ModalWindow>

                      <div className="user-ico">
                        <span>
                          <Badge dot={true}>
                            <Avatar
                              shape="square"
                              icon={
                                <img src={userData.picture} alt="ava" /> || (
                                  <UserOutlined />
                                )
                              }
                            />
                          </Badge>
                        </span>
                      </div>
                    </>
                  </div>
                </Dropdown>
              </>
            ) : (
              <UserIcon
                className="user"
                onClick={showLoginForm}
                style={{ stroke: whiteBlackMenu ? "#161616" : color }}
              />
            )}

            <button
              className={`burger ${style} ${
                state.isBurgerOpen ? "burger--active" : "hide"
              }`}
              onClick={handleBurgerBtnClick}
            >
              <span className={`burger__line ${style}`}></span>
            </button>
            {MenuData.length && (
              <nav className={`nav ${state.isBurgerOpen ? "active" : "hide"}`}>
                <ul className="nav__list">
                  {MenuData.map((item) => (
                    <li className="nav__item" key={item.label}>
                      <Link
                        to={item.url}
                        className="nav__link"
                        onClick={handleBurgerBtnClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
            <div className="header__img">
              <img src={HeaderImg} alt="" />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
