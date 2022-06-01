import React, { useContext, useEffect, useRef, useState } from "react";
import "./RegForm.scss";
import {AddUser} from "./funcReg"

const RegForm = ({callback,prop}) => {
  const [se,set] = useState("")
  const [img, setImg] = useState(null)
  const [imgPreviyred, setImgPreviyred] = useState("")
  const [imgblockvisible, setImgblockvisible] = useState("notvisible")
  const [messageErr, setMessage] = useState("")
  const [codeNumber,setVerifyCode] = useState(false)
  const [codeUser, setCodeUser] = useState("")
  const [codeErr,setCodeErr] = useState("")
  const [visibleMRegistation,setVisibleMRegistation] = useState({
    email:"notvisible",
    phone:"notvisible",
    codePhone:"notvisible"
  })
  
  ///принять ошибки из funcReg
  const [dataErr,setDataErr] = useState({
    name:"",
    lastname:"",
    city:"",
    phoneNumber:"",
    academicDegrees:"",
    position:"",
    avatar:"",
    email:"",
    password:"",
    gender:""
  })
  const [data,setData] = useState({
    name:"",
    lastname:"",
    city:"",
    phoneNumber:"",
    academicDegrees:"",
    position:"",
    avatar:"",
    email:"",
    password:"",
    gender:""
  })
  const startpozition = useRef(null);

  const verifyCode = () =>{
    const nom = {
      recipient: data.phoneNumber,
      id: "myId123",
      validate: true,
      limit: {
        count: 3,
        period: 600
      }
    }
    fetch("https://netlear-server.site/auth/veryfiphone",{
      method:"POST",
      body:JSON.stringify(nom),
      headers:{
        "Content-Type":"application/json;charset=utf-8"
      }
    })
    .then(result => result.json())
    .then(res => setVerifyCode(res))
  }

  const cb = ({message,ref}) =>{
    setMessage({msg:message,reff:ref})
  }

  const cbb = (result) =>{
    if(result == "Для подтверждения регистраций переидите в почту которую указали при регистраций"||result == "Вы успешно зарегестрировались!"){
      setData({
        name:"",
        lastname:"",
        city:"",
        phoneNumber:"",
        academicDegrees:"",
        position:"",
        avatar:"",
        email:"",
        password:"",
        gender:""
      })
      prop(result)
    }else{
      setMessage({msg:result,reff:"email"})
    }
  }

  useEffect(()=>{
    if(messageErr){
      let targetErr = messageErr.reff
      for(let key in dataErr){
        if(key == targetErr){
          let obj = dataErr
          obj[targetErr] = messageErr.msg
          setDataErr(obj)
          set(Math.random())
        }
      }
      startpozition.current.scrollIntoView({behavior: "smooth",block:"start"})
    }
  },[messageErr])

  useEffect(()=>{
    if(!img){return}
    setImgPreviyred("")
    const reader = new FileReader()

    reader.onload = e =>{
      setImgPreviyred(e.target.result)
    }
    
    reader.readAsDataURL(img)
  },[img])
  
  useEffect(()=>{
    if(codeNumber.err){
      setMessage({msg:codeNumber.err,reff:"email"})
      return
    }
    if(codeNumber){
      setVisibleMRegistation({
        phone:"lr__form_input",
        email:"notvisible",
        codePhone:"lr__form_input"
      })
    }
  },[codeNumber])

  let checkCode = (code) =>{
    if(code){
      AddUser(data,img,cb,cbb,"s")
      return
    }
    if(codeUser == codeNumber){
      AddUser(data,img,cb,cbb,"s")
    }
  }
  return (
    <div className="reg-form">
      <h2 className="reg__title" ref={startpozition}>Создать учетную запись</h2>
      <form action="" className="reg__form">
        <div style={{"display":"flex","justifyContent":"space-around"}}>
          <button className="input__file-button" onClick={(e)=>{
            e.preventDefault()
            setVisibleMRegistation({
              phone:"lr__form_input",
              email:"notvisible",
              codePhone:"notvisible"
          })}}>По номеру</button>
          <div style={{"width":"10px"}}></div>
          <button className="input__file-button" onClick={(e)=>{
            e.preventDefault()
            setVisibleMRegistation({
              phone:"notvisible",
              email:"lr__form_input",
              codePhone:"notvisible"
          })}}>По почте</button>
        </div>
        <input
          className={visibleMRegistation.phone}
          onChange={(e) =>{ 
            let obj = data
            obj.phoneNumber = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.phoneNumber}
          type="text"
          placeholder="Номер телефона для регистраций"
        />
        <p className="errorMessage">{dataErr.email}</p>
        <input
          className={visibleMRegistation.email}
          onChange={(e) =>{ 
            let obj = data
            obj.email = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.email}
          type="text"
          placeholder="Имя пользователя/e-mail"
        />
        <div className="lr__form_div">
          <p className="errorMessage">{dataErr.password}</p>
          <input
            className="lr__form_input"
            onChange={(e) =>{ 
              let obj = data
              obj.password = e.target.value
              setData(obj)
              set(Math.random())
            }}
            value={data.password}
            type="password"
            placeholder="Пароль"
          />
          <span className="lr__form_forgot">Забыли?</span>
        </div>
        <span className="reg__password_span">
          Не менее 5 символов и короче 15 
        </span>
        <div className="lr__form_checkbox">
          <input type="checkbox" id="checkbox1" />
          <label htmlFor="checkbox1">Запомнить меня</label>
        </div>
        <h3>Личное</h3>
        <p className="errorMessage">{dataErr.name}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.name = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.name}
          type="text"

          placeholder="Имя"
        />
        <p className="errorMessage">{dataErr.lastname}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.lastname = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.lastname}
          type="text"
          placeholder="Фамилия"
        />
        <div className="lr__form_radio">
          <p className="errorMessage">{dataErr.gender}</p>
          <input type="radio" id="radio1" name="radio-group1" onChange={()=>{
            let obj = data
            obj.gender = "Женский"
            setData(obj)
            set(Math.random())
          }}/>
          <label htmlFor="radio1">Женщина</label>
          <input type="radio" id="radio2" name="radio-group1" onChange={()=>{
            let obj = data
            obj.gender = "Мужской"
            setData(obj)
            set(Math.random())
          }}/>
          <label htmlFor="radio2" id="label2">
            Мужчина
          </label>
        </div>
        <h3>Контакты</h3>
        <p className="errorMessage">{dataErr.city}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.city = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.city}
          type="text"
          placeholder="Город"
        />
        <p className="errorMessage">{dataErr.phoneNumber}</p>
        <input
          className={visibleMRegistation.email}
          onChange={(e) =>{ 
            let obj = data
            obj.phoneNumber = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.phoneNumber}
          type="text"
          placeholder="Номер телефона"
        />
        <h3>Профессиональное</h3>
        <p className="errorMessage">{dataErr.specialization}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.specialization = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.specialization}
          type="text"
          placeholder="Специализация"
        />
        <p className="errorMessage">{dataErr.academicDegrees}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.academicDegrees = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.academicDegrees}
          type="text"
          placeholder="Ученая степень "
        />
        <p className="errorMessage">{dataErr.position}</p>
        <input
          className="lr__form_input"
          onChange={(e) =>{ 
            let obj = data
            obj.position = e.target.value
            setData(obj)
            set(Math.random())
          }}
          value={data.position}
          type="text"
          placeholder="Должность"
        />
        <div class="input__wrapper">
          <input 
            name="file" 
            type="file"
            id="input__file" 
            class="input__file"
            onChange={(event)=> { 
              setImgblockvisible("imgblockVisible")
              setImg(event.target.files[0]) 
            }}
            multiple
          />
          <label for="input__file" class="input__file-button">
            <span class="input__file-button-text">Прикрепить файлы</span>
          </label>
        </div>
        <span className="reg__add-files_span">
          Вы можете загрузить документы: сертификаты, дипломы, патенты,
          подтверждающие вашу квалификацию. Это важно для пациентов и ваших
          коллег.
        </span>
        <div class="input__wrapperava">
          <input 
            name="file" 
            type="file"
            id="input__file" 
            class="input__file"
            onChange={(event)=> { 
              setImgblockvisible("imgblockVisible")
              setImg(event.target.files[0]) 
            }}
            multiple
          />
          <label for="input__file" class="input__file-buttonava">
            <span class="input__file-button-text">Добавить фото профиля</span>
          </label>
        </div>
        <div className={imgblockvisible}>
          <img className="avatarImgPreviyred" src={imgPreviyred}/>
        </div>
        <div className="lr__form_radio">
          <input type="radio" id="radio" name="radio-group" />
          <label htmlFor="radio">
            Я прочел и принимаю
            <br />
            Политику конфиденциальности
          </label>
        </div>
        <p>{codeErr}</p>
        <input
          className={visibleMRegistation.codePhone}
          onChange={(e) =>{
            if(e.target.value.length == 4){
              if(e.target.value == codeNumber){
                checkCode(e.target.value)
              }else{
                setCodeErr("Не правильные цифры")
              }
            }
            setCodeUser(e.target.value)
            set(Math.random())
          }}
          value={codeUser}
          type="text"
          placeholder="Введите последние 4 цифры номера телефона"
        />
        <button
          className="nth-of-type3"
          onClick={(e)=>{
            e.preventDefault()
            setDataErr({
              name:"",
              lastname:"",
              phoneNumber:"",
              email:"",
              password:""
            })
            setCodeErr("")
            setMessage(false)
            if(visibleMRegistation.email == "notvisible"){
              if(codeNumber&&!codeNumber.err){
                checkCode()
                return
              }
              verifyCode()
              return
            }else{
              AddUser(data,img,cb,cbb,"email") 
            }
          }}
        >Создать учетную запись</button>
        <div className="zamenit">.</div>
      </form>
    </div>
  );
};

export default RegForm;
