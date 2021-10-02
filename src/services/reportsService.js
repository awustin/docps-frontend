import { baseUrl } from '../utils/local';
import request from './requestService';

export function getTestplansTestcasesCount(values) {
  return request.post(`${baseUrl()}/getTestplansTestcasesCount`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getExecutionsReport(values) {
  return request.post(`${baseUrl()}/getExecutionsReport`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getCurrentGroupStats(value) {
  return request.post(`${baseUrl()}/getCurrentGroupStats`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}