import apiFetch from '../../../utils/api/apiFetch';

const api = '/auth';

export default {
  logIn: (data) => apiFetch(`${api}/log-in`, { method: 'post', data }),
  authMe: () => apiFetch(`${api}/auth-me`, { method: 'get' }, true),
  logout: () => apiFetch(`${api}/logout`, { method: 'delete' }, true),
  signUp: (data) => apiFetch(`${api}/sign-up`, { method: 'post', data }),
  authorization: (id) => apiFetch(`${api}/authorization/${id}`, { method: 'put' }),
};
