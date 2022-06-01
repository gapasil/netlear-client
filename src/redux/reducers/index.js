import { combineReducers } from 'redux';

import modal from './modal.js';
import spinner from './spinner.js';
import dev from './dev.js';
import eventRedactor from './eventRedactor.js';
import sideMenu from './sideMenu';

import Auth from './Auth';
import Temp from './Temp';
import UploadingCourse from './UploadingCourse';

const rootReducer = combineReducers({
  Auth,
  Temp,
  UploadingCourse,
  modal,
  sideMenu,
  spinner,
  dev,
  eventRedactor,
});
export default rootReducer;
