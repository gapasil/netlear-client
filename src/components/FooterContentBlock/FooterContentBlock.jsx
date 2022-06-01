import React from 'react';
import './FooterContentBlock.scss';

function FooterContentBlock({ children, title }) {
  return (
    <div className="footer-content-block">
      <h3 className="footer-content-block__title">{title}</h3>
      <div className="footer-content-block__content">{children}</div>
    </div>
  );
}

export default FooterContentBlock;
