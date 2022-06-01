import React from "react";
import CustomSwiper from "../../components/EventsSwiper/EventsSwiper";
import "./LatestEvents.scss";

function LatestEvents() {
  return (
    <div className="last-events">
      <h2>Последние добавления</h2>
      <CustomSwiper />
    </div>
  );
}

export default LatestEvents;
