import React from 'react';
import './EventCard.scss';

import { Link } from 'react-router-dom';

function EventCard({ img, title, date, time, type, index, link }) {
  return (
    <div className="event-card" key={`${index}_event-card`}>
      <Link to={link}>
        <div className="event-card__promo-block">
          <div className="event-card__img">
            <img src={img} alt="img" />
          </div>
          <div className="event-card__title">{title}</div>
        </div>

        <div className="event-card__info-block">
          <div className="event-card__date">
            {date}, {time}
          </div>
          <div className="event-card__event-type">{type}</div>
        </div>
      </Link>
    </div>
  );
}

export default EventCard;
