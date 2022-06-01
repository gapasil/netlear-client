import React from 'react';
import './PartnersBlock.scss';

import partners from '../../utils/mapArrays/partners';

function PartnersBlock() {
  React.useEffect(() => {
    // console.log(partners);
  }, []);
  return (
    <div className="partners">
      <div className="partners__wrapper">
        {partners.map((el, i) => (
          <div className="partners__item" key={i}>
            <img className="partners__logo" src={el.img} alt={el.name} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PartnersBlock;
