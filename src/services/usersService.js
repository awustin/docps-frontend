import { baseUrl } from '../utils/local';
import request from './requestService';

export default function UserLogIn(params) {
  return request.post(`${baseUrl()}/userLogIn`, params)
    .then((response) => response)
    .catch((error) => error.response.data);
}
