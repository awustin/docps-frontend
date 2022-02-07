import axios from 'axios';

export default class Request {
  static get(url, config = {params: {}}) {
    return axios.get(url, config, {withCredentials: true, credentials: 'include'});
  }

  static post(url, data = {}) {
    return axios.post(url, data, {withCredentials: true, credentials: 'include'});
  }
}
