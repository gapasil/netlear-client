import React from 'react';
import './BlockTitle.scss';

function BlockTitle({title}) {
  return (
    <div className="block-title">
      <div className="block-title__wrapper">
        <h2>{title}</h2>
      </div>
    </div>
  );
}

export default BlockTitle;
