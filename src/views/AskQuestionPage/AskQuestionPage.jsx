import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import "../../components/AntCarousel/AntCarousel.scss";
import Button from "../../components/Button/Button";
import "../../components/Button/Button.scss";
import "./AskQuestionPage.scss";
import { Carousel } from "antd";
import neurosurgery from "../../assets/img/slider/question_neurosurgery.jpg";
import { MenuData } from "./MenuData";
import Modal from "../../components/Modal/Modal";

function AskQuestionPage() {
  const [modalActive, setModalActive] = useState(false);
  const [category, setCategory] = useState(
    { name: "" },
    { description: "" },
    { isSet: false }
  );
  const [listItemClass, setListItemClass] = useState({
    previousItem: null,
  });

  const handleNavClick = (e, name, description) => {
    setCategory({ name: name, description: description, isSet: true });
    listItemClass.previousItem?.classList.remove("categories__link--active");
    setListItemClass({ previousItem: e.target });
    e.target.classList.add("categories__link--active");
  };

  const [form, setForm] = useState({ showForm: false });
  const showQuestionForm = () => {
    if (form.showForm === true) {
      setBtnOptions({
        text: "Отправить",
        onClick: setModalActive(true),
        type: "submit",
      });
      setCategory({ isSet: false });
      setForm({ showForm: false });
      document.querySelector(".form__text").value = "";
    } else {
      setForm({ showForm: true });
    }
  };
  const [btnOptions, setBtnOptions] = useState(
    { text: "Задать вопрос" },
    { onClick: showQuestionForm },
    { type: "" }
  );

  return (
    <div className="question-page">
      <div className="slider">
        <Carousel
          autoplay={false}
          autoplaySpeed={2000}
          pauseOnHover={false}
          dots={false}
          arrows={false}
        >
          <div className="slider__slide">
            <div
              className="slider__item"
              style={{ backgroundImage: `url(${neurosurgery})` }}
            >
              <Modal active={modalActive} setActive={setModalActive}>
                <div className="form__modal">
                  <h2>Ваш вопрос отправлен!</h2>
                  <p>
                    Доктор ответит на него
                    {/* в ближайшее время */}
                    <br />
                    как только я справлюсь со всем этим)))
                  </p>
                </div>
              </Modal>

              <div
                className={`categories ${
                  category.isSet ? "categories--active" : "hide"
                } ${form.showForm ? "categories--active-form" : "hide"}`}
              >
                <div className="categories__left">
                  <div className="categories__name">{category.name}</div>
                  <div className="categories__text">
                    {/* <div className="categories__line"></div> */}
                    <div className="categories__description">
                      {category.description}
                    </div>
                  </div>
                  <form action="" className="categories__form">
                    <span className="form__name">Задать вопрос</span>
                    <textarea className="form__text"></textarea>
                    <p>
                      Опишите вашу проблему конкретному специалисту из выбранной
                      области и он ответит на вопрос. Перед этим рекомендуем
                      ознакомиться со специалистами, это можно сделать на
                      странице <Link to="/specialists">специалисты</Link>.
                    </p>
                  </form>

                  <Button
                    onClick={showQuestionForm}
                    className="categories__button"
                    text={btnOptions.text}
                  ></Button>
                </div>

                <nav
                  className={`categories__nav ${
                    category.isSet ? "categories__nav--active" : "hide"
                  }`}
                >
                  <ul className="nav__list categories__list">
                    {MenuData.map((item) => (
                      <li
                        className="nav__item categories__item"
                        key={item.label}
                      >
                        <Link
                          // to={item.url}
                          className="nav__link categories__link"
                          onClick={(e) =>
                            handleNavClick(e, item.label, item.description)
                          }
                        >
                          <span className="nav__link_num">
                            {item.num + "  "}
                          </span>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div
                className={`slider__text ${
                  category.isSet ? "slider__text--active" : "hide"
                }`}
              >
                <h2>
                  Задать вопрос
                  <br />
                  специалисту
                </h2>
              </div>
              <div className="slider__item_shadow"></div>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default AskQuestionPage;
