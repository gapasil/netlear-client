import React from 'react';
import './Logo.scss';

import logoImg from '../../assets/icons/logo/edmed-logo-svg.svg';

import { useHistory } from 'react-router-dom';

function Logo({ type }) {
  const history = useHistory();

  const onClickLogo = () => {
    history.push('/');
  };

  return (
    <div className="logo" onClick={onClickLogo}>
      <img src={logoImg} alt="logo" />
      {/* <h1>Edmed.online</h1> */}
    </div>
  );
}

export default Logo;
