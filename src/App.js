import React, { useContext, useEffect, useState } from "react";
import "./App.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegPage,
  AskQuestionPage,
  SpecialistsPage,
  EventsPage,
  EventPage,
  EditUserProfile,
  UserProfile,
  AuthGoogleToken,
  AuthFacebookToken,
  AuthCheckKey,
} from "./views";

import NotFound from "./views/NotFound/NotFound";
import Header from "./views/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegForm from "./components/RegForm/RegForm";
import { useDispatch, useSelector, connect } from "react-redux";
import store from "./redux/store";

function App({ history }) {
  const dispatch = useDispatch();
  const [sd, setList] = useState("")
  const token = localStorage.getItem('token')
  const user = useSelector(state => state.Auth)
  const url = "https://netlear-server.site/"

  const getUser = (method,value) =>{
    if(token||method == "google"){
    if(method == "email"){
      fetch(`${url}useroute/user/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({email:value})
      })
      .then(responce =>{
        return responce.json()
      })
      .then(result => {
        if(result.message){
          return
        }else{
          const res = {...result.user,authorization:true,picture:`${url}uploads/${result.user.avatar}`} 
          store.dispatch({type:'SET_USER_DATA',payload:res})
        }
      })
    }else if(method == "phoneNumber"){
      fetch(`${url}useroute/user/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Authorization":`Bearer ${token}`
        },
        body: JSON.stringify({phoneNumber:value})
      })
      .then(responce =>{
        return responce.json()
      })
      .then(result => {
        if(result.message){
          return
        }else{
          const res = {...result.user,authorization:true,picture:`${url}uploads/${result.user.avatar}`} 
          store.dispatch({type:'SET_USER_DATA',payload:res})
        }
      })
    }else if(method == "google"){
      let objUser = JSON.parse(JSON.stringify(user))

      fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${value}`)
      .then((res)=>res.json())
      .then((result)=>{
        objUser.lastname = result.family_name
        objUser.firstname = result.given_name
        objUser.picture = result.picture
        objUser.email = result.email
        const res = {...objUser,authorization:true} 
        store.dispatch({type:'SET_USER_DATA',payload:res})
      })
    }
  }
  }

  useEffect(()=>{
    const email = localStorage.getItem("email")
    const phoneNumber = localStorage.getItem("phoneNumber")
    const google = localStorage.getItem("google")

    if(email){
      getUser("email",email)
    }else if(phoneNumber){
      getUser("phoneNumber",phoneNumber)
    }else if(google){
      getUser("google",google)
    }
  },[sd])

  return (
    <div className="App">
      <div className="wrapper">
        <Router>
          <Header auth={()=>setList(Math.random())}/>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/reg-page" component={RegForm} />
            <Route exact path="/login-page" component={LoginForm} />
            <Route path="/ask-question" component={AskQuestionPage} />
            <Route path="/specialists" component={SpecialistsPage} />
            <Route path="/events" component={EventsPage} />
            <Route path="/event" component={EventPage} />
            <Route
              path="/event-redactor"
              component={() => <EventPage variant="redactor" />}
            />
            <Route path="/edit-user-profile" component={EditUserProfile} />
            <Route path="/user-profile" component={UserProfile} />
            <Route path="/google/callback/:token" component={AuthGoogleToken} />
            <Route
              path="/facebook/callback/:token"
              component={AuthFacebookToken}
            />
            <Route path="/auth/check_key/:id" component={AuthCheckKey} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default withRouter(App);
