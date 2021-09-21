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

export function createExecution(value) {
  return request.post(`${baseUrl()}/insertExecution`, {id: value})
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

export function deleteExecutionById(values) {
  return request.post(`${baseUrl()}/deleteExecutionById`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}