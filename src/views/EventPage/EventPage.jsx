import React from 'react';
import './EventPage.scss';

import EventPageParallaxBanner from '../../components/EventPageParallaxBanner/EventPageParallaxBanner';
import EventPageContent from '../../components/EventPageContent/EventPageContent';
import EventPageAboutSpeaker from '../../components/EventPageAboutSpeaker/EventPageAboutSpeaker';
import DeployCourseBlock from '../../components/DeployCourseBlock/DeployCourseBlock';

import { useDispatch } from 'react-redux';
import {
  fetchGetAllCourses,
} from '../../redux/actions/eventRedactor/eventRedactor';

function EventPage({ variant = 'static' }) {
  const dispatch = useDispatch();

  React.useEffect(() => {
    // dispatch(fetchGetAllCourses());
  }, []);

  return (
    <div className="event-page">
      <EventPageParallaxBanner variant={variant} />
      <EventPageContent variant={variant} />
      <EventPageAboutSpeaker variant={variant} />
      {variant === 'redactor' && <DeployCourseBlock />}
    </div>
  );
}

export default EventPage;
