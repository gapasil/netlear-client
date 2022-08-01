import React, { useEffect, useState } from "react";
import "./App.scss";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
} from "react-router-dom";

import {
  HomePage,
  AskQuestionPage,
  SpecialistsPage,
  EventsPage,
  EventPage,
  EditUserProfile,
  UserProfile,
  AuthGoogleToken,
  AuthFacebookToken,
  AuthCheckKey,
  Tariffs
} from "./views";

import NotFound from "./views/NotFound/NotFound";
import Header from "./views/Header/Header";
import LoginForm from "./components/LoginForm/LoginForm";
import RegForm from "./components/RegForm/RegForm";
import { useDispatch, useSelector, connect } from "react-redux";
import store from "./redux/store";
import Footer from "./components/Footer/Footer";
import { url } from "./conf";


function App({ history }) {
  const dispatch = useDispatch();
  const [sd, setList] = useState("")
  const token = localStorage.getItem('token')
  const user = useSelector(state => state.Auth)
  const abortController = new AbortController()

  // const getUser = (method,value) =>{
  //   if(token){
  //     fetch(`${url}useroute/user/`,{
  //       method:"POST",
  //       headers: {
  //         'Content-Type': 'application/json;charset=utf-8',
  //         "Authorization":`Bearer ${token}`
  //       },
  //       signal:abortController.signal
  //     })
  //     .then(responce =>{
  //       return responce.json()
  //     })
  //     .then(result => {
  //       if(result.message){
  //         return ""
  //       }else{
  //         let res
  //         if(result.user.avatar){
  //           res = {...result.user,authorization:true,picture:`${url}uploads/${result.user.avatar}`} 
  //         } else {
  //           res = {...result.user,authorization:true,picture:"default"} 
  //         }
  //         store.dispatch({type:'SET_USER_DATA',payload:res})
  //       }
  //     })
  //   }else if(method == "google"&&!token){
  //     let objUser = JSON.parse(JSON.stringify(user))

  //     fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${value}`,{signal:abortController.signal})
  //     .then((res)=>res.json())
  //     .then((result)=>{
  //       if(result.error){
  //         localStorage.clear();
  //         store.dispatch({type:'SET_LOGOUT'})
  //         return ""
  //       }
  //       objUser.lastname  = result.family_name
  //       objUser.firstname = result.given_name
  //       objUser.picture   = result.picture
  //       objUser.email     = result.email
  //       const res = {...objUser,authorization:true} 
  //       store.dispatch({type:'SET_USER_DATA',payload:res})
  //     })
  //   }
  // }

  useEffect(()=>{
    const google = localStorage.getItem("google")

    if(google){
      let objUser = JSON.parse(JSON.stringify(user))

      fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${google}`,{signal:abortController.signal})
      .then((res)=>res.json())
      .then((result)=>{
        if(result.error){
          localStorage.clear();
          store.dispatch({type:'SET_LOGOUT'})
        } else {
          objUser.lastname  = result.family_name
          objUser.firstname = result.given_name
          objUser.picture   = result.picture
          objUser.email     = result.email
          const res = {...objUser,authorization:true} 
          store.dispatch({type:'SET_USER_DATA',payload:res})
        }
      })
    } else {
      fetch(`${url}useroute/user/`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          "Authorization":`Bearer ${token}`
        },
        signal:abortController.signal
      })
      .then(responce =>{
        return responce.json()
      })
      .then(result => {
        if(result.message){
        }else{
          let res
          if(result.user.avatar){
            res = {...result.user,authorization:true,picture:`${url}uploads/${result.user.avatar}`} 
          } else {
            res = {...result.user,authorization:true,picture:"default"} 
          }
          store.dispatch({type:'SET_USER_DATA',payload:res})
        }
      })
    }
    return () => { abortController.abort() }
  },[setList])

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
            <Route path="/tariffs" component={Tariffs} />
            <Route
              path="/event-redactor"
              component={() => <EventPage variant="redactor" />}
            />
            <Route
              path="/pagecoorse/:id"
              component={() => <EventPage/>}
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
      <Footer/>
    </div>
  );
}

export default withRouter(App);
