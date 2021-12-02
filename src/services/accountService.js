import { baseUrl } from '../utils/local';
import request from './requestService';

export function changePassword(values) {
    return request.post(`${baseUrl()}/changePassword`, values)
        .then((response) => response.data)
        .catch(error => error);
}