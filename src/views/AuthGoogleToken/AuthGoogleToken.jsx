import React from 'react';

import { useHistory, useParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setUserToken } from '../../redux/actions/Auth/Auth';

import { setLS } from '../../utils/LocalStorage';

import { message } from 'antd';

function AuthGoogleToken() {
  const dispatch = useDispatch();
  const { token } = useParams();
  let history = useHistory();

  React.useEffect(() => {
    const fakeToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM5YjFkOTFlLWM5MzctNDkzNC04Mzc5LWJiNzM2NGE4OTc5OSIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE2Mjc3NTkwMzF9.LIz_bELdXoRLIhV2Lx9knDk0EQP32ODDSY62VO1T6gY';
    dispatch(setUserToken(token));
    setLS('EDMED_USER_TOKEN', token);
    console.log(token);
    history.push('/');
    message.success('Google аккаунт авторизован');
  }, []);

  return <div>{token}</div>;
}

export default AuthGoogleToken;
