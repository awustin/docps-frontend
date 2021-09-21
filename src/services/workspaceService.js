import { baseUrl } from '../utils/local';
import request from './requestService';

export function getTestcaseById(value) {
  return request.post(`${baseUrl()}/getTestcaseById`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createTestcase(values) {
  return request.post(`${baseUrl()}/createTestcase`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateTestcase(values) {
  return request.post(`${baseUrl()}/updateTestcase`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function saveSteps(values) {
  return request.post(`${baseUrl()}/saveSteps`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getTestplansDropdown(value) {
  return request.post(`${baseUrl()}/getTestplansDropdown`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getTestcasesDropdown(value) {
  return request.post(`${baseUrl()}/getTestcasesDropdown`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getStepsDropdown(value) {
  return request.post(`${baseUrl()}/getStepsDropdown`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteTestcase(value) {
  return request.post(`${baseUrl()}/deleteTestcase`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}