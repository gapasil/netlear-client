import React from 'react';
import './VideoPlayer.scss';

import ReactPlayer from 'react-player';

function VideoPlayer({ className = 'video', videoURL }) {
  return (
    <ReactPlayer className={className} url={videoURL} controls={true} loop={true} width="100%"/>
  );
}

export default VideoPlayer;
