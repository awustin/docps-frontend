import { baseUrl } from '../utils/local';
import request from './requestService';

export function getExecutionsForTestcase(value) {
  return request.post(`${baseUrl()}/getExecutionsForTestcase`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createExecution(values) {
  return request.post(`${baseUrl()}/insertExecution`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateExecutionById(values) {
  return request.post(`${baseUrl()}/updateExecutionById`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteExecutionById(value) {
  return request.post(`${baseUrl()}/deleteExecutionById`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}