import React, { useState, useEffect } from "react";
import "./SpecialistsPage.scss";
import { MenuData } from "../AskQuestionPage/MenuData";
import { useHistory, Link } from "react-router-dom";
import SpecialistsSwiper from "../../components/SpecialistsSwiper/SpecialistsSwiper";

function SpecialistsPage() {
  const [category, setCategory] = useState(
    { name: "Психиатрия" },
    { isSet: false }
  );

  const handleExpClick = (e) => {
    for (const active of document.querySelectorAll(
      ".experience__item--active"
    )) {
      active.classList.remove("experience__item--active");
    }
    e.target.classList.add("experience__item--active");
  };
  const [listItemClass, setListItemClass] = useState({
    previousItem: null,
  });
  const handleNavClick = (e, name, description) => {
    setCategory({ name: name, description: description, isSet: true });
    listItemClass.previousItem?.classList.remove("nav__link--active");
    setListItemClass({ previousItem: e.target });
    e.target.classList.add("nav__link--active");
  };

  return (
    <div className="specialists-page">
      <div className="specialists">
        <div className="categories__left">
          <div className="categories__name">Специализация</div>
          <div className="categories__text">
            <nav
              className={`categories__nav ${
                category.isSet ? "categories__nav--active" : "hide"
              }`}
            >
              <ul className="nav__list categories__list">
                {MenuData.map((item) => (
                  <li className="nav__item categories__item" key={item.label}>
                    <Link
                      // to={item.url}
                      className="nav__link categories__link"
                      onClick={(e) =>
                        handleNavClick(e, item.label, item.description)
                      }
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="specialists__right">
          <div className="specialists__experience">
            <p className="experience__title">Опыт работы</p>
            <ul className="experience__list">
              <li className="experience__item" onClick={handleExpClick}>
                1-5 лет
              </li>
              <li className="experience__item" onClick={handleExpClick}>
                5-10 лет
              </li>
              <li className="experience__item" onClick={handleExpClick}>
                10-20 лет
              </li>
              <li className="experience__item" onClick={handleExpClick}>
                20+ лет
              </li>
            </ul>
            <div className="experience__line"></div>
          </div>
          <div className="specialists__slider">
            <SpecialistsSwiper></SpecialistsSwiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpecialistsPage;
