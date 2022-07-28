import React, { useState, useEffect } from "react";
import { TariffsCart } from "../../components/TariffsCart/TariffsCart";
import "./tariffs.scss";

function Tariffs() {

  const tariffs = [
    {price:399,more:["Описание","Описание","Описание","Описание",],name:"Новый эксперт",link:"/",img:"",main:false},
    {price:699,more:["Описание","Описание","Описание","Описание",],name:"Эксперт",link:"/",img:"",main:true},
    {price:999,more:["Описание","Описание","Описание","Описание",],name:"Профи",link:"/",img:"",main:false}
  ]

  return (
    <div className="tariffs">
      <div className="tariffs__container">
        <div className="tariffs__container__text">
          <h1>Тарифы</h1>
        </div>
        <div className="tariffs__container__tariffs">
          {tariffs.map((value)=>{
            return(
              <TariffsCart 
                price={value.price}
                more={value.more}
                name={value.name}
                link={value.link}
                img={value.img}
                main={value.main}
              />
            )
          })
          }
        </div>
      </div>
    </div>
  );
}

export default Tariffs;