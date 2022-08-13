import React, { useState, useEffect } from "react";
import "./EventsPage.scss";
import Button from "../../components/Button/Button";
import { Carousel } from "antd";
import { useHistory, Link, NavLink } from "react-router-dom";
import eventsPageImg from "../../assets/img/slider/events_page.jpg";
import annaImg from "../../assets/img/slider/events_page_anna.jpg";
import defaultPhoto from "../../assets/img/eventsPage/sanitar.png";
import { MenuData } from "../AskQuestionPage/MenuData";
import { EventsData } from "./EventsData";
import TextEditor from "../../components/TextEditor/TextEditor";
import { useDispatch } from "react-redux";
import { setCoorseRedux } from "../../redux/actions/eventRedactor/eventRedactor";
import { url } from "../../conf";

function EventsPage() {
  const [events, setEvents] = useState({ type: "", event: "", firstEvent: "" });
  const [masCoorse, setCoorse]  = useState([])
  const dispatch = useDispatch();

  const [listItemClass, setListItemClass] = useState({
    previousItem: null,
  });

  const handleRadioClick = (e) => {
    const firstOne = EventsData.find((item) => item.type === e.target.id);
    setEvents({ type: e.target.id, event: "", firstEvent: firstOne });
  };

  const handleNavClick = (e, item) => {
    listItemClass.previousItem?.classList.remove("nav__link--active");
    setListItemClass({ previousItem: e.target });
    e.target.classList.add("nav__link--active");
    setEvents({
      type: events.type,
      event: item,
      firstEvent: events.firstEvent,
    });
  };

   useEffect(()=>{
     fetch(`${url}post/`,{
         headers: {
           "Authorization": `Bearer ${localStorage.getItem("token")}`
         },
     })
     .then((res)=>res.json())
     .then((result)=>setCoorse(result))
   },[])

  //  useEffect(()=>{
  //   console.log(events.event)
  //  },[events])

  return (
    <div className="events-page">
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
              style={{
                backgroundImage: `url(${eventsPageImg})`,
              }}
            >
          <div className="events__page">
                <div className="events__left">
                  <h1>Предстоящие мероприятия:</h1>
                  {/* <ul className="events-type__list">
                    <li className="events-type__item">
                      <div className="lr__form_radio">
                        <input
                          type="radio"
                          id="conference"
                          name="radio-group1"
                          onClick={handleRadioClick}
                        />
                        <label htmlFor="conference">
                          <div>Конференция</div>В формате “offline”
                        </label>
                      </div>
                    </li>
                    <li className="events-type__item">
                      <div className="lr__form_radio">
                        <input
                          type="radio"
                          id="webinar"
                          name="radio-group1"
                          onClick={handleRadioClick}
                        />
                        <label htmlFor="webinar">
                          <div>Вебинар</div>В формате “online”
                        </label>
                      </div>
                    </li>
                    <li className="events-type__item">
                      <div className="lr__form_radio">
                        <input
                          type="radio"
                          id="course"
                          name="radio-group1"
                          onClick={handleRadioClick}
                        />
                        <label htmlFor="course">
                          <div>Курс</div>В формате “online”
                        </label>
                      </div>
                    </li>
                  </ul> */}
                  {events.event ? (
                    <>
                      <div className="events__title">
                        <h2>{events.event.mainTitle}</h2>
                        <p>{`В курсе ${events.event.vebinars.length}: вебинаров`}</p>
                      </div>
                      <div className="events__text">
                        <div className="events__description">
                          <TextEditor
          
                            value={events.event.aboutCourse.paragraph}>

                          </TextEditor>
                        </div>
                      </div>
                        <NavLink
                          to={'/pagecoorse/' + events.event._id}
                        >
                          {`Участвую ${events.event.fullCoursePayCard.cost}${events.event.fullCoursePayCard.currency}`}
                        </NavLink>
                      <p>{`Цена за весь курс: ${events.event.fullCoursePayCard.cost}${events.event.fullCoursePayCard.currency}`}</p>
                    </>
                  ) : events.type ? (
                    <>
                      <div className="events__title">
                        <h2>{events.event.mainTitle}</h2>
                        <p>{`В курсе ${events.event.vebinars.length}: вебинаров`}</p>
                      </div>
                      <div className="events__text">
                        <div className="events__description">
                        <TextEditor
                          value={events.event.aboutCourse.paragraph}>

                        </TextEditor>
                        </div>
                      </div>
                        <NavLink
                          to={'/pagecoorse/' + events.event._id+'_:id'}
                        >
                          {`Участвую${events.event.fullCoursePayCard.cost}${events.event.fullCoursePayCard.currency}`}
                        </NavLink>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="events__right">
                  <div className="events__text">
                    <nav className="categories__nav">
                      <ul className="nav__list categories__list">
                        {masCoorse.map((value,index) =>{
                          return(
                            <li
                              className="nav__item"
                              key={index}
                            >
                              <div
                                onClick={(e) => handleNavClick(e, value)}
                                className="nav__link"
                              >
                                {value.mainTitle}
                              </div>
                            </li>
                          )
                        }
                          // item.type === events.type ? (
                          //   <li
                          //     className="nav__item"
                          //     key={item.key}
                          //   >
                          //     <div
                          //       onClick={(e) => handleNavClick(e, item)}
                          //       className="nav__link"
                          //     >
                          //       {item.title}
                          //     </div>
                          //   </li>
                          // ) : (
                          //   ""
                          // )
                        )}
                      </ul>
                    </nav>
                  </div>

                  <div
                    className="events__specialist--active"
                  >
                    {events.event ? (
                      <>
                        <div className="events__specialist_info">
                          <span>
                            {events.event?.speaker.name}
                          </span>
                          <span>
                            {events.event?.speaker.profession}
                          </span>
                        </div>
                        <div className="events__specialist_img">
                          {events.event.speaker.photo?
                            <img
                              // src={events.event?.photo}
                              src={`${url}coorsefiles/${events.event.speaker.photo}`}
                              alt=""
                            />           
                            :
                            null               
                          }
                        </div>
                      </>
                    ) : events.type ? (
                      <>
                        <div className="events__specialist_info">
                          <span>{events.firstEvent?.surname}</span>
                          <span>{events.firstEvent?.name}</span>
                          <span>{events.firstEvent?.experience}</span>
                          <span>{events.firstEvent?.city}</span>
                        </div>
                        <div className="events__specialist_img">
                          <img
                            // src={events.firstEvent?.photo}
                            src={defaultPhoto}
                            alt=""
                          />
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
            </div>
        </Carousel>
      </div>
      </div>
  );
}

export default EventsPage;
