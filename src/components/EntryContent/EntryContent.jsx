import React from 'react';
import './EntryContent.scss';

import { Link } from 'react-router-dom';

import arrowRightImg from '../../assets/img/arrow-right.png';

import BlockTitle from '../BlockTitle/BlockTitle';
import EventCard from '../EventCard/EventCard';

import { eventCards } from '../../utils/mapArrays/eventCards';

function EntryContent() {
  return (
    <div className="entry-content">
      <div className="entry-content__wrapper">
        <BlockTitle title="Ближайшие мероприятия" />
        <div className="entry-content__content">
          {eventCards.map((el, i) => (
            <EventCard
              img={el.img}
              title={el.title}
              date={el.date}
              time={el.time}
              type={el.type}
              index={i}
              link={el.link}
            />
          ))}
          <div className="view-all-events">
            <Link to="/">
              <div className="view-all-events__text">Показать все мероприятия</div>
              <img className="view-all-events__img" src={arrowRightImg} alt="arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryContent;
