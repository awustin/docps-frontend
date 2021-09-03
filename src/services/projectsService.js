import { baseUrl } from '../utils/local';
import request from './requestService';

export function getGroupByUserId(value) {
  return request.post(`${baseUrl()}/getGroupByUserId`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createProject(values) {
  return request.post(`${baseUrl()}/createProject`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function createTestplanForProject(values) {
  return request.post(`${baseUrl()}/createTestplanForProject`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function updateProject(values) {
  return request.post(`${baseUrl()}/updateProject`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function searchProjects(values) {
  return request.post(`${baseUrl()}/searchProjects`, values)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getGroupsDropdown(value) {
  return request.post(`${baseUrl()}/getGroupsDropdown`, {id: value})
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function getProjectById(value) {
  return request.post(`${baseUrl()}/getProjectById`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}

export function deleteProject(value) {
  return request.post(`${baseUrl()}/deleteProject`, { id: value })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response !== undefined) return error.response.data;
      return error;
    });
}
