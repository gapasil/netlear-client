import apiFetch from '../../../utils/api/apiFetch';

import { testUploadVimeoVids } from '../../../utils/testVimeo';

const api = '/course';

export default {
  getAllCourses: () => apiFetch(`${api}`, { method: 'get' }),
};
