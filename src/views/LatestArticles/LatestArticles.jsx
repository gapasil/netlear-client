import React from "react";
import "./LatestArticles.scss";
import { ReactComponent as Arrow } from "../../assets/icons/articles/arrow.svg";
import img from "../../assets/img/slider/latest_articles_img.jpg";

const LatestArticles = () => {
  return (
    <div className="latest-articles">
      <div className="latest-articles__img">
        <img src={img} alt="" />
      </div>
      <div className="latest-articles__blocks">
        <div className="blocks__col1">
          <div className="blocks__block blocks__block1">
            <h2>Генетика</h2>
            <p>
              Влияние Простатилена-АЦ на фертильность и фрагментацию ДНК
              сперматозоидов у больных хроническим...
            </p>
            <h3>31.01.21</h3>
            <span className="blocks__arrow">
              <Arrow />
            </span>
          </div>
          <h1>Последние статьи</h1>
        </div>
        <div className="blocks__col2">
          <div className="blocks__block blocks__block2">
            <h2>Нутрициология</h2>
            <p>Усвоение магния в организме и влияние кофакторов на процесс</p>
            <h3>31.01.21</h3>
            <span className="blocks__arrow">
              <Arrow stroke="black" />
            </span>
          </div>
          <div className="blocks__row">
            <div className="blocks__block blocks__block3">
              <h2>Кардиология</h2>
              <p>
                Применение аутологичных клеток пуповинной крови у новорожденных
                с гипоксически-ишемической ...
              </p>
              <h3>27.04.21</h3>
              <span className="blocks__arrow">
                <Arrow />
              </span>
            </div>
            <div className="blocks__block blocks__block4">
              <h2>Хирургия</h2>
              <p>
                Современное состояние хирургического лечения пострадавших с
                переломами шейки бедренной кости
              </p>
              <h3>10.09.21</h3>
              <span className="blocks__arrow">
                <Arrow />
              </span>
            </div>
            <div className="blocks__more">
              <Arrow className="blocks__arrow" />
              Больше статей
            </div>
            <div className="blocks__block blocks__block5">
              <h2>Неврология</h2>
              <p>Нейротропные витамины и НПВП в лечении болей в спине</p>
              <h3>02.12.21</h3>
              <span className="blocks__arrow">
                <Arrow />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestArticles;
