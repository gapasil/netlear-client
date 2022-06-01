import apiFetch from '../../../utils/api/apiFetch';

import { testUploadVimeoVids } from '../../../utils/testVimeo';

const api = '/course';

export default {
  postEventData: (data) => apiFetch(`${api}`, { method: 'post', data }, true),
  putEventImages: (eventId, data) =>
    apiFetch(`${api}/upload/${eventId}`, { method: 'put', data }, true),
};
