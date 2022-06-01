import React from 'react';
import './AuthHeader.scss';

import facebookImg from '../../assets/img/socialWebs/facebook.svg';
import googleImg from '../../assets/img/socialWebs/google-icon.svg';

// import { useDispatch } from 'react-redux';

// import { URL } from '../../App';

const URL = 'https://netlear-server.site/api/'

function AuthHeader({ title }) {
  // const dispatch = useDispatch();

  const handleSubmitGoogleForm = () => {
    window.location = `${URL}auth/google`;
  };

  const handleSubmitFacebookForm = () => {
    window.location = `${URL}auth/facebook`;
  };

  return (
    <div className="register__header">
      <h2 className="register__title">{title}</h2>
      <div className="register__header_buttons">
        <button className="button--social button--social-google" onClick={handleSubmitGoogleForm}>
          <img src={googleImg} alt="" />
        </button>
        <button
          className="button--social button--social-facebook"
          onClick={handleSubmitFacebookForm}>
          <img src={facebookImg} alt="" />
        </button>
      </div>
    </div>
  );
}

export default AuthHeader;
