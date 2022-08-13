import React, { useContext, useEffect, useState } from "react";
import "./LoginForm.scss";
import "../../fonts/iconsfont.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchLogIn } from "../../redux/actions/Auth/Auth";
import { url } from "../../conf"
import Button from "../Button/Button";
import store from "../../redux/store";

const LoginForm = ({ history, callback, props}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fail, setFail] = useState("")
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.Auth);
  const user = useSelector(state => state.Auth)

  React.useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth]);
  
  const login = () =>{
    //авторизация по почте
    if(email.match(/@/)){
      fetch(`${url}auth/loginemail`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({email:email,password:password})
      })
      .then(responce =>{
        return responce.json()
      })
      .then(result => {
        if(result.message){
          setFail(result.message)
        }else{
          localStorage.setItem('token',result.token)
          props()
        }
      })
  
      return
    }else{
      ///авторизация по мобилке
      fetch(`${url}auth/loginphone`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({phoneNumber:email,password:password})
      })
      .then(responce =>{
        return responce.json()
      })
      .then(result => {
        if(result.message){
          setFail(result.message)
        }else{
          localStorage.setItem("token",result.token)
          props()
        }
      })
  
      return
    }
  }

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(fetchLogIn(values));
    // dispatch(getToken(values.email, values.password, values.remember));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  let getUserGoogle = () =>{
    let objUser = JSON.parse(JSON.stringify(user))

    fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${localStorage.getItem("google")}`)
    .then((res)=>res.json())
    .then((result)=>{
      if(result.error){
        localStorage.clear();
        store.dispatch({type:'SET_LOGOUT'})
        return
      }
      objUser.lastname  = result.family_name
      objUser.firstname = result.given_name
      objUser.picture   = result.picture
      objUser.email     = result.email
      createGoogleUser(objUser)
      const res = {...objUser,authorization:true} 
      store.dispatch({type:'SET_USER_DATA',payload:res})
    })
  }

  let createGoogleUser = () =>{
    fetch(`${url}auth/googleauth`,{
      method: "POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      body: JSON.stringify({google: localStorage.getItem("google")})
    })
    .then((res)=>res.json())
    .then((result)=>localStorage.setItem("token",result.token))
  }

  const handleSubmitGoogleForm = () => {
    let tokenSave = (e) =>{
      localStorage.setItem('google',e.credential)
      getUserGoogle()
      props()
    }
    window.google.accounts.id.initialize({
      client_id: "259068887637-5on1upde1v5h96m4662ah00uhan2kipt.apps.googleusercontent.com",
      callback: tokenSave
    });
    window.google.accounts.id.prompt()
  };

  const handleSubmitFacebookForm = () => {
    window.location = `${URL}auth/facebook`;
  };

  return (
    <div className="login-form">
      <span className="login__span">{fail}</span>
      <form
        action=""
        className="login__form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <input
          className="lr__form_input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="text"
          placeholder="номер телефона или e-mail"
        />
        <div className="lr__form_div">
          <input
            className="lr__form_input"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Пароль"
          />
          <span className="lr__form_forgot">Забыли?</span>
        </div>
        <div className="lr__form_checkbox">
          <input type="checkbox" id="checkbox" />
          <label for="checkbox">Запомнить меня</label>
        </div>

        <Button
          type="button"
          className="lr__form_button"
          text="Войти"
          onClick={() => login()}
        ></Button>
        {/* <Button onClick={() => store.registration(email, password)}>
          Регистрация
        </Button> */}
      </form>
      <span className="login__span">Или продолжить с помощью</span>
      <ul className="continue-with__list">
        <li className="continue-with__item icon-google" onClick={handleSubmitGoogleForm}></li>
      </ul>
      <span className="login__span">
        У вас ещё нет аккаунта?{" "}
        <span className="login__registration_btn" onClick={callback}>Зарегистрироваться</span>
      </span>
    </div>
  );
};

export default LoginForm;
