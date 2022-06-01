import axios from 'axios';

import { getLS } from '../LocalStorage';

const URL = 'http://netlear-server.site';

const apiFetch = (route, options = {}, isToken) => {
  console.log(route);
  const apiUrl = URL + route
  if (isToken) {
    const token = getLS('EDMED_USER_TOKEN');

    return axios(apiUrl, {
      ...options,
      headers: {
        Authorization: 'Bearer ' + token
      },
    }).then((result) => result.data);
  }

  return axios(apiUrl, {
    ...options
  },
  {headers: {
    'Content-Type': 'application/json;charset=utf-8',
  }}
  )
  .then((result) => result.json())
};

export default apiFetch;
