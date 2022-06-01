import React from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUserToken } from '../../redux/actions/Auth/Auth';

import { setLS } from '../../utils/LocalStorage';

import { message } from 'antd';

function AuthFacebookToken() {
  const dispatch = useDispatch();
  const { token } = useParams();
  let history = useHistory();

  React.useEffect(() => {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ODg3YTkwLTc1ZWMtNDNhZS04NmY0LTBjY2Q3ZWY0ODRlYyIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2Mjc0NzA5MDB9.4Ya4N6oUV0eUJTOxJOHWdAlMSMI49iScbeb4pYr3s9I';
    dispatch(setUserToken(token));
    setLS('EDMED_USER_TOKEN', token);
    console.log(token);
    history.push('/');
    message.success('Facebook аккаунт авторизован');
  }, []);

  return <div>{token}</div>;
}

export default AuthFacebookToken;
