import apiFetch from '../../../utils/api/apiFetch';

const api = '/user';

export default {
  newPassword: (data) => apiFetch(`${api}/password`, { method: 'put', data }, true),
  newEmail: (data) => apiFetch(`${api}/email`, { method: 'put', data }, true),
  newProfileData: (data) => apiFetch(`${api}/profile`, { method: 'put', data }, true),
  uploadAvatar: (data) => apiFetch(`/file/upload-avatar`, { method: 'post', data }, true),
};
