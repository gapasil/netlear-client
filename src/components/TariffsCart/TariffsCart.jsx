import React from 'react'
import { Link } from 'react-router-dom';
import "./tariffsCart.scss";

export const TariffsCart = ({price,more,name,link,img,main}) => {
  if(main){
    return (
      <div className='tariffsCartMain'>
        <h1 className='tariffsCartMain__name'>{name}</h1>
        <h2 className='tariffsCartMain__price'>{price} руб/мес</h2>
        <div className='tariffsCartMain__more'>
          <ul>
            {more.map((value)=>{
              return(
                <li>{value}</li>
              )
            })}
          </ul>
        </div>
        <Link to={link}>
          <h1>Купить</h1>
        </Link>
      </div>
    )
  } else {
    return (
     <div className='tariffsCart'>
      <h1 className='tariffsCart__name'>{name}</h1>
      <h2 className='tariffsCart__price'>{price} руб/мес</h2>
      <div className='tariffsCart__more'>
        <ul>
          {more.map((value)=>{
            return(
              <li>{value}</li>
            )
          })}
        </ul>
      </div>
      <Link to={link}>
        <h1>Купить</h1>
      </Link>
     </div>
    )
  }

}
